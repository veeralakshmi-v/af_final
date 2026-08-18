import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Database, Activity, RefreshCw, BarChart2, Zap, Plus, Trash2, Shield
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

export default function DjangoDay10({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module10', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Model Relationships Mock Database ── */
  const [addresses, setAddresses] = useState([
    { id: 1, street: '123 Elm St', city: 'Metropolis', state: 'NY', zip_code: '10001' },
    { id: 2, street: '456 Oak Rd', city: 'Gotham', state: 'NJ', zip_code: '07001' }
  ]);
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Super Supplier', contact_email: 'contact@supersupplier.com', contact_phone: '1234567890', addressId: 1 },
    { id: 2, name: 'Eco Distribution', contact_email: 'info@ecodist.com', contact_phone: '9876543210', addressId: 2 }
  ]);
  const [categories] = useState([
    { id: 1, name: 'Electronics', supplierId: 1 },
    { id: 2, name: 'Books', supplierId: 2 }
  ]);
  const [tags, setTags] = useState([
    { id: 1, name: 'Discounted' },
    { id: 2, name: 'New Arrival' },
    { id: 3, name: 'Bestseller' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', categoryId: 1, price: 1200.00, stock: 10, tagIds: [1, 2] },
    { id: 2, name: 'Keyboard', categoryId: 1, price: 49.00, stock: 25, tagIds: [1] },
    { id: 3, name: 'Python Book', categoryId: 2, price: 29.99, stock: 8, tagIds: [3] }
  ]);

  // Terminal & optimization metrics states
  const [shellLogs, setShellLogs] = useState([
    '>>> # Django Advanced ORM & Optimization Shell Initialized.',
    '>>> from inventory.models import Address, Supplier, Category, Product, Tag',
    '>>> # Select an Advanced Preset Query below...'
  ]);
  const [optimizationMode, setOptimizationMode] = useState(false); // select_related/prefetch_related toggle
  const [sqlQueriesCount, setSqlQueriesCount] = useState(0);

  const runPresetQuery = (type) => {
    let logs = [];
    if (type === 'annotate_value') {
      logs.push(`>>> # F expressions multiply fields directly on database level`);
      logs.push(`>>> from django.db.models import F`);
      logs.push(`>>> products = Product.objects.annotate(total_value=F('price') * F('stock'))`);
      products.forEach(p => {
        const val = p.price * p.stock;
        logs.push(`Product: "${p.name}" -> calculated total_value: $${val.toFixed(2)}`);
      });
    } else if (type === 'filter_high') {
      logs.push(`>>> # Filter annotated results (total_value > 1000)`);
      logs.push(`>>> from django.db.models import F`);
      logs.push(`>>> high_value = Product.objects.annotate(total_value=F('price') * F('stock')).filter(total_value__gt=1000)`);
      products.forEach(p => {
        const val = p.price * p.stock;
        if (val > 1000) {
          logs.push(`High Value Product: "${p.name}" (Value: $${val.toFixed(2)})`);
        }
      });
    } else if (type === 'opt_check') {
      if (optimizationMode) {
        logs.push(`>>> # OPTIMIZED QUERY SET`);
        logs.push(`>>> Product.objects.select_related('category').prefetch_related('tags')`);
        logs.push(`[SQL] SELECT * FROM product JOIN category ... (1 Join query)`);
        logs.push(`[SQL] SELECT * FROM tags WHERE id IN (1, 2, 3) (1 Prefetch query)`);
        logs.push(`Total SQL Queries Executed: 2`);
        setSqlQueriesCount(2);
      } else {
        logs.push(`>>> # N+1 QUERY PROBLEM (UNOPTIMIZED)`);
        logs.push(`>>> Product.objects.all()`);
        logs.push(`[SQL] SELECT * FROM product (1 query)`);
        products.forEach(p => {
          logs.push(`[SQL] SELECT * FROM category WHERE id = ${p.categoryId} (lazy load query per product)`);
          logs.push(`[SQL] SELECT * FROM tags JOIN product_tags ... WHERE product_id = ${p.id} (lazy load tags)`);
        });
        const total = 1 + (products.length * 2);
        logs.push(`Total SQL Queries Executed: ${total}`);
        setSqlQueriesCount(total);
      }
    } else if (type === 'add_o2o') {
      const newAddrId = addresses.length + 1;
      const newAddress = { id: newAddrId, street: '789 Pine Ave', city: 'Metropolis', state: 'NY', zip_code: '10005' };
      const newSup = { id: suppliers.length + 1, name: 'Pine Logistics', contact_email: 'pine@logistics.com', contact_phone: '5556667777', addressId: newAddrId };
      
      setAddresses(prev => [...prev, newAddress]);
      setSuppliers(prev => [...prev, newSup]);

      logs.push(`>>> # Create Address and related Supplier (One-to-One)`);
      logs.push(`>>> addr = Address.objects.create(street="789 Pine Ave", city="Metropolis", state="NY", zip_code="10005")`);
      logs.push(`>>> sup = Supplier.objects.create(name="Pine Logistics", address=addr)`);
      logs.push(`Supplier and One-to-One address created successfully.`);
    } else if (type === 'add_tag_m2m') {
      setProducts(prev => prev.map(p => {
        if (p.id === 3 && !p.tagIds.includes(1)) {
          return { ...p, tagIds: [...p.tagIds, 1] };
        }
        return p;
      }));
      logs.push(`>>> # Associate a tag to a product (Many-to-Many)`);
      logs.push(`>>> python_book = Product.objects.get(name="Python Book")`);
      logs.push(`>>> discounted_tag = Tag.objects.get(name="Discounted")`);
      logs.push(`>>> python_book.tags.add(discounted_tag)`);
      logs.push(`Tag associated successfully (Many-to-Many link table updated).`);
    }
    setShellLogs(prev => [...prev, ...logs]);
  };

  /* ── Quiz ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which relationship type is represented in Django models by models.OneToOneField?',
      opts: ['One-to-Many', 'Many-to-Many', 'One-to-One', 'Many-to-One'],
      ans: 2,
      exp: 'models.OneToOneField represents a One-to-One relationship where each instance of one model links to exactly one instance of another.'
    },
    {
      k: 'q2',
      q: 'How do select_related() and prefetch_related() help optimize queries?',
      opts: [
        'They compress the media files stored in the database',
        'They fetch related objects in a single database query using SQL joins or batching, preventing the N+1 query problem',
        'They automatically delete unused models from Django database',
        'They disable security CSRF tokens to speed up connection queries'
      ],
      ans: 1,
      exp: 'select_related() performs an SQL JOIN on ForeignKey/OneToOne fields. prefetch_related() runs a separate lookup query for Many-to-Many fields and aggregates the objects in python. Both reduce DB connection roundtrips (N+1 queries).'
    },
    {
      k: 'q3',
      q: 'What is the purpose of the django.db.models.F class in Django?',
      opts: [
        'It forces a page refresh in the client browser',
        'It allows referencing model fields directly in queries to perform calculations on the database server without loading them into memory',
        'It acts as a filter shortcut for category objects',
        'It executes a raw SQL format insert statement'
      ],
      ans: 1,
      exp: 'F expressions allow you to perform database-level operations referencing other fields on the same model (e.g. F("price") * F("stock")) without pulling the values into web server memory.'
    },
    {
      k: 'q4',
      q: 'If a category is deleted, what does on_delete=models.CASCADE do to the products inside it?',
      opts: [
        'It moves products to a general category',
        'It keeps products but nulls their category pointer',
        'It deletes all associated products automatically',
        'It raises a ProtectedError exception'
      ],
      ans: 2,
      exp: 'models.CASCADE automatically deletes any related objects (in this case, all products associated with that category) to maintain database referential integrity.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. INTRO TO RELATIONSHIPS ───────────────────────────────── */}
      {activeTab === 'intro_roles' && (
        <Section key="intro" eyebrow="Django • Day 10 • Module 01" title="Model Relationships in Django">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>⛓️ Relational Databases &amp; Django Fields</h3>
              <p style={{ color: '#e0e7ff', margin: 0, lineHeight: 1.7 }}>
                Real-world data is interconnected. Django models support relational mappings to connect tables together. Django provides fields for three types of database relationships: <strong>One-to-One</strong>, <strong>One-to-Many</strong>, and <strong>Many-to-Many</strong>.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Three Core Database Relationships</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { type: '1:1 One-to-One', model: 'Supplier ↔ Address', field: 'models.OneToOneField', desc: 'Each supplier has exactly one unique physical address.' },
                { type: '1:N One-to-Many', model: 'Category ↔ Product', field: 'models.ForeignKey', desc: 'A category holds many products. A product belongs to one category.' },
                { type: 'M:N Many-to-Many', model: 'Product ↔ Tag', field: 'models.ManyToManyField', desc: 'A product can have many tags, and a tag can label many products.' },
              ].map(({ type, model, field, desc }) => (
                <div key={type} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontWeight: 800, color: '#4f46e5', fontSize: '0.85rem', marginBottom: 4 }}>{type}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>{model}</div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#0284c7', margin: '4px 0' }}>{field}</div>
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('groups_permissions')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Code Implementation of Relationships <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. CODE IMPLEMENTATION ──────────────────────────────────── */}
      {activeTab === 'groups_permissions' && (
        <Section key="code_impl" eyebrow="Django • Day 10 • Module 02" title="Declaring Relationships in Models">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Define relationships inside your <code>models.py</code> files. Remember to set the mandatory <code>on_delete</code> behaviors for ForeignKey and OneToOneField.</p>

            <CodeBlock title="inventory/models.py — Address &amp; Supplier (One-to-One)" code={`from django.db import models

class Address(models.Model):
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15)
    # One-to-One link to Address table
    address = models.OneToOneField(Address, on_delete=models.CASCADE)`} />

            <CodeBlock title="inventory/models.py — Category, Tag &amp; Product (1:N &amp; M:N)" code={`class Category(models.Model):
    name = models.CharField(max_length=100)

class Tag(models.Model):
    name = models.CharField(max_length=50)

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    # One-to-Many Relationship (A Category has many Products)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    # Many-to-Many Relationship (Products can have multiple Tags)
    tags = models.ManyToManyField(Tag)`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('permission_required')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: F Expressions &amp; Filters <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. F EXPRESSIONS & ADVANCED QUERYSETS ────────────────────── */}
      {activeTab === 'permission_required' && (
        <Section key="adv_qs" eyebrow="Django • Day 10 • Module 03" title="Advanced QuerySets &amp; F() Expressions">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Django provides <strong>F expressions</strong> to perform queries and calculations on the database server. Combined with annotations and filter lookups, they construct optimized reporting queries.</p>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Calculating Values on Database Level</h3>
            <p>Instead of pulling all products and multiplying in Python, use `F` inside `.annotate()`:</p>
            <CodeBlock title="inventory/views.py — F expression multiplication" code={`from django.db.models import F
from django.shortcuts import render
from .models import Product

def product_report_with_value(request):
    # Calculate stock value (price * stock) inside database
    products = Product.objects.annotate(total_value=F('price') * F('stock'))
    
    return render(request, 'product_report_with_value.html', {
        'products': products
    })`} />

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Filtering Annotations</h3>
            <p>You can chain filters on annotated fields. For instance, getting high-value products (stock value &gt; 1000):</p>
            <CodeBlock title="Filtering with annotated field" code={`def high_value_products(request):
    # Annotate, then filter where calculated total_value > 1000
    high_value_products = Product.objects.annotate(
        total_value=F('price') * F('stock')
    ).filter(total_value__gt=1000)

    return render(request, 'high_value_products.html', {
        'high_value_products': high_value_products
    })`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('user_passes_test')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Query Set Optimization <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. QUERY OPTIMIZATION ────────────────────────────────────── */}
      {activeTab === 'user_passes_test' && (
        <Section key="optimization" eyebrow="Django • Day 10 • Module 04" title="Query Optimization (select_related &amp; prefetch_related)">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>By default, Django's database queries are <strong>lazy</strong>. If you fetch products and loop through them to display their category name, Django runs a separate SQL query *per product row*. This is known as the **N+1 query problem**.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#e11d48', fontWeight: 800, marginTop: 0 }}>🚫 N+1 Queries (Unoptimized)</h4>
                <code style={{ fontSize: '0.78rem', color: '#9f1239', display: 'block', marginBottom: 8 }}>
                  Product.objects.all()
                </code>
                <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0 }}>
                  Django fetches products (1 query). When rendering templates, it fetches category for product 1 (2nd query), category for product 2 (3rd query), etc. Highly inefficient!
                </p>
              </div>

              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#059669', fontWeight: 800, marginTop: 0 }}>⚡ Optimized (select_related)</h4>
                <code style={{ fontSize: '0.78rem', color: '#065f46', display: 'block', marginBottom: 8 }}>
                  Product.objects.select_related('category')
                </code>
                <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0 }}>
                  Django performs a single SQL JOIN in the database to fetch products and category fields at once. Only 1 query total!
                </p>
              </div>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>select_related vs prefetch_related</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Method</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Relationship Type</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>SQL Strategy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['select_related', 'ForeignKey, OneToOneField (Single object links)', 'SQL JOIN statement (Fetches fields together in 1 DB trip)'],
                  ['prefetch_related', 'ManyToManyField, Reverse ForeignKey (Multi-object links)', 'Separate SQL lookup with IN query (Aggregates lists in Python)'],
                ].map(([method, rel, sql]) => (
                  <tr key={method} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#4f46e5', fontWeight: 700 }}>{method}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.8rem', fontWeight: 600 }}>{rel}</td>
                    <td style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#64748b' }}>{sql}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <CodeBlock title="inventory/views.py — Optimized View" code={`def inventory_view(request):
    # Fetch category in the join query, and prefetch tags in a separate IN query
    products = Product.objects.select_related('category').prefetch_related('tags')
    
    return render(request, 'inventory/inventory.html', {
        'products': products,
    })`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('template_permissions')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: View &amp; HTML Setup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. TEMPLATE PERMISSIONS (VIEW & HTML SETUP) ───────────────── */}
      {activeTab === 'template_permissions' && (
        <Section key="tpl_perms" eyebrow="Django • Day 10 • Module 05" title="Displaying Relationships in Templates">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Access related properties on objects in your templates using Django's dot notation. Django handles Many-to-Many relationships via `.all` loops.</p>

            <CodeBlock title="templates/inventory/inventory.html — Products, Categories, and Tags" language="html" code={`<div class="row">
    {% for product in products %}
    <div class="col-md-4 mb-4">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">
                    <!-- Access ForeignKey Category properties -->
                    <strong>Category:</strong> {{ product.category.name }}<br>
                    <strong>Price:</strong> \${{ product.price }}<br>
                    <strong>Stock:</strong> {{ product.stock }}
                </p>
                
                <!-- Display Many-to-Many Tags -->
                <p>
                    <strong>Tags:</strong>
                    {% for tag in product.tags.all %}
                        <span class="badge bg-primary">{{ tag.name }}</span>
                    {% empty %}
                        <span class="text-muted">No tags</span>
                    {% endfor %}
                </p>
                
                <!-- Display One-to-One Supplier properties via Category -->
                {% if product.category.supplier %}
                <p>
                    <strong>Supplier:</strong> {{ product.category.supplier.name }}<br>
                    <strong>Email:</strong> {{ product.category.supplier.contact_email }}
                </p>
                {% endif %}
            </div>
        </div>
    </div>
    {% endfor %}
</div>`} />

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('admin_roles')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Django Admin Relationship Config <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 6. ADMIN CONFIGURATION ──────────────────────────────────── */}
      {activeTab === 'admin_roles' && (
        <Section key="admin_cfg" eyebrow="Django • Day 10 • Module 06" title="Registering Models in Admin">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>To populate relationships via Django's admin panels, register all associated tables in your application's <code>admin.py</code>:</p>

            <CodeBlock title="inventory/admin.py" code={`from django.contrib import admin
from .models import Address, Supplier, Category, Product, Tag

# Register all tables so they appear in /admin/
admin.site.register(Address)
admin.site.register(Supplier)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Tag)`} />

            <InfoBox icon={Shield} color="#047857" bg="#ecfdf5" border="#a7f3d0">
              <strong>Admin Admin Panel Fields:</strong> Once registered, Django automatically renders select dropdowns for ForeignKey and OneToOneField linkages, and multiselect list boxes for Many-to-Many associations.
            </InfoBox>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_roles')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Next: Advanced Query &amp; Relationship Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 7. INTERACTIVE RELATIONSHIPS SANDBOX ────────────────────── */}
      {activeTab === 'interactive_roles' && (
        <Section key="sandbox" eyebrow="Django • Day 10 • Module 07" title="Advanced QuerySet &amp; Relationship Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Interact with the database tables below. Compare unoptimized vs optimized queries, calculate values using F expressions, and view query log results.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '1rem', marginBottom: '1.5rem' }}>
              
              {/* Controls and Shell */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>⚡ Query Presets Controls</h4>
                  
                  {/* Optimization toggle */}
                  <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 12px', fontSize: '0.78rem', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Query Optimization Mode</span>
                    <button onClick={() => setOptimizationMode(!optimizationMode)} style={{ padding: '4px 8px', border: 'none', background: optimizationMode ? '#10b981' : '#64748b', color: 'white', fontWeight: 700, borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem' }}>
                      {optimizationMode ? 'select_related ENABLED' : 'select_related OFF'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <button onClick={() => runPresetQuery('opt_check')} style={{ flexGrow: 1, padding: '6px 8px', background: '#4f46e5', border: 'none', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: 6, fontWeight: 700 }}>
                      Run Products Query
                    </button>
                    <button onClick={() => runPresetQuery('annotate_value')} style={{ flexGrow: 1, padding: '6px 8px', background: '#4f46e5', border: 'none', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: 6, fontWeight: 700 }}>
                      F() Annotate Values
                    </button>
                    <button onClick={() => runPresetQuery('filter_high')} style={{ flexGrow: 1, padding: '6px 8px', background: '#4f46e5', border: 'none', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: 6, fontWeight: 700 }}>
                      Filter high value
                    </button>
                    <button onClick={() => runPresetQuery('add_o2o')} style={{ flexGrow: 1, padding: '6px 8px', background: '#0284c7', border: 'none', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: 6, fontWeight: 700 }}>
                      Create One-to-One Link
                    </button>
                    <button onClick={() => runPresetQuery('add_tag_m2m')} style={{ flexGrow: 1, padding: '6px 8px', background: '#0284c7', border: 'none', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: 6, fontWeight: 700 }}>
                      Add M2M Tag
                    </button>
                  </div>
                </div>

                {/* Database Tables Overview */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', maxHeight: 180, overflowY: 'auto' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>👥 Suppliers Addresses (One-to-One)</div>
                  {suppliers.map(s => {
                    const addr = addresses.find(a => a.id === s.addressId);
                    return (
                      <div key={s.id} style={{ fontSize: '0.74rem', borderBottom: '1px solid #e2e8f0', paddingBottom: 4, marginBottom: 4 }}>
                        <strong>{s.name}</strong> ↔ Address: <em>{addr ? `${addr.street}, ${addr.city}` : 'None'}</em>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ORM Shell and products table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155' }}>🐍 Interactive Advanced QuerySet Shell</div>
                  <div style={{ maxHeight: 110, minHeight: 110, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {shellLogs.map((log, i) => (
                      <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('>>> #') ? '#64748b' : log.startsWith('>>>') ? '#cbd5e1' : log.startsWith('[SQL]') ? '#f59e0b' : '#34d399' }}>{log}</pre>
                    ))}
                  </div>
                  {sqlQueriesCount > 0 && (
                    <div style={{ background: '#1e293b', padding: '4px 12px', fontSize: '0.7rem', color: '#f59e0b', borderTop: '1px solid #334155' }}>
                      ⚡ last query: {sqlQueriesCount} DB calls (select_related is {optimizationMode ? 'ACTIVE' : 'OFF'})
                    </div>
                  )}
                </div>

                {/* Product Database view */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 10, padding: 8 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>🗃️ Database Table: product_product</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                      <thead>
                        <tr style={{ background: '#f1f5f9', borderBottom: '1.5px solid #cbd5e1' }}>
                          <th style={{ padding: '4px 6px', textAlign: 'left' }}>Product</th>
                          <th style={{ padding: '4px 6px', textAlign: 'left' }}>Category</th>
                          <th style={{ padding: '4px 6px', textAlign: 'right' }}>Price</th>
                          <th style={{ padding: '4px 6px', textAlign: 'right' }}>Stock</th>
                          <th style={{ padding: '4px 6px', textAlign: 'left' }}>Tags (M2M)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => {
                          const catName = categories.find(c => c.id === p.categoryId)?.name || 'Unknown';
                          const pTags = p.tagIds.map(tId => tags.find(t => t.id === tId)?.name).filter(Boolean);
                          return (
                            <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '4px 6px', fontWeight: 600 }}>{p.name}</td>
                              <td style={{ padding: '4px 6px', color: '#7c3aed' }}>{catName}</td>
                              <td style={{ padding: '4px 6px', textAlign: 'right' }}>${p.price.toFixed(2)}</td>
                              <td style={{ padding: '4px 6px', textAlign: 'right', fontWeight: 600 }}>{p.stock}</td>
                              <td style={{ padding: '4px 6px' }}>
                                {pTags.map(tName => (
                                  <span key={tName} style={{ background: '#e0e7ff', color: '#4f46e5', padding: '1px 4px', borderRadius: 4, marginRight: 2, fontSize: '0.64rem' }}>{tName}</span>
                                ))}
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
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                Go to Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 8. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 10 Quiz — Advanced Querysets &amp; Relationships">
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
                      } else if (selected) { bg = '#e8eaf6'; border = '1.5px solid #3f51b5'; }
                      return (
                        <button key={oi} disabled={qDone} onClick={() => setQAns(p => ({ ...p, [item.k]: oi }))}
                          style={{ background: bg, border, padding: '0.6rem 1rem', borderRadius: 8, cursor: qDone ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {qDone && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', background: 'white', padding: '8px 12px', borderRadius: 6, borderLeft: '3px solid #3f51b5' }}>
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

      {/* ── 9. ASSIGNMENT ───────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 10 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Implement Advanced Model Relations &amp; Optimization Queries</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Apply relationships and write optimised views inside your inventory app:</p>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 7 }}>
                <li>Create <code>Address</code> and <code>Supplier</code> models in <code>inventory/models.py</code>, setting up the <code>models.OneToOneField</code> linkage.</li>
                <li>Add a <code>Tag</code> model and set up a Many-to-Many link (<code>models.ManyToManyField</code>) inside the <code>Product</code> model class.</li>
                <li>Run <code>python manage.py makemigrations</code> and <code>python manage.py migrate</code> to create the relational database tables.</li>
                <li>Open <code>inventory/admin.py</code> and register `Address`, `Supplier`, and `Tag` models to expose management controls in Django Admin.</li>
                <li>In your <code>views.py</code>, create an optimized inventory view using <code>select_related('category').prefetch_related('tags')</code>.</li>
                <li>Create the <code>inventory.html</code> template loop showing products, tag badges, and supplier detail panels safely.</li>
                <li>Add testing entries in your python database shell using <code>Supplier.objects.create()</code> and <code>product.tags.add(...)</code>.</li>
              </ol>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Query Optimization Reminder:</strong> Only use <code>select_related()</code> for ForeignKey or OneToOneField mappings, and <code>prefetch_related()</code> for ManyToManyField or reverse relation lists. Applying them incorrectly will trigger system model exceptions.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module11', 'intro_sessions')}>
              Next: Day 11 — Class-Based Views &amp; Mixins <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
