import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, RefreshCw, Layers, GitMerge, Lock
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

export default function DjangoDay11({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module11', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Sandbox States ── */
  const [viewMode, setViewMode] = useState('FBV'); // 'FBV' or 'CBV'
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeStep, setActiveStep] = useState(-1);
  const [simulationLogs, setSimulationLogs] = useState([
    'System: select view mode and click "Simulate Request" to visualize call flow.'
  ]);

  const fbvSteps = [
    { title: 'HTTP Request', desc: 'Incoming HTTP GET request to /products/1/' },
    { title: 'URL Resolver', desc: 'Resolves path to views.product_detail(request, pk=1)' },
    { title: 'Auth Check', desc: 'Runs @login_required decorator conditional tests' },
    { title: 'Database Fetch', desc: 'Executes get_object_or_404(Product, pk=pk)' },
    { title: 'Render Template', desc: 'Combines context object with inventory/product_detail.html' },
    { title: 'HTTP Response', desc: 'Returns rendered HTML page content with 200 OK' }
  ];

  const cbvSteps = [
    { title: 'HTTP Request', desc: 'Incoming HTTP GET request to /products/1/' },
    { title: 'as_view() Entry', desc: 'Triggers ProductDetailView.as_view() wrapper method' },
    { title: 'dispatch() Hook', desc: 'Inspects request type and runs LoginRequiredMixin verification checks' },
    { title: 'get() Handler', desc: 'Maps execution to the internal get(request, *args, **kwargs) handler' },
    { title: 'get_object()', desc: 'Retrieves single Product record matching the URL lookup pk/slug' },
    { title: 'get_context_data()', desc: 'Prepares template context mapping object to {"product": product}' },
    { title: 'render_to_response()', desc: 'Loads template_name and returns populated HTML response stream' }
  ];

  const currentStepsList = viewMode === 'FBV' ? fbvSteps : cbvSteps;

  const runSimulation = async () => {
    setActiveStep(0);
    let logs = [`[Start] Simulating GET request using ${viewMode} mode...`];
    setSimulationLogs(logs);

    if (viewMode === 'CBV' && !isLoggedIn) {
      // LoginRequiredMixin block
      setTimeout(() => setActiveStep(1), 300);
      setTimeout(() => {
        setActiveStep(2);
        setSimulationLogs(prev => [
          ...prev,
          '[as_view()] Entry point evaluated.',
          '[LoginRequiredMixin] Access Denied: User is not logged in! Redirecting to login page.'
        ]);
      }, 600);
      return;
    }

    if (viewMode === 'FBV' && !isLoggedIn) {
      setTimeout(() => setActiveStep(1), 300);
      setTimeout(() => {
        setActiveStep(2);
        setSimulationLogs(prev => [
          ...prev,
          '[URL Resolver] URL resolved to product_detail.',
          '[@login_required] Access Denied: request.user is not authenticated. Redirecting to login URL.'
        ]);
      }, 600);
      return;
    }

    // Step-by-step progress simulation
    for (let i = 1; i < currentStepsList.length; i++) {
      await new Promise(resolve => {
        setTimeout(() => {
          setActiveStep(i);
          let logMsg = '';
          if (viewMode === 'FBV') {
            if (i === 1) logMsg = '[Router] URL maps successfully to views.product_detail.';
            if (i === 2) logMsg = '[@login_required] Authentication verified successfully.';
            if (i === 3) logMsg = '[ORM] Querying Product table for pk=1.';
            if (i === 4) logMsg = '[Renderer] Injecting product record attributes into templates.';
            if (i === 5) logMsg = '[Server] Returning response stream.';
          } else {
            if (i === 1) logMsg = '[CBV Wrapper] Calling .as_view() handler.';
            if (i === 2) logMsg = '[dispatch()] Routing incoming request to GET method handler.';
            if (i === 3) logMsg = '[get()] Mapping views request values.';
            if (i === 4) logMsg = '[get_object()] Performing automatic pk record lookup.';
            if (i === 5) logMsg = '[get_context_data()] Populating template context variables.';
            if (i === 6) logMsg = '[Renderer] Building HTML response body output.';
          }
          if (logMsg) {
            setSimulationLogs(prev => [...prev, logMsg]);
          }
          resolve();
        }, i * 350);
      });
    }
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which method routes incoming requests (GET, POST, etc.) inside a Class-Based View?',
      opts: ['as_view()', 'dispatch()', 'get_context_data()', 'setup()'],
      ans: 1,
      exp: 'The dispatch() method takes the request, checks its HTTP method type (GET, POST, etc.), and routes it to the corresponding class method handler.'
    },
    {
      k: 'q2',
      q: 'Where do custom Mixins go in the class inheritance declaration?',
      opts: [
        'To the right of the base view class',
        'To the left of the base view class',
        'Directly inside the views.py imports header',
        'It does not matter — python resolves them randomly'
      ],
      ans: 1,
      exp: 'In Python multi-inheritance (MRO), mixins must be declared to the left of the base view (e.g. class MyView(LoginRequiredMixin, ListView)). The base view always goes on the far right.'
    },
    {
      k: 'q3',
      q: 'Which generic Class-Based View is best suited for rendering a page without database models?',
      opts: ['DetailView', 'CreateView', 'TemplateView', 'FormView'],
      ans: 2,
      exp: 'TemplateView renders a static template while optionally passing parameters passed through the URL routing conf.'
    },
    {
      k: 'q4',
      q: 'What is a major guideline when configuring error handlers (like 403, 404)?',
      opts: [
        'Always implement them using CreateView',
        'Use Function-Based Views (FBVs) for error handlers instead of Class-Based Views',
        'Register them directly in settings.py MIDDLEWARE config list',
        'Error handlers cannot be customised in Django projects'
      ],
      ans: 1,
      exp: 'Django guidelines recommend using simple Function-Based Views for custom error page handlers, as CBVs add unnecessary complexity and overhead for basic error response rendering.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO FBV vs CBV ─────────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 11 • Module 01" title="FBV vs CBV: Choosing Your View Pattern">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#4f46e5,#3b82f6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🎛️ Handling HTTP Requests in Django</h3>
              <p style={{ color: '#dbeafe', margin: 0, lineHeight: 1.7 }}>
                Django supports two main paradigms for view layouts: <strong>Function-Based Views (FBV)</strong> and <strong>Class-Based Views (CBV)</strong>. While FBVs are direct and simple, CBVs allow developers to reuse common design patterns, structures, and generic code.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>FBV vs. CBV Comparison</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#4f46e5', fontWeight: 800, marginTop: 0 }}>⚙️ Function-Based Views (FBV)</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>**Simple &amp; explicit**: Easy to read and debug.</li>
                  <li>Flow of code matches the request-response cycle line-by-line.</li>
                  <li>Great for unique business logic, custom scripts, and error handlers.</li>
                  <li>Can result in duplicate code across views (e.g. duplicating CRUD forms).</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#3b82f6', fontWeight: 800, marginTop: 0 }}>🏛️ Class-Based Views (CBV)</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>**Structured &amp; DRY**: Promotes code reuse via object inheritance.</li>
                  <li>HTTP methods (GET, POST) are handled in dedicated class methods.</li>
                  <li>Leverages built-in generic views for standard CRUD operations.</li>
                  <li>Requires understanding Django's internal class call hierarchy.</li>
                </ul>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Code Comparison &amp; Routing <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CODE COMPARISON & ROUTING ────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="code_comp" eyebrow="Django • Day 11 • Module 02" title="DetailView and CreateView Side-by-Side">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Let's compare the code structure of Function-Based Views and Class-Based Views for common operations.</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Displaying Object Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <CodeBlock title="FBV Detail View" code={`# views.py
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'inventory/detail.html', {
        'product': product
    })

# urls.py
path('product/<int:pk>/', views.product_detail)`} />

              <CodeBlock title="CBV Detail View" code={`# views.py
from django.views.generic import DetailView

class ProductDetailView(DetailView):
    model = Product
    template_name = 'inventory/detail.html'
    context_object_name = 'product'

# urls.py
path('product/<int:pk>/', ProductDetailView.as_view())`} />
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>2. Creating Objects with Forms</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <CodeBlock title="FBV Create View" code={`# views.py
def add_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'product_form.html', {
        'form': form
    })`} />

              <CodeBlock title="CBV Create View" code={`# views.py
