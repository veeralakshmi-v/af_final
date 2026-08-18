import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Server, Layers, Settings, RefreshCw, Activity, Link
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

export default function DjangoDay12({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module12', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── DRF Mock Database ── */
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', quantity: 10, description: 'Work laptop' },
    { id: 2, name: 'Keyboard', quantity: 25, description: 'Mechanical keyboard' }
  ]);

  // Request Builder State
  const [httpMethod, setHttpMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/items/');
  const [requestBody, setRequestBody] = useState('{\n  "name": "Wireless Mouse",\n  "quantity": 15,\n  "description": "Ergonomic 2.4G mouse"\n}');
  const [viewType, setViewType] = useState('APIView'); // 'APIView' or 'ViewSet'
  const [responseStatus, setResponseStatus] = useState('200 OK');
  const [responseBody, setResponseBody] = useState('{\n  "message": "Send a request to see the JSON output."\n}');
  
  // Pipeline Step visualizer logs
  const [pipelineLogs, setPipelineLogs] = useState([
    'System: select HTTP parameters and click "Send Request" to trigger API middleware.'
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const handleSendRequest = async () => {
    setCurrentStepIndex(0);
    let logs = [`[Request Router] Dispatched ${httpMethod} request to "${endpoint}"`];
    setPipelineLogs(logs);

    // 1. Router resolution simulation
    await new Promise(r => setTimeout(r, 250));
    setCurrentStepIndex(1);
    if (viewType === 'ViewSet') {
      logs.push(`[Router] ViewSet URL Router matched pattern: DefaultRouter matches "${endpoint}"`);
    } else {
      logs.push(`[URL resolver] Handled explicitly by path mapping matching "${endpoint}"`);
    }
    setPipelineLogs([...logs]);

    // 2. Deserialization & validation checks
    await new Promise(r => setTimeout(r, 250));
    setCurrentStepIndex(2);
    
    let parsedBody = {};
    let isValidationError = false;
    let errMessage = '';

    if (httpMethod === 'POST' || httpMethod === 'PUT') {
      try {
        parsedBody = JSON.parse(requestBody);
        logs.push(`[Serializer] Deserializing input payload: ${JSON.stringify(parsedBody)}`);
        
        // Validation checks
        if (!parsedBody.name || parsedBody.name.trim() === '') {
          isValidationError = true;
          errMessage = '{"name": ["This field may not be blank."]}';
        } else if (parsedBody.quantity === undefined || isNaN(parsedBody.quantity) || parseInt(parsedBody.quantity) < 0) {
          isValidationError = true;
          errMessage = '{"quantity": ["Ensure this value is greater than or equal to 0."]}';
        } else {
          logs.push(`[Serializer] Validation passed: item "${parsedBody.name}" fields verified.`);
        }
      } catch (e) {
        isValidationError = true;
        errMessage = '{"non_field_errors": ["Invalid JSON format parsed."]}';
      }
      setPipelineLogs([...logs]);
    }

    if (isValidationError) {
      setResponseStatus('400 Bad Request');
      setResponseBody(errMessage);
      logs.push(`[Response Handler] View halted execution with 400 Bad Request.`);
      setCurrentStepIndex(4);
      setPipelineLogs([...logs]);
      return;
    }

    // 3. Database operations
    await new Promise(r => setTimeout(r, 250));
    setCurrentStepIndex(3);

    const isListEndpoint = endpoint === '/api/items/';
    
    if (isListEndpoint) {
      if (httpMethod === 'GET') {
        logs.push(`[ORM DB Query] Fetching items: Item.objects.all()`);
        logs.push(`[Serializer] Converting DB records to JSON representation`);
        setResponseStatus('200 OK');
        setResponseBody(JSON.stringify(items, null, 2));
      } else if (httpMethod === 'POST') {
        const newItem = {
          id: items.length + 1,
          name: parsedBody.name,
          quantity: parseInt(parsedBody.quantity) || 0,
          description: parsedBody.description || ''
        };
        setItems(prev => [...prev, newItem]);
        logs.push(`[ORM DB Save] Writing record: Item.objects.create(name="${newItem.name}", quantity=${newItem.quantity})`);
        setResponseStatus('201 Created');
        setResponseBody(JSON.stringify(newItem, null, 2));
      } else {
        setResponseStatus('405 Method Not Allowed');
        setResponseBody(JSON.stringify({ detail: `Method "${httpMethod}" not allowed on list endpoint.` }, null, 2));
      }
    } else {
      // Detail endpoint (/api/items/1/)
      const match = endpoint.match(/\/api\/items\/(\d+)\//);
      const itemId = match ? parseInt(match[1]) : null;
      const targetItemIndex = items.findIndex(i => i.id === itemId);

      if (targetItemIndex === -1) {
        logs.push(`[ORM DB Query] Fetching record ID: ${itemId || 'None'}`);
        logs.push(`[Error] Record matching ID not found.`);
        setResponseStatus('404 Not Found');
        setResponseBody(JSON.stringify({ detail: "Not found." }, null, 2));
      } else {
        const targetItem = items[targetItemIndex];
        if (httpMethod === 'GET') {
          logs.push(`[ORM DB Query] Fetching record: Item.objects.get(id=${itemId})`);
          setResponseStatus('200 OK');
          setResponseBody(JSON.stringify(targetItem, null, 2));
        } else if (httpMethod === 'PUT') {
          const updatedItem = {
            ...targetItem,
            name: parsedBody.name || targetItem.name,
            quantity: parsedBody.quantity !== undefined ? parseInt(parsedBody.quantity) : targetItem.quantity,
            description: parsedBody.description !== undefined ? parsedBody.description : targetItem.description
          };
          setItems(prev => prev.map(item => item.id === itemId ? updatedItem : item));
          logs.push(`[ORM DB Save] Updating record: Item.objects.filter(id=${itemId}).update(...)`);
          setResponseStatus('200 OK');
          setResponseBody(JSON.stringify(updatedItem, null, 2));
        } else if (httpMethod === 'DELETE') {
          setItems(prev => prev.filter(item => item.id !== itemId));
          logs.push(`[ORM DB Delete] Deleting record: Item.objects.filter(id=${itemId}).delete()`);
          setResponseStatus('204 No Content');
          setResponseBody('');
        }
      }
    }
    setPipelineLogs([...logs]);

    // 4. Return HTTP Response
    await new Promise(r => setTimeout(r, 250));
    setCurrentStepIndex(4);
    logs.push(`[Response Handler] JSON response returned to client.`);
    setPipelineLogs([...logs]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which component in DRF handles translating querysets into native JSON data?',
      opts: ['APIView', 'Serializer', 'Router', 'ViewSet'],
      ans: 1,
      exp: 'Serializers handle conversion of data formats. They translate database objects into JSON format for outgoing API responses, and parse incoming JSON data back into model fields.'
    },
    {
      k: 'q2',
      q: 'What is a major advantage of using a ViewSet over an APIView?',
      opts: [
        'It supports HTML template files natively',
        'It abstracts away the SQL queries completely',
        'It groups standard CRUD operations (list, create, update, etc.) inside a single class, allowing Routers to auto-generate endpoint paths',
        'It secures APIs against hacking attempts automatically'
      ],
      ans: 2,
      exp: 'ViewSets bundle CRUD actions (list, retrieve, create, update, destroy) in a single class. Registering a ViewSet with a DefaultRouter automatically generates all standard RESTful endpoint mappings.'
    },
    {
      k: 'q3',
      q: 'Which package must be installed and registered in INSTALLED_APPS to use Django REST Framework?',
      opts: ['djangorest', 'rest_framework', 'django_api', 'restframework'],
      ans: 1,
      exp: 'The packages is installed via "pip install djangorestframework", and registered in settings.py as "rest_framework".'
    },
    {
      k: 'q4',
      q: 'Which generic APIView from generics module handles both listing and creating items out of the box?',
      opts: ['ListAPIView', 'CreateAPIView', 'ListCreateAPIView', 'RetrieveUpdateDestroyAPIView'],
      ans: 2,
      exp: 'generics.ListCreateAPIView automatically implements GET (to list) and POST (to create) endpoints for a model queryset.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO DRF ────────────────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 12 • Module 01" title="Introduction to Django REST Framework">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#3f51b5)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔌 Building APIs: Why DRF?</h3>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7 }}>
                API stands for <strong>Application Programming Interface</strong>. Unlike traditional web applications that render HTML templates, APIs return raw, structured data (typically <strong>JSON</strong>) so that frontend systems (like React, Angular, or mobile apps) can consume them. **Django REST Framework (DRF)** is the industry-standard toolkit for building flexible APIs in Django.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Django Templates vs. Django REST Framework APIs</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Aspect</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Traditional Django</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Django REST Framework (DRF)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Primary Output', 'HTML Templates & files', 'JSON or XML payload streams'],
                  ['Client Systems', 'Web browser directly', 'React/Vue frontends, iOS/Android apps, external services'],
                  ['Form Handlers', "Django Forms (validates HTML form POSTs)", 'Serializers (converts JSON payloads to models & validates)'],
                  ['View Methods', 'Template views, redirects, context maps', 'APIViews with GET, POST HTTP action wrappers'],
                  ['Authentication', 'Session cookies, cookie logins', 'Token-based, JWT header tokens, OAuth keys'],
                ].map(([aspect, trad, drf]) => (
                  <tr key={aspect} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 700, fontSize: '0.82rem', color: '#3f51b5' }}>{aspect}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem' }}>{trad}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem', fontWeight: 600, color: '#0284c7' }}>{drf}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Django Rest Serializers <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. SERIALIZERS ─────────────────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="serializers" eyebrow="Django • Day 12 • Module 02" title="API Serializers">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django REST serializers parse incoming data packets, validate input schemas, and format database models into plain Python formats that translate into JSON.</p>

            <CodeBlock title="inventory/serializers.py — ModelSerializer example" code={`from rest_framework import serializers
from .models import Item

# ModelSerializer maps fields directly to fields declared in models.py
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        # Expose specific attributes
        fields = ['id', 'name', 'quantity', 'description']`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Serializing Queries &amp; Objects</h3>
            <CodeBlock title="Executing serialization in views/shell" code={`# 1. Serializing a single record
item = Item.objects.get(id=1)
serializer = ItemSerializer(item)
print(serializer.data) # {'id': 1, 'name': 'Laptop', ...}

# 2. Serializing query list (Requires many=True parameter)
items = Item.objects.all()
serializer = ItemSerializer(items, many=True)
print(serializer.data) # [{'id': 1}, {'id': 2}]`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: APIView vs ViewSet <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. APIVIEW vs VIEWSET ────────────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="apiview_vs_viewset" eyebrow="Django • Day 12 • Module 03" title="APIView vs ViewSet &amp; Routers">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>DRF offers two main approaches to build controllers: granular <strong>APIView</strong> classes and highly abstract <strong>ViewSets</strong>.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#3f51b5', fontWeight: 800, marginTop: 0 }}>🛡️ APIView</h4>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 10 }}>Custom control. Declare explicit method hooks for GET, POST, PUT, DELETE.</p>
                <CodeBlock title="APIView Example" code={`class ItemListCreateAPIView(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)`} />
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#0284c7', fontWeight: 800, marginTop: 0 }}>🏛️ ViewSet &amp; Router</h4>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 10 }}>CRUD Boilerplate removal. Registers actions with a default Router to auto-map URL paths.</p>
                <CodeBlock title="ViewSet + Router Example" code={`# views.py
from rest_framework import viewsets

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')
urlpatterns = router.urls`} />
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('middleware_intro')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Setting Up DRF <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. SETTING UP DRF ───────────────────────────────────────── */}
      {activeTab === 'middleware_intro' && (
        <Section key="setup" eyebrow="Django • Day 12 • Module 04" title="Setting Up Django REST Framework">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Setup DRF inside your Django project with a few simple steps:</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Step 1: Install DRF package</h3>
            <pre style={{ background: '#0f172a', color: '#a5d6ff', padding: '12px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>
              pip install djangorestframework
            </pre>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Step 2: Add rest_framework to installed applications</h3>
            <CodeBlock title="mysite/settings.py" code={`INSTALLED_APPS = [
    # ...
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Register DRF here:
    'rest_framework',
]`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Step 3: Add rest_framework settings (Optional but recommended)</h3>
            <CodeBlock title="mysite/settings.py" code={`REST_FRAMEWORK = {
    # Set default permissions (AllowAny is default, but good to make explicit)
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    # Set JSON as primary renderer
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer', # Adds web browsable console
    ],
}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Live Endpoint Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. INTERACTIVE DRF TESTER ───────────────────────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="sandbox" eyebrow="Django • Day 12 • Module 05" title="Interactive DRF Endpoint Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Configure HTTP methods and trigger payloads. Watch how routers resolve views, serializers validate input fields, and output data is generated live.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Request Panel */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>⚡ API Request Builder</h4>
                
                {/* Method & Endpoint select */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 6, marginBottom: 10 }}>
                  <select value={httpMethod} onChange={e => {
                    const met = e.target.value;
                    setHttpMethod(met);
                    if (met === 'POST') setEndpoint('/api/items/');
                  }} style={{ padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6, fontWeight: 700 }}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>

                  <select value={endpoint} onChange={e => setEndpoint(e.target.value)} style={{ padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6, fontFamily: 'monospace' }}>
                    <option value="/api/items/">/api/items/ (List / Create)</option>
                    <option value="/api/items/1/">/api/items/1/ (Detail Laptop)</option>
                    <option value="/api/items/2/">/api/items/2/ (Detail Keyboard)</option>
                    <option value="/api/items/99/">/api/items/99/ (Detail Missing ID)</option>
                  </select>
                </div>

                {/* View type select */}
                <div style={{ display: 'flex', gap: 10, fontSize: '0.78rem', marginBottom: 12 }}>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="radio" checked={viewType === 'APIView'} onChange={() => setViewType('APIView')} /> APIView Controller
                  </label>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="radio" checked={viewType === 'ViewSet'} onChange={() => setViewType('ViewSet')} /> ViewSet + DefaultRouter
                  </label>
                </div>

                {/* JSON Body (only visible for write methods) */}
                {(httpMethod === 'POST' || httpMethod === 'PUT') && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: 4 }}>📄 Request Payload JSON Body</div>
                    <textarea value={requestBody} onChange={e => setRequestBody(e.target.value)} rows={5}
                      style={{ width: '100%', padding: '6px 8px', fontSize: '0.76rem', border: '1px solid #cbd5e1', borderRadius: 6, fontFamily: 'monospace', background: 'white', color: '#0f172a', resize: 'none' }} />
                  </div>
                )}

                <button onClick={handleSendRequest} style={{ width: '100%', padding: '8px', background: '#0284c7', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer' }}>
                  Send API Request
                </button>
              </div>

              {/* Server & Response Console */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                
                {/* Visual Pipeline Stack */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>⚙️ DRF Execution Call Stack</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {['Route Matcher', 'Views Dispatch', 'Serializer Validation', 'ORM Execution', 'Render JSON Response'].map((step, idx) => {
                      const isActive = currentStepIndex === idx;
                      const isPassed = currentStepIndex > idx;
                      let bg = '#f1f5f9', border = '1px solid #e2e8f0', color = '#94a3b8';
                      if (isActive) {
                        bg = '#e0f2fe'; border = '1.5px solid #0284c7'; color = '#0369a1';
                      } else if (isPassed) {
                        bg = '#f0fdf4'; border = '1.5px solid #10b981'; color = '#15803d';
                      }
                      return (
                        <div key={step} style={{ background: bg, border, borderRadius: 6, padding: '4px 8px', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color }}>{step}</span>
                          {isPassed && <span style={{ color: '#10b981', fontWeight: 700 }}>✓ passed</span>}
                          {isActive && <span style={{ color: '#0284c7', fontWeight: 700 }} className="animate-pulse">processing...</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* HTTP JSON Response view */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📥 Client HTTP Response Console</span>
                    <strong style={{ color: responseStatus.startsWith('2') ? '#10b981' : '#f87171' }}>{responseStatus}</strong>
                  </div>
                  <pre style={{ margin: 0, padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#86efac', overflow: 'auto', maxHeight: 110 }}>{responseBody}</pre>
                </div>

              </div>

            </div>

            {/* Pipeline logs console */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Server Logs</div>
              <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {pipelineLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Request') ? '#f59e0b' : log.startsWith('[Serializer') ? '#cbd5e1' : log.includes('passed') || log.includes('Writing') ? '#34d399' : '#94a3b8' }}>{log}</pre>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 12 Quiz — Django REST Framework Basics">
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

      {/* ── 7. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 12 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Build a RESTful API for Your Inventory Items</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Follow these steps to configure your first Django REST Framework API endpoints:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Install Django REST Framework package: run <code>pip install djangorestframework</code>.</li>
                <li>Open <code>settings.py</code> and add <code>'rest_framework'</code> to your <code>INSTALLED_APPS</code> registry block.</li>
                <li>Create an <code>Item</code> model class (representing item name, quantity, description) inside <code>models.py</code> if not already defined. Run makemigrations and migrate.</li>
                <li>Create a new file named <code>serializers.py</code> inside your application folder.</li>
                <li>Implement <code>ItemSerializer</code> inheriting from <code>serializers.ModelSerializer</code>. In its Meta class config, link to <code>Item</code> model and include fields.</li>
                <li>Open <code>views.py</code> and implement two generic API views: <code>ItemListCreateView</code> (inheriting from <code>generics.ListCreateAPIView</code>) and <code>ItemDetailView</code> (inheriting from <code>generics.RetrieveUpdateDestroyAPIView</code>).</li>
                <li>Set up the endpoints inside <code>urls.py</code>: map the lists view to <code>items/</code> and details view to <code>items/&lt;int:pk&gt;/</code>.</li>
                <li>Boot the development server (<code>python manage.py runserver</code>) and test the endpoint responses using tools like Postman or by visiting the DRF Browsable API in the browser.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Architecture Note:</strong> Generic APIViews handle standard database transactions automatically, keeping controllers slim and structured. Only resort to custom <code>APIView</code> overriding when implementing unique backend functions or processing complex custom logic.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#0284c7', borderColor: '#0284c7', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module13', 'intro_sessions')}>
              Next: Day 13 — DRF Authentication, Permissions &amp; Pagination <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
