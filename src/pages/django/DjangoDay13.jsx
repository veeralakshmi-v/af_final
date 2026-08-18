import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Lock, UserCheck, Key, Shield, RefreshCw, Layers
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

export default function DjangoDay13({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module13', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Mock Dataset & Sandbox states ── */
  const mockDataset = [
    { id: 1, name: 'Workstation Laptop', quantity: 12, category: 'Hardware' },
    { id: 2, name: 'Mechanical Keyboard', quantity: 45, category: 'Accessories' },
    { id: 3, name: 'Wireless Mouse', quantity: 30, category: 'Accessories' },
    { id: 4, name: '4K UltraWide Monitor', quantity: 8, category: 'Hardware' },
    { id: 5, name: 'Ergonomic Desk', quantity: 15, category: 'Furniture' },
    { id: 6, name: 'Office Swivel Chair', quantity: 22, category: 'Furniture' },
    { id: 7, name: 'Noise Cancelling Headphones', quantity: 18, category: 'Accessories' },
    { id: 8, name: 'USB-C Charging Dock', quantity: 50, category: 'Hardware' }
  ];

  const [authRole, setAuthRole] = useState('ANONYMOUS'); // 'ANONYMOUS', 'USER_TOKEN', 'ADMIN_JWT'
  const [permissionRule, setPermissionRule] = useState('IsAuthenticated'); // 'AllowAny', 'IsAuthenticated', 'IsAdminUser'
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [responseStatus, setResponseStatus] = useState('200 OK');
  const [responseBody, setResponseBody] = useState('');
  const [authHeaderLog, setAuthHeaderLog] = useState('None');
  const [evalLogs, setEvalLogs] = useState(['Click "Send Secure Request" to test DRF security flow.']);
  const [currentEvalStep, setCurrentEvalStep] = useState(-1);

  const triggerSecureRequest = async (actionType = 'GET') => {
    setCurrentEvalStep(0);
    let logs = [`[Request Router] Dispatching ${actionType} request to "/api/items/"`];
    
    // Set mock header visualization
    let authHeader = 'None';
    if (authRole === 'USER_TOKEN') {
      authHeader = 'Token 9944a2b91120ac9a3';
    } else if (authRole === 'ADMIN_JWT') {
      authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    }
    setAuthHeaderLog(authHeader);
    logs.push(`[Headers] HTTP Authorization: ${authHeader}`);
    setEvalLogs([...logs]);

    // 1. Authenticate check
    await new Promise(r => setTimeout(r, 250));
    setCurrentEvalStep(1);
    let userObj = { is_authenticated: false, is_staff: false, name: 'AnonymousUser' };
    
    if (authRole === 'USER_TOKEN') {
      userObj = { is_authenticated: true, is_staff: false, name: 'John Doe' };
      logs.push(`[Authentication] Token authenticated. User matches "${userObj.name}".`);
    } else if (authRole === 'ADMIN_JWT') {
      userObj = { is_authenticated: true, is_staff: true, name: 'Admin Manager' };
      logs.push(`[Authentication] JWT Signature verified. User matches "${userObj.name}" (Staff/Admin).`);
    } else {
      logs.push('[Authentication] No credentials parsed. Assigning user to AnonymousUser.');
    }
    setEvalLogs([...logs]);

    // 2. Permission check
    await new Promise(r => setTimeout(r, 250));
    setCurrentEvalStep(2);
    let permissionPassed = false;

    if (permissionRule === 'AllowAny') {
      permissionPassed = true;
      logs.push(`[Permissions] Rule: AllowAny. Verification check passed.`);
    } else if (permissionRule === 'IsAuthenticated') {
      if (userObj.is_authenticated) {
        permissionPassed = true;
        logs.push(`[Permissions] Rule: IsAuthenticated. Checked request.user.is_authenticated = True. Verification passed.`);
      } else {
        logs.push(`[Permissions] Denied: IsAuthenticated requires credentials.`);
      }
    } else if (permissionRule === 'IsAdminUser') {
      if (userObj.is_authenticated && userObj.is_staff) {
        permissionPassed = true;
        logs.push(`[Permissions] Rule: IsAdminUser. Checked request.user.is_staff = True. Verification passed.`);
      } else {
        logs.push(`[Permissions] Denied: IsAdminUser requires user.is_staff = True.`);
      }
    }
    setEvalLogs([...logs]);

    if (!permissionPassed) {
      if (!userObj.is_authenticated) {
        setResponseStatus('401 Unauthorized');
        setResponseBody(JSON.stringify({ detail: "Authentication credentials were not provided." }, null, 2));
        logs.push(`[Response Handler] View execution halted. Returned 401 Unauthorized.`);
      } else {
        setResponseStatus('403 Forbidden');
        setResponseBody(JSON.stringify({ detail: "You do not have permission to perform this action." }, null, 2));
        logs.push(`[Response Handler] View execution halted. Returned 403 Forbidden.`);
      }
      setCurrentEvalStep(4);
      setEvalLogs([...logs]);
      return;
    }

    // 3. View Exec & Pagination slicing
    await new Promise(r => setTimeout(r, 250));
    setCurrentEvalStep(3);
    
    if (actionType === 'POST') {
      setResponseStatus('201 Created');
      const mockNewItem = { id: 99, name: 'Demo Created Item', quantity: 5, category: 'Hardware' };
      setResponseBody(JSON.stringify(mockNewItem, null, 2));
      logs.push(`[View Exec] Write permitted. Created item dummy record.`);
    } else {
      // GET method - slice database records to simulate PageNumberPagination
      const totalCount = mockDataset.length;
      const totalPages = Math.ceil(totalCount / pageSize);
      
      // Bounds checking
      const activePage = Math.min(currentPage, totalPages);
      const startIndex = (activePage - 1) * pageSize;
      const slicedItems = mockDataset.slice(startIndex, startIndex + pageSize);

      const nextUrl = activePage < totalPages ? `http://localhost:8000/api/items/?page=${activePage + 1}` : null;
      const prevUrl = activePage > 1 ? `http://localhost:8000/api/items/?page=${activePage - 1}` : null;

      const paginatedOutput = {
        count: totalCount,
        next: nextUrl,
        previous: prevUrl,
        results: slicedItems
      };

      setResponseStatus('200 OK');
      setResponseBody(JSON.stringify(paginatedOutput, null, 2));
      logs.push(`[Pagination] Total database records: ${totalCount}. Page size: ${pageSize}. Sliced offsets [${startIndex} : ${startIndex + pageSize}].`);
    }
    setEvalLogs([...logs]);

    // 4. Return Output Response
    await new Promise(r => setTimeout(r, 250));
    setCurrentEvalStep(4);
    logs.push(`[Response Handler] JSON output generated. HTTP request cycle finished.`);
    setEvalLogs([...logs]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which permission class lets visitors view listing data freely but requires user login to create/edit records?',
      opts: ['IsAuthenticated', 'IsAdminUser', 'IsAuthenticatedOrReadOnly', 'DjangoModelPermissions'],
      ans: 2,
      exp: 'IsAuthenticatedOrReadOnly grants read access (GET, HEAD, OPTIONS) to anyone, but blocks write calls (POST, PUT, DELETE) unless the user is logged in.'
    },
    {
      k: 'q2',
      q: 'How does a client send a token header using standard TokenAuthentication in DRF?',
      opts: [
        'Authorization: Token <token_hash>',
        'Authorization: Bearer <token_hash>',
        'Cookie: session_token=<token_hash>',
        'X-Django-Token: <token_hash>'
      ],
      ans: 0,
      exp: 'TokenAuthentication expects the keyword "Token" followed by the token hash separated by a space: Authorization: Token 9944a2b911...'
    },
    {
      k: 'q3',
      q: 'Which library is recommended for configuring stateless JWT tokens inside DRF?',
      opts: ['djangorestframework-simplejwt', 'django-oauth-toolkit', 'rest_framework.authtoken', 'django-jwt-creator'],
      ans: 0,
      exp: 'djangorestframework-simplejwt is the industry-standard package for integrating JSON Web Tokens (JWT) into Django REST Framework APIs.'
    },
    {
      k: 'q4',
      q: 'Which setting establishes the default page size for database query lists globally?',
      opts: ['PAGE_SIZE', 'DEFAULT_PAGE_COUNT', 'PAGINATION_LIMIT', 'MAX_OBJECTS_PER_PAGE'],
      ans: 0,
      exp: 'The PAGE_SIZE dictionary key inside REST_FRAMEWORK determines the default pagination slice size globally.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO SECURITY & PAGINATION ──────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 13 • Module 01" title="API Authentication, Permissions &amp; Pagination">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0369a1,#3b82f6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔒 Securing and Scaling Django REST APIs</h3>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7 }}>
                Once your API is functional, you must secure it. This module covers **Authentication** (identifying the user), **Permissions** (authorizing access to specific views), and **Pagination** (breaking large querysets into paginated chunks to avoid server performance degradation).
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Understanding the Security Pipeline</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ color: '#0ea5e9', fontWeight: 800, marginTop: 0, fontSize: '0.9rem' }}>🔑 1. Authentication</h4>
                <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0 }}>
                  Decodes request headers (Token, Bearer JWT, Session) to resolve credentials and populate <code>request.user</code> object.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ color: '#3b82f6', fontWeight: 800, marginTop: 0, fontSize: '0.9rem' }}>🛡️ 2. Permissions</h4>
                <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0 }}>
                  Evaluates if authenticated user has authorization rights (IsAuthenticated, IsAdminUser, etc.) to access the matched endpoint.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ color: '#10b981', fontWeight: 800, marginTop: 0, fontSize: '0.9rem' }}>📄 3. Pagination</h4>
                <p style={{ fontSize: '0.76rem', color: '#475569', margin: 0 }}>
                  Applies database slice offsets dynamically to list endpoints, returning structured metadata (count, next, previous) alongside query items.
                </p>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0369a1', borderColor: '#0369a1' }}>
                Next: Authentication Methods <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. AUTHENTICATION METHODS ─────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="auth_methods" eyebrow="Django • Day 13 • Module 02" title="API Authentication Paradigms">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django REST Framework supports multiple built-in and external authentication middleware configurations:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: '🪙 TokenAuthentication (Built-In)', desc: 'Users authenticate once with password to receive a database-persisted token. Clients send "Authorization: Token <hash>" in headers. Simple and secure but requires database lookups for every request.' },
                { title: '🔒 JWT Authentication (Stateless)', desc: 'JSON Web Tokens represent self-contained payloads signed by the server key. Features access and refresh tokens. Exposes zero database lookup overhead since tokens contain credentials inside signature.' },
                { title: '🖥️ SessionAuthentication', desc: 'Uses traditional browser session cookies. Great for AJAX controllers on the same domain, using Django login forms.' },
                { title: '🔑 OAuth2 Token Authentication', desc: 'Allows granular permissions and logging in with external platforms (Google, Facebook). Implemented via "django-oauth-toolkit".' }
              ].map(({ title, desc }) => (
                <div key={title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px' }}>
                  <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.85rem' }}>{title}</div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#475569' }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#0369a1', borderColor: '#0369a1' }}>
                Next: Configuring Simple JWT &amp; Tokens <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. PROJECT SETUP & CONFIG ──────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="project_setup" eyebrow="Django • Day 13 • Module 03" title="Simple JWT Setup &amp; Global Permissions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Follow this settings structure to configure Token and JWT authentication inside your Django application:</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Register packages in settings.py</h3>
            <CodeBlock title="mysite/settings.py" code={`INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'rest_framework.authtoken',     # Enable Built-in Token Auth
    'rest_framework_simplejwt',     # Enable Stateless Simple JWT
    'inventory',
]`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Configure Global REST Framework dictionaries</h3>
            <CodeBlock title="mysite/settings.py" code={`from datetime import timedelta

REST_FRAMEWORK = {
    # Set default global checks: Require authentication by default
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    # Set supported request parsers
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}

# Optional configurations to modify JWT Token lifespan limits:
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Wire Up Token Endpoints in URL routing</h3>
            <CodeBlock title="mysite/urls.py" code={`from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Obtain access and refresh token pair using username & password
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Refresh token endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('middleware_intro')} style={{ background: '#0369a1', borderColor: '#0369a1' }}>
                Next: Permissions &amp; Pagination <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. PERMISSIONS & PAGINATION ─────────────────────────────── */}
      {activeTab === 'middleware_intro' && (
        <Section key="perms_page" eyebrow="Django • Day 13 • Module 04" title="Permissions and Pagination View Configs">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>You can override global configurations by declaring attributes directly on specific ViewSets:</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>1. Local Permissions declaration</h3>
            <CodeBlock title="inventory/views.py" code={`from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    # Overrides global settings to allow public GET listing,
    # but requires logged in user for POST/PUT/DELETE
    permission_classes = [IsAuthenticatedOrReadOnly]`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Custom Pagination Classes</h3>
            <CodeBlock title="inventory/pagination.py" code={`from rest_framework.pagination import PageNumberPagination

class InventoryStandardPagination(PageNumberPagination):
    page_size = 5               # Items per page
    page_size_query_param = 'limit' # Let clients adjust page size (e.g. ?limit=20)
    max_page_size = 100         # Hard ceiling limit

# Apply it in views.py:
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = InventoryStandardPagination`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_sessions')} style={{ background: '#0369a1', borderColor: '#0369a1' }}>
                Next: Live Security Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. INTERACTIVE SECURITY SANDBOX ─────────────────────────── */}
      {activeTab === 'interactive_sessions' && (
        <Section key="sandbox" eyebrow="Django • Day 13 • Module 05" title="Interactive Security &amp; Pagination Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Configure auth credentials and permission classes, then send requests to witness how pagination limits output pages.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* Controls Form */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>⚡ API Request Config</h4>
                
                {/* Auth Method */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: 4 }}>🔑 Authentication Header</label>
                  <select value={authRole} onChange={e => setAuthRole(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                    <option value="ANONYMOUS">Guest / Anonymous (No Token)</option>
                    <option value="USER_TOKEN">Token Authentication (User: John Doe)</option>
                    <option value="ADMIN_JWT">JWT Bearer Token (Staff: Admin Manager)</option>
                  </select>
                </div>

                {/* ViewSet Permission class */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: 4 }}>🛡️ ViewSet Permission Class</label>
                  <select value={permissionRule} onChange={e => setPermissionRule(e.target.value)}
                    style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                    <option value="AllowAny">AllowAny</option>
                    <option value="IsAuthenticated">IsAuthenticated</option>
                    <option value="IsAdminUser">IsAdminUser</option>
                  </select>
                </div>

                {/* Pagination size */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: 4 }}>📄 Page Size limit</label>
                    <select value={pageSize} onChange={e => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); }}
                      style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                      <option value="2">2 items per page</option>
                      <option value="3">3 items per page</option>
                      <option value="4">4 items per page</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: 4 }}>🧭 Active Page</label>
                    <input type="number" min="1" max="4" value={currentPage} onChange={e => setCurrentPage(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  </div>
                </div>

                {/* Submit actions */}
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <button onClick={() => triggerSecureRequest('GET')}
                    style={{ flexGrow: 2, padding: '10px', background: '#0369a1', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
                    GET /api/items/
                  </button>
                  <button onClick={() => triggerSecureRequest('POST')}
                    style={{ flexGrow: 1, padding: '10px', background: '#0e7490', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
                    POST (Add Item)
                  </button>
                </div>
              </div>

              {/* Execution Visualizer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                
                {/* Security stack steps */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: 8 }}>
                    <strong>🔒 Security &amp; Paginate Stack</strong>
                    <span style={{ color: '#64748b' }}>Auth Header: <code style={{ color: '#0369a1' }}>{authHeaderLog.split(' ')[0]}</code></span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {['1. Read Authorization Header', '2. Authenticate User Credentials', '3. Verify View Permissions', '4. Fetch & Paginate queryset', '5. Generate JSON Response'].map((step, idx) => {
                      const isActive = currentEvalStep === idx;
                      const isPassed = currentEvalStep > idx;
                      let bg = '#f1f5f9', border = '1px solid #e2e8f0', color = '#94a3b8';
                      if (isActive) {
                        bg = '#e0f2fe'; border = '1.5px solid #0369a1'; color = '#0369a1';
                      } else if (isPassed) {
                        bg = '#f0fdf4'; border = '1.5px solid #10b981'; color = '#15803d';
                      }
                      return (
                        <div key={step} style={{ background: bg, border, borderRadius: 6, padding: '4px 8px', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color }}>{step}</span>
                          {isPassed && <span style={{ color: '#10b981', fontWeight: 700 }}>✓ done</span>}
                          {isActive && <span style={{ color: '#0369a1', fontWeight: 700 }} className="animate-pulse">processing...</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* HTTP JSON Response */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📥 JSON API Output Box</span>
                    <strong style={{ color: responseStatus.startsWith('2') ? '#10b981' : '#f87171' }}>{responseStatus}</strong>
                  </div>
                  <pre style={{ margin: 0, padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.7rem', color: '#86efac', overflow: 'auto', maxHeight: 110, whiteSpace: 'pre-wrap' }}>
                    {responseBody || '{\n  "message": "Click a request action button to evaluate."\n}'}
                  </pre>
                </div>

              </div>

            </div>

            {/* Pipeline logs console */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>⌨️ Sandbox Execution Logs</div>
              <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {evalLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Request') ? '#f59e0b' : log.includes('Denied') ? '#f87171' : log.includes('passed') || log.includes('Passed') ? '#34d399' : '#94a3b8' }}>{log}</pre>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0369a1', borderColor: '#0369a1' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 13 Quiz — Authentication &amp; Permissions">
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
                      } else if (selected) { bg = '#e0f2fe'; border = '1.5px solid #0369a1'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0369a1' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0369a1', borderColor: '#0369a1', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0369a1', borderColor: '#0369a1' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 13 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Secure Your ViewSets &amp; Configure Pagination</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Apply authentication guards and pagination limits to your Django project API:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Install simple-jwt library: run <code>pip install djangorestframework-simplejwt</code>.</li>
                <li>Add <code>'rest_framework.authtoken'</code> and <code>'rest_framework_simplejwt'</code> inside your settings <code>INSTALLED_APPS</code>.</li>
                <li>Configure the default global authentication classes inside <code>REST_FRAMEWORK</code> settings, mapping <code>rest_framework_simplejwt.authentication.JWTAuthentication</code>.</li>
                <li>Setup global pagination settings: map <code>DEFAULT_PAGINATION_CLASS</code> to <code>rest_framework.pagination.PageNumberPagination</code> and set <code>PAGE_SIZE = 10</code>.</li>
                <li>Create custom token routes: import <code>TokenObtainPairView</code> and <code>TokenRefreshView</code> inside <code>urls.py</code>, registering paths for <code>api/token/</code> and <code>api/token/refresh/</code>.</li>
                <li>Open <code>views.py</code> and add permission filters to your product viewsets: <code>permission_classes = [IsAuthenticatedOrReadOnly]</code>.</li>
                <li>Use an API test client (like Postman or curl) to fetch products. Check if pagination output format with <code>count</code> and <code>results</code> lists is rendered correctly.</li>
                <li>Send a POST request anonymously to verify that it returns a <code>401 Unauthorized</code> response, then login to obtain a JWT token, and verify that sending a Bearer token resolves the request successfully.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Security Recommendation:</strong> Always enforce Token/JWT authentication globally in production. Only disable it locally by setting <code>permission_classes = [AllowAny]</code> on explicit public endpoints (like login or registry pages).
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#0369a1', borderColor: '#0369a1', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module14', 'intro_sessions')}>
              Next: Day 14 — Capstone Analytics Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
