import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, CheckCircle, FileText, Terminal,
  ArrowRight, ShieldAlert, Shield, Users, Key, Settings, Lock, UserCheck
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

export default function DjangoDay7({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module7', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Roles Sandbox State ── */
  const [users] = useState([
    { id: 1, username: 'alice', is_superuser: true,  is_staff: true,  groups: ['Admin'],   active: true },
    { id: 2, username: 'bob',   is_superuser: false, is_staff: true,  groups: ['Manager'], active: true },
    { id: 3, username: 'carol', is_superuser: false, is_staff: false, groups: ['Viewer'],  active: true },
    { id: 4, username: 'dave',  is_superuser: false, is_staff: false, groups: [],          active: false },
  ]);
  const [simulatedUser, setSimulatedUser] = useState(null);
  const [accessRoute, setAccessRoute] = useState('/admin/');
  const [serverRunning, setServerRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(['Type "python manage.py runserver" to start the roles sandbox...']);
  const [cmdInput, setCmdInput] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;
    let reply = '';
    if (cmd === 'python manage.py runserver') {
      setServerRunning(true);
      reply = 'Starting development server at http://127.0.0.1:8000/\nQuit with CONTROL-C.';
    } else if (cmd === 'python manage.py createsuperuser') {
      reply = 'Username: admin\nEmail: admin@example.com\nPassword: ••••••••\nSuperuser created successfully.';
    } else if (cmd === 'clear') {
      setTerminalLogs([]); setCmdInput(''); return;
    } else {
      reply = `"${cmd}" not recognized.`;
    }
    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  const checkAccess = () => {
    if (!simulatedUser) return { allowed: false, reason: 'Not logged in — redirected to /login/' };
    if (accessRoute === '/admin/') {
      if (simulatedUser.is_staff) return { allowed: true, reason: `${simulatedUser.username} has is_staff=True → Django admin access granted.` };
      return { allowed: false, reason: `${simulatedUser.username} has is_staff=False → access denied (403).` };
    }
    if (accessRoute === '/reports/') {
      if (simulatedUser.groups.includes('Manager') || simulatedUser.is_superuser)
        return { allowed: true, reason: `${simulatedUser.username} is in Manager group or is superuser → access granted.` };
      return { allowed: false, reason: `${simulatedUser.username} is not in Manager group → access denied (403).` };
    }
    if (accessRoute === '/products/') {
      if (simulatedUser.active) return { allowed: true, reason: `${simulatedUser.username} is authenticated → product list accessible.` };
      return { allowed: false, reason: `${simulatedUser.username} account is inactive → access denied.` };
    }
    return { allowed: true, reason: 'Route accessible.' };
  };

  const accessResult = simulatedUser ? checkAccess() : null;

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'What is the difference between is_staff and is_superuser in Django?',
      opts: [
        'They are the same — both grant full access',
        'is_staff allows access to the admin panel; is_superuser grants all permissions without needing to assign them individually',
        'is_superuser is for regular users; is_staff is for Django developers only',
        'is_staff grants database access; is_superuser grants file system access'
      ],
      ans: 1,
      exp: 'is_staff=True allows a user to log in to the Django admin panel. is_superuser=True bypasses all permission checks — the user automatically has every permission without needing to be assigned them explicitly.'
    },
    {
      k: 'q2',
      q: 'Which decorator restricts a view to users who have a specific permission?',
      opts: ['@login_required', '@staff_required', '@permission_required("app.permission_name")', '@role_required'],
      ans: 2,
      exp: '@permission_required("app.permission_name") checks if the logged-in user has the specified permission. If not, they are redirected to the login page or shown a 403 Forbidden response.'
    },
    {
      k: 'q3',
      q: 'How do you check if a user belongs to a specific group in a Django template?',
      opts: [
        '{% if user.group == "Manager" %}',
        '{% if user.groups.filter(name="Manager") %}',
        '{% if "Manager" in user.groups.all %}',
        '{% if user.groups.name|split:"," contains "Manager" %}'
      ],
      ans: 2,
      exp: 'In Django templates, user.groups.all returns the QuerySet of groups the user belongs to. You can use {% if "Manager" in user.groups.all %} or in Python code: user.groups.filter(name="Manager").exists()'
    },
    {
      k: 'q4',
      q: 'What does user.has_perm("inventory.add_product") return for a superuser?',
      opts: [
        'False — superusers bypass the permission system entirely',
        'None — permission must be explicitly granted',
        'True — superusers always have all permissions',
        'It raises a PermissionDenied exception'
      ],
      ans: 2,
      exp: 'For a superuser (is_superuser=True), has_perm() always returns True regardless of whether the permission has been explicitly assigned, because superusers bypass all permission checks.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO USER ROLES ─────────────────────────────────────── */}
      {activeTab === 'intro_roles' && (
        <Section key="intro" eyebrow="Django • Day 7 • Module 01" title="User Roles & Permissions in Django">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🛡️ Authorization: Who Can Do What?</h3>
              <p style={{ color: '#ddd6fe', margin: 0, lineHeight: 1.7 }}>
                After Day 6's <strong style={{ color: 'white' }}>Authentication</strong> (who are you?), Day 7 covers <strong style={{ color: 'white' }}>Authorization</strong> — controlling <em>what</em> authenticated users are allowed to do. Django ships a powerful permissions framework built around three concepts: <strong style={{ color: '#fbbf24' }}>User flags</strong>, <strong style={{ color: '#34d399' }}>Groups</strong>, and <strong style={{ color: '#f87171' }}>Permissions</strong>.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>The Three Layers of Django Authorization</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '🚩', title: 'User Flags', color: '#0284c7', bg: '#f0f9ff', items: ['is_active — account enabled', 'is_staff — can access /admin/', 'is_superuser — full access to everything'] },
                { icon: '👥', title: 'Groups', color: '#7c3aed', bg: '#f5f3ff', items: ['Named collections of permissions', 'Assign group → all permissions inherited', 'Examples: Admin, Manager, Viewer'] },
                { icon: '🔑', title: 'Permissions', color: '#059669', bg: '#f0fdf4', items: ['Auto-created: add, change, delete, view', 'Custom: can_approve, can_export', 'Checked via has_perm("app.codename")'] },
              ].map(({ icon, title, color, bg, items }) => (
                <div key={title} style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontWeight: 800, color, marginBottom: 8, fontSize: '0.9rem' }}>{title}</div>
                  {items.map(i => <div key={i} style={{ fontSize: '0.78rem', color: '#475569', marginBottom: 3 }}>• {i}</div>)}
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>User Flags: is_staff vs is_superuser</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Flag</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>What it controls</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Typical use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['is_active', 'Whether the account can log in at all', 'Disable without deleting the account'],
                  ['is_staff', 'Can access the Django Admin panel (/admin/)', 'Content editors, moderators, support staff'],
                  ['is_superuser', 'Bypasses ALL permission checks — has every perm', 'Developers, site administrators'],
                ].map(([flag, what, use]) => (
                  <tr key={flag} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#7c3aed', fontSize: '0.82rem' }}>{flag}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem' }}>{what}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem', color: '#64748b' }}>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('groups_permissions')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Groups & Permissions <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. GROUPS & PERMISSIONS ─────────────────────────────────── */}
      {activeTab === 'groups_permissions' && (
        <Section key="groups" eyebrow="Django • Day 7 • Module 02" title="Groups & Permissions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django automatically creates four permissions for every model: <code>add_&lt;model&gt;</code>, <code>change_&lt;model&gt;</code>, <code>delete_&lt;model&gt;</code>, and <code>view_&lt;model&gt;</code>. You can also define custom permissions in the model's <code>Meta</code> class.</p>

            <CodeBlock title="inventory/models.py — Custom Permissions" code={`from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    class Meta:
        # Django auto-creates: add_product, change_product, delete_product, view_product
        # Custom permissions:
        permissions = [
            ('can_approve_product', 'Can approve product listings'),
            ('can_export_products', 'Can export product data to CSV'),
        ]`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Creating Groups in Code</h3>
            <CodeBlock title="Creating Groups & Assigning Permissions (Python shell or management command)" code={`from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from inventory.models import Product

# Create groups
admin_group, _   = Group.objects.get_or_create(name='Admin')
manager_group, _ = Group.objects.get_or_create(name='Manager')
viewer_group, _  = Group.objects.get_or_create(name='Viewer')

# Get permissions for the Product model
ct = ContentType.objects.get_for_model(Product)
add_perm    = Permission.objects.get(content_type=ct, codename='add_product')
change_perm = Permission.objects.get(content_type=ct, codename='change_product')
delete_perm = Permission.objects.get(content_type=ct, codename='delete_product')
view_perm   = Permission.objects.get(content_type=ct, codename='view_product')

# Admin gets all permissions
admin_group.permissions.set([add_perm, change_perm, delete_perm, view_perm])

# Manager can add and change (not delete)
manager_group.permissions.set([add_perm, change_perm, view_perm])

# Viewer can only view
viewer_group.permissions.set([view_perm])`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Assigning Users to Groups</h3>
            <CodeBlock title="Assign users to groups" code={`from django.contrib.auth.models import User, Group

user = User.objects.get(username='bob')

# Add to a group
manager_group = Group.objects.get(name='Manager')
user.groups.add(manager_group)

# Remove from a group
user.groups.remove(manager_group)

# Check group membership
user.groups.filter(name='Manager').exists()   # True or False

# Check a specific permission
user.has_perm('inventory.add_product')         # True or False
user.has_perm('inventory.can_approve_product') # True or False`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('permission_required')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: @permission_required <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. PERMISSION_REQUIRED ──────────────────────────────────── */}
      {activeTab === 'permission_required' && (
        <Section key="perm_req" eyebrow="Django • Day 7 • Module 03" title="Restricting Views with @permission_required">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Use <code>@permission_required</code> to guard a view so only users with a specific permission can access it. Without the permission, users are redirected to the login page (or shown a 403 error).</p>

            <CodeBlock title="inventory/views.py — @permission_required examples" code={`from django.contrib.auth.decorators import login_required, permission_required
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect, get_object_or_404
from .models import Product
from .forms import ProductForm

# Any logged-in user can view the list
@login_required
def product_list(request):
    products = Product.objects.all()
    return render(request, 'inventory/product_list.html', {'products': products})

# Only users with add_product permission
@permission_required('inventory.add_product', raise_exception=True)
def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'inventory/add_product.html', {'form': form})

# Only users with delete_product permission
@permission_required('inventory.delete_product', raise_exception=True)
def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('product_list')
    return render(request, 'inventory/confirm_delete.html', {'product': product})

# Only users with a custom permission
@permission_required('inventory.can_approve_product', raise_exception=True)
def approve_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    product.is_approved = True
    product.save()
    return redirect('product_list')`} />

            <InfoBox icon={Key} color="#0369a1" bg="#f0f9ff" border="#bae6fd">
              <strong>raise_exception=True</strong> vs default: By default, <code>@permission_required</code> redirects to the login page. Setting <code>raise_exception=True</code> raises a <code>PermissionDenied</code> exception instead, which renders Django's built-in 403 Forbidden page — better UX for logged-in users who lack permission.
            </InfoBox>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Checking Permissions Manually in Views</h3>
            <CodeBlock title="Manual permission check inside a view" code={`from django.core.exceptions import PermissionDenied

def delete_product(request, pk):
    if not request.user.has_perm('inventory.delete_product'):
        raise PermissionDenied      # Shows 403 Forbidden page
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('product_list')
    return render(request, 'inventory/confirm_delete.html', {'product': product})`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('user_passes_test')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: user_passes_test <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. USER_PASSES_TEST ──────────────────────────────────────── */}
      {activeTab === 'user_passes_test' && (
        <Section key="upt" eyebrow="Django • Day 7 • Module 04" title="Custom Role Checks with user_passes_test">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p><code>user_passes_test</code> lets you write any Python condition to restrict a view — checking group membership, custom flags, or any user attribute:</p>

            <CodeBlock title="inventory/views.py — user_passes_test examples" code={`from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render
from .models import Product

# Helper test functions
def is_manager(user):
    return user.is_authenticated and user.groups.filter(name='Manager').exists()

def is_admin_or_superuser(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)

def is_active_and_verified(user):
    return user.is_authenticated and user.is_active and hasattr(user, 'profile') and user.profile.is_verified

# Apply the test function as a decorator
@user_passes_test(is_manager, login_url='/login/')
def manager_dashboard(request):
    products = Product.objects.all()
    return render(request, 'inventory/manager_dashboard.html', {'products': products})

@user_passes_test(is_admin_or_superuser, login_url='/login/')
def admin_reports(request):
    return render(request, 'inventory/reports.html')`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Comparing the Three Decorators</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Decorator</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Use when…</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Redirects to</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['@login_required', 'Any authenticated user is allowed', 'LOGIN_URL'],
                  ['@permission_required("app.perm")', 'Need a specific model permission', 'LOGIN_URL or 403'],
                  ['@user_passes_test(fn)', 'Need a custom, flexible condition', 'login_url= argument'],
                ].map(([dec, use, redir]) => (
                  <tr key={dec} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#7c3aed', fontWeight: 700 }}>{dec}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.8rem' }}>{use}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#64748b' }}>{redir}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('template_permissions')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Template Permission Checks <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. TEMPLATE PERMISSIONS ──────────────────────────────────── */}
      {activeTab === 'template_permissions' && (
        <Section key="tpl_perms" eyebrow="Django • Day 7 • Module 05" title="Permission Checks in Templates">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django's template engine exposes a <code>perms</code> object that reflects the current user's permissions. Use it to conditionally show or hide UI elements based on role:</p>

            <CodeBlock title="templates/inventory/product_list.html — Role-based UI" language="html" code={`{% extends 'base.html' %}
{% block content %}

<h2>Product List</h2>

{# Only managers/admins see the Add button #}
{% if perms.inventory.add_product %}
  <a href="{% url 'add_product' %}" class="btn btn-primary">+ Add Product</a>
{% endif %}

<table>
  <thead>
    <tr>
      <th>Name</th><th>Price</th><th>Qty</th>
      {% if perms.inventory.change_product or perms.inventory.delete_product %}
      <th>Actions</th>
      {% endif %}
    </tr>
  </thead>
  <tbody>
    {% for product in products %}
    <tr>
      <td>{{ product.name }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.quantity }}</td>

      {% if perms.inventory.change_product or perms.inventory.delete_product %}
      <td>
        {% if perms.inventory.change_product %}
          <a href="{% url 'update_product' product.pk %}">Edit</a>
        {% endif %}
        {% if perms.inventory.delete_product %}
          <a href="{% url 'delete_product' product.pk %}">Delete</a>
        {% endif %}
      </td>
      {% endif %}
    </tr>
    {% endfor %}
  </tbody>
</table>

{# Show different content based on group #}
{% if user.is_superuser %}
  <div class="admin-panel">
    <a href="/admin/">Open Django Admin Panel</a>
  </div>
{% elif "Manager" in user.groups.all|stringformat:"s" %}
  <p>Manager view: You can add and edit products.</p>
{% else %}
  <p>You have read-only access to this page.</p>
{% endif %}

{% endblock %}`} />

            <InfoBox icon={Shield} color="#065f46" bg="#f0fdf4" border="#bbf7d0">
              <strong>Tip:</strong> Template permission checks like <code>{'{{ perms.inventory.add_product }}'}</code> are purely for <strong>UI display</strong>. Always enforce permissions server-side with <code>@permission_required</code> or <code>has_perm()</code> in views — never rely solely on template conditionals for security.
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('admin_roles')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Managing Roles in Admin <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. ADMIN ROLES ──────────────────────────────────────────── */}
      {activeTab === 'admin_roles' && (
        <Section key="admin" eyebrow="Django • Day 7 • Module 06" title="Managing Roles via Django Admin">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The Django admin panel (<code>/admin/</code>) provides a full UI for managing users, groups, and permissions — no code needed for day-to-day role management.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                {
                  title: 'Create a Group via Admin',
                  steps: ['Go to /admin/ → Authentication → Groups', 'Click "Add Group"', 'Enter a name (e.g., Manager)', 'Select permissions from the Available list', 'Click Save'],
                  color: '#0284c7', bg: '#f0f9ff'
                },
                {
                  title: 'Assign User to Group via Admin',
                  steps: ['Go to /admin/ → Authentication → Users', 'Click on the user', 'Scroll to "Groups" section', 'Select the group in the Available list, click →', 'Click Save'],
                  color: '#7c3aed', bg: '#f5f3ff'
                },
              ].map(({ title, steps, color, bg }) => (
                <div key={title} style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontWeight: 800, color, marginBottom: 10, fontSize: '0.88rem' }}>{title}</div>
                  <ol style={{ paddingLeft: '1rem', fontSize: '0.8rem', color: '#475569', margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Customising the Admin Panel for Roles</h3>
            <p>You can restrict which models a staff user sees in the admin by customising <code>ModelAdmin</code>:</p>
            <CodeBlock title="inventory/admin.py — Role-restricted admin" code={`from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity')
    search_fields = ('name',)

    # Only superusers can delete products from admin
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    # Only managers/admins can add products
    def has_add_permission(self, request):
        return request.user.groups.filter(name='Manager').exists() or request.user.is_superuser

    # All staff can view/change
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_roles')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Live Roles Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. INTERACTIVE ROLES SANDBOX ───────────────────────────── */}
      {activeTab === 'interactive_roles' && (
        <Section key="sandbox" eyebrow="Django • Day 7 • Module 07" title="Interactive Roles & Access Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Simulate different user roles and see which routes they can access. Boot the server, select a user, choose a route, and test access.</p>

            {/* Terminal */}
            <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>🖥️ Terminal</div>
              <div style={{ maxHeight: 70, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.74rem' }}>
                {terminalLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('>') ? '#e2e8f0' : '#86efac' }}>{log}</pre>
                ))}
              </div>
              <form onSubmit={handleCommand} style={{ display: 'flex', gap: 6, padding: '6px 12px', borderTop: '1px solid #1e293b' }}>
                <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', alignSelf: 'center' }}>$</span>
                <input type="text" value={cmdInput} onChange={e => setCmdInput(e.target.value)}
                  placeholder="python manage.py runserver"
                  style={{ background: '#1e293b', border: 'none', color: 'white', fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 8px', flexGrow: 1, outline: 'none', borderRadius: 4 }} />
              </form>
            </div>

            {serverRunning && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* User selector */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 10, fontSize: '0.88rem' }}>👤 Select User</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {users.map(u => (
                      <button key={u.id} onClick={() => setSimulatedUser(u)}
                        style={{ padding: '8px 10px', borderRadius: 8, border: simulatedUser?.id === u.id ? '2px solid #7c3aed' : '1px solid #e2e8f0', background: simulatedUser?.id === u.id ? '#f5f3ff' : 'white', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>{u.username}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            {u.groups.length > 0 ? u.groups.join(', ') : 'No group'} {u.is_superuser ? '★ superuser' : ''} {u.is_staff ? '⚙ staff' : ''}
                          </div>
                        </div>
                        {!u.active && <span style={{ fontSize: '0.68rem', background: '#fee2e2', color: '#991b1b', borderRadius: 4, padding: '2px 6px' }}>inactive</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Route selector + result */}
                <div>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 10, fontSize: '0.88rem' }}>🌐 Select Route to Access</div>
                    {[
                      { url: '/admin/', label: 'Django Admin Panel', req: 'Requires is_staff' },
                      { url: '/reports/', label: 'Reports Page', req: 'Requires Manager group' },
                      { url: '/products/', label: 'Product List', req: 'Requires is_active' },
                    ].map(({ url, label, req }) => (
                      <button key={url} onClick={() => setAccessRoute(url)}
                        style={{ width: '100%', marginBottom: 6, padding: '7px 10px', borderRadius: 8, border: accessRoute === url ? '2px solid #0284c7' : '1px solid #e2e8f0', background: accessRoute === url ? '#f0f9ff' : 'white', cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>{label}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{url} — {req}</div>
                      </button>
                    ))}
                  </div>

                  {/* Access result */}
                  {simulatedUser && accessResult && (
                    <div style={{
                      background: accessResult.allowed ? '#f0fdf4' : '#fff1f2',
                      border: `1px solid ${accessResult.allowed ? '#bbf7d0' : '#fecdd3'}`,
                      borderRadius: 12, padding: '1rem'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{accessResult.allowed ? '✅' : '🚫'}</div>
                      <div style={{ fontWeight: 800, color: accessResult.allowed ? '#14532d' : '#9f1239', marginBottom: 4, fontSize: '0.88rem' }}>
                        {accessResult.allowed ? 'Access Granted' : 'Access Denied'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>{accessResult.reason}</div>
                    </div>
                  )}
                  {!simulatedUser && (
                    <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 12, padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem' }}>
                      ← Select a user to test access
                    </div>
                  )}
                </div>
              </div>
            )}

            {!serverRunning && (
              <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                <Terminal size={32} style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '0.88rem' }}>Run <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4, color: '#334155' }}>python manage.py runserver</code> to launch the roles sandbox.</p>
              </div>
            )}

            {/* User permissions summary table */}
            {serverRunning && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: 10, fontSize: '0.9rem' }}>User Roles Summary Table</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                      {['User', 'Group', 'is_staff', 'is_superuser', 'is_active', '/admin/', '/reports/', '/products/'].map(h => (
                        <th key={h} style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 700, color: '#475569' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => {
                      const adminOk = u.is_staff;
                      const reportsOk = u.groups.includes('Manager') || u.is_superuser;
                      const productsOk = u.active;
                      return (
                        <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0', background: simulatedUser?.id === u.id ? '#f5f3ff' : 'white' }}>
                          <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>{u.username}</td>
                          <td style={{ padding: '6px 8px', textAlign: 'center', color: '#7c3aed' }}>{u.groups.join(', ') || '—'}</td>
                          {[u.is_staff, u.is_superuser, u.active].map((val, i) => (
                            <td key={i} style={{ padding: '6px 8px', textAlign: 'center' }}>
                              <span style={{ color: val ? '#10b981' : '#94a3b8', fontWeight: 700 }}>{val ? '✓' : '✗'}</span>
                            </td>
                          ))}
                          {[adminOk, reportsOk, productsOk].map((val, i) => (
                            <td key={i} style={{ padding: '6px 8px', textAlign: 'center' }}>
                              <span style={{ background: val ? '#dcfce7' : '#fee2e2', color: val ? '#14532d' : '#991b1b', borderRadius: 4, padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>
                                {val ? '✓' : '✗'}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 7 Quiz — User Roles & Permissions">
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
                      } else if (selected) { bg = '#f5f3ff'; border = '1.5px solid #7c3aed'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #7c3aed' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#7c3aed', borderColor: '#7c3aed', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 9. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 7 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Add Role-Based Access Control to Your Inventory System</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Extend the inventory project from Days 3–6 with a full permissions system:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Add custom permissions to the <code>Product</code> model's <code>Meta</code> class: <code>can_approve_product</code> and <code>can_export_products</code>. Run <code>python manage.py makemigrations &amp;&amp; python manage.py migrate</code>.</li>
                <li>Create three groups via the Django admin or a management command: <strong>Admin</strong> (all permissions), <strong>Manager</strong> (add, change, view, can_approve), <strong>Viewer</strong> (view only).</li>
                <li>Add <code>@permission_required('inventory.add_product', raise_exception=True)</code> to the <code>add_product</code> view and <code>@permission_required('inventory.delete_product', raise_exception=True)</code> to <code>delete_product</code>.</li>
                <li>Write a <code>is_manager(user)</code> test function and use <code>@user_passes_test</code> to protect a <code>manager_dashboard</code> view (create this view and template).</li>
                <li>Update <code>product_list.html</code> to conditionally show the Add / Edit / Delete buttons using <code>{'{% if perms.inventory.add_product %}'}</code> etc.</li>
                <li>Test the full flow: log in as different users with different groups and verify that buttons appear/disappear and that direct URL access is correctly blocked.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Security Reminder:</strong> Template permission checks (<code>perms.inventory.add_product</code>) only hide UI — they do NOT block server-side access. Always enforce permissions in views with <code>@permission_required</code> or <code>has_perm()</code>.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module8', 'intro_sessions')}>
              Next: Day 8 — Sessions, Cookies &amp; Middleware <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
