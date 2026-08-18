import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Database, Activity, RefreshCw, BarChart2, Plus, Trash2, Edit3
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

export default function DjangoDay9({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module9', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Interactive Database & Insights State ── */
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999.00, quantity: 10, categoryId: 1 },
    { id: 2, name: 'Keyboard', price: 49.00, quantity: 25, categoryId: 1 },
    { id: 3, name: 'Python Book', price: 29.99, quantity: 8, categoryId: 2 },
    { id: 4, name: 'T-Shirt', price: 19.99, quantity: 15, categoryId: 3 }
  ]);

  // Modal / Inputs for adding product
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newCatId, setNewCatId] = useState(1);

  // Shell Logs
  const [shellLogs, setShellLogs] = useState([
    '>>> # Django Interactive ORM Shell Initialized.',
    '>>> from django.db.models import Sum, Avg, Count',
    '>>> # Select an ORM Query Preset below to run it...'
  ]);

  // Calculations derived from state (Aggregation/Annotation)
  const totalStock = products.reduce((sum, p) => sum + (parseInt(p.quantity) || 0), 0);
  const averagePrice = products.length > 0
    ? (products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0) / products.length)
    : 0;

  const categoryCounts = categories.map(cat => {
    const count = products.filter(p => p.categoryId === cat.id).length;
    return { ...cat, product_count: count };
  });

  const addProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice || !newQty) return;
    const priceVal = parseFloat(newPrice);
    const qtyVal = parseInt(newQty);
    if (isNaN(priceVal) || isNaN(qtyVal)) return;

    const newProd = {
      id: Date.now(),
      name: newName,
      price: priceVal,
      quantity: qtyVal,
      categoryId: parseInt(newCatId)
    };

    setProducts(prev => [...prev, newProd]);
    setNewName('');
    setNewPrice('');
    setNewQty('');
    setShellLogs(prev => [
      ...prev,
      `>>> # Product created in database: "${newProd.name}"`,
      `>>> Product.objects.create(name="${newProd.name}", price=${newProd.price}, quantity=${newProd.quantity}, category_id=${newProd.categoryId})`,
      `<Product: ${newProd.name}>`
    ]);
  };

  const deleteProduct = (id, name) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setShellLogs(prev => [
      ...prev,
      `>>> # Product deleted from database: "${name}"`,
      `>>> Product.objects.filter(id=${id}).delete()`,
      `(1, {'inventory.Product': 1})`
    ]);
  };

  const runPresetQuery = (type) => {
    let logs = [];
    if (type === 'sum') {
      logs.push(`>>> Product.objects.aggregate(total_quantity=Sum('quantity'))`);
      logs.push(`{'total_quantity': ${totalStock}}`);
    } else if (type === 'avg') {
      logs.push(`>>> Product.objects.aggregate(avg_price=Avg('price'))`);
      logs.push(`{'avg_price': ${averagePrice.toFixed(4)}}`);
    } else if (type === 'count') {
      logs.push(`>>> Category.objects.annotate(product_count=Count('product'))`);
      categoryCounts.forEach(c => {
        logs.push(`Category: "${c.name}" -> product_count = ${c.product_count}`);
      });
    }
    setShellLogs(prev => [...prev, ...logs]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which Django ORM method returns a single dictionary containing calculated values?',
      opts: ['filter()', 'annotate()', 'aggregate()', 'values()'],
      ans: 2,
      exp: 'aggregate() collapses the entire queryset into a single dictionary containing summary values (e.g., Sum, Avg).'
    },
    {
      k: 'q2',
      q: 'What is the main difference between annotate() and aggregate()?',
      opts: [
        'annotate() is for databases like PostgreSQL; aggregate() is for SQLite only',
        'annotate() returns a QuerySet with extra calculated fields per item; aggregate() collapses the queryset into a single dictionary',
        'annotate() deletes objects; aggregate() updates them',
        'annotate() runs automatically; aggregate() requires manual SQL execution'
      ],
      ans: 1,
      exp: 'annotate() adds calculated properties (like product counts) to *each* individual object in the queryset, returning a QuerySet. aggregate() collapses the *entire* queryset into one summary dictionary.'
    },
    {
      k: 'q3',
      q: 'How do you format a floating-point number to 2 decimal places in a Django template?',
      opts: [
        '{{ val|round:2 }}',
        '{{ val|floatformat:2 }}',
        '{{ val|decimal:2 }}',
        '{{ val.format(".2f") }}'
      ],
      ans: 1,
      exp: 'The floatformat template filter formats decimal numbers. Passing 2 as the argument formats the number to two decimal places (e.g. 19.99).'
    },
    {
      k: 'q4',
      q: 'What class does Django use to calculate the average of a model field?',
      opts: ['Sum', 'Count', 'Avg', 'Average'],
      ans: 2,
      exp: 'Avg is imported from django.db.models and is used to calculate the arithmetic mean of a field over a queryset.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO ORM ────────────────────────────────────────── */}
      {activeTab === 'intro_orm' && (
        <Section key="intro" eyebrow="Django • Day 9 • Module 01" title="Object-Relational Mapping & QuerySets">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#047857,#059669)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>🗄️ Database Abstraction with Django ORM</h3>
              <p style={{ color: '#d1fae5', margin: 0, lineHeight: 1.7 }}>
                Django's <strong>Object-Relational Mapper (ORM)</strong> allows you to query, create, update, and delete database records using pure Python code instead of writing raw SQL. It maps Python classes to database tables, attributes to columns, and class instances to records.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>SQL vs. Django ORM Equivalent</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#e11d48', fontWeight: 800, marginTop: 0 }}>💬 Raw SQL Query</h4>
                <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '10px', borderRadius: 8, fontSize: '0.78rem', margin: 0, fontFamily: 'monospace' }}>
{`CREATE TABLE "pages_book" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "title" varchar(200) NOT NULL,
  "author" varchar(100) NOT NULL
);

SELECT * FROM pages_book 
WHERE author = 'Douglas Adams';`}
                </pre>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#059669', fontWeight: 800, marginTop: 0 }}>🐍 Django ORM</h4>
                <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '10px', borderRadius: 8, fontSize: '0.78rem', margin: 0, fontFamily: 'monospace' }}>
{`class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)

# Retrieve QuerySet
books = Book.objects.filter(
    author='Douglas Adams'
)`}
                </pre>
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('aggregation')} style={{ background: '#059669', borderColor: '#059669' }}>
                Next: Database Aggregations <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. AGGREGATION ─────────────────────────────────────────── */}
      {activeTab === 'aggregation' && (
        <Section key="agg" eyebrow="Django • Day 9 • Module 02" title="Database Aggregation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django provides <strong>aggregations</strong> to calculate summary statistics over a QuerySet, such as totals, averages, minimums, maximums, or counts.</p>

            <InfoBox icon={BarChart2} color="#047857" bg="#ecfdf5" border="#a7f3d0">
              <strong>aggregate()</strong> collapses the entire QuerySet into a single result dictionary. It returns key-value pairs representing the mathematical statistics.
            </InfoBox>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Common Aggregation Functions</h3>
            <p>Django offers several aggregate functions imported from <code>django.db.models</code>:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Function</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Calculates</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Code Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Sum', 'Sum total of a field', "Product.objects.aggregate(total_stock=Sum('quantity'))"],
                  ['Avg', 'Arithmetic mean of a field', "Product.objects.aggregate(average_price=Avg('price'))"],
                  ['Count', 'Count of records in queryset', "Product.objects.aggregate(total_products=Count('id'))"],
                  ['Max', 'Maximum value of a field', "Product.objects.aggregate(max_price=Max('price'))"],
                  ['Min', 'Minimum value of a field', "Product.objects.aggregate(min_price=Min('price'))"],
                ].map(([func, calc, code]) => (
                  <tr key={func} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700, color: '#059669', fontSize: '0.82rem' }}>{func}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem' }}>{calc}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#475569' }}>{code}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <CodeBlock title="Evaluating Aggregate Output" code={`from django.db.models import Sum, Avg

# 1. Running query returns a dictionary:
result = Product.objects.aggregate(total_quantity=Sum('quantity'))
print(result) # {'total_quantity': 43}

# 2. Extracting values from the dictionary:
total_stock = result['total_quantity']`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('annotation')} style={{ background: '#059669', borderColor: '#059669' }}>
                Next: Query Annotations <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. ANNOTATION ──────────────────────────────────────────── */}
      {activeTab === 'annotation' && (
        <Section key="ann" eyebrow="Django • Day 9 • Module 03" title="QuerySet Annotation">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>While aggregation collapses queries into one result, <strong>annotation</strong> calculates information for <em>each individual record</em> in the QuerySet. It returns a modified QuerySet containing virtual/calculated fields.</p>

            <InfoBox icon={Database} color="#0369a1" bg="#f0f9ff" border="#bae6fd">
              Think of <strong>annotation</strong> as adding a virtual column to each row in the query result.
            </InfoBox>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Annotation Example</h3>
            <p>If you want to query all categories and calculate how many products exist under each category:</p>
            <CodeBlock title="Annotating products count onto Categories" code={`from django.db.models import Count
from inventory.models import Category

# Calculate count of related products for each Category
categories = Category.objects.annotate(product_count=Count('product'))

# Loop over the returned QuerySet
for category in categories:
    print(category.name, "has", category.product_count, "products")`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Comparing Annotate &amp; Aggregate</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Feature</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>aggregate()</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>annotate()</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Returns', 'Dictionary', 'QuerySet'],
                  ['Scope', 'Summary of all items collapsed', 'New virtual columns for each item'],
                  ['Common Use', 'Calculating overall inventory price average, total stocks', 'Counting items by category, calculating order sums'],
                  ['Chainable', 'No — returns dictionary, cannot call query methods on it', 'Yes — returns QuerySet, can call filter(), order_by()'],
                ].map(([feat, agg, ann]) => (
                  <tr key={feat} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 700, fontSize: '0.82rem' }}>{feat}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem', color: '#059669' }}>{agg}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.82rem', color: '#0284c7' }}>{ann}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('views_implementation')} style={{ background: '#059669', borderColor: '#059669' }}>
                Next: View Implementation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. VIEWS IMPLEMENTATION ────────────────────────────────── */}
      {activeTab === 'views_implementation' && (
        <Section key="views_impl" eyebrow="Django • Day 9 • Module 04" title="Inventory Insights View &amp; Template">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Let's create the view, template structure, and URL map to render inventory metrics to users.</p>

            <CodeBlock title="invent_app/views.py — Inventory Insights View" code={`from django.shortcuts import render
from django.db.models import Sum, Avg, Count
from .models import Product, Category

def inventory_insights(request):
    # 1. Total quantity of all products combined
    total_stock = Product.objects.aggregate(total_qty=Sum('quantity'))
    
    # 2. Average price of all products
    average_price = Product.objects.aggregate(avg_price=Avg('price'))
    
    # 3. Add product count to each Category object
    category_summary = Category.objects.annotate(product_count=Count('product'))
    
    context = {
        'total_stock': total_stock['total_qty'] or 0,
        'average_price': average_price['avg_price'] or 0,
        'category_summary': category_summary,
    }
    return render(request, 'inventory/insights.html', context)`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Template Presentation</h3>
            <CodeBlock title="templates/inventory/insights.html" language="html" code={`{% extends 'base.html' %}
{% block content %}
<div class="container mt-5">
    <h2 class="text-center mb-4">Inventory Insights Dashboard</h2>
    
    <div class="row">
        <!-- Card 1: Total Stock -->
        <div class="col-md-4">
            <div class="card text-white bg-primary mb-3">
                <div class="card-header">Total Stock</div>
                <div class="card-body">
                    <h3 class="card-title">{{ total_stock }} units</h3>
                    <p class="card-text">Total quantity of products across all categories.</p>
                </div>
            </div>
        </div>
        
        <!-- Card 2: Average Price -->
        <div class="col-md-4">
            <div class="card text-white bg-success mb-3">
                <div class="card-header">Average Price</div>
                <div class="card-body">
                    <h3 class="card-title">\${{ average_price|floatformat:2 }}</h3>
                    <p class="card-text">Average price of products.</p>
                </div>
            </div>
        </div>
        
        <!-- Card 3: Products by Category -->
        <div class="col-md-4">
            <div class="card text-white bg-info mb-3">
                <div class="card-header">Products by Category</div>
                <div class="card-body">
                    <ul class="list-group list-group-flush" style="color: #333;">
                        {% for category in category_summary %}
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                {{ category.name }}
                                <span class="badge bg-primary rounded-pill">{{ category.product_count }}</span>
                            </li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_orm')} style={{ background: '#059669', borderColor: '#059669' }}>
                Next: Live ORM &amp; Insights Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. INTERACTIVE ORM SANDBOX ──────────────────────────────── */}
      {activeTab === 'interactive_orm' && (
        <Section key="sandbox" eyebrow="Django • Day 9 • Module 05" title="Interactive ORM &amp; Insights Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Add products to the mock database or trigger presets. Watch how aggregation and annotation calculate statistics live.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Product Database and Dashboard */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>📊 Live Insights Dashboard</h4>
                
                {/* Insights Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>Total Stock (Sum)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065f46' }}>{totalStock} units</div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>Avg Price (Avg)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065f46' }}>${averagePrice.toFixed(2)}</div>
                  </div>
                </div>

                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '10px', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#0369a1', fontWeight: 700, marginBottom: 4 }}>Products by Category (Annotate)</div>
                  {categoryCounts.map(cat => (
                    <div key={cat.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '0.78rem', color: '#0f172a', marginBottom: 2 }}>
                      <span>{cat.name}</span>
                      <strong>{cat.product_count} products</strong>
                    </div>
                  ))}
                </div>

                {/* Add new Product Form */}
                <form onSubmit={addProduct} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>➕ Add Custom Product</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 6 }}>
                    <input type="text" placeholder="Name" required value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '4px 6px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                    <select value={newCatId} onChange={e => setNewCatId(e.target.value)} style={{ padding: '4px 6px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }}>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
                    <input type="number" step="0.01" placeholder="Price ($)" required value={newPrice} onChange={e => setNewPrice(e.target.value)} style={{ padding: '4px 6px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                    <input type="number" placeholder="Quantity" required value={newQty} onChange={e => setNewQty(e.target.value)} style={{ padding: '4px 6px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                  </div>
                  <button type="submit" style={{ width: '100%', padding: '6px', background: '#059669', border: 'none', color: 'white', fontSize: '0.75rem', cursor: 'pointer', borderRadius: 4, fontWeight: 700 }}>
                    Execute Product.objects.create()
                  </button>
                </form>
              </div>

              {/* Shell & Table Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                
                {/* ORM Terminal */}
                <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>🐍 Interactive Django ORM Shell</div>
                  <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {shellLogs.map((log, i) => (
                      <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('>>> #') ? '#64748b' : log.startsWith('>>>') ? '#cbd5e1' : '#34d399' }}>{log}</pre>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6, padding: '6px 12px', background: '#1e293b', justifyContent: 'space-between' }}>
                    <button onClick={() => runPresetQuery('sum')} style={{ fontSize: '0.68rem', padding: '3px 6px', background: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: 4 }}>Sum Query</button>
                    <button onClick={() => runPresetQuery('avg')} style={{ fontSize: '0.68rem', padding: '3px 6px', background: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: 4 }}>Avg Query</button>
                    <button onClick={() => runPresetQuery('count')} style={{ fontSize: '0.68rem', padding: '3px 6px', background: '#334155', border: 'none', color: 'white', cursor: 'pointer', borderRadius: 4 }}>Count Query</button>
                  </div>
                </div>

                {/* Database Table view */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 10, padding: 8 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>🗃️ Database Table: product_product</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                      <thead>
                        <tr style={{ background: '#f1f5f9', borderBottom: '1.5px solid #cbd5e1' }}>
                          <th style={{ padding: '4px 6px', textAlign: 'left' }}>ID</th>
                          <th style={{ padding: '4px 6px', textAlign: 'left' }}>Name</th>
                          <th style={{ padding: '4px 6px', textAlign: 'left' }}>Category</th>
                          <th style={{ padding: '4px 6px', textAlign: 'right' }}>Price</th>
                          <th style={{ padding: '4px 6px', textAlign: 'right' }}>Qty</th>
                          <th style={{ padding: '4px 6px', textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => {
                          const cat = categories.find(c => c.id === p.categoryId)?.name || 'Unknown';
                          return (
                            <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '4px 6px' }}>{p.id.toString().substring(0, 4)}</td>
                              <td style={{ padding: '4px 6px', fontWeight: 600 }}>{p.name}</td>
                              <td style={{ padding: '4px 6px', color: '#7c3aed' }}>{cat}</td>
                              <td style={{ padding: '4px 6px', textAlign: 'right' }}>${p.price.toFixed(2)}</td>
                              <td style={{ padding: '4px 6px', textAlign: 'right', fontWeight: 600 }}>{p.quantity}</td>
                              <td style={{ padding: '4px 6px', textAlign: 'center' }}>
                                <button onClick={() => deleteProduct(p.id, p.name)} style={{ padding: 2, background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                  <Trash2 size={12} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#059669', borderColor: '#059669' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 9 Quiz — Aggregation &amp; Annotation">
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
                      } else if (selected) { bg = '#e8f5e9'; border = '1.5px solid #059669'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #059669' }}>
                      <strong>Explanation:</strong> {item.exp}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!qDone ? (
                  <button className="btn btn-primary" onClick={() => setQDone(true)}
                    disabled={Object.keys(qAns).length < questions.length}
                    style={{ background: '#059669', borderColor: '#059669', minWidth: 150 }}>
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
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#059669', borderColor: '#059669' }}>
                Go to Assignment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 9 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Implement the Insights Dashboard in Your Project</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Build the complete analytics view using Django ORM:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Open <code>invent_app/views.py</code> and import the necessary database aggregate modules: <code>from django.db.models import Sum, Avg, Count</code>.</li>
                <li>Write a view function called <code>inventory_insights(request)</code>.</li>
                <li>Inside the view, calculate the total quantity across all products: <code>Product.objects.aggregate(total_quantity=Sum('quantity'))</code>.</li>
                <li>Calculate the average price of all listed products: <code>Product.objects.aggregate(avg_price=Avg('price'))</code>.</li>
                <li>Annotate the Product count onto the Category records: <code>Category.objects.annotate(product_count=Count('product'))</code>.</li>
                <li>Pass these calculations inside the context dictionary to a new template: <code>insights.html</code>.</li>
                <li>Create <code>templates/inventory/insights.html</code> and build a grid layout using Bootstrap or custom styles, displaying the calculated stock quantity, average price, and category distribution.</li>
                <li>Register the insights dashboard path in your URL configuration file (<code>urls.py</code>).</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Query Performance Note:</strong> Since Django QuerySets are evaluated lazily, all three database calls (aggregations and annotations) are executed in parallel when the context dictionary is evaluated in the view, minimizing database connection overhead.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#059669', borderColor: '#059669', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module10', 'intro_roles')}>
              Next: Day 10 — Advanced QuerySets &amp; Model Relations <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
