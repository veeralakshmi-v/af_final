import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, File, Trash2, Edit, Plus, Eye
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



export default function DjangoDay5({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module5', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── CRUD Live Sandbox State ── */
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.00, quantity: 10 },
    { id: 2, name: 'Keyboard', category: 'Electronics', price: 49.00, quantity: 25 },
    { id: 3, name: 'Python Book', category: 'Books', price: 29.99, quantity: 8 },
  ]);
  const [nextId, setNextId] = useState(4);
  const [previewUrl, setPreviewUrl] = useState('http://127.0.0.1:8000/products/');
  const [serverRunning, setServerRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(['Type "python manage.py runserver" to start the CRUD sandbox...']);
  const [cmdInput, setCmdInput] = useState('');

  // Add form
  const [addForm, setAddForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [addErrors, setAddErrors] = useState({});

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', category: '', price: '', quantity: '' });

  // Delete confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Detail view
  const [detailProduct, setDetailProduct] = useState(null);

  const CATEGORIES = ['Electronics', 'Books', 'Groceries', 'Furniture', 'Clothing'];

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;
    let reply = '';
    if (cmd === 'python manage.py runserver') {
      setServerRunning(true);
      reply = 'Watching for file changes...\nDjango version 4.2, using settings \'inventory.settings\'\nStarting development server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCmdInput('');
      return;
    } else {
      reply = `Command "${cmd}" not recognized. Run "python manage.py runserver".`;
    }
    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  const validateAddForm = () => {
    const errors = {};
    if (!addForm.name.trim()) errors.name = 'Product name is required.';
    if (!addForm.category) errors.category = 'Please select a category.';
    const price = parseFloat(addForm.price);
    if (isNaN(price) || price <= 0) errors.price = 'Price must be a positive number.';
    const qty = parseInt(addForm.quantity);
    if (isNaN(qty) || qty < 1) errors.quantity = 'Quantity must be at least 1.';
    return errors;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = validateAddForm();
    if (Object.keys(errors).length > 0) { setAddErrors(errors); return; }
    setProducts(prev => [...prev, { id: nextId, name: addForm.name, category: addForm.category, price: parseFloat(addForm.price), quantity: parseInt(addForm.quantity) }]);
    setNextId(n => n + 1);
    setAddForm({ name: '', category: '', price: '', quantity: '' });
    setAddErrors({});
    setPreviewUrl('http://127.0.0.1:8000/products/');
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({ name: p.name, category: p.category, price: String(p.price), quantity: String(p.quantity) });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts(prev => prev.map(p => p.id === editingId ? { ...p, name: editForm.name, category: editForm.category, price: parseFloat(editForm.price), quantity: parseInt(editForm.quantity) } : p));
    setEditingId(null);
    setPreviewUrl('http://127.0.0.1:8000/products/');
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    if (detailProduct?.id === id) setDetailProduct(null);
    setPreviewUrl('http://127.0.0.1:8000/products/');
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which Django shortcut raises a 404 error if an object is not found in the database?',
      opts: ['get_or_none()', 'get_object_or_404()', 'filter_or_404()', 'find_or_raise()'],
      ans: 1,
      exp: 'get_object_or_404(Model, pk=pk) attempts Model.objects.get(pk=pk) and raises Http404 if the object does not exist, instead of a 500 error.'
    },
    {
      k: 'q2',
      q: 'In a Django update view using a ModelForm, which method saves changes to an existing record without creating a new one?',
      opts: ['form.save(commit=False)', 'form.update()', 'form.save()', 'Product.objects.update()'],
      ans: 2,
      exp: 'When a ModelForm is initialized with an existing instance (e.g. ProductForm(request.POST, instance=product)), calling form.save() updates that record in-place.'
    },
    {
      k: 'q3',
      q: 'What HTTP method should a delete confirmation form use and what Django protection tag must it include?',
      opts: ['GET with no token', 'POST without CSRF token', 'POST with {% csrf_token %}', 'DELETE with {% csrf_token %}'],
      ans: 2,
      exp: 'Delete actions must use POST (not GET) to prevent unintentional deletions via link clicks, and must include {% csrf_token %} to prevent cross-site request forgery attacks.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO CRUD ──────────────────────────────────────────── */}
      {activeTab === 'intro_crud' && (
        <Section key="intro" eyebrow="Django • Day 5 • Module 01" title="CRUD Operations in Django">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🔁 What is CRUD?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                CRUD stands for <strong>Create, Read, Update, Delete</strong> — the four fundamental database operations every web application performs. Django makes these operations elegant by combining ModelForms, ORM queries, and URL routing into clean view functions.
              </p>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>CRUD Mapping: Operation → View → URL → Template</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', margin: '1rem 0' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Operation</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>View Function</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>URL Pattern</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Template</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Create', 'add_product(request)', 'add-product/', 'add_product.html'],
                  ['Read (List)', 'product_list(request)', 'products/', 'product_list.html'],
                  ['Read (Detail)', 'product_detail(request, pk)', 'products/<pk>/', 'product_detail.html'],
                  ['Update', 'update_product(request, pk)', 'update-product/<pk>/', 'update_product.html'],
                  ['Delete', 'delete_product(request, pk)', 'delete-product/<pk>/', 'confirm_delete.html'],
                ].map(([op, view, url, tpl]) => (
                  <tr key={op} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#7c3aed' }}>{op}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.8rem' }}>{view}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#0284c7' }}>{url}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#059669' }}>{tpl}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('read_views')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Read (List & Detail) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. READ VIEWS ──────────────────────────────────────────── */}
      {activeTab === 'read_views' && (
        <Section key="read" eyebrow="Django • Day 5 • Module 02" title="Read: product_list & product_detail Views">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The Read operation has two variants — listing all records and showing a single record's detail page:</p>
            <CodeBlock title="inventory/views.py — Read Views" code={`from django.shortcuts import render, get_object_or_404
from .models import Product

def product_list(request):
    # Fetch all products from the database
    products = Product.objects.all()
    return render(request, 'inventory/product_list.html', {'products': products})

def product_detail(request, pk):
    # Fetch one product or return 404 if not found
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'inventory/product_detail.html', {'product': product})`} />

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', marginTop: '1.5rem' }}>product_list.html Template</h3>
            <CodeBlock title="templates/inventory/product_list.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<h2>Product List</h2>
<a href="{% url 'add_product' %}">+ Add New Product</a>
<table>
  <thead>
    <tr><th>Name</th><th>Category</th><th>Price</th><th>Qty</th><th>Actions</th></tr>
  </thead>
  <tbody>
    {% for product in products %}
    <tr>
      <td><a href="{% url 'product_detail' product.pk %}">{{ product.name }}</a></td>
      <td>{{ product.category }}</td>
      <td>{{ product.price|floatformat:2 }}</td>
      <td>{{ product.quantity }}</td>
      <td>
        <a href="{% url 'update_product' product.pk %}">Edit</a>
        <a href="{% url 'delete_product' product.pk %}">Delete</a>
      </td>
    </tr>
    {% empty %}
    <tr><td colspan="5">No products found.</td></tr>
    {% endfor %}
  </tbody>
</table>
{% endblock %}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('create_view')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Create View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. CREATE VIEW ──────────────────────────────────────────── */}
      {activeTab === 'create_view' && (
        <Section key="create" eyebrow="Django • Day 5 • Module 03" title="Create: add_product View">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The Create view handles both rendering the empty form (GET) and processing the submitted form data (POST):</p>
            <CodeBlock title="inventory/views.py — Create View" code={`from django.shortcuts import render, redirect
from .forms import ProductForm

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()                  # Creates new Product record in DB
            return redirect('product_list')
    else:
        form = ProductForm()             # Empty form for GET request
    return render(request, 'inventory/add_product.html', {'form': form})`} />

            <CodeBlock title="templates/inventory/add_product.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<h2>Add New Product</h2>
<form method="POST">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit" class="btn btn-primary">Save Product</button>
  <a href="{% url 'product_list' %}">Cancel</a>
</form>
{% endblock %}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('update_view')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Update View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. UPDATE VIEW ──────────────────────────────────────────── */}
      {activeTab === 'update_view' && (
        <Section key="update" eyebrow="Django • Day 5 • Module 04" title="Update: update_product View">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The Update view fetches an existing record by its primary key, pre-populates the form, and saves changes on POST:</p>
            <CodeBlock title="inventory/views.py — Update View" code={`from django.shortcuts import render, redirect, get_object_or_404
from .forms import ProductForm
from .models import Product

def update_product(request, pk):
    # Fetch the existing product or return 404
    product = get_object_or_404(Product, pk=pk)
    
    if request.method == 'POST':
        # Bind POST data WITH the existing instance
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()                  # Updates existing record (no new row created)
            return redirect('product_list')
    else:
        # Pre-populate form with existing product data
        form = ProductForm(instance=product)
    
    return render(request, 'inventory/update_product.html', {'form': form, 'product': product})`} />

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#166534', marginTop: '1rem' }}>
              <CheckCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.82rem' }}>
                <strong>Key Difference:</strong> When <code>instance=product</code> is passed to the ModelForm, calling <code>form.save()</code> <em>updates</em> the existing database row instead of creating a new one.
              </div>
            </div>

            <CodeBlock title="templates/inventory/update_product.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<h2>Update: {{ product.name }}</h2>
<form method="POST">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit" class="btn btn-primary">Update Product</button>
  <a href="{% url 'product_list' %}">Cancel</a>
</form>
{% endblock %}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('delete_view')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Delete View <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. DELETE VIEW ──────────────────────────────────────────── */}
      {activeTab === 'delete_view' && (
        <Section key="delete" eyebrow="Django • Day 5 • Module 05" title="Delete: delete_product View">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>The Delete view shows a confirmation page on GET and performs deletion on POST — never on GET directly to avoid accidental deletes via shared links:</p>
            <CodeBlock title="inventory/views.py — Delete View" code={`from django.shortcuts import render, redirect, get_object_or_404
from .models import Product

def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    
    if request.method == 'POST':
        product.delete()                  # Removes the record from the database
        return redirect('product_list')
    
    # GET: Show a confirmation page before deleting
    return render(request, 'inventory/confirm_delete.html', {'product': product})`} />

            <CodeBlock title="templates/inventory/confirm_delete.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<h2>Delete Product</h2>
<p>Are you sure you want to delete <strong>{{ product.name }}</strong>?</p>
<form method="POST">
  {% csrf_token %}
  <button type="submit" class="btn btn-danger">Yes, Delete</button>
  <a href="{% url 'product_list' %}">Cancel</a>
</form>
{% endblock %}`} />

            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#9f1239', marginTop: '1rem' }}>
              <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.82rem' }}>
                <strong>Security Rule:</strong> Always use <code>method="POST"</code> for delete actions and include <code>{"{% csrf_token %}"}</code>. Never trigger deletions via GET requests — crawlers and browser prefetch can follow GET links.
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('urls_crud')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: URLs Configuration <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. URLS CRUD ──────────────────────────────────────────── */}
      {activeTab === 'urls_crud' && (
        <Section key="urls" eyebrow="Django • Day 5 • Module 06" title="CRUD URL Configuration">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Register all five CRUD routes in <code>urls.py</code>. Note how the detail, update, and delete paths use <code>&lt;int:pk&gt;</code> to capture the primary key from the URL:</p>
            <CodeBlock title="inventory/urls.py" code={`from django.urls import path
from . import views

urlpatterns = [
    # READ: List all products
    path('products/', views.product_list, name='product_list'),
    
    # READ: Single product detail
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    
    # CREATE: Add a new product
    path('add-product/', views.add_product, name='add_product'),
    
    # UPDATE: Edit an existing product
    path('update-product/<int:pk>/', views.update_product, name='update_product'),
    
    # DELETE: Remove a product (shows confirm page first)
    path('delete-product/<int:pk>/', views.delete_product, name='delete_product'),
]`} />

            <p>And include them in the project-level <code>urls.py</code>:</p>
            <CodeBlock title="inventory/urls.py (project level)" code={`from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('invent_app.urls')),
]`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_crud')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
                Next: Live CRUD Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. INTERACTIVE CRUD SANDBOX ────────────────────────────── */}
      {activeTab === 'interactive_crud' && (
        <Section key="sandbox" eyebrow="Django • Day 5 • Module 07" title="Interactive CRUD Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Experience all four CRUD operations live! Type <code>python manage.py runserver</code> to boot the sandbox, then use the browser simulator to create, read, edit and delete products.</p>

            {/* Terminal */}
            <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                🖥️ Terminal
              </div>
              <div style={{ maxHeight: 70, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.74rem', color: '#94a3b8' }}>
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

            {/* Browser Simulator */}
            {serverRunning && (
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden' }}>
                {/* Address bar */}
                <div style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderBottom: '1px solid #cbd5e1' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}></div>
                  <input type="text" value={previewUrl} onChange={e => setPreviewUrl(e.target.value)}
                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#334155', fontWeight: 600, fontSize: '0.8rem' }} />
                </div>

                {/* Viewport */}
                <div style={{ background: '#ffffff', minHeight: 200 }}>
                  {/* ── PRODUCT LIST ── */}
                  {previewUrl === 'http://127.0.0.1:8000/products/' && (
                    <div>
                      <header style={{ background: '#333', color: 'white', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Inventory System</span>
                        <nav style={{ fontSize: '0.75rem', display: 'flex', gap: 12 }}>
                          <span style={{ color: '#60a5fa', cursor: 'pointer' }} onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')}>Products</span>
                          <span style={{ color: '#60a5fa', cursor: 'pointer' }} onClick={() => { setAddForm({ name: '', category: '', price: '', quantity: '' }); setAddErrors({}); setPreviewUrl('http://127.0.0.1:8000/add-product/'); }}>+ Add Product</span>
                        </nav>
                      </header>
                      <div style={{ padding: '12px 16px' }}>
                        <h3 style={{ margin: '0 0 10px', fontSize: '1rem' }}>Product List</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                          <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                              {['ID', 'Name', 'Category', 'Price', 'Qty', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 700, color: '#475569' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {products.length === 0 ? (
                              <tr><td colSpan={6} style={{ padding: 16, textAlign: 'center', color: '#94a3b8' }}>No products found.</td></tr>
                            ) : products.map(p => (
                              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '6px 8px', color: '#64748b' }}>{p.id}</td>
                                <td style={{ padding: '6px 8px' }}>
                                  <span style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={() => { setDetailProduct(p); setPreviewUrl(`http://127.0.0.1:8000/products/${p.id}/`); }}>
                                    {p.name}
                                  </span>
                                </td>
                                <td style={{ padding: '6px 8px' }}>{p.category}</td>
                                <td style={{ padding: '6px 8px' }}>${p.price.toFixed(2)}</td>
                                <td style={{ padding: '6px 8px' }}>{p.quantity}</td>
                                <td style={{ padding: '6px 8px', display: 'flex', gap: 6 }}>
                                  <button onClick={() => { startEdit(p); setPreviewUrl(`http://127.0.0.1:8000/update-product/${p.id}/`); }}
                                    style={{ background: '#0284c7', color: 'white', border: 'none', padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Edit size={11} /> Edit
                                  </button>
                                  <button onClick={() => { setDeleteConfirmId(p.id); setPreviewUrl(`http://127.0.0.1:8000/delete-product/${p.id}/`); }}
                                    style={{ background: '#dc2626', color: 'white', border: 'none', padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Trash2 size={11} /> Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* ── PRODUCT DETAIL ── */}
                  {previewUrl.match(/^http:\/\/127\.0\.0\.1:8000\/products\/\d+\/$/) && detailProduct && (
                    <div>
                      <header style={{ background: '#333', color: 'white', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Inventory System</span>
                        <span style={{ color: '#60a5fa', cursor: 'pointer', fontSize: '0.75rem' }} onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')}>← Back to List</span>
                      </header>
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ margin: '0 0 12px', fontSize: '1rem' }}>Product Detail</h3>
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px', fontSize: '0.82rem' }}>
                          {[['ID', detailProduct.id], ['Name', detailProduct.name], ['Category', detailProduct.category], ['Price', `$${detailProduct.price.toFixed(2)}`], ['Quantity', detailProduct.quantity]].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                              <span style={{ fontWeight: 700, minWidth: 80, color: '#475569' }}>{k}:</span>
                              <span>{v}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                          <button onClick={() => { startEdit(detailProduct); setPreviewUrl(`http://127.0.0.1:8000/update-product/${detailProduct.id}/`); }}
                            style={{ background: '#0284c7', color: 'white', border: 'none', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: '0.78rem' }}>
                            Edit
                          </button>
                          <button onClick={() => { setDeleteConfirmId(detailProduct.id); setPreviewUrl(`http://127.0.0.1:8000/delete-product/${detailProduct.id}/`); }}
                            style={{ background: '#dc2626', color: 'white', border: 'none', padding: '5px 12px', borderRadius: 4, cursor: 'pointer', fontSize: '0.78rem' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── ADD PRODUCT ── */}
                  {previewUrl === 'http://127.0.0.1:8000/add-product/' && (
                    <div>
                      <header style={{ background: '#333', color: 'white', padding: '10px 16px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Add New Product</span>
                      </header>
                      <div style={{ padding: '14px 16px' }}>
                        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, fontSize: '0.78rem' }}>
                          {[
                            { label: 'Product Name', key: 'name', type: 'text', placeholder: 'e.g. Laptop' },
                            { label: 'Price', key: 'price', type: 'number', placeholder: '0.00', step: '0.01' },
                            { label: 'Quantity', key: 'quantity', type: 'number', placeholder: '0' },
                          ].map(({ label, key, type, placeholder, step }) => (
                            <div key={key}>
                              <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>{label}</label>
                              <input type={type} step={step} value={addForm[key]} placeholder={placeholder}
                                onChange={e => setAddForm(p => ({ ...p, [key]: e.target.value }))}
                                style={{ width: '100%', padding: '4px 6px', border: addErrors[key] ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 4 }} />
                              {addErrors[key] && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{addErrors[key]}</span>}
                            </div>
                          ))}
                          <div>
                            <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Category</label>
                            <select value={addForm.category} onChange={e => setAddForm(p => ({ ...p, category: e.target.value }))}
                              style={{ width: '100%', padding: '4px 6px', border: addErrors.category ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 4, background: 'white' }}>
                              <option value="">-- Select --</option>
                              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {addErrors.category && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{addErrors.category}</span>}
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                            <button type="submit" style={{ padding: '5px 14px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}>Save Product</button>
                            <button type="button" onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')}
                              style={{ padding: '5px 14px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* ── UPDATE PRODUCT ── */}
                  {previewUrl.match(/^http:\/\/127\.0\.0\.1:8000\/update-product\/\d+\/$/) && editingId && (
                    <div>
                      <header style={{ background: '#333', color: 'white', padding: '10px 16px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Update Product</span>
                      </header>
                      <div style={{ padding: '14px 16px' }}>
                        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, fontSize: '0.78rem' }}>
                          {[
                            { label: 'Product Name', key: 'name', type: 'text' },
                            { label: 'Price', key: 'price', type: 'number', step: '0.01' },
                            { label: 'Quantity', key: 'quantity', type: 'number' },
                          ].map(({ label, key, type, step }) => (
                            <div key={key}>
                              <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>{label}</label>
                              <input type={type} step={step} value={editForm[key]}
                                onChange={e => setEditForm(p => ({ ...p, [key]: e.target.value }))}
                                style={{ width: '100%', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                            </div>
                          ))}
                          <div>
                            <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Category</label>
                            <select value={editForm.category} onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
                              style={{ width: '100%', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: 4, background: 'white' }}>
                              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                            <button type="submit" style={{ padding: '5px 14px', background: '#0284c7', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}>Update Product</button>
                            <button type="button" onClick={() => { setEditingId(null); setPreviewUrl('http://127.0.0.1:8000/products/'); }}
                              style={{ padding: '5px 14px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* ── DELETE CONFIRM ── */}
                  {previewUrl.match(/^http:\/\/127\.0\.0\.1:8000\/delete-product\/\d+\/$/) && deleteConfirmId && (
                    <div>
                      <header style={{ background: '#333', color: 'white', padding: '10px 16px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Confirm Delete</span>
                      </header>
                      <div style={{ padding: '20px 16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>⚠️</div>
                        <p style={{ fontSize: '0.88rem', color: '#334155', marginBottom: 16 }}>
                          Are you sure you want to delete <strong>{products.find(p => p.id === deleteConfirmId)?.name}</strong>?<br />
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>This action cannot be undone.</span>
                        </p>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                          <button onClick={() => handleDelete(deleteConfirmId)}
                            style={{ padding: '6px 20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}>Yes, Delete</button>
                          <button onClick={() => { setDeleteConfirmId(null); setPreviewUrl('http://127.0.0.1:8000/products/'); }}
                            style={{ padding: '6px 20px', background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!serverRunning && (
              <div style={{ background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 12, padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                <Terminal size={32} style={{ margin: '0 auto 8px' }} />
                <p style={{ margin: 0, fontSize: '0.88rem' }}>Run <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: 4, color: '#334155' }}>python manage.py runserver</code> in the terminal above to launch the CRUD sandbox.</p>
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
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 5 Quiz — CRUD Operations">
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
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
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

      {/* ── 9. ASSIGNMENT ──────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 5 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Build Full CRUD for the Inventory System</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Implement all five CRUD routes for the Product model in your local Django inventory project:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Create <code>product_list</code> and <code>product_detail</code> views using <code>Product.objects.all()</code> and <code>get_object_or_404()</code>.</li>
                <li>Build the <code>add_product</code> view using <code>ProductForm</code> with GET/POST handling and <code>form.save()</code>.</li>
                <li>Create <code>update_product</code> view that passes <code>instance=product</code> to the form to pre-populate fields.</li>
                <li>Implement <code>delete_product</code> view with a GET confirmation page and POST deletion using <code>product.delete()</code>.</li>
                <li>Register all five URL patterns in <code>urls.py</code> using <code>&lt;int:pk&gt;</code> path converters for detail, update, and delete.</li>
                <li>Create all corresponding HTML templates with proper <code>{"{% csrf_token %}"}</code>, <code>{"{% url %}"}</code> tags, and loops.</li>
              </ol>
            </div>

            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#b45309', marginBottom: '1.5rem' }}>
              <ShieldAlert size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.78rem' }}>
                <strong>Remember:</strong> Delete and Create views must use <code>method="POST"</code> with <code>{"{% csrf_token %}"}</code>. Never use GET requests for data-modifying operations!
              </span>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('django_module6', 'intro_auth')}>
              Next: Day 6 — User Authentication <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
