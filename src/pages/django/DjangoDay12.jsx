import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Server, Layers, Settings, RefreshCw, Activity, Link,
  Folder, Globe, Cloud, Database, Package, Shield, Cpu, Check, Copy, ListChecks, Share2, Zap,
  Lock, Key, HardDrive, UploadCloud, SlidersHorizontal
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

  /* ── Interactive File Tree State for DRF Introduction ── */
  const [selectedFile, setSelectedFile] = useState('serializers.py');

  /* ── DRF Introduction Steps State ── */
  const [activeStep, setActiveStep] = useState(1);

  /* ── Deployment Tab State ── */
  const [deployPlatform, setDeployPlatform] = useState('paas'); // 'paas', 'docker', 'vps'

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
      exp: 'The package is installed via "pip install djangorestframework", and registered in settings.py as "rest_framework".'
    },
    {
      k: 'q4',
      q: 'Which file in a standard DRF app directory contains data validation and JSON serialization logic?',
      opts: ['views.py', 'models.py', 'serializers.py', 'urls.py'],
      ans: 2,
      exp: 'serializers.py is the dedicated module where DRF serializers parse incoming request payloads and format model instances into JSON.'
    },
    {
      k: 'q5',
      q: 'Which WSGI application server is standard for deploying Django REST Framework apps in production?',
      opts: ['Apache Tomcat', 'Gunicorn', 'Node.js', 'Vite'],
      ans: 1,
      exp: 'Gunicorn (Green Unicorn) is the industry-standard WSGI HTTP server for running Python WSGI applications like Django in production.'
    },
    {
      k: 'q6',
      q: 'Which DRF generic APIView from generics module handles both listing and creating items out of the box?',
      opts: ['ListAPIView', 'CreateAPIView', 'ListCreateAPIView', 'RetrieveUpdateDestroyAPIView'],
      ans: 2,
      exp: 'generics.ListCreateAPIView automatically implements GET (to list) and POST (to create) endpoints for a model queryset.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  /* ── File Structure Details Map ── */
  const fileDetails = {
    'serializers.py': {
      category: 'Data Layer Translation',
      purpose: 'Converts Django ORM QuerySets & Model instances into native Python datatypes that easily render into JSON / XML payloads, and validates incoming client JSON data.',
      snippet: `from rest_framework import serializers\nfrom .models import Product\n\nclass ProductSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Product\n        fields = ['id', 'title', 'price', 'in_stock']\n\n    def validate_price(self, value):\n        if value <= 0:\n            raise serializers.ValidationError("Price must be positive.")\n        return value`
    },
    'views.py': {
      category: 'API Controller Layer',
      purpose: 'Houses the API logic. Inherits from DRF APIView, GenericAPIView, or ModelViewSet to process incoming HTTP requests (GET, POST, PUT, DELETE) and return structured Response objects.',
      snippet: `from rest_framework import viewsets\nfrom .models import Product\nfrom .serializers import ProductSerializer\n\nclass ProductViewSet(viewsets.ModelViewSet):\n    queryset = Product.objects.all()\n    serializer_class = ProductSerializer`
    },
    'urls.py': {
      category: 'Routing Layer',
      purpose: 'Maps HTTP endpoint paths to DRF views. When using ViewSets, DefaultRouter automatically registers all standard RESTful URL routes (list, create, detail, update, delete).',
      snippet: `from rest_framework.routers import DefaultRouter\nfrom .views import ProductViewSet\n\nrouter = DefaultRouter()\nrouter.register(r'products', ProductViewSet, basename='product')\n\nurlpatterns = router.urls`
    },
    'permissions.py': {
      category: 'Security & Access Control',
      purpose: 'Contains custom DRF permission classes that evaluate if an incoming request has permission to execute specific actions on a resource.',
      snippet: `from rest_framework import permissions\n\nclass IsOwnerOrReadOnly(permissions.BasePermission):\n    def has_object_permission(self, request, view, obj):\n        if request.method in permissions.SAFE_METHODS:\n            return True\n        return obj.owner == request.user`
    },
    'models.py': {
      category: 'Database ORM Layer',
      purpose: 'Defines the database schema and model fields using Django ORM. Stores data persistently in PostgreSQL, MySQL, or SQLite.',
      snippet: `from django.db import models\n\nclass Product(models.Model):\n    title = models.CharField(max_length=200)\n    price = models.DecimalField(max_digits=10, decimal_places=2)\n    in_stock = models.BooleanField(default=True)\n    created_at = models.DateTimeField(auto_now_add=True)`
    },
    'mysite/settings.py': {
      category: 'Global Settings & Config',
      purpose: 'Registers rest_framework and corsheaders in INSTALLED_APPS, configures global REST_FRAMEWORK defaults (auth, permissions, pagination), and manages environment secrets.',
      snippet: `INSTALLED_APPS = [\n    # ...\n    'rest_framework',\n    'corsheaders',\n    'api_app',\n]\n\nREST_FRAMEWORK = {\n    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticatedOrReadOnly'],\n    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',\n    'PAGE_SIZE': 10,\n}`
    },
    'Procfile': {
      category: 'Deployment Gateway',
      purpose: 'Tells cloud platform hosts (Render, Railway, Heroku) what command to run to launch your production web server (Gunicorn).',
      snippet: `web: gunicorn mysite.wsgi:application --log-file - --bind 0.0.0.0:$PORT`
    },
    'Dockerfile': {
      category: 'Container Infrastructure',
      purpose: 'Defines the Docker image build steps to package Python, DRF application code, dependencies, and WSGI entry point into a portable container.',
      snippet: `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000"]`
    }
  };

  /* ── DRF Introduction Step Flow ── */
  const drfIntroSteps = [
    {
      num: 1,
      title: 'Environment & Virtualenv Setup',
      desc: 'Create an isolated Python environment to keep DRF dependencies segregated from global systems.',
      cmd: 'python -m venv venv\nsource venv/bin/activate  # On Windows: venv\\Scripts\\activate'
    },
    {
      num: 2,
      title: 'Install DRF & Core Packages',
      desc: 'Install djangorestframework alongside CORS headers and production server utilities.',
      cmd: 'pip install djangorestframework django-cors-headers djangorestframework-simplejwt'
    },
    {
      num: 3,
      title: 'Framework Registration',
      desc: 'Add "rest_framework" and "corsheaders" to INSTALLED_APPS inside settings.py.',
      cmd: '# settings.py\nINSTALLED_APPS = [\n    ...\n    "rest_framework",\n    "corsheaders",\n]'
    },
    {
      num: 4,
      title: 'Define Database Models',
      desc: 'Create standard Django ORM models in models.py representing application resources.',
      cmd: '# models.py\nfrom django.db import models\nclass Product(models.Model):\n    name = models.CharField(max_length=100)\n    price = models.DecimalField(max_digits=8, decimal_places=2)'
    },
    {
      num: 5,
      title: 'Create Serializers',
      desc: 'Create serializers.py to map Django ORM instances to JSON format and validate input fields.',
      cmd: '# serializers.py\nfrom rest_framework import serializers\nclass ProductSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Product\n        fields = "__all__"'
    },
    {
      num: 6,
      title: 'Implement API Views',
      desc: 'Create views.py with APIView or ViewSet classes to handle incoming HTTP requests.',
      cmd: '# views.py\nfrom rest_framework import viewsets\nclass ProductViewSet(viewsets.ModelViewSet):\n    queryset = Product.objects.all()\n    serializer_class = ProductSerializer'
    },
    {
      num: 7,
      title: 'Configure Routing & Routers',
      desc: 'Wire viewsets to URLs using DefaultRouter in urls.py for automatic RESTful route generation.',
      cmd: '# urls.py\nfrom rest_framework.routers import DefaultRouter\nrouter = DefaultRouter()\nrouter.register(r"products", ProductViewSet)\nurlpatterns = router.urls'
    },
    {
      num: 8,
      title: 'Test API & Browsable Console',
      desc: 'Boot the server and test endpoints visually via the built-in DRF Browsable API or Postman.',
      cmd: 'python manage.py runserver\n# Open http://127.0.0.1:8000/api/products/ in browser'
    }
  ];

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO DRF ────────────────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 12 • Module 01" title="Introduction to Django REST Framework (DRF)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Hero Header */}
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#3f51b5)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Server size={28} style={{ color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'white' }}>🔌 Building APIs: Why DRF?</h3>
              </div>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>
                API stands for <strong>Application Programming Interface</strong>. Unlike traditional Django web applications that render server-side HTML templates, REST APIs return raw, structured data (typically <strong>JSON</strong>). 
                <strong> Django REST Framework (DRF)</strong> is the gold-standard toolkit for building powerful, scalable, and secure RESTful Web APIs on top of Django.
              </p>
            </div>

            {/* Comparison Table */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Django Templates vs. Django REST Framework APIs</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '2rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Aspect</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Traditional Django (MVT)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Django REST Framework (DRF)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Primary Output', 'HTML Templates & rendered pages', 'JSON / XML payload streams'],
                  ['Client Systems', 'Web browsers directly', 'React/Vue frontends, iOS/Android apps, microservices'],
                  ['Form Handlers', 'Django Forms (validates HTML POSTs)', 'Serializers (converts JSON payloads & validates schemas)'],
                  ['View Methods', 'Template views, redirects, context objects', 'APIViews / ViewSets responding to GET, POST, PUT, DELETE'],
                  ['Authentication', 'Session cookies & CSRF tokens', 'Token Auth, JWT Bearer tokens, OAuth2 keys'],
                  ['Routing', 'Manual path() mappings', 'DefaultRouter auto-generating RESTful paths'],
                ].map(([aspect, trad, drf]) => (
                  <tr key={aspect} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, fontSize: '0.82rem', color: '#3f51b5' }}>{aspect}</td>
                    <td style={{ padding: '10px 12px', fontSize: '0.82rem' }}>{trad}</td>
                    <td style={{ padding: '10px 12px', fontSize: '0.82rem', fontWeight: 600, color: '#0284c7' }}>{drf}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ── DRF ARCHITECTURE FILE STRUCTURE INSPECTOR ── */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.5rem' }}>
                <Folder size={22} style={{ color: '#0284c7' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>📂 DRF Project File Structure & Architecture</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Click any file in the project directory tree below to inspect its exact role, category, and implementation snippet:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {/* File Tree Column */}
                <div style={{ background: '#0f172a', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.8rem', minWidth: 0 }}>
                  <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Folder size={14} /> my_drf_project/
                  </div>
                  
                  <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                      { name: 'manage.py', icon: Code, isRoot: true },
                      { name: 'requirements.txt', icon: FileText, isRoot: true },
                      { name: 'Procfile', icon: UploadCloud, isRoot: true },
                      { name: 'Dockerfile', icon: Package, isRoot: true },
                    ].map(f => (
                      <div key={f.name} onClick={() => setSelectedFile(f.name)}
                        style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 4, background: selectedFile === f.name ? '#0284c7' : 'transparent', color: selectedFile === f.name ? 'white' : '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <f.icon size={13} /> {f.name}
                      </div>
                    ))}

                    <div style={{ color: '#f59e0b', fontWeight: 700, marginTop: 6, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Folder size={14} /> mysite/ (Core)
                    </div>
                    <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div onClick={() => setSelectedFile('mysite/settings.py')} style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 4, background: selectedFile === 'mysite/settings.py' ? '#0284c7' : 'transparent', color: selectedFile === 'mysite/settings.py' ? 'white' : '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Settings size={13} /> settings.py
                      </div>
                      <div onClick={() => setSelectedFile('urls.py')} style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 4, background: selectedFile === 'urls.py' ? '#0284c7' : 'transparent', color: selectedFile === 'urls.py' ? 'white' : '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Link size={13} /> urls.py
                      </div>
                    </div>

                    <div style={{ color: '#10b981', fontWeight: 700, marginTop: 6, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Folder size={14} /> api_app/ (App)
                    </div>
                    <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {[
                        { name: 'serializers.py', icon: Layers },
                        { name: 'views.py', icon: Code },
                        { name: 'models.py', icon: Database },
                        { name: 'permissions.py', icon: Shield },
                      ].map(f => (
                        <div key={f.name} onClick={() => setSelectedFile(f.name)}
                          style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 4, background: selectedFile === f.name ? '#0284c7' : 'transparent', color: selectedFile === f.name ? 'white' : '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <f.icon size={13} /> {f.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* File Details Column */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
                  {fileDetails[selectedFile] ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', pb: 6 }}>
                        <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800, fontSize: '1rem', fontFamily: 'monospace' }}>📄 {selectedFile}</h4>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '3px 8px', borderRadius: 6 }}>
                          {fileDetails[selectedFile].category}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                        {fileDetails[selectedFile].purpose}
                      </p>

                      <CodeBlock title={`Sample Code / Configuration Snippet`} code={fileDetails[selectedFile].snippet} />
                    </>
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Select a file from the tree to inspect details.</div>
                  )}
                </div>
              </div>
            </div>

            {/* ── STEPS IN DRF INTRODUCTION (ROADMAP) ── */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                <ListChecks size={22} style={{ color: '#0284c7' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>🚀 8 Steps to Build a DRF Application</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Follow this standard roadmap when creating any Django REST Framework API project:
              </p>

              {/* Step Navigation Bar */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {drfIntroSteps.map(s => (
                  <button key={s.num} onClick={() => setActiveStep(s.num)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: activeStep === s.num ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                      background: activeStep === s.num ? '#e0f2fe' : '#f8fafc',
                      color: activeStep === s.num ? '#0369a1' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                    <span style={{ background: activeStep === s.num ? '#0284c7' : '#94a3b8', color: 'white', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                      {s.num}
                    </span>
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Step Content Box */}
              {(() => {
                const cur = drfIntroSteps.find(s => s.num === activeStep);
                return (
                  <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: '#0284c7', color: 'white', padding: '2px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 800 }}>
                        Step {cur.num} of 8
                      </span>
                      <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800, fontSize: '1.05rem' }}>{cur.title}</h4>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#334155', marginBottom: 12 }}>{cur.desc}</p>
                    <CodeBlock title="Code / Terminal Command" code={cur.cmd} />
                  </div>
                );
              })()}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Serializers &amp; Models <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. SERIALIZERS ─────────────────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="serializers" eyebrow="Django • Day 12 • Module 02" title="API Serializers & Data Validation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              Django REST serializers parse incoming data packets, validate input schemas, and format database models into plain Python formats that translate into clean JSON streams.
            </p>

            <CodeBlock title="inventory/serializers.py — ModelSerializer example" code={`from rest_framework import serializers
from .models import Item

# ModelSerializer maps fields directly to fields declared in models.py
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        # Expose specific attributes or '__all__'
        fields = ['id', 'name', 'quantity', 'description']
        
    def validate_quantity(self, value):
        """Custom field-level validation"""
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be negative.")
        return value`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Serializing Queries &amp; Objects in Action</h3>
            <CodeBlock title="Executing serialization in views/shell" code={`# 1. Serializing a single record instance
item = Item.objects.get(id=1)
serializer = ItemSerializer(item)
print(serializer.data) 
# Output: {'id': 1, 'name': 'Laptop', 'quantity': 10, 'description': 'Work laptop'}

# 2. Serializing query lists (Requires many=True parameter)
items = Item.objects.all()
serializer = ItemSerializer(items, many=True)
print(serializer.data) 
# Output: [{'id': 1, 'name': 'Laptop'...}, {'id': 2, 'name': 'Keyboard'...}]

# 3. Deserializing & Saving incoming JSON payload
data = {'name': 'Wireless Mouse', 'quantity': 15, 'description': 'Ergonomic mouse'}
serializer = ItemSerializer(data=data)
if serializer.is_valid():
    serializer.save() # Creates new Item instance in PostgreSQL/SQLite`} />

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
            <p>DRF offers two main approaches to build API controllers: granular <strong>APIView</strong> classes and highly abstract <strong>ViewSets</strong> combined with <strong>Routers</strong>.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', minWidth: 0 }}>
                <h4 style={{ color: '#3f51b5', fontWeight: 800, marginTop: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Shield size={18} /> 🛡️ APIView
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 10 }}>Granular control. Declare explicit method handlers for GET, POST, PUT, DELETE.</p>
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

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', minWidth: 0 }}>
                <h4 style={{ color: '#0284c7', fontWeight: 800, marginTop: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Layers size={18} /> 🏛️ ViewSet &amp; Router
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 10 }}>CRUD Boilerplate removal. Registers actions with a DefaultRouter to auto-map URL paths.</p>
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
                Next: Installing &amp; Config DRF <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. SETTING UP & CONFIGURING DRF ─────────────────────────── */}
      {activeTab === 'middleware_intro' && (
        <Section key="setup" eyebrow="Django • Day 12 • Module 04" title="Installing &amp; Configuring Django REST Framework">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Setup DRF inside your Django project with a few clean steps:</p>

            {/* Step 1: Virtual Environment */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Terminal size={18} style={{ color: '#0284c7' }} /> Step 1: Create &amp; Activate Virtual Environment
            </h3>
            <pre style={{ background: '#0f172a', color: '#a5d6ff', padding: '12px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {`python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On macOS / Linux:
source venv/bin/activate`}
            </pre>

            {/* Step 2: Install DRF Package */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Package size={18} style={{ color: '#0284c7' }} /> Step 2: Install DRF &amp; Core Packages via pip
            </h3>
            <pre style={{ background: '#0f172a', color: '#a5d6ff', padding: '12px', borderRadius: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>
              pip install djangorestframework django-cors-headers djangorestframework-simplejwt psycopg2-binary gunicorn python-dotenv
            </pre>

            {/* Step 3: Register in INSTALLED_APPS */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Settings size={18} style={{ color: '#0284c7' }} /> Step 3: Register rest_framework &amp; corsheaders in settings.py
            </h3>
            <CodeBlock title="mysite/settings.py" code={`INSTALLED_APPS = [
    # Core Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party applications:
    'rest_framework',
    'corsheaders',
    
    # Local application:
    'api_app',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Put CORS middleware near top
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]`} />

            {/* Step 4: Comprehensive REST_FRAMEWORK Configuration */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <SlidersHorizontal size={18} style={{ color: '#0284c7' }} /> Step 4: Add REST_FRAMEWORK Global Settings Dictionary
            </h3>
            <CodeBlock title="mysite/settings.py" code={`REST_FRAMEWORK = {
    # 1. Global Default Permissions (AllowAny or IsAuthenticated)
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    
    # 2. Authentication Backends (Session, Token, JWT)
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    
    # 3. Response Renderers (JSON + Browsable Web Console)
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    
    # 4. Global Pagination Config
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}`} />

            {/* Step 5: CORS Headers Setup */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Globe size={18} style={{ color: '#0284c7' }} /> Step 5: Configure CORS for React/Vue Frontends
            </h3>
            <CodeBlock title="mysite/settings.py" code={`# Allow requests from your React / Frontend origin domain
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite Dev Server
    "http://localhost:3000",  # React CRA Server
    "https://myfrontend-app.vercel.app", # Production Frontend
]`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('deployment_drf')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: DRF API Deployment Guide <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. DRF API DEPLOYMENT GUIDE ─────────────────────────────── */}
      {activeTab === 'deployment_drf' && (
        <Section key="deployment" eyebrow="Django • Day 12 • Module 05" title="Deploying Django REST Framework APIs to Production">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Deployment Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <Cloud size={30} style={{ color: '#38bdf8' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'white' }}>☁️ Production DRF Deployment Architecture</h3>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7, fontSize: '0.92rem' }}>
                Deploying a Django REST Framework application requires converting your development environment into a production-hardened API server with Gunicorn WSGI workers, environment isolation, static file hosting, database pooling, and CORS origin security.
              </p>
            </div>

            {/* Production Readiness Checklist */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <ListChecks size={20} style={{ color: '#0284c7' }} /> Phase 1: DRF Production Readiness Checklist
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { title: '1. Turn OFF Debug Mode', desc: 'Set DEBUG = False in production to prevent leaking tracebacks or secret environment credentials.' },
                { title: '2. Environment Variables', desc: 'Use python-dotenv or os.environ to isolate SECRET_KEY, DATABASE_URL, and API keys.' },
                { title: '3. PostgreSQL Database', desc: 'Replace SQLite with PostgreSQL using psycopg2-binary and dj-database-url.' },
                { title: '4. Static Files (WhiteNoise)', desc: 'Configure WhiteNoise or AWS S3 to serve DRF browsable static files efficiently.' },
                { title: '5. WSGI Application Server', desc: 'Use Gunicorn (Green Unicorn) or Uvicorn to run multi-worker Python server processes.' },
                { title: '6. CORS & Security Headers', desc: 'Restrict CORS_ALLOWED_ORIGINS to frontend domains and enable SECURE_SSL_REDIRECT.' },
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: '1rem', minWidth: 0 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#0284c7', fontWeight: 800, fontSize: '0.9rem' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Production Settings Snippet */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Production settings.py Blueprint</h3>
            <CodeBlock title="mysite/settings_production.py" code={`import os
import dj_database_url

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-secret-key-change-in-prod')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'api.yourdomain.com,localhost').split(',')

# Production Database (PostgreSQL)
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL', 'postgres://user:pass@localhost:5432/drf_db'),
        conn_max_age=600
    )
}

# Static Files with WhiteNoise
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'`} />

            {/* Deployment Target Config Switcher */}
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Server size={20} style={{ color: '#0284c7' }} /> Phase 2: Select Deployment Platform &amp; View Configs
            </h3>

            {/* Switcher Buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem' }}>
              {[
                { id: 'paas', label: '☁️ Cloud PaaS (Render / Railway / Heroku)', icon: Cloud },
                { id: 'docker', label: '🐳 Docker & Docker Compose', icon: Package },
                { id: 'vps', label: '🖥️ VPS (Ubuntu + Nginx + Gunicorn)', icon: Server },
              ].map(p => (
                <button key={p.id} onClick={() => setDeployPlatform(p.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: deployPlatform === p.id ? '1.5px solid #0284c7' : '1px solid #cbd5e1',
                    background: deployPlatform === p.id ? '#e0f2fe' : '#f8fafc',
                    color: deployPlatform === p.id ? '#0369a1' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Config Output for Selected Platform */}
            {deployPlatform === 'paas' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InfoBox icon={Cloud} color="#0369a1" bg="#e0f2fe" border="#bae6fd">
                  <strong>PaaS Deployment Flow:</strong> Push your code to GitHub, connect to Render / Railway, set Environment Variables in the platform dashboard, and specify build & start commands!
                </InfoBox>

                <CodeBlock title="requirements.txt — Freeze exact dependencies" code={`djangorestframework>=3.14.0
django>=4.2.0
django-cors-headers>=4.0.0
psycopg2-binary>=2.9.6
gunicorn>=21.2.0
dj-database-url>=2.1.0
whitenoise>=6.5.0
python-dotenv>=1.0.0`} />

                <CodeBlock title="Procfile — Platform Web Process Launcher" code={`web: gunicorn mysite.wsgi:application --bind 0.0.0.0:$PORT --workers 4 --threads 2`} />
                
                <CodeBlock title="Build & Deployment Command Steps" code={`# 1. Build Command on Render / Railway:
pip install -r requirements.txt && python manage.py collectstatic --no-input

# 2. Pre-deploy Command (Runs DB Migrations automatically):
python manage.py migrate`} />
              </div>
            )}

            {deployPlatform === 'docker' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InfoBox icon={Package} color="#15803d" bg="#f0fdf4" border="#bbf7d0">
                  <strong>Docker Container Flow:</strong> Package your DRF application, Python runtime, and Gunicorn into an immutable image for deployment anywhere.
                </InfoBox>

                <CodeBlock title="Dockerfile — DRF Container Spec" code={`FROM python:3.11-slim

# Prevent Python from writing .pyc files & buffer output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy application project code
COPY . /app/

# Collect static files for DRF browsable API
RUN python manage.py collectstatic --no-input

EXPOSE 8000

# Launch Gunicorn server
CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]`} />

                <CodeBlock title="docker-compose.yml — Multi-Container Orchestration (DRF + PostgreSQL)" code={`version: '3.8'

services:
  web:
    build: .
    command: gunicorn mysite.wsgi:application --bind 0.0.0.0:8000
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=your-production-secret-key
      - DEBUG=False
      - DATABASE_URL=postgres://drf_user:drf_password@db:5432/drf_db
      - ALLOWED_HOSTS=localhost,127.0.0.1
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=drf_db
      - POSTGRES_USER=drf_user
      - POSTGRES_PASSWORD=drf_password
    volumes:
      - postgres_data:/var/lib/postgresql/data/

volumes:
  postgres_data:`} />
              </div>
            )}

            {deployPlatform === 'vps' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InfoBox icon={Server} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
                  <strong>VPS Production Flow (Ubuntu + Nginx + Gunicorn):</strong> Run Gunicorn as a background systemd service socket, and configure Nginx as a reverse proxy with SSL certificate termination via Certbot.
                </InfoBox>

                <CodeBlock title="/etc/systemd/system/gunicorn.service" code={`[Unit]
Description=Gunicorn daemon for DRF API
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/var/www/my_drf_project
ExecStart=/var/www/my_drf_project/venv/bin/gunicorn \\
          --access-logfile - \\
          --workers 3 \\
          --bind unix:/run/gunicorn.sock \\
          mysite.wsgi:application

[Install]
WantedBy=multi-user.target`} />

                <CodeBlock title="/etc/nginx/sites-available/drf_api — Nginx Reverse Proxy Config" code={`server {
    listen 80;
    server_name api.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }

    # Serve static assets directly from Nginx
    location /static/ {
        root /var/www/my_drf_project;
    }

    # Proxy all API requests to Gunicorn socket
    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}`} />
              </div>
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Live Endpoint Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. INTERACTIVE DRF TESTER ───────────────────────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="sandbox" eyebrow="Django • Day 12 • Module 06" title="Interactive DRF Endpoint Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Configure HTTP methods and trigger payloads. Watch how routers resolve views, serializers validate input fields, and output data is generated live.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Request Panel */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', minWidth: 0 }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', minWidth: 0 }}>
                
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

      {/* ── 7. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 12 Quiz — Django REST Framework & Deployment">
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

      {/* ── 8. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 12 Coding Exercise &amp; Deployment Prep">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Build &amp; Prepare a RESTful DRF API for Deployment</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Follow these steps to configure your DRF API endpoints and production setup:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Create and activate a virtual environment: <code>python -m venv venv</code>.</li>
                <li>Install Django REST Framework and CORS headers: <code>pip install djangorestframework django-cors-headers gunicorn</code>.</li>
                <li>Open <code>settings.py</code> and add <code>'rest_framework'</code> and <code>'corsheaders'</code> to your <code>INSTALLED_APPS</code> block.</li>
                <li>Verify your project structure matches standard DRF conventions (<code>serializers.py</code>, <code>views.py</code>, <code>urls.py</code>).</li>
                <li>Create an <code>Item</code> model class (representing item name, quantity, description) inside <code>models.py</code>. Run makemigrations and migrate.</li>
                <li>Implement <code>ItemSerializer</code> in <code>serializers.py</code> inheriting from <code>serializers.ModelSerializer</code>.</li>
                <li>Open <code>views.py</code> and implement <code>ItemViewSet</code> inheriting from <code>viewsets.ModelViewSet</code>.</li>
                <li>Set up endpoints in <code>urls.py</code> using <code>DefaultRouter</code> mapped to <code>api/items/</code>.</li>
                <li>Create a <code>Procfile</code> containing <code>web: gunicorn mysite.wsgi:application</code> and freeze dependencies into <code>requirements.txt</code>.</li>
                <li>Boot the development server (<code>python manage.py runserver</code>) and test endpoint responses in the DRF Browsable API.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Deployment Checklist Note:</strong> Never push <code>DEBUG = True</code> or hardcoded <code>SECRET_KEY</code> values to GitHub repositories. Always read configuration variables from environment variables in production deployments.
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
