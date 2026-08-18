import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  Play, ArrowRight, Check, X, ShieldAlert, Laptop,
  Folder, File, ChevronRight, HelpCircle, Network, ZoomIn
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

export default function DjangoDay4({ activeTab, onNavigate }) {
  const go = (id) => { onNavigate('django_module4', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── Interactive Database state ── */
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Groceries' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Smart Phone', categoryId: 1, price: 699.00, quantity: 15 },
    { id: 2, name: 'Python Guide', categoryId: 2, price: 29.99, quantity: 12 }
  ]);

  /* ── Interactive Workspace states ── */
  const [activeFile, setActiveFile] = useState('forms');
  const [serverRunning, setServerRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(['Type "python manage.py runserver" to boot up sandbox environment...']);
  const [cmdInput, setCmdInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('http://127.0.0.1:8000/products/');

  // Editable Code Files
  const [formsCode, setFormsCode] = useState(`from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity']
        
    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price <= 0:
            raise forms.ValidationError("Price must be a positive number.")
        return price

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity < 1:
            raise forms.ValidationError("Quantity must be at least 1.")
        return quantity`);

  const [viewsCode, setViewsCode] = useState(`from django.shortcuts import render, redirect
from .forms import ProductForm

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'inventory/add_product.html', {'form': form})`);

  const [htmlCode, setHtmlCode] = useState(`{% extends 'base.html' %}

{% block content %}
<h2>Add Product Form</h2>
<form method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Submit</button>
</form>
{% endblock %}`);

  // Form Validation & Errors Simulation
  const [formInput, setFormInput] = useState({ name: '', category: '', price: '', quantity: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    let reply = '';
    if (cmd === 'python manage.py runserver') {
      setServerRunning(true);
      reply = 'Starting local server at http://127.0.0.1:8000/\nQuit the server with CONTROL-C.';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setCmdInput('');
      return;
    } else {
      reply = `Command "${cmd}" not recognized. Run "python manage.py runserver" to test forms.`;
    }

    setTerminalLogs(prev => [...prev, `> ${cmd}`, reply]);
    setCmdInput('');
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Run clean_price validation simulator
    const priceVal = parseFloat(formInput.price);
    if (isNaN(priceVal) || priceVal <= 0) {
      errors.price = "Price must be a positive number.";
    }

    // Run clean_quantity validation simulator
    const quantityVal = parseInt(formInput.quantity);
    if (isNaN(quantityVal) || quantityVal < 1) {
      errors.quantity = "Quantity must be at least 1.";
    }

    if (!formInput.name) {
      errors.name = "This field is required.";
    }
    if (!formInput.category) {
      errors.category = "Please select a valid category.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Save product model simulation
    const newProduct = {
      id: products.length + 1,
      name: formInput.name,
      categoryId: parseInt(formInput.category),
      price: priceVal,
      quantity: quantityVal
    };

    setProducts(prev => [...prev, newProduct]);
    setFormInput({ name: '', category: '', price: '', quantity: '' });
    setFormErrors({});
    setPreviewUrl('http://127.0.0.1:8000/products/');
  };

  /* ── Quiz States ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    { k: 'q1', q: 'What is the main benefit of using a Django ModelForm over a standard Form?',
      opts: [
        'It works without views and urls templates',
        'It automatically generates input fields and saves model instances directly to the database',
        'It does not require CSRF token checks',
        'It runs only client-side browser validations'
      ], ans: 1,
      exp: 'ModelForms maps properties of a database model class to form fields, saving boilerplate field definitions and handling database creation on save.' },
    { k: 'q2', q: 'In views.py, which function call checks both built-in settings and custom clean functions to validate fields?',
      opts: ['form.check_errors()', 'form.is_valid()', 'form.run_checks()', 'form.clean()'], ans: 1,
      exp: 'form.is_valid() runs all validation algorithms and checks if the form has zero active validation errors.' },
    { k: 'q3', q: 'To clean and validate a specific field named "price", what is the exact naming convention for the clean method?',
      opts: ['def validate_price(self):', 'def clean_price(self):', 'def verify_price(self):', 'def clean(self):'], ans: 1,
      exp: 'Django looks for methods named clean_<fieldname>() inside your Form class definition to run field-specific checks.' }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">
      {/* ── 1. INTRODUCTION ─────────────────────────────────────────────── */}
      {activeTab === 'intro_forms' && (
        <Section key="intro" eyebrow="Django • Day 4 • Module 01" title="Django Forms & ModelForms">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#0284c7,#0369a1)', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>📄 Introducing Django Forms & ModelForms</h3>
              <p style={{ color: 'white', opacity: 0.95, margin: 0, lineHeight: 1.7 }}>
                Django provides a powerful form-handling system that automates rendering HTML inputs, validating client submissions on the server, handling validation errors, and mapping inputs directly to database records. Django features two primary types of forms: standard **Forms** and model-linked **ModelForms**.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>1. Coding a Standard Django Form (forms.Form)</h3>
            <p>Standard Django Forms inherit from <code>forms.Form</code>. You manually define form fields, field options, and rendering widgets. This is ideal for actions not tied to database schemas (e.g. search bars, contact forms, calculations):</p>

            <CodeBlock title="invent_app/forms.py (Standard Form)" code={`from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, label="Your Name", required=True)
    email = forms.EmailField(label="Your Email", required=True)
    message = forms.CharField(widget=forms.Textarea, label="Your Message")`} />

            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Processing standard forms in views.py:</h4>
            <CodeBlock title="invent_app/views.py" code={`from django.shortcuts import render, redirect
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        # Bind incoming POST values to ContactForm
        form = ContactForm(request.POST)
        
        # Runs validations on all fields
        if form.is_valid():
            # Extract validated, type-safe data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            
            # (Execute custom business actions like sending emails here)
            return redirect('success_url')
    else:
        # Render empty form fields on GET request
        form = ContactForm()
        
    return render(request, 'inventory/contact.html', {'form': form})`} />

            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Rendering standard forms in templates:</h4>
            <CodeBlock title="templates/inventory/contact.html" language="html" code={`<form method="POST">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Send Message</button>
</form>`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '2rem' }}>2. Standard Form vs ModelForm Comparison</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Approach</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Validation Method</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Database Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>HTML Form</td>
                  <td style={{ padding: '10px' }}>Manual Javascript validation checks</td>
                  <td style={{ padding: '10px' }}>Manually parse inputs and execute SQL queries.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>Django Form (Standard)</td>
                  <td style={{ padding: '10px', color: '#0284c7', fontWeight: 600 }}>Python form classes with clean methods</td>
                  <td style={{ padding: '10px' }}>Extract fields individually inside views and write save code.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px', fontWeight: 700 }}>ModelForm</td>
                  <td style={{ padding: '10px', color: '#0369a1', fontWeight: 600 }}>Auto-extracted properties + custom clean hooks</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#16a34a' }}>Simply execute form.save() in the view.</td>
                </tr>
              </tbody>
            </table>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('forms_py')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: forms.py Creation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. FORMS.PY CREATION ─────────────────────────────────────────── */}
      {activeTab === 'forms_py' && (
        <Section key="forms" eyebrow="Django • Day 4 • Module 02" title="Creating forms.py & Custom Clean Hooks">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Create a file named <code>forms.py</code> inside your application folder. Here, we define our form. Using <code>forms.ModelForm</code>, we link the form directly to our <code>Product</code> model class and specify the fields we want to expose:</p>

            <CodeBlock title="invent_app/forms.py" code={`from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'category', 'price', 'quantity']
        
    # Custom validation for price
    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price <= 0:
            raise forms.ValidationError("Price must be a positive number.")
        return price

    # Custom validation for quantity
    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity < 1:
            raise forms.ValidationError("Quantity must be at least 1.")
        return quantity`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Understanding the Class Meta & Custom Clean Hooks</h3>
            <ul>
              <li><strong>class Meta configuration</strong>: Tells Django which database model class to inspect (<code>model = Product</code>) and which model attributes to convert into HTML form field elements (<code>fields = [...]</code>).</li>
              <li><strong>Field-Specific Clean Hooks (<code>clean_&lt;fieldname&gt;()</code>)</strong>: Special methods Django looks for during validation. They extract the field value from <code>self.cleaned_data</code>, apply custom checks (like checking if price &gt; 0), raise a <code>ValidationError</code> on failure, and return the cleaned value on success.</li>
              <li><strong>cleaned_data dictionary</strong>: Holds parsed, sanitized, and type-converted input values after validations have passed.</li>
            </ul>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 12, display: 'flex', gap: 8, color: '#166534', marginTop: '1.5rem' }}>
              <CheckCircle size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem' }}>
                <strong>Key Method:</strong> Django automatically triggers methods named <code>clean_&lt;fieldname&gt;()</code> during form validations when calling <code>form.is_valid()</code>.
              </span>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('views_form')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: views.py Setup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. VIEWS.PY SETUP ───────────────────────────────────────────── */}
      {activeTab === 'views_form' && (
        <Section key="views" eyebrow="Django • Day 4 • Module 03" title="Updating views.py for ModelForm">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Import <code>ProductForm</code> inside your <code>views.py</code>. We will update the <code>add_product</code> view to instantiate, validate, and save our form data:</p>

            <CodeBlock title="invent_app/views.py" code={`from django.shortcuts import render, redirect
from .forms import ProductForm

def add_product(request):
    if request.method == 'POST':
        # Bind POST data payload to the form class structure
        form = ProductForm(request.POST)
        
        # Runs field validations and custom clean hooks
        if form.is_valid():
            # Saves category/product directly into database tables!
            form.save() 
            return redirect('product_list')
    else:
        # Instantiate an empty form for initial GET requests
        form = ProductForm()
        
    return render(request, 'inventory/add_product.html', {'form': form})`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Breakdown of ModelForm View Controller Flow</h3>
            <ul>
              <li><strong>POST Request Handling</strong>: Instantiates the form with <code>request.POST</code> parameters, binding user inputs directly to the form fields.</li>
              <li><strong>form.is_valid()</strong>: Triggers Django's complete validation routine. It validates input types, checks Meta field requirements, and runs custom <code>clean_price()</code> and <code>clean_quantity()</code> validator methods. If all fields are valid, it returns <code>True</code>. Otherwise, it stores errors inside <code>form.errors</code> and returns <code>False</code>.</li>
              <li><strong>form.save()</strong>: Writes the form data directly to the database. Since it is a ModelForm, Django knows how to create the table record without manual parsing.</li>
              <li><strong>GET Request Handling</strong>: Instantiates a clean, empty form instance (<code>ProductForm()</code>) to render empty input fields on the screen.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('templates_form')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Templates Setup <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. TEMPLATES SETUP ──────────────────────────────────────────── */}
      {activeTab === 'templates_form' && (
        <Section key="templates" eyebrow="Django • Day 4 • Module 04" title="Rendering ModelForms and Bootstrap Validation Errors">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Update <code>add_product.html</code> to display error loops and field validation status classes. We will loop over errors manually to customize Bootstrap styles:</p>

            <CodeBlock title="templates/inventory/add_product.html" language="html" code={`{% extends 'base.html' %}

{% block content %}
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-center mb-4">Add New Product</h2>
      
      <form method="POST" class="border p-4 rounded shadow-sm bg-light">
        {% csrf_token %}
        
        <!-- Render form-wide validation issues -->
        {{ form.non_field_errors }}
        
        <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input type="text" class="form-control {% if form.name.errors %}is-invalid{% endif %}" 
                 id="name" name="name" value="{{ form.name.value|default:'' }}">
          <div class="invalid-feedback">
            {% for error in form.name.errors %}{{ error }}{% endfor %}
          </div>
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          {{ form.category }}
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" step="0.01" class="form-control {% if form.price.errors %}is-invalid{% endif %}" 
                 id="price" name="price" value="{{ form.price.value|default:'' }}">
          <div class="invalid-feedback">
            {% for error in form.price.errors %}{{ error }}{% endfor %}
          </div>
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input type="number" class="form-control {% if form.quantity.errors %}is-invalid{% endif %}" 
                 id="quantity" name="quantity" value="{{ form.quantity.value|default:'' }}">
          <div class="invalid-feedback">
            {% for error in form.quantity.errors %}{{ error }}{% endfor %}
          </div>
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}`} />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Understanding Template Form Rendering & Error Loops</h3>
            <ul>
              <li><strong>form.non_field_errors</strong>: Displays errors that aren't tied to a specific field (e.g. cross-field validation rules).</li>
              <li><strong>{"{% if form.name.errors %}"}</strong>: Checks if the input field failed validation, letting you apply error classes (like Bootstrap's <code>is-invalid</code> class) to highlight fields.</li>
              <li><strong>form.field.value|default:''</strong>: Populates the input field with the previously submitted value so the user doesn't have to re-enter everything when fixing errors.</li>
              <li><strong>invalid-feedback</strong>: Renders error messages directly below their respective inputs when parent fields have the <code>is-invalid</code> class.</li>
            </ul>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('interactive_workspace_form')} style={{ background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Next: Sandbox Workspace <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. INTERACTIVE WORKSPACE ────────────────────────────────────── */}
      {activeTab === 'interactive_workspace_form' && (
        <Section key="workspace" eyebrow="Django • Day 4 • Module 05" title="Interactive Workspace: ModelForms Validation Sandbox">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>
              Verify Python ModelForm validations, database updates, and Bootstrap error fields using the editor below. Type <code>python manage.py runserver</code> to begin!
            </p>

            <div style={{ background: '#e2e8f0', borderRadius: 16, padding: '1rem', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', minHeight: 400 }}>
                {/* File Tree Explorer */}
                <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#475569', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>📁 invent_app</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <button onClick={() => setActiveFile('forms')} style={{ background: activeFile === 'forms' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#0284c7" /> forms.py
                    </button>
                    <button onClick={() => setActiveFile('views')} style={{ background: activeFile === 'views' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#059669" /> views.py
                    </button>
                    <button onClick={() => setActiveFile('html')} style={{ background: activeFile === 'html' ? '#e2e8f0' : 'transparent', border: 'none', padding: '6px 8px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 6, alignItems: 'center', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      <File size={14} color="#eab308" /> add_product.html
                    </button>
                  </div>
                </div>

                {/* Editor Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: 8, border: '1px solid #1e293b', overflow: 'hidden' }}>
                  <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.76rem', color: '#cbd5e1', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>✏️ Interactive File Editor ({activeFile === 'forms' ? 'forms.py' : activeFile === 'views' ? 'views.py' : 'add_product.html'})</span>
                    <span style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, color: '#8b949e', fontSize: '0.7rem' }}>auto-saved</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {activeFile === 'forms' && (
                      <textarea className="form-control" value={formsCode} onChange={e => setFormsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'views' && (
                      <textarea className="form-control" value={viewsCode} onChange={e => setViewsCode(e.target.value)}
                        style={{ background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', flexGrow: 1, resize: 'none', border: 'none', padding: 12, minHeight: 200, outline: 'none' }} />
                    )}
                    {activeFile === 'html' && (
                      <textarea className="form-control" value={htmlCode} onChange={e => setHtmlCode(e.target.value)}
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
                        {previewUrl === 'http://127.0.0.1:8000/products/' ? (
                          <div>
                            <header style={{ background: '#333', color: 'white', padding: '12px', textAlign: 'center' }}>
                              <h1 style={{ margin: 0, fontSize: '1.1rem' }}>Inventory Management System</h1>
                              <nav style={{ marginTop: '4px', fontSize: '0.75rem' }}>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer', marginRight: 10 }}>Products</span>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/add-product/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer' }}>Add Product</span>
                              </nav>
                            </header>

                            <div style={{ padding: '15px', minHeight: '130px', background: '#ffffff', margin: '10px', borderRadius: 6 }}>
                              <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Product List</h3>
                              <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '0.8rem', lineHeight: '1.5' }}>
                                {products.map((p, idx) => {
                                  const cat = categories.find(c => c.id === p.categoryId)?.name || 'General';
                                  return (
                                    <li key={idx}><strong>{p.name.toUpperCase()}</strong> - {p.quantity} units (${p.price.toFixed(2)}) - <span style={{ color: '#64748b', fontSize: '0.72rem' }}>{cat}</span></li>
                                  );
                                })}
                              </ul>
                              <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/add-product/')} style={{ display: 'inline-block', color: '#2563eb', textDecoration: 'underline', fontSize: '0.78rem', marginTop: 8, cursor: 'pointer' }}>Add New Product</span>
                            </div>
                          </div>
                        ) : previewUrl === 'http://127.0.0.1:8000/add-product/' ? (
                          <div>
                            <header style={{ background: '#333', color: 'white', padding: '12px', textAlign: 'center' }}>
                              <h1 style={{ margin: 0, fontSize: '1.1rem' }}>Inventory Management System</h1>
                              <nav style={{ marginTop: '4px', fontSize: '0.75rem' }}>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/products/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer', marginRight: 10 }}>Products</span>
                                <span onClick={() => setPreviewUrl('http://127.0.0.1:8000/add-product/')} style={{ color: '#60a5fa', textDecoration: 'underline', cursor: 'pointer' }}>Add Product</span>
                              </nav>
                            </header>

                            <div style={{ padding: '15px', background: '#ffffff', margin: '10px', borderRadius: 6 }}>
                              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', textAlign: 'center' }}>Add New Product (ModelForm Sandbox)</h3>
                              
                              <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '270px', margin: '0 auto', fontSize: '0.78rem' }}>
                                <div>
                                  <label style={{ fontWeight: 600, display: 'block' }}>Product Name</label>
                                  <input type="text" value={formInput.name} onChange={e => setFormInput(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', padding: '4px 6px', border: formErrors.name ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 4 }} />
                                  {formErrors.name && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{formErrors.name}</span>}
                                </div>

                                <div>
                                  <label style={{ fontWeight: 600, display: 'block' }}>Category</label>
                                  <select value={formInput.category} onChange={e => setFormInput(p => ({ ...p, category: e.target.value }))} style={{ width: '100%', padding: '4px 6px', border: formErrors.category ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 4, background: 'white' }}>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                  </select>
                                  {formErrors.category && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>{formErrors.category}</span>}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                  <div>
                                    <label style={{ fontWeight: 600, display: 'block' }}>Price</label>
                                    <input type="number" step="0.01" value={formInput.price} onChange={e => setFormInput(p => ({ ...p, price: e.target.value }))} placeholder="0.00" style={{ width: '100%', padding: '4px 6px', border: formErrors.price ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 4 }} />
                                    {formErrors.price && <span style={{ color: '#ef4444', fontSize: '0.7rem', display: 'block' }}>{formErrors.price}</span>}
                                  </div>
                                  <div>
                                    <label style={{ fontWeight: 600, display: 'block' }}>Quantity</label>
                                    <input type="number" value={formInput.quantity} onChange={e => setFormInput(p => ({ ...p, quantity: e.target.value }))} placeholder="0" style={{ width: '100%', padding: '4px 6px', border: formErrors.quantity ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: 4 }} />
                                    {formErrors.quantity && <span style={{ color: '#ef4444', fontSize: '0.7rem', display: 'block' }}>{formErrors.quantity}</span>}
                                  </div>
                                </div>

                                <button type="submit" style={{ padding: '6px', background: '#0284c7', color: 'white', border: 'none', fontWeight: 700, borderRadius: 4, marginTop: 4, cursor: 'pointer' }}>Add Product</button>
                              </form>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '20px', background: '#ffffcc', color: '#7a2200', fontSize: '0.85rem' }}>
                            <h3 style={{ margin: 0, color: '#b91c1c' }}>Page not found (404)</h3>
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
                      <input className="form-control" type="text" value={cmdInput} onChange={e => setCmdInput(e.target.value)} placeholder="Type command (e.g. python manage.py runserver)..."
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

      {/* ── 6. QUIZ ─────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 4 Quiz — ModelForms & Validations">
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

      {/* ── 7. ASSIGNMENT ──────────────────────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Checklist" title="Day 4 Coding Exercise">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800 }}>Exercise: Implement ModelForm Validations</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 12px' }}>Complete the following steps on your local system using Django forms configuration:</p>
              
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Create <code>forms.py</code> inside your app directory and declare a new class <code>ProductForm</code> inheriting from <code>forms.ModelForm</code>.</li>
                <li>Write two custom validator methods: <code>clean_price</code> (checks if price is positive) and <code>clean_quantity</code> (checks if quantity is at least 1), raising <code>forms.ValidationError</code> for failures.</li>
                <li>Import your form inside <code>views.py</code>, instantiate it in the <code>add_product</code> view, check validity via <code>form.is_valid()</code>, and save data with <code>form.save()</code>.</li>
                <li>Edit <code>add_product.html</code> to display error loops and field validation highlights (`is-invalid` and `invalid-feedback` classes).</li>
                <li>Launch the local server pipeline: <code>python manage.py runserver</code>. Check inputs by typing invalid values to trigger errors!</li>
              </ol>
            </div>

            <button className="btn btn-primary" style={{ backgroundColor: '#0ea5e9', borderColor: '#0ea5e9', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => onNavigate('django_module5', 'intro_crud')}>
              Next: Day 5 — CRUD Operations <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
