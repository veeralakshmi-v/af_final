import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText, File,
  Play, ArrowRight, ShieldAlert, ZoomIn
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

export default function DjangoDay3({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module3', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Django Database States (Mock) ── */
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', categoryId: 1, price: 999.00, quantity: 10 },
    { id: 2, name: 'Keyboard', categoryId: 1, price: 49.00, quantity: 5 },
    { id: 3, name: 'Mouse', categoryId: 1, price: 19.00, quantity: 20 }
  ]);

  /* ── Interactive Workspace states ── */
  const [activeFile, setActiveFile] = useState('models');
  const [migrationsCreated, setMigrationsCreated] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const [superuserCreated, setSuperuserCreated] = useState(false);
  const [superuserCreds, setSuperuserCreds] = useState({ username: '', password: '' });
  const [superuserForm, setSuperuserForm] = useState({ step: 0, tempUsername: '', tempPassword: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({ username: '', password: '' });

  const [serverRunning, setServerRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(['Type commands to manage database: makemigrations, migrate, createsuperuser, runserver']);
  const [cmdInput, setCmdInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('http://127.0.0.1:8000/products/');

  // Editable Code Files
  const [modelsCode, setModelsCode] = useState(`from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.name} - {self.quantity} units"`);

  const [viewsCode, setViewsCode] = useState(`from django.shortcuts import render, redirect
from .models import Product, Category

def product_list(request):
    products = Product.objects.all()
    return render(request, 'inventory/product_list.html', {'products': products})

def add_product(request):
    if request.method == 'POST':
        name = request.POST['name']
        category = Category.objects.get(id=request.POST['category'])
        price = request.POST['price']
        quantity = request.POST['quantity']
        
        Product.objects.create(
            name=name, category=category, price=price, quantity=quantity
        )
        return redirect('product_list')
        
    categories = Category.objects.all()
    return render(request, 'inventory/add_product.html', {'categories': categories})`);

  const [adminCode, setAdminCode] = useState(`from django.contrib import admin
from .models import Product, Category

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    search_fields = ('name',)`
  );

  const [baseHtml, setBaseHtml] = useState(`{% include 'inventory/header.html' %}
<main style="padding: 20px; max-width: 800px; margin: 0 auto; background: white; min-height: 300px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 6px; margin-top: 15px; margin-bottom: 15px;">
    {% block content %}{% endblock %}
</main>`);

  const [headerHtml, setHeaderHtml] = useState(`<header style="background: #333; color: white; padding: 15px; text-align: center;">
    <h1 style="margin: 0; font-size: 1.25rem;">Inventory Management System</h1>
    <nav style="margin-top: 6px; font-size: 0.8rem;">
        <a href="/products/" style="color: #60a5fa; text-decoration: underline; margin-right: 12px;">Products</a>
        <a href="/add-product/" style="color: #60a5fa; text-decoration: underline;">Add Product</a>
    </nav>
</header>`);

  const [productListHtml, setProductListHtml] = useState(`{% extends 'base.html' %}

{% block content %}
  <h2>Product List</h2>
  <ul>
    {% for product in products %}
      <li>
        {{ product.name|upper }} - {{ product.quantity }} units
        ({{ product.price|floatformat:2 }} USD)
      </li>
    {% endfor %}
  </ul>
  <a href="{% url 'add_product' %}">Add New Product</a>
{% endblock %}`);

  const [addProductHtml, setAddProductHtml] = useState(`{% extends 'base.html' %}

{% block content %}
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-center mb-4">Add New Product</h2>
      <form method="POST" class="border p-4 rounded shadow-sm bg-light">
        {% csrf_token %}
        
        <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="name" name="name" required>
        </div>
        
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select class="form-select" id="category" name="category" required>
            <option value="">Select Category</option>
            {% for category in categories %}
              <option value="{{ category.id }}">{{ category.name }}</option>
            {% endfor %}
          </select>
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" step="0.01" class="form-control" id="price" name="price" required>
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input type="number" class="form-control" id="quantity" name="quantity" required>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}`);

  const [formInput, setFormInput] = useState({ name: '', category: '', price: '', quantity: '' });

  // Parsing helper to show changes in headerHtml in preview
  const parseHeaderStyle = () => {
    try {
      const match = headerHtml.match(/<header\s+style="([^"]*)"/i);
      if (!match) return {};
      const styleStr = match[1];
      const styles = {};
      styleStr.split(';').forEach(s => {
        const parts = s.split(':');
        if (parts.length === 2) {
          const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          styles[key] = parts[1].trim();
        }
      });
      return styles;
    } catch (e) {
      return {};
    }
  };

  const parseHeaderTitle = () => {
    try {
      const match = headerHtml.match(/<h1[^>]*>([^<]*)<\/h1>/i);
      return match ? match[1].trim() : 'Inventory Management System';
    } catch (e) {
      return 'Inventory Management System';
    }
  };

  // Parsing helper to show changes in baseHtml in preview
  const parseMainStyle = () => {
    try {
      const match = baseHtml.match(/<main\s+style="([^"]*)"/i);
      if (!match) return {};
      const styleStr = match[1];
      const styles = {};
      styleStr.split(';').forEach(s => {
        const parts = s.split(':');
        if (parts.length === 2) {
          const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          styles[key] = parts[1].trim();
        }
      });
      return styles;
    } catch (e) {
      return {};
    }
  };

  // Parsing helper to show changes in productListHtml in preview
  const parseProductListRender = () => {
    try {
      const nameUpper = productListHtml.includes('product.name|upper');
      const priceFormatMatch = productListHtml.match(/product\.price\|floatformat:(\d+)/);
      const decimalPlaces = priceFormatMatch ? parseInt(priceFormatMatch[1]) : 2;

      const listTitleMatch = productListHtml.match(/<h2[^>]*>([^<]*)<\/h2>/i) || productListHtml.match(/<h3[^>]*>([^<]*)<\/h3>/i);
      const listTitle = listTitleMatch ? listTitleMatch[1].trim() : 'Product List';

      return { nameUpper, decimalPlaces, listTitle };
    } catch (e) {
      return { nameUpper: true, decimalPlaces: 2, listTitle: 'Product List' };
    }
  };

  // Parsing helper to show changes in addProductHtml in preview
  const parseAddProductRender = () => {
    try {
      const titleMatch = addProductHtml.match(/<h2[^>]*>([^<]*)<\/h2>/i) || addProductHtml.match(/<h3[^>]*>([^<]*)<\/h3>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'Add New Product';
      return { title };
    } catch (e) {
      return { title: 'Add New Product' };
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    let reply = '';
    
    // Check createsuperuser steps
    if (superuserForm.step > 0) {
      if (superuserForm.step === 1) {
        setSuperuserForm(p => ({ ...p, step: 2, tempUsername: cmd }));
        reply = 'Email address: ';
      } else if (superuserForm.step === 2) {
        setSuperuserForm(p => ({ ...p, step: 3 }));
        reply = 'Password: (invisible in real terminal)';
      } else if (superuserForm.step === 3) {
        setSuperuserForm({ step: 0, tempUsername: '', tempPassword: '' });
        setSuperuserCreated(true);
        setSuperuserCreds({ username: superuserForm.tempUsername, password: cmd });
        reply = 'Superuser created successfully.';
      }
      setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
      setCmdInput('');
      return;
    }

    if (cmd === 'python manage.py makemigrations') {
      setMigrationsCreated(true);
      reply = 'Migrations for \'invent_app\':\n  invent_app/migrations/0001_initial.py\n    - Create model Category\n    - Create model Product';
    } else if (cmd === 'python manage.py migrate') {
      if (!migrationsCreated) {
        reply = 'No migrations to apply.';
      } else {
        setMigrated(true);
        reply = 'Operations to perform:\n  Apply all migrations: admin, auth, contenttypes, sessions, invent_app\nRunning migrations:\n  Applying invent_app.0001_initial... OK';
      }
    } else if (cmd === 'python manage.py createsuperuser') {
      if (!migrated) {
        reply = 'Error: Run "python manage.py migrate" first to build database tables.';
      } else {
        setSuperuserForm({ step: 1, tempUsername: '', tempPassword: '' });
        reply = 'Username (leave blank to use \'admin\'): ';
      }
    } else if (cmd === 'python manage.py runserver') {
      if (!migrated) {
        reply = 'Error: Database schema has not been configured. Run migrate commands first.';
      } else {
        setServerRunning(true);
        reply = 'Watching for file changes...\nSystem check identified no issues.\nStarting development server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.';
      }
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCmdInput('');
      return;
    } else {
      reply = `Command "${cmd}" not recognized. Try: makemigrations, migrate, createsuperuser, runserver.`;
    }

    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!formInput.name || !formInput.category || !formInput.price || !formInput.quantity) {
      alert('Please fill out all fields.');
      return;
    }

    const newProd = {
      id: products.length + 1,
      name: formInput.name,
      categoryId: parseInt(formInput.category),
      price: parseFloat(formInput.price),
      quantity: parseInt(formInput.quantity)
    };

    setProducts(prev => [...prev, newProd]);
    setFormInput({ name: '', category: '', price: '', quantity: '' });
    setPreviewUrl('http://127.0.0.1:8000/products/');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (superuserCreated && adminLoginForm.username === superuserCreds.username && adminLoginForm.password === superuserCreds.password) {
      setIsAdminLoggedIn(true);
    } else {
      alert('Invalid superuser credentials! Create a superuser in the terminal first.');
    }
  };

  /* ── Quiz States ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'Which Django command builds the schema design mapping file for database creations?',
      opts: [
        'python manage.py migrate',
        'python manage.py makemigrations',
        'python manage.py runserver',
        'python manage.py createsuperuser'
      ], ans: 1,
      exp: 'makemigrations inspects models.py and creates Python code files representing table transformations. migrate executes them.' },
    { k: 'q2', q: 'In models.py, how do you specify a key link relating a product to a unique category list entry?',
      opts: ['models.ManyToManyField(Category)', 'models.ForeignKey(Category, on_delete=models.CASCADE)', 'models.OneToOneField(Category)', 'models.CharField()'], ans: 1,
      exp: 'models.ForeignKey establishes a many-to-one relationship, where each product is linked to a single Category entry.' },
    { k: 'q3', q: 'Which tag prevents Cross-Site Request Forgery vulnerabilities in Django POST forms?',
      opts: ['{% load csrf %}', '{{ csrf_protection }}', '{% csrf_token %}', '{% protect_form %}'], ans: 2,
      exp: '{% csrf_token %} generates a secure token verifying form submit origins to block security threats.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. INTRODUCTION ─────────────────────────────────────────────── */}
      {activeTab === 'intro_models' && (
        <Section key="intro" eyebrow="Django • Day 3 • Module 01" title="Django ORM & Models Intro">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#ca8a04,#a16207)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🗃️ What is an Object-Relational Mapper (ORM)?</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                An **ORM** serves as a bridge between the object-oriented logic of Python and relational SQL databases. Instead of writing manual, complex SQL strings like <code>SELECT * FROM app_product INNER JOIN app_category...</code>, you interact with database tables as Python class objects. Django's ORM parses these Python operations on-the-fly into highly optimized SQL commands specific to your chosen database engine (SQLite, PostgreSQL, MySQL, etc.).
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>The Power of the Django ORM</h3>
            <ul>
              <li><strong>Database Independence</strong>: Write Python queries once, and easily swap out SQLite for PostgreSQL or MySQL without modifying any business logic.</li>
              <li><strong>Security (SQL Injection Protection)</strong>: Django automatically parameterizes all SQL statements under the hood, completely shielding your application from common injection attacks.</li>
              <li><strong>Rich Lifecycle Hooks</strong>: Intercept creation, modification, or deletion operations via signals or custom save overrides to trigger background automation.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Core Operations (Python vs SQL)</h3>
            <p>Django Models inherit from <code>django.db.models.Model</code>. Django automatically maps class attributes to table columns:</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Operation</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Django Python ORM</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Equivalent SQL Statement</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Read All Records</td>
                  <td style={{ padding: '10px', color: '#b45309', fontWeight: 600 }}>Product.objects.all()</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>SELECT * FROM invent_app_product;</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Filter Query</td>
                  <td style={{ padding: '10px', color: '#b45309', fontWeight: 600 }}>Product.objects.filter(quantity__gt=5)</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>SELECT * FROM invent_app_product WHERE quantity &gt; 5;</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Create Record</td>
                  <td style={{ padding: '10px', color: '#b45309', fontWeight: 600 }}>Product.objects.create(name='Mouse', quantity=20)</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>INSERT INTO invent_app_product (name, quantity) VALUES ('Mouse', 20);</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Retrieve Single Item</td>
                  <td style={{ padding: '10px', color: '#b45309', fontWeight: 600 }}>Product.objects.get(id=1)</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>SELECT * FROM invent_app_product WHERE id = 1;</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('models_py')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: models.py Setup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. MODELS.PY SETUP ─────────────────────────────────────────────── */}
      {activeTab === 'models_py' && (
        <Section key="models" eyebrow="Django • Day 3 • Module 02" title="Designing models.py schemas">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Declaring Database Class Objects</h3>
            <p>Open the file <code>models.py</code> inside your Django application folder. Here, we define database tables as classes. Let's create two related tables: <strong>Category</strong> and <strong>Product</strong>, linked together via a foreign key relationship.</p>

            <CodeBlock title="inventory/models.py" code={`from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    # Returns object label in admin console dropdowns and querysets
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    
    # ForeignKey links product to a Category ID
    # on_delete=models.CASCADE specifies that deleting a category deletes all its products
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.name} - {self.quantity} units"`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Breakdown of Model Field Types</h3>
            <ul>
              <li><strong>models.CharField</strong>: Used for small-to-midsize strings. Always specify a <code>max_length</code> parameter to establish validation limits on input fields.</li>
              <li><strong>models.ForeignKey</strong>: Establishes a many-to-one relationship. In this case, multiple products can belong to a single category. The <code>on_delete=models.CASCADE</code> setting ensures referential integrity; if a category is deleted, all products mapped to it are automatically pruned.</li>
              <li><strong>models.DecimalField</strong>: Ideal for monetary variables to avoid floating-point inaccuracies. It requires specifying <code>max_digits</code> (total digits allowed) and <code>decimal_places</code> (digits after decimal point).</li>
              <li><strong>models.PositiveIntegerField</strong>: Restricts numbers to non-negative integers, ideal for inventory counts.</li>
              <li><strong>__str__ Method</strong>: A special Python method defining the default string representation of the model instance. This is highly useful for logs, command-line inspection, and listing entries in the admin interface.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('migrations_db')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Database Migrations <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. DB MIGRATIONS ─────────────────────────────────────────────── */}
      {activeTab === 'migrations_db' && (
        <Section key="migrations" eyebrow="Django • Day 3 • Module 03" title="Running makemigrations & migrate">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django utilizes a highly structured, two-step process to safely deploy model layout transformations to your database engine (SQL tables on disk):</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>1. python manage.py makemigrations</h4>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>Inspects your models.py files, detects changes (new fields, deleted fields, renamed tables), and creates Python blueprint files inside your application's <code>migrations/</code> directory (e.g. <code>0001_initial.py</code>).</p>
              </div>
              
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #cbd5e1' }}>
                <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>2. python manage.py migrate</h4>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>Reads the unapplied migration blueprint files and executes the physical SQL schema DDL updates (e.g. <code>CREATE TABLE</code>, <code>ALTER TABLE</code>) against the active database configuration.</p>
              </div>
            </div>

            <div style={{ background: '#fee2e2', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: 6, margin: '1.5rem 0' }}>
              <strong style={{ color: '#991b1b', display: 'block', marginBottom: '4px' }}>⚠️ Crucial Migration Best Practices</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f1d1d' }}>
                Never edit generated migration files manually unless doing complex data migration scripts. Let Django automate changes. Additionally, always review migration changes using <code>python manage.py sqlmigrate &lt;app_name&gt; &lt;migration_number&gt;</code> to inspect the exact SQL queries before executing them.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Essential Migration Management Commands</h3>
            <ul>
              <li><code>python manage.py showmigrations</code>: Lists all migration files in your project and displays an <code>[X]</code> next to those successfully applied.</li>
              <li><code>python manage.py sqlmigrate app 0001</code>: Dry-runs a migration file and prints the raw SQL commands that would be executed on your database. Useful for DBAs and inspection.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('admin_panel')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Admin Panel & Superusers <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. ADMIN PANEL ─────────────────────────────────────────────── */}
      {activeTab === 'admin_panel' && (
        <Section key="admin" eyebrow="Django • Day 3 • Module 04" title="Admin Registration & Superusers">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django features a legendary built-in administration console that reads your metadata definitions and dynamically constructs a secure web UI to CRUD (Create, Read, Update, Delete) database entries. To customize and register your models in the dashboard, open <code>admin.py</code>:</p>
            
            <CodeBlock title="inventory/admin.py" code={`from django.contrib import admin
from .models import Product, Category

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    search_fields = ('name',)`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Admin Customization Properties</h3>
            <ul>
              <li><strong>@admin.register(Model)</strong>: Decorator syntax registering your custom database structures inside Django's global administrative control pool.</li>
              <li><strong>list_display</strong>: Specifies columns to render side-by-side in list views instead of displaying simple fallback object descriptions.</li>
              <li><strong>search_fields</strong>: Renders a search bar filtering results on user queries. Use double-underscores (<code>category__name</code>) to search across relational boundaries.</li>
              <li><strong>list_filter</strong>: Generates an interactive side panel to filter records by selected fields.</li>
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Creating a Superuser</h3>
            <p>To sign in to the panel at <code>/admin/</code>, you need to create administrative credentials. Run the following command in your terminal and fill out the username, email, and password prompts:</p>
            <code style={{ display: 'block', background: '#0f172a', color: '#a5d6ff', padding: '10px 16px', borderRadius: 6, fontSize: '0.85rem', fontFamily: 'monospace', margin: '0.75rem 0' }}>python manage.py createsuperuser</code>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('views_post')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: GET & POST Views <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. GET & POST VIEWS ─────────────────────────────────────────── */}
      {activeTab === 'views_post' && (
        <Section key="views_post" eyebrow="Django • Day 3 • Module 05" title="Writing views.py for Form submissions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>To capture user entries, views must handle two core HTTP request paths: <strong>GET</strong> (rendering the empty entry form fields) and <strong>POST</strong> (extracting raw payload parameters, validating formatting constraints, saving changes to the SQL tables, and redirecting):</p>
            
            <CodeBlock title="inventory/views.py" code={`from django.shortcuts import render, redirect
from .models import Product, Category

def product_list(request):
    products = Product.objects.all()
    return render(request, 'inventory/product_list.html', {'products': products})

def add_product(request):
    # Check if form submission payload is being posted back
    if request.method == 'POST':
        name = request.POST['name']
        category = Category.objects.get(id=request.POST['category'])
        price = request.POST['price']
        quantity = request.POST['quantity']
        
        # Save model record directly into database
        Product.objects.create(
            name=name, category=category, price=price, quantity=quantity
        )
        # Redirect to avoid duplicate form submissions on page refresh
        return redirect('product_list')
        
    # If request is GET: Fetch categories list to populate dropdown options
    categories = Category.objects.all()
    return render(request, 'inventory/add_product.html', {'categories': categories})`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>HTTP GET vs POST Pattern (PRG Pattern)</h3>
            <ul>
              <li><strong>GET Request</strong>: Used to fetch data from the server. In <code>add_product</code>, the GET path simply pulls categories and renders the form template.</li>
              <li><strong>POST Request</strong>: Submits user input. Django parses variables into the dictionary-like <code>request.POST</code>.</li>
              <li><strong>Post-Redirect-Get (PRG) Pattern</strong>: Always return a <code>redirect()</code> on successful POST forms. This redirects the client to a different URL (like <code>product_list</code>) via a clean GET request, preventing duplicate form submissions if the user refreshes the page.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('url_routing_post')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: URLs Mapping <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. URL ROUTING POST ─────────────────────────────────────────── */}
      {activeTab === 'url_routing_post' && (
        <Section key="urls" eyebrow="Django • Day 3 • Module 06" title="Forms Routing Mapping">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>To access your views from a web browser, map them inside your application's routing registry (<code>urls.py</code>). This links request URI paths directly to their Python controller functions:</p>
            
            <CodeBlock title="inventory/urls.py" code={`from django.urls import path
from .views import product_list, add_product

urlpatterns = [
    # Mapped to: http://127.0.0.1:8000/products/
    path('products/', product_list, name='product_list'),
    
    # Mapped to: http://127.0.0.1:8000/add-product/
    path('add-product/', add_product, name='add_product'),
]`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Understanding URL Path Declarations</h3>
            <ul>
              <li><strong>Route Path Pattern (Argument 1)</strong>: Matches the incoming URL requested by the browser. Slashes (<code>/</code>) are included at the end to match Django's default trailing slash routing style.</li>
              <li><strong>View Function (Argument 2)</strong>: Tells Django which views.py function to execute when a URL pattern matches.</li>
              <li><strong>Namespace Name (Argument 3)</strong>: Assigns a unique name to the path configuration. This allows you to dynamically look up URLs inside templates using the <code>{"{% url 'name' %}"}</code> template tag, removing the need to hardcode paths across your templates.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('templates_forms')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Templates creation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. TEMPLATES FORMS ─────────────────────────────────────────── */}
      {activeTab === 'templates_forms' && (
        <Section key="templates_forms" eyebrow="Django • Day 3 • Module 07" title="Product List & Add Product HTML Templates">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django utilizes HTML template files with Django Template Language (DTL) tags to safely inject dynamic data into layout structures. Let's inspect the two layout files:</p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>1. templates/inventory/product_list.html</h3>
            <p>Extends the base master shell and loops through context variables to render product listings:</p>
            <CodeBlock title="product_list.html" language="html" code={`{% extends 'base.html' %}

{% block content %}
  <h2>Product List</h2>
  <ul>
    {% for product in products %}
      <li>
        {{ product.name }} - {{ product.quantity }} units
        ({{ product.price|floatformat:2 }} USD)
      </li>
    {% endfor %}
  </ul>
  <a href="{% url 'add_product' %}">Add New Product</a>
{% endblock %}`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>2. templates/inventory/add_product.html</h3>
            <p>Renders a POST form mapped to input fields matching model values. DTL tags are used to dynamically output database categories in a dropdown menu:</p>
            <CodeBlock title="add_product.html" language="html" code={`{% extends 'base.html' %}

{% block content %}
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-center mb-4">Add New Product</h2>
      <form method="POST" class="border p-4 rounded shadow-sm bg-light">
        {% csrf_token %}
        
        <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="name" name="name" required>
        </div>
        
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select class="form-select" id="category" name="category" required>
            <option value="">Select Category</option>
            {% for category in categories %}
              <option value="{{ category.id }}">{{ category.name }}</option>
            {% endfor %}
          </select>
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" step="0.01" class="form-control" id="price" name="price" required>
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input type="number" class="form-control" id="quantity" name="quantity" required>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}`} />

            <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem', borderRadius: 6, margin: '1.5rem 0' }}>
              <strong style={{ color: '#0369a1', display: 'block', marginBottom: '4px' }}>🛡️ Security Check: The csrf_token tag</strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#0c4a6e' }}>
                All Django POST forms must contain the <code>{"{% csrf_token %}"}</code> tag. This generates a secure token that validates the origin of the form submission. Without it, Django will block the request and raise a <code>403 Forbidden</code> error to protect against Cross-Site Request Forgery.
              </p>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('include_filter')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Include & Filters <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. INCLUDE & FILTER ─────────────────────────────────────────── */}
      {activeTab === 'include_filter' && (
        <Section key="include_filter" eyebrow="Django • Day 3 • Module 08" title="Using {% include %} and Template Filters">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>1. The {"{% include %}"} Tag</h3>
            <p>To avoid code repetition (DRY principle), use the <code>{"{% include %}"}</code> tag. This loads a self-contained layout snippet and renders it in place. It's ideal for shared widgets like navigation menus, headers, and footers:</p>
            
            <CodeBlock title="templates/inventory/base.html (with include)" language="html" code={`{% include 'inventory/header.html' %}
<main>
    {% block content %}{% endblock %}
</main>`} />

            <p style={{ marginTop: '1rem' }}>You can also pass custom variables down to the included widget in-line using the <code>with</code> modifier:</p>
            <CodeBlock title="Passing context variables to include" language="html" code={`{% include 'inventory/header.html' with title="Special Dashboard" user_status="Admin" %}`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>2. Template Filters</h3>
            <p>Django filters allow you to modify layout variable values dynamically inside your templates using the pipe (<code>|</code>) character. They can format strings, dates, lists, and numbers directly in HTML:</p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', border: '1px solid #cbd5e1', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <strong>Float Formatting (<code>|floatformat:X</code>)</strong>: Limits numbers to X decimal places.
                <code style={{ display: 'block', background: '#0f172a', color: '#a5d6ff', padding: '4px 8px', borderRadius: 4, marginTop: 4, fontSize: '0.8rem' }}>{"{{ product.price|floatformat:2 }} USD  # Output: 49.00 USD"}</code>
              </div>
              <div>
                <strong>Uppercase (<code>|upper</code>)</strong>: Capitalizes all characters in a string.
                <code style={{ display: 'block', background: '#0f172a', color: '#a5d6ff', padding: '4px 8px', borderRadius: 4, marginTop: 4, fontSize: '0.8rem' }}>{"{{ product.name|upper }}  # Output: KEYBOARD"}</code>
              </div>
              <div>
                <strong>Fallback Defaults (<code>|default:"value"</code>)</strong>: Renders a placeholder value if the context variable is empty or falsey.
                <code style={{ display: 'block', background: '#0f172a', color: '#a5d6ff', padding: '4px 8px', borderRadius: 4, marginTop: 4, fontSize: '0.8rem' }}>{"{{ product.description|default:'No description provided' }}  # Output: No description provided"}</code>
              </div>
              <div>
                <strong>Text Truncation (<code>|truncatechars:X</code>)</strong>: Shortens a string to X characters and appends ellipses (...) if it exceeds the limit.
                <code style={{ display: 'block', background: '#0f172a', color: '#a5d6ff', padding: '4px 8px', borderRadius: 4, marginTop: 4, fontSize: '0.8rem' }}>{"{{ product.name|truncatechars:10 }}  # Output: Super Lapt..."}</code>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Contrast: Template Inheritance vs Inclusion</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Concept</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>DTL Tag</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Primary Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Inheritance</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#0369a1' }}>{"{% extends 'base.html' %}"}</td>
                  <td style={{ padding: '10px' }}>Defines a parent shell/skeleton that child pages inject content blocks into.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Inclusion</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#0369a1' }}>{"{% include 'header.html' %}"}</td>
                  <td style={{ padding: '10px' }}>Imports a smaller HTML snippet (like a header/navbar widget) into another template file.</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_workspace_post')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Sandbox Workspace <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 9. INTERACTIVE WORKSPACE ────────────────────────────────────── */}
      {activeTab === 'interactive_workspace_post' && (
        <Section key="workspace" eyebrow="Django • Day 3 • Module 09" title="Interactive Workspace: Models & Form Actions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              Verify model mappings, migrations, and add-product form submissions inside the interactive explorer below. Type <code>python manage.py runserver</code> to test!
            </p>

            <div style={{ background: '#e2e8f0', borderRadius: 16, padding: '1rem', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', minHeight: 400 }}>
                {/* File Tree Explorer */}
                <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>📁 invent_app</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <button onClick={() => setActiveFile('models')} style={{ background: activeFile === 'models' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#0284c7" /> models.py
                    </button>
                    <button onClick={() => setActiveFile('views')} style={{ background: activeFile === 'views' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#059669" /> views.py
                    </button>
                    <button onClick={() => setActiveFile('admin')} style={{ background: activeFile === 'admin' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#f43f5e" /> admin.py
                    </button>
                    
                    <div style={{ fontWeight: 800, fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', marginBottom: '0.2rem' }}>📁 templates/</div>
                    <button onClick={() => setActiveFile('base')} style={{ background: activeFile === 'base' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#eab308" /> base.html
                    </button>
                    <button onClick={() => setActiveFile('header')} style={{ background: activeFile === 'header' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#eab308" /> header.html
                    </button>
                    <button onClick={() => setActiveFile('product_list')} style={{ background: activeFile === 'product_list' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#eab308" /> product_list.html
                    </button>
                    <button onClick={() => setActiveFile('add_product')} style={{ background: activeFile === 'add_product' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155', paddingLeft: 16 }}>
                      <File size={14} color="#eab308" /> add_product.html
                    </button>
                  </div>
                </div>

                {/* Editor Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: 8, border: '1px solid #1e293b', overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.76rem', color: '#cbd5e1', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>✏️ Interactive File Editor ({activeFile === 'models' ? 'models.py' : activeFile === 'views' ? 'views.py' : activeFile === 'admin' ? 'admin.py' : activeFile === 'base' ? 'base.html' : activeFile === 'header' ? 'header.html' : activeFile === 'product_list' ? 'product_list.html' : 'add_product.html'})</span>
                    <span style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, color: '#8b949e', fontSize: '0.7rem' }}>auto-saved</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {activeFile === 'models' && (
                      <textarea className="form-control" value={modelsCode} onChange={e => setModelsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'views' && (
                      <textarea className="form-control" value={viewsCode} onChange={e => setViewsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'admin' && (
                      <textarea className="form-control" value={adminCode} onChange={e => setAdminCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'base' && (
                      <textarea className="form-control" value={baseHtml} onChange={e => setBaseHtml(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'header' && (
                      <textarea className="form-control" value={headerHtml} onChange={e => setHeaderHtml(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'product_list' && (
                      <textarea className="form-control"
                        value={productListHtml} onChange={e => setProductListHtml(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'add_product' && (
                      <textarea className="form-control"
                        value={addProductHtml} onChange={e => setAddProductHtml(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                  </div>

                  {/* Browser Preview Frame */}
                  {serverRunning && (
                    <div style={{ borderTop: '2px solid #cbd5e1', background: 'white', padding: '10px' }}>
                      <div style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 4, marginBottom: 6, fontSize: '0.74rem', border: '1px solid #cbd5e1' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
                        <input 
                          type="text" 
                          value={previewUrl} 
                          onChange={(e) => setPreviewUrl(e.target.value)} 
                          style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#334155', fontWeight: 600 }}
                        />
                      </div>

                      {/* Mocked Browser Viewport */}
                      <div style={{ 
                        border: '1px solid #cbd5e1', 
                        borderRadius: 6, 
                        background: '#f4f4f4', 
                        fontFamily: 'Arial, sans-serif',
                        color: '#0f172a',
                        overflow: 'hidden'
                      }}>
                        {/* Interactive Admin URL router */}
                        {previewUrl === 'http://127.0.0.1:8000/admin/' ? (
                          <div style={{ background: '#fff', minHeight: 180 }}>
                            {!isAdminLoggedIn ? (
                              <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
                                <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '10px', fontWeight: 800 }}>Django Administration</h3>
                                <form onSubmit={handleAdminLogin}>
                                  <input type="text" placeholder="Username" value={adminLoginForm.username} onChange={e => setAdminLoginForm(p => ({ ...p, username: e.target.value }))} style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: 4, marginBottom: '8px', fontSize: '0.8rem' }} />
                                  <input type="password" placeholder="Password" value={adminLoginForm.password} onChange={e => setAdminLoginForm(p => ({ ...p, password: e.target.value }))} style={{ width: '100%', padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: 4, marginBottom: '8px', fontSize: '0.8rem' }} />
                                  <button type="submit" style={{ width: '100%', padding: '6px 12px', background: '#0ea5e9', border: 'none', color: 'white', fontWeight: 700, borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem' }}>Log in</button>
                                </form>
                              </div>
                            ) : (
                              <div style={{ fontSize: '0.82rem' }}>
                                <div style={{ background: '#417690', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                                  <span>Django administration</span>
                                  <span>WELCOME, {superuserCreds.username.toUpperCase()}. <span onClick={() => setIsAdminLoggedIn(false)} style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: 8 }}>LOG OUT</span></span>
                                </div>
                                <div style={{ padding: '15px' }}>
                                  <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px' }}>Site administration</h4>
                                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                                        <td style={{ padding: '6px', fontWeight: 700, color: '#417690' }}>Categorys</td>
                                        <td style={{ padding: '6px', textAlign: 'right', color: '#10b981', fontWeight: 800 }}>{categories.length} entries</td>
                                      </tr>
                                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                                        <td style={{ padding: '6px', fontWeight: 700, color: '#417690' }}>Products</td>
                                        <td style={{ padding: '6px', textAlign: 'right', color: '#10b981', fontWeight: 800 }}>{products.length} entries</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : previewUrl === 'http://127.0.0.1:8000/products/' ? (
                          <div>
                            {/* Header (with include) */}
                            <header style={{ 
                              background: '#333', 
                              color: 'white', 
                              padding: '15px', 
                              textAlign: 'center',
                              ...parseHeaderStyle()
                            }}>
                              <h1 style={{ margin: 0, fontSize: '1.25rem' }}>{parseHeaderTitle()}</h1>
                              <nav style={{ marginTop: '6px', fontSize: '0.8rem' }}>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer', marginRight: '12px' }}>Products</span>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/add-product/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer' }}>Add Product</span>
                              </nav>
                            </header>

                            <div style={{ 
                              padding: '20px', 
                              maxWidth: '800px', 
                              margin: '0 auto', 
                              background: 'white', 
                              minHeight: '140px', 
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                              borderRadius: '6px', 
                              marginTop: '15px', 
                              marginBottom: '15px',
                              ...parseMainStyle()
                            }}>
                              {(() => {
                                const { nameUpper, decimalPlaces, listTitle } = parseProductListRender();
                                return (
                                  <>
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#1e293b' }}>{listTitle}</h3>
                                    <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '0.82rem', lineHeight: '1.6' }}>
                                      {products.map((p, idx) => {
                                        const cat = categories.find(c => c.id === p.categoryId)?.name || 'General';
                                        const displayName = nameUpper ? p.name.toUpperCase() : p.name;
                                        const displayPrice = p.price.toFixed(decimalPlaces);
                                        return (
                                          <li key={idx}>
                                            <strong>{displayName}</strong> - {p.quantity} units ({displayPrice} USD) - <span style={{ color: '#64748b', fontSize: '0.72rem' }}>{cat}</span>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </>
                                );
                              })()}
                              <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/add-product/')} style={{ display: 'inline-block', color: '#2563eb', textDecoration: 'underline', fontSize: '0.78rem', marginTop: '12px', cursor: 'pointer' }}>Add New Product</span>
                            </div>
                            
                            <footer style={{ background: '#333', color: 'white', textAlign: 'center', padding: '8px', fontSize: '0.7rem' }}>
                              <p style={{ margin: 0 }}>&copy; 2024 Inventory Management</p>
                            </footer>
                          </div>
                        ) : previewUrl === 'http://127.0.0.1:8000/add-product/' ? (
                          <div>
                            {/* Header (with include) */}
                            <header style={{ 
                              background: '#333', 
                              color: 'white', 
                              padding: '15px', 
                              textAlign: 'center',
                              ...parseHeaderStyle()
                            }}>
                              <h1 style={{ margin: 0, fontSize: '1.25rem' }}>{parseHeaderTitle()}</h1>
                              <nav style={{ marginTop: '6px', fontSize: '0.8rem' }}>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer', marginRight: '12px' }}>Products</span>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/add-product/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer' }}>Add Product</span>
                              </nav>
                            </header>

                            <div style={{ 
                              padding: '20px', 
                              maxWidth: '800px', 
                              margin: '0 auto', 
                              background: 'white', 
                              minHeight: '140px', 
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                              borderRadius: '6px', 
                              marginTop: '15px', 
                              marginBottom: '15px',
                              ...parseMainStyle()
                            }}>
                              {(() => {
                                const { title } = parseAddProductRender();
                                return (
                                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#1e293b', textAlign: 'center' }}>{title}</h3>
                                );
                              })()}
                              <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: '280px', margin: '0 auto', fontSize: '0.8rem' }}>
                                <div>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Product Name</label>
                                  <input type="text" value={formInput.name} onChange={e => setFormInput(p => ({ ...p, name: e.target.value }))} placeholder="Enter product name" required style={{ width: '100%', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                                </div>
                                <div>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Category</label>
                                  <select value={formInput.category} onChange={e => setFormInput(p => ({ ...p, category: e.target.value }))} required style={{ width: '100%', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: 4, background: '#fff' }}>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                  </select>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                  <div>
                                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Price</label>
                                    <input type="number" step="0.01" value={formInput.price} onChange={e => setFormInput(p => ({ ...p, price: e.target.value }))} placeholder="0.00" required style={{ width: '100%', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                                  </div>
                                  <div>
                                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Quantity</label>
                                    <input type="number" value={formInput.quantity} onChange={e => setFormInput(p => ({ ...p, quantity: e.target.value }))} placeholder="0" required style={{ width: '100%', padding: '4px 6px', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                                  </div>
                                </div>
                                <button type="submit" style={{ padding: '6px 12px', background: '#0284c7', border: 'none', color: 'white', fontWeight: 700, borderRadius: 4, cursor: 'pointer', marginTop: 4 }}>Add Product</button>
                              </form>
                            </div>

                            <footer style={{ background: '#333', color: 'white', textAlign: 'center', padding: '8px', fontSize: '0.7rem' }}>
                              <p style={{ margin: 0 }}>&copy; 2024 Inventory Management</p>
                            </footer>
                          </div>
                        ) : (
                          <div style={{ padding: '20px', background: '#ffffcc', color: '#7a2200', border: '1px solid #ffd8b1', fontSize: '0.85rem' }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#b91c1c' }}>Page not found (404)</h3>
                            <p style={{ margin: 0 }}>Using the URLconf defined in <code>inventory.urls</code>, Django tried URL patterns in this order:</p>
                            <ol style={{ marginTop: '6px', fontSize: '0.78rem' }}>
                              <li>products/</li>
                              <li>add-product/</li>
                              <li>admin/</li>
                            </ol>
                            <p style={{ marginTop: '8px', fontSize: '0.78rem', margin: 0 }}>The path, <code>{previewUrl.replace('http://127.0.0.1:8000', '')}</code>, didn\'t match any of these.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Terminal console */}
                  <div style={{ background: '#0f172a', padding: '8px 12px', borderTop: '1px solid #1e293b' }}>
                    <div style={{ maxHeight: 75, overflowY: 'auto', marginBottom: 6, fontFamily: 'monospace', fontSize: '0.74rem', color: '#94a3b8' }}>
                      {terminalLogs.map((log, index) => (
                        <pre key={index} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('Error') ? '#fca5a5' : log.startsWith('>') ? '#e2e8f0' : '#86efac' }}>{log}</pre>
                      ))}
                    </div>
                    <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: 6 }}>
                      <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', alignSelf: 'center' }}>$</span>
                      <input className="form-control" type="text" value={cmdInput} onChange={e => setCmdInput(e.target.value)} placeholder="Type command..."
                        style={{ background: '#1e293b', border: 'none', color: 'white', fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 8px', flexGrow: 1, outline: 'none' }} />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 10. QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 3 Quiz — Models & Admin Panel">
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
                      } else if (selected) { bg = '#f0f9ff'; border = '1.5px solid #0ea5e9'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #0ea5e9' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#0ea5e9', borderColor: '#0ea5e9', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 11. ASSIGNMENT ──────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 3 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Database Models, Forms, and Admin Panel</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Complete the following steps on your local system using Django database connections:</p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Open <code>models.py</code>, define `Category` and `Product` tables, and set up a ForeignKey relationship with <code>on_delete=models.CASCADE</code>.</li>
                <li>Generate the migration files by calling <code>python manage.py makemigrations</code> in terminal.</li>
                <li>Apply tables creation by running <code>python manage.py migrate</code>.</li>
                <li>Register models in <code>admin.py</code> and add search fields/filters.</li>
                <li>Create superuser controls: <code>python manage.py createsuperuser</code>. Runserver and sign in to <code>http://127.0.0.1:8000/admin/</code>.</li>
                <li>Design GET & POST views in `views.py` to add products, map routes, and render the output form successfully.</li>
              </ol>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('django_module4', 'intro_forms')}>
              Go to Day 4 - HTML, Django & Model Forms <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