from django.views.generic import CreateView
from django.urls import reverse_lazy

class ProductCreateView(CreateView):
    model = Product
    form_class = ProductForm
    template_name = 'product_form.html'
    success_url = reverse_lazy('product_list')`} />
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Code Reuse with Mixins <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. MIXINS ──────────────────────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="mixins" eyebrow="Django • Day 11 • Module 03" title="Reusing Code with Mixins">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>In Django, <strong>mixins</strong> are classes that inject modular functionality into other classes without forcing a deep hierarchical inheritance parent chain.</p>

            <InfoBox icon={Layers} color="#4f46e5" bg="#eef2ff" border="#c7d2fe">
              <strong>Order of mixins:</strong> Mixins always go to the <strong>left</strong> of the base view class in python declarations. Python evaluates methods from left to right.
            </InfoBox>

            <CodeBlock title="Applying Mixins for Authentication Guards" code={`from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.views.generic import ListView
from .models import Product

# LoginRequiredMixin blocks anonymous requests
# PermissionRequiredMixin checks for specific database permissions
class SecuredProductListView(LoginRequiredMixin, PermissionRequiredMixin, ListView):
    model = Product
    template_name = 'inventory/product_list.html'
    context_object_name = 'products'
    
    # Required permission checked by PermissionRequiredMixin:
    permission_required = 'inventory.view_product'
    
    # Redirect URL if user is not authenticated:
    login_url = '/login/'`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>The Inheritance Rule of Thumb</h3>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', fontSize: '0.82rem' }}>
              <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li><strong>Base views</strong> (like `View`, `ListView`, `TemplateView`) go to the <strong>far right</strong>.</li>
                <li><strong>Mixins</strong> (like `LoginRequiredMixin`) go to the <strong>left</strong>.</li>
                <li>Ensure mixins are as simple and focused as possible.</li>
              </ol>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('middleware_intro')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Generic Views Hierarchy <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. GENERIC VIEWS LIST ───────────────────────────────────── */}
      {activeTab === 'middleware_intro' && (
        <Section key="generic_list" eyebrow="Django • Day 11 • Module 04" title="Django's Generic View Suite">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django ships a complete suite of generic views to cover standard CRUD and presentation operations:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { cat: '📄 Display Views', items: ['TemplateView — Renders an HTML page', 'DetailView — Displays one model object', 'ListView — Renders a paginated query list'] },
                { cat: '✍️ Editing Views', items: ['CreateView — Renders & processes creation form', 'UpdateView — Modifies an existing model record', 'DeleteView — Displays delete checks & deletes'] },
                { cat: '📅 Date Archives', items: ['ArchiveIndexView — Groups items by dates', 'YearArchiveView — Filters by year', 'MonthArchiveView — Filters by month'] },
              ].map(({ cat, items }) => (
                <div key={cat} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.85rem', marginBottom: 8 }}>{cat}</div>
                  {items.map(i => <div key={i} style={{ fontSize: '0.74rem', color: '#475569', marginBottom: 4 }}>• {i}</div>)}
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Inheritance &amp; Method Hooks</h3>
            <p>Customise generic CBV behavior by overriding standard hooks instead of writing complete views:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Method Hook</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Overrides to…</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Example Code</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['get_queryset()', 'Dynamic object filtering', 'def get_queryset(self): return Product.objects.filter(active=True)'],
                  ['get_context_data()', 'Adding extra context variables', 'def get_context_data(self, **kw): ctx = super().get_context_data(**kw); ctx["time"] = now(); return ctx'],
                  ['form_valid()', 'Running post-validation scripts', 'def form_valid(self, form): form.instance.creator = self.request.user; return super().form_valid(form)'],
                ].map(([m, over, code]) => (
                  <tr key={m} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#4f46e5', fontWeight: 700 }}>{m}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.78rem' }}>{over}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#64748b' }}>{code}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Live Request Flow Simulator <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. INTERACTIVE FLOW SANDBOX ──────────────────────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="sandbox" eyebrow="Django • Day 11 • Module 05" title="Live FBV vs CBV Call Flow Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Trigger a mock request and watch step-by-step how Django runs decorator hooks vs class-based dispatch systems.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Simulator Options Panel */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 12px', color: '#0f172a', fontWeight: 800 }}>⚡ View Options</h4>
                
                {/* Mode Select */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  <button onClick={() => { setViewMode('FBV'); setActiveStep(-1); }}
                    style={{ flexGrow: 1, padding: '8px', border: 'none', borderRadius: 6, background: viewMode === 'FBV' ? '#4f46e5' : '#e2e8f0', color: viewMode === 'FBV' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}>
                    Function-Based (FBV)
                  </button>
                  <button onClick={() => { setViewMode('CBV'); setActiveStep(-1); }}
                    style={{ flexGrow: 1, padding: '8px', border: 'none', borderRadius: 6, background: viewMode === 'CBV' ? '#3b82f6' : '#e2e8f0', color: viewMode === 'CBV' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}>
                    Class-Based (CBV)
                  </button>
                </div>

                {/* Login Mixin Toggle */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 12px', fontSize: '0.76rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span>User Authentication Status</span>
                  <button onClick={() => { setIsLoggedIn(!isLoggedIn); setActiveStep(-1); }}
                    style={{ padding: '4px 8px', border: 'none', background: isLoggedIn ? '#10b981' : '#ef4444', color: 'white', fontWeight: 700, borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem' }}>
                    {isLoggedIn ? 'LOGGED IN' : 'ANONYMOUS'}
                  </button>
                </div>

                <button onClick={runSimulation} style={{ width: '100%', padding: '10px', background: '#0f172a', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                  <RefreshCw size={14} /> Simulate Request
                </button>
              </div>

              {/* Execution Flow Diagram */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 12px', color: '#0f172a', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <GitMerge size={16} /> Call Stack Pipeline
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {currentStepsList.map((step, idx) => {
                    const isActive = activeStep === idx;
                    const isPassed = activeStep > idx;
                    const isDenied = (idx === 2 && !isLoggedIn && activeStep >= 2);
                    
                    let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#94a3b8';
                    if (isActive) {
                      bg = viewMode === 'FBV' ? '#eef2ff' : '#eff6ff';
                      border = viewMode === 'FBV' ? '2px solid #4f46e5' : '2px solid #3b82f6';
                      color = '#0f172a';
                    } else if (isPassed) {
                      bg = '#f0fdf4'; border = '1.5px solid #10b981'; color = '#1e293b';
                    }
                    if (isDenied) {
                      bg = '#fee2e2'; border = '2px solid #ef4444'; color = '#991b1b';
                    }

                    return (
                      <div key={step.title} style={{ background: bg, border, borderRadius: 8, padding: '6px 12px', transition: 'all 0.2s', opacity: (activeStep === -1 || isActive || isPassed || isDenied) ? 1 : 0.4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.8rem', color }}>{idx + 1}. {step.title}</span>
                          {isPassed && !isDenied && <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>✓ passed</span>}
                          {isDenied && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>❌ blocked</span>}
                          {isActive && <span style={{ color: viewMode === 'FBV' ? '#4f46e5' : '#3b82f6', fontSize: '0.75rem', fontWeight: 700 }} className="animate-pulse">processing...</span>}
                        </div>
                        {(isActive || isDenied) && (
                          <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: 3, borderTop: '1px solid #cbd5e1', paddingTop: 3 }}>
                            {step.desc}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Simulated Live Logs */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Server Logs</div>
              <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {simulationLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Start]') ? '#64748b' : log.includes('Blocked') || log.includes('Denied') ? '#f87171' : '#34d399' }}>{log}</pre>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 11 Quiz — FBVs vs CBVs">
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
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: score === questions.length ? '#10b981' : '#f59e0b' }}>
                      Score: {score} / {questions.length} ({Math.round(score / questions.length * 100)}%)
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 11 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Convert Product detail to generic Class-Based Views</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Convert the standard FBV setup to optimized CBVs inside your inventory project:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Identify the unoptimized <code>product_detail</code> view inside your <code>views.py</code>.</li>
                <li>Import generic views from Django: <code>from django.views.generic import DetailView</code>.</li>
                <li>Declare a new class: <code>class ProductDetailView(DetailView):</code>.</li>
                <li>Configure the class properties: set <code>model = Product</code>, configure <code>template_name = 'inventory/product_detail.html'</code>, and set <code>context_object_name = 'product'</code>.</li>
                <li>Import <code>LoginRequiredMixin</code> from <code>django.contrib.auth.mixins</code>.</li>
                <li>Add it to the class inheritance to block anonymous user views: <code>class ProductDetailView(LoginRequiredMixin, DetailView):</code>. Remember to place the mixin to the left!</li>
                <li>Update your <code>urls.py</code> routing patterns list: replace the old FBV line with <code>path('product/&lt;int:pk&gt;/', ProductDetailView.as_view(), name='product_detail')</code>.</li>
                <li>Test the page: open the URL authenticated vs. unauthenticated to confirm it handles permissions correctly.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Guidelines Reminder:</strong> Never use Class-Based Views to implement error handlers (like custom 404 or 403 pages). Keep those configured as basic FBVs to avoid inheritance overhead in standard routing lookups.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module12', 'intro_sessions')}>
              Next: Day 12 — Django REST Framework Basics <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
