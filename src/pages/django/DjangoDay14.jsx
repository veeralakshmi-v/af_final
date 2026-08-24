import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Code, Terminal, CheckCircle, FileText,
  ArrowRight, ShieldAlert, Laptop, Users, Settings, RefreshCw, BarChart2,
  Search, Filter, Plus, Calendar, DollarSign, Eye, Edit, Trash2, Check, X,
  Building, UserCheck, Briefcase
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

export default function DjangoDay14({ activeTab, onNavigate, openAITutor }) {
  const go = (id) => { onNavigate('django_module14', id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  /* ── File Explorer State ── */
  const [selectedFile, setSelectedFile] = useState('models.py');

  const filesCode = {
    'settings.py': `# employee_portal/settings.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-prod-enterprise-key-example'

DEBUG = False
ALLOWED_HOSTS = ['company.internal', 'localhost', '127.0.0.1']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Internal Applications
    'directory',
    'leave_management',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'employee_portal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/directory/'
LOGOUT_REDIRECT_URL = '/login/'`,

    'models.py': `# directory/models.py
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=500000.00)
    head_of_department = models.ForeignKey(
        'Employee', on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_department'
    )

    def __str__(self):
        return f"{self.name} ({self.code})"

    class Meta:
        ordering = ['name']

class Employee(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('On Leave', 'On Leave'),
        ('Terminated', 'Terminated'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, default="+1-555-0199")
    job_title = models.CharField(max_length=100, default="Software Engineer")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='employees')
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subordinates')
    salary = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(30000)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    hire_date = models.DateField(auto_now_add=True)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.full_name} - {self.job_title}"

    class Meta:
        ordering = ['-hire_date']

class LeaveRequest(models.Model):
    LEAVE_TYPES = [
        ('Paid Annual', 'Paid Annual Leave'),
        ('Sick Leave', 'Sick Leave'),
        ('Unpaid', 'Unpaid Leave'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending Approval'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.CharField(max_length=30, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.full_name} ({self.leave_type}: {self.status})"`,

    'forms.py': `# directory/forms.py
from django import forms
from .models import Employee, LeaveRequest, Department

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['first_name', 'last_name', 'email', 'phone', 'job_title', 'department', 'manager', 'salary', 'status']
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Jane'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Doe'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'jane.doe@company.com'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '+1-555-0199'}),
            'job_title': forms.TextInput(attrs={'class': 'form-control'}),
            'department': forms.Select(attrs={'class': 'form-select'}),
            'manager': forms.Select(attrs={'class': 'form-select'}),
            'salary': forms.NumberInput(attrs={'class': 'form-control'}),
            'status': forms.Select(attrs={'class': 'form-select'}),
        }

    # 1. Custom Clean Validation: Email Domain Verification
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and not email.endswith('@company.com'):
            raise forms.ValidationError("Corporate Security Policy: Only @company.com email addresses are permitted.")
        return email

    # 2. Custom Clean Validation: Minimum Salary Threshold Check
    def clean_salary(self):
        salary = self.cleaned_data.get('salary')
        if salary and salary < 35000:
            raise forms.ValidationError("Salary cannot be below the company minimum threshold ($35,000.00).")
        return salary

class LeaveRequestForm(forms.ModelForm):
    class Meta:
        model = LeaveRequest
        fields = ['leave_type', 'start_date', 'end_date', 'reason']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'end_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'reason': forms.Textarea(attrs={'rows': 3, 'class': 'form-control'}),
        }

    # Form-wide Clean Validation: Date Range Verification
    def clean(self):
        cleaned_data = super().clean()
        start = cleaned_data.get('start_date')
        end = cleaned_data.get('end_date')
        if start and end and end < start:
            raise forms.ValidationError("End date cannot precede the start date.")
        return cleaned_data`,

    'views.py': `# directory/views.py
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.urls import reverse_lazy
from django.db.models import Q, Count, Sum, Avg
from .models import Employee, Department, LeaveRequest
from .forms import EmployeeForm, LeaveRequestForm

# 1. Employee Directory List View with Search, Filtering & Pagination
class EmployeeListView(LoginRequiredMixin, ListView):
    model = Employee
    template_name = 'directory/employee_list.html'
    context_object_name = 'employees'
    paginate_by = 10

    def get_queryset(self):
        queryset = Employee.objects.select_related('department', 'manager').all()
        
        # Search filter
        q = self.request.GET.get('q')
        if q:
            queryset = queryset.filter(
                Q(first_name__icontains=q) | 
                Q(last_name__icontains=q) | 
                Q(email__icontains=q) |
                Q(job_title__icontains=q)
            )
            
        # Department filter
        dept_id = self.request.GET.get('dept')
        if dept_id:
            queryset = queryset.filter(department_id=dept_id)

        # Status filter
        status = self.request.GET.get('status')
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['departments'] = Department.objects.all()
        return context

# 2. Employee Profile Detail View
class EmployeeDetailView(LoginRequiredMixin, DetailView):
    model = Employee
    template_name = 'directory/employee_detail.html'
    context_object_name = 'employee'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['leaves'] = self.object.leave_requests.all().order_by('-created_at')
        context['subordinates'] = self.object.subordinates.all()
        return context

# 3. Create Employee View
class EmployeeCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'directory.add_employee'
    model = Employee
    form_class = EmployeeForm
    template_name = 'directory/employee_form.html'
    success_url = reverse_lazy('employee_list')

# 4. Update Employee View
class EmployeeUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    permission_required = 'directory.change_employee'
    model = Employee
    form_class = EmployeeForm
    template_name = 'directory/employee_form.html'
    success_url = reverse_lazy('employee_list')

# 5. Department Executive Analytics View (ORM Aggregation)
class DepartmentAnalyticsView(LoginRequiredMixin, TemplateView):
    template_name = 'directory/analytics.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['dept_stats'] = Department.objects.annotate(
            emp_count=Count('employees'),
            total_payroll=Sum('employees__salary'),
            avg_salary=Avg('employees__salary')
        )
        context['overall_stats'] = Employee.objects.aggregate(
            total_staff=Count('id'),
            total_budget=Sum('salary'),
            avg_pay=Avg('salary')
        )
        return context`,

    'urls.py': `# employee_portal/urls.py
from django.contrib import admin
from django.urls import path, include
from directory.views import (
    EmployeeListView, EmployeeDetailView, 
    EmployeeCreateView, EmployeeUpdateView, 
    DepartmentAnalyticsView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', EmployeeListView.as_view(), name='employee_list'),
    path('employee/<int:pk>/', EmployeeDetailView.as_view(), name='employee_detail'),
    path('employee/add/', EmployeeCreateView.as_view(), name='employee_add'),
    path('employee/<int:pk>/edit/', EmployeeUpdateView.as_view(), name='employee_edit'),
    path('analytics/', DepartmentAnalyticsView.as_view(), name='department_analytics'),
]`,

    'employee_list.html': `<!-- templates/directory/employee_list.html -->
{% extends "base.html" %}
{% block content %}
<div class="container py-4">
    <!-- Header Controls -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="fw-bold text-dark mb-0">Corporate Directory</h2>
            <p class="text-muted small">Manage staff records, roles, and department assignments</p>
        </div>
        <a href="{% url 'employee_add' %}" class="btn btn-primary fw-bold">+ Add Employee</a>
    </div>

    <!-- Search & Filter Bar -->
    <form method="get" class="row g-2 mb-4 bg-light p-3 rounded border">
        <div class="col-md-5">
            <input type="text" name="q" value="{{ request.GET.q }}" class="form-control" placeholder="Search by name, email, title...">
        </div>
        <div class="col-md-3">
            <select name="dept" class="form-select">
                <option value="">All Departments</option>
                {% for dept in departments %}
                <option value="{{ dept.id }}" {% if request.GET.dept == dept.id|stringformat:"i" %}selected{% endif %}>
                    {{ dept.name }}
                </option>
                {% endfor %}
            </select>
        </div>
        <div class="col-md-2">
            <select name="status" class="form-select">
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
            </select>
        </div>
        <div class="col-md-2 d-grid">
            <button type="submit" class="btn btn-secondary">Filter Directory</button>
        </div>
    </form>

    <!-- Employees Data Grid Table -->
    <div class="card shadow-sm border-0">
        <div class="card-body p-0">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>Employee</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {% for employee in employees %}
                    <tr>
                        <td>
                            <div class="fw-bold text-dark">{{ employee.full_name }}</div>
                            <small class="text-muted">{{ employee.email }}</small>
                        </td>
                        <td>{{ employee.job_title }}</td>
                        <td><span class="badge bg-info text-dark">{{ employee.department.name }}</span></td>
                        <td class="fw-bold text-success">\${{ employee.salary|floatformat:2 }}</td>
                        <td>
                            <span class="badge {% if employee.status == 'Active' %}bg-success{% elif employee.status == 'On Leave' %}bg-warning text-dark{% else %}bg-danger{% endif %}">
                                {{ employee.status }}
                            </span>
                        </td>
                        <td class="text-end">
                            <a href="{% url 'employee_detail' employee.pk %}" class="btn btn-sm btn-outline-primary me-1">View</a>
                            <a href="{% url 'employee_edit' employee.pk %}" class="btn btn-sm btn-outline-secondary">Edit</a>
                        </td>
                    </tr>
                    {% empty %}
                    <tr>
                        <td colspan="6" class="text-center py-4 text-muted">No employees found matching the specified criteria.</td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
        </div>
    </div>
</div>
{% endblock %}`,

    'analytics.html': `<!-- templates/directory/analytics.html -->
{% extends "base.html" %}
{% block content %}
<div class="container py-4">
    <h2 class="fw-bold mb-4">Executive Payroll &amp; Department Analytics</h2>

    <!-- Metrics Cards -->
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card bg-primary text-white p-3">
                <div class="small text-white-50 uppercase">Total Headcount</div>
                <div class="display-6 fw-bold">{{ overall_stats.total_staff }} Staff</div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-success text-white p-3">
                <div class="small text-white-50 uppercase">Total Payroll Expenditure</div>
                <div class="display-6 fw-bold">\${{ overall_stats.total_budget|floatformat:0 }}</div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-info text-dark p-3">
                <div class="small text-muted uppercase">Average Compensation</div>
                <div class="display-6 fw-bold">\${{ overall_stats.avg_pay|floatformat:0 }}</div>
            </div>
        </div>
    </div>

    <!-- Department ORM Breakdown Table -->
    <table class="table table-bordered bg-white shadow-sm">
        <thead class="table-light">
            <tr>
                <th>Department</th>
                <th>Employee Count</th>
                <th>Total Payroll Budget</th>
                <th>Average Salary</th>
            </tr>
        </thead>
        <tbody>
            {% for dept in dept_stats %}
            <tr>
                <td class="fw-bold">{{ dept.name }}</td>
                <td>{{ dept.emp_count }} Employees</td>
                <td class="text-success fw-bold">\${{ dept.total_payroll|floatformat:2 }}</td>
                <td>\${{ dept.avg_salary|floatformat:2 }}</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</div>
{% endblock %}`
  };

  /* ── Enterprise Live Portal Sandbox State ── */
  const [activePortalTab, setActivePortalTab] = useState('directory'); // 'directory', 'add', 'leave', 'analytics'
  
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@company.com', phone: '+1-555-0101', jobTitle: 'Lead Software Architect', dept: 'Engineering', salary: 135000, status: 'Active', hireDate: '2022-03-15', manager: 'Self (VP Eng)' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@company.com', phone: '+1-555-0102', jobTitle: 'HR Talent Director', dept: 'HR & Talent', salary: 98000, status: 'Active', hireDate: '2021-06-10', manager: 'Alice Johnson' },
    { id: 3, firstName: 'Carol', lastName: 'Davis', email: 'carol.davis@company.com', phone: '+1-555-0103', jobTitle: 'Senior UI/UX Designer', dept: 'Product Design', salary: 110000, status: 'On Leave', hireDate: '2023-01-20', manager: 'Alice Johnson' },
    { id: 4, firstName: 'David', lastName: 'Miller', email: 'david.miller@company.com', phone: '+1-555-0104', jobTitle: 'DevOps & Cloud Engineer', dept: 'Engineering', salary: 125000, status: 'Active', hireDate: '2023-08-01', manager: 'Alice Johnson' },
    { id: 5, firstName: 'Elena', lastName: 'Rostova', email: 'elena.rostova@company.com', phone: '+1-555-0105', jobTitle: 'Financial Controller', dept: 'Finance', salary: 115000, status: 'Active', hireDate: '2020-11-05', manager: 'Bob Smith' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 101, empName: 'Carol Davis', type: 'Paid Annual', start: '2026-09-01', end: '2026-09-10', reason: 'Family vacation & rest', status: 'Approved' },
    { id: 102, empName: 'David Miller', type: 'Sick Leave', start: '2026-08-25', end: '2026-08-27', reason: 'Flu recovery', status: 'Pending' }
  ]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedEmpModal, setSelectedEmpModal] = useState(null);

  // Form State
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formJobTitle, setFormJobTitle] = useState('Software Engineer');
  const [formDept, setFormDept] = useState('Engineering');
  const [formSalary, setFormSalary] = useState('85000');
  const [formManager, setFormManager] = useState('Alice Johnson');

  // Leave Form State
  const [leaveEmpId, setLeaveEmpId] = useState('1');
  const [leaveType, setLeaveType] = useState('Paid Annual');
  const [leaveStart, setLeaveStart] = useState('2026-09-15');
  const [leaveEnd, setLeaveEnd] = useState('2026-09-20');
  const [leaveReason, setLeaveReason] = useState('Attending Tech Conference');

  // ORM & SQL Simulator Terminal Logs
  const [simLogs, setSimLogs] = useState([
    '[ORM Query] Employee.objects.select_related("department", "manager").all() -> Loaded 5 staff records.',
    'System: Enterprise Employee Portal MVT Sandbox initialized & ready.'
  ]);

  const logAction = (msg) => setSimLogs(prev => [msg, ...prev]);

  // Filtered employees memo
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.jobTitle}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = filterDept === 'All' || emp.dept === filterDept;
      const matchStatus = filterStatus === 'All' || emp.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, searchTerm, filterDept, filterStatus]);

  // Add Employee Handler with Form Validation Checks
  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!formFirstName.trim() || !formLastName.trim() || !formEmail.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    // 1. clean_email() validation
    if (!formEmail.endsWith('@company.com')) {
      logAction(`[ValidationError] clean_email() rejected "${formEmail}". Reason: Corporate Policy dictates domain must end with "@company.com".`);
      alert('Form Error: Email must end with @company.com');
      return;
    }

    // 2. clean_salary() validation
    const numSalary = parseFloat(formSalary);
    if (isNaN(numSalary) || numSalary < 35000) {
      logAction(`[ValidationError] clean_salary() rejected "$${formSalary}". Reason: Salary cannot be below minimum threshold ($35,000.00).`);
      alert('Form Error: Minimum salary threshold is $35,000');
      return;
    }

    const newEmp = {
      id: employees.length + 1,
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
      phone: formPhone || '+1-555-0199',
      jobTitle: formJobTitle,
      dept: formDept,
      salary: numSalary,
      status: 'Active',
      hireDate: new Date().toISOString().split('T')[0],
      manager: formManager
    };

    setEmployees(prev => [newEmp, ...prev]);
    logAction(`[ORM DB Insert] Employee.objects.create(name="${formFirstName} ${formLastName}", email="${formEmail}", dept="${formDept}", salary=${numSalary})`);
    logAction(`[HTTP Redirect] 302 FOUND -> Redirecting to employee_list.html`);
    
    // Reset Form
    setFormFirstName('');
    setFormLastName('');
    setFormEmail('');
    setFormPhone('');
    setActivePortalTab('directory');
  };

  // Toggle Employee Status Handler
  const handleToggleStatus = (id) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        const nextStatus = emp.status === 'Active' ? 'On Leave' : emp.status === 'On Leave' ? 'Terminated' : 'Active';
        logAction(`[ORM Update] Employee.objects.filter(id=${id}).update(status="${nextStatus}")`);
        return { ...emp, status: nextStatus };
      }
      return emp;
    }));
  };

  // Delete Employee Handler
  const handleDeleteEmployee = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} from the database?`)) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      logAction(`[ORM Delete] Employee.objects.get(id=${id}).delete() -> Removed record "${name}".`);
      if (selectedEmpModal && selectedEmpModal.id === id) setSelectedEmpModal(null);
    }
  };

  // Submit Leave Request Handler
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (new Date(leaveEnd) < new Date(leaveStart)) {
      logAction(`[ValidationError] LeaveRequestForm.clean() rejected date range (${leaveStart} to ${leaveEnd}). End date precedes start date.`);
      alert('Form Error: Leave end date cannot precede start date!');
      return;
    }

    const targetEmp = employees.find(e => e.id === parseInt(leaveEmpId)) || employees[0];
    const newLeave = {
      id: leaveRequests.length + 101,
      empName: `${targetEmp.firstName} ${targetEmp.lastName}`,
      type: leaveType,
      start: leaveStart,
      end: leaveEnd,
      reason: leaveReason,
      status: 'Pending'
    };

    setLeaveRequests(prev => [newLeave, ...prev]);
    logAction(`[ORM Insert] LeaveRequest.objects.create(employee_id=${targetEmp.id}, leave_type="${leaveType}", status="Pending")`);
    alert('Leave request submitted for review!');
  };

  // Approve / Reject Leave Handler
  const handleUpdateLeaveStatus = (id, newStatus) => {
    setLeaveRequests(prev => prev.map(l => {
      if (l.id === id) {
        logAction(`[ORM Transaction] LeaveRequest.objects.filter(id=${id}).update(status="${newStatus}")`);
        return { ...l, status: newStatus };
      }
      return l;
    }));
  };

  // Analytics Computation
  const analyticsData = useMemo(() => {
    const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const avgSalary = employees.length ? totalPayroll / employees.length : 0;
    const activeCount = employees.filter(e => e.status === 'Active').length;
    const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;

    // Dept Breakdown
    const deptMap = {};
    employees.forEach(emp => {
      if (!deptMap[emp.dept]) deptMap[emp.dept] = { count: 0, totalPay: 0 };
      deptMap[emp.dept].count += 1;
      deptMap[emp.dept].totalPay += emp.salary;
    });

    return { totalPayroll, avgSalary, activeCount, pendingLeaves, deptMap };
  }, [employees, leaveRequests]);

  /* ── Quiz Questions ── */
  const [qAns, setQAns] = useState({});
  const [qDone, setQDone] = useState(false);
  const questions = [
    {
      k: 'q1',
      q: 'Which view method handles field-specific validations (like checking corporate email domain ending) in Django ModelForms?',
      opts: ['is_valid()', 'clean_<field_name>()', 'clean_all()', 'save()'],
      ans: 1,
      exp: 'Django automatically executes methods matching clean_<field_name>() inside ModelForms during data validation to inspect and validate specific field values.'
    },
    {
      k: 'q2',
      q: 'Why should developers use reverse_lazy() instead of reverse() for success_url in Generic Class-Based Views?',
      opts: [
        'To optimize database index lookups',
        'Because reverse_lazy() evaluates the URL target path lazily when requested rather than during module import time',
        'To automatically bypass CSRF validation',
        'It is just syntactic style sugar with no operational difference'
      ],
      ans: 1,
      exp: 'Class attributes in Generic CBVs are evaluated when the Python module is imported. Using reverse_lazy() avoids circular import crashes since URL configurations may not be fully loaded during class declaration.'
    },
    {
      k: 'q3',
      q: 'Which ORM method optimizes database queries by performing SQL JOIN operations to load related ForeignKey models in a single database call?',
      opts: ['prefetch_related()', 'select_related()', 'aggregate()', 'annotate()'],
      ans: 1,
      exp: 'select_related() creates an SQL JOIN and includes fields of the related object in the SELECT statement, ideal for single-value ForeignKeys.'
    },
    {
      k: 'q4',
      q: 'In Class-Based Views, where should security mixins like LoginRequiredMixin or PermissionRequiredMixin be placed in class inheritance declarations?',
      opts: [
        'At the very end of the parent class list',
        'Before the main generic view class (leftmost position in Python MRO)',
        'Inside the dispatch() method arguments only',
        'Mixin order does not matter in Python inheritance'
      ],
      ans: 1,
      exp: 'Python evaluates mixins left-to-right via Method Resolution Order (MRO). Security mixins must come first to intercept request execution before the base generic view logic fires.'
    },
    {
      k: 'q5',
      q: 'What is the primary difference between aggregate() and annotate() in Django ORM computations?',
      opts: [
        'aggregate() operates per item row; annotate() returns a single global summary dictionary',
        'aggregate() calculates a single summary dictionary over a QuerySet; annotate() computes per-object groupings (like SQL GROUP BY)',
        'aggregate() only works with MySQL; annotate() works with SQLite',
        'They are exact aliases of each other'
      ],
      ans: 1,
      exp: 'aggregate() calculates summary values over the whole QuerySet (e.g. Sum of all salaries). annotate() attaches a computed summary value to each item in the QuerySet (e.g. Employee count per Department).'
    },
    {
      k: 'q6',
      q: 'When deleting a Department model, which ForeignKey on_delete option prevents deletion if child Employee records are attached to that department?',
      opts: ['models.CASCADE', 'models.SET_NULL', 'models.PROTECT', 'models.DO_NOTHING'],
      ans: 2,
      exp: 'models.PROTECT prevents deletion of the referenced object by raising ProtectedError if child references exist.'
    }
  ];
  const score = questions.filter(q => qAns[q.k] === q.ans).length;

  return (
    <AnimatePresence mode="wait">

      {/* ── 1. ARCHITECTURE OVERVIEW ────────────────────────────────────────── */}
      {activeTab === 'intro_sessions' && (
        <Section key="intro" eyebrow="Django • Day 14 • Architecture" title="Capstone 1: Enterprise MVT Employee Portal">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* AI Assistant Banner */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Users size={20} style={{ color: '#16a34a' }} />
                <span style={{ fontSize: '0.84rem', color: '#14532d', fontWeight: 600 }}>Need assistance mastering Django MVT ModelForms, CBVs, or ORM Aggregations?</span>
              </div>
              <button className="btn btn-sm" onClick={() => openAITutor('Explain how ModelForms, Class-Based Views (CBVs), and ORM select_related work in an Enterprise MVT architecture.')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '4px 10px', fontSize: '0.74rem', cursor: 'pointer', borderRadius: 4 }}>
                Ask AI Tutor
              </button>
            </div>

            <div style={{ background: 'linear-gradient(135deg,#0284c7,#2563eb)', borderRadius: 16, padding: '2rem', marginBottom: '2rem', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.75rem' }}>🏢 Full-Stack Corporate Employee &amp; Payroll Management Portal</h3>
              <p style={{ color: '#e0f2fe', margin: 0, lineHeight: 1.7 }}>
                This production capstone covers the complete **Django MVT (Model-View-Template)** stack. It integrates multi-model relational schemas (`Department`, `Employee`, `LeaveRequest`), custom ModelForm clean validations, Role-Based Access Controls using CBV Security Mixins, ORM aggregation pipelines, and custom HTML5/Bootstrap user interface templates.
              </p>
            </div>

            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Enterprise System Blueprint</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { icon: Building, title: '📂 Relational ORM Schema', desc: 'ForeignKey mappings connecting Employees to Departments & Manager self-references with safe deletion rules.' },
                { icon: ShieldAlert, title: '📝 Custom Clean Validation', desc: 'ModelForm validation hooks verifying domain restrictions (@company.com) and salary thresholds.' },
                { icon: UserCheck, title: '🔒 CBV Security Guards', desc: 'Restricting sensitive views (Add/Edit/Delete) using LoginRequiredMixin & PermissionRequiredMixin.' },
                { icon: BarChart2, title: '📊 ORM Executive Analytics', desc: 'Aggregating payroll budgets, headcount, and average compensation per department using annotate().' },
                { icon: Calendar, title: '📅 Leave Workflow Engine', desc: 'Interactive approval workflow for annual & sick leave requests with date range verification.' }
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10, padding: 14 }}>
                  <Icon size={22} style={{ color: '#0284c7', marginBottom: 6 }} />
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>{title}</div>
                  <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_config')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Multi-File Source Code Explorer <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 2. MULTI-FILE CODE EXPLORER ────────────────────────────────────────── */}
      {activeTab === 'session_config' && (
        <Section key="code_explorer" eyebrow="Django • Day 14 • Codebase" title="Full Project Codebase Explorer">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <p>Inspect the complete production-grade Python &amp; HTML source files for the Employee Portal below. Click tabs to switch files:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 3.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
              
              {/* File sidebar selector */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', paddingBottom: 6, borderBottom: '1px solid #cbd5e1', marginBottom: 4 }}>📂 Portal Files</div>
                {[
                  { name: 'settings.py', label: 'settings.py (Config)' },
                  { name: 'models.py', label: 'models.py (ORM Schemas)' },
                  { name: 'forms.py', label: 'forms.py (ModelForms)' },
                  { name: 'views.py', label: 'views.py (Generic CBVs)' },
                  { name: 'urls.py', label: 'urls.py (Routing Paths)' },
                  { name: 'employee_list.html', label: 'employee_list.html' },
                  { name: 'analytics.html', label: 'analytics.html (Dashboard)' }
                ].map(f => (
                  <button key={f.name} onClick={() => setSelectedFile(f.name)}
                    style={{ border: 'none', background: selectedFile === f.name ? '#0284c7' : 'transparent', color: selectedFile === f.name ? 'white' : '#475569', fontWeight: selectedFile === f.name ? 800 : 500, padding: '8px 10px', borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontSize: '0.78rem', transition: 'all 0.15s' }}>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Code viewer */}
              <div>
                <CodeBlock title={`File: ${selectedFile}`} code={filesCode[selectedFile]} />
              </div>

            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('session_views')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Next: Live Enterprise Portal Sandbox <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 3. LIVE PORTAL SANDBOX ─────────────────────────────────── */}
      {activeTab === 'session_views' && (
        <Section key="simulator" eyebrow="Django • Day 14 • Interactive Sandbox" title="Live Enterprise Portal Simulator">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            
            {/* Navigation inside Sandbox */}
            <div style={{ display: 'flex', gap: 8, borderBottom: '2px solid #e2e8f0', paddingBottom: 10, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'directory', label: '👥 Employee Directory', icon: Users },
                { id: 'add', label: '➕ Add Employee Form', icon: Plus },
                { id: 'leave', label: '📅 Leave Management', icon: Calendar },
                { id: 'analytics', label: '📊 Department Analytics', icon: BarChart2 }
              ].map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActivePortalTab(id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: activePortalTab === id ? '#0284c7' : '#f1f5f9', color: activePortalTab === id ? 'white' : '#475569', border: 'none', padding: '8px 14px', borderRadius: 8, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>

            {/* TAB 3A: EMPLOYEE DIRECTORY */}
            {activePortalTab === 'directory' && (
              <div>
                {/* Search & Filter Bar */}
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem', marginBottom: '1.2rem', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #cbd5e1', borderRadius: 6, padding: '0 8px' }}>
                    <Search size={16} color="#64748b" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search name, email, or title..."
                      style={{ border: 'none', outline: 'none', width: '100%', padding: '6px 8px', fontSize: '0.8rem' }} />
                  </div>

                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Filter size={14} color="#64748b" />
                    <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                      style={{ padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6, background: 'white' }}>
                      <option value="All">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="HR & Talent">HR &amp; Talent</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Finance">Finance</option>
                    </select>

                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                      style={{ padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6, background: 'white' }}>
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>
                </div>

                {/* Employee Data Grid */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                    <thead style={{ background: '#0f172a', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '10px 12px' }}>Employee</th>
                        <th style={{ padding: '10px 12px' }}>Job Title</th>
                        <th style={{ padding: '10px 12px' }}>Department</th>
                        <th style={{ padding: '10px 12px' }}>Salary</th>
                        <th style={{ padding: '10px 12px' }}>Status</th>
                        <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map(emp => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{emp.firstName} {emp.lastName}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{emp.email}</div>
                          </td>
                          <td style={{ padding: '10px 12px', color: '#334155' }}>{emp.jobTitle}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.7rem' }}>
                              {emp.dept}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', color: '#16a34a', fontWeight: 800 }}>${emp.salary.toLocaleString()}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ background: emp.status === 'Active' ? '#d1fae5' : emp.status === 'On Leave' ? '#fef3c7' : '#fee2e2', color: emp.status === 'Active' ? '#065f46' : emp.status === 'On Leave' ? '#92400e' : '#991b1b', padding: '2px 8px', borderRadius: 4, fontWeight: 800, fontSize: '0.7rem' }}>
                              {emp.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                              <button onClick={() => setSelectedEmpModal(emp)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '3px 7px', borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Eye size={12} /> View
                              </button>
                              <button onClick={() => handleToggleStatus(emp.id)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '3px 7px', borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem' }}>
                                Status
                              </button>
                              <button onClick={() => handleDeleteEmployee(emp.id, `${emp.firstName} ${emp.lastName}`)} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', padding: '3px 7px', borderRadius: 4, cursor: 'pointer', fontSize: '0.7rem' }}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No employees matched search criteria.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Detail View Modal */}
                {selectedEmpModal && (
                  <div style={{ background: '#f8fafc', border: '2px solid #0284c7', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div>
                        <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>👤 Employee Profile Card: {selectedEmpModal.firstName} {selectedEmpModal.lastName}</h4>
                        <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{selectedEmpModal.jobTitle} • {selectedEmpModal.dept}</div>
                      </div>
                      <button onClick={() => setSelectedEmpModal(null)} style={{ border: 'none', background: '#e2e8f0', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontWeight: 800 }}>✕</button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, fontSize: '0.78rem' }}>
                      <div><strong>Email:</strong> {selectedEmpModal.email}</div>
                      <div><strong>Phone:</strong> {selectedEmpModal.phone}</div>
                      <div><strong>Salary:</strong> ${selectedEmpModal.salary.toLocaleString()} / year</div>
                      <div><strong>Hire Date:</strong> {selectedEmpModal.hireDate}</div>
                      <div><strong>Reporting Manager:</strong> {selectedEmpModal.manager}</div>
                      <div><strong>Employment Status:</strong> {selectedEmpModal.status}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3B: ADD EMPLOYEE FORM */}
            {activePortalTab === 'add' && (
              <form onSubmit={handleAddEmployeeSubmit} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem', color: '#0f172a', fontWeight: 800 }}>➕ Add New Staff Record (ModelForm Simulation)</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>First Name *</label>
                    <input type="text" value={formFirstName} onChange={e => setFormFirstName(e.target.value)} required placeholder="e.g. Sarah"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Last Name *</label>
                    <input type="text" value={formLastName} onChange={e => setFormLastName(e.target.value)} required placeholder="e.g. Connor"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Corporate Email Address *</label>
                    <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} required placeholder="e.g. sarah.connor@company.com"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                    <span style={{ fontSize: '0.66rem', color: '#64748b' }}>Triggers clean_email(): Must end with @company.com</span>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Phone Number</label>
                    <input type="text" value={formPhone} onChange={e => setFormPhone(e.target.value)} placeholder="+1-555-0199"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Department</label>
                    <select value={formDept} onChange={e => setFormDept(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                      <option value="Engineering">Engineering</option>
                      <option value="HR & Talent">HR &amp; Talent</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Job Title</label>
                    <input type="text" value={formJobTitle} onChange={e => setFormJobTitle(e.target.value)} placeholder="Software Engineer"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Annual Salary ($) *</label>
                    <input type="number" value={formSalary} onChange={e => setFormSalary(e.target.value)} required placeholder="85000"
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                    <span style={{ fontSize: '0.66rem', color: '#64748b' }}>Triggers clean_salary(): Min threshold $35,000</span>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Reporting Manager</label>
                    <select value={formManager} onChange={e => setFormManager(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                      {employees.map(emp => (
                        <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>{emp.firstName} {emp.lastName} ({emp.jobTitle})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" style={{ padding: '8px 20px', background: '#0284c7', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>
                  Save Employee to Database
                </button>
              </form>
            )}

            {/* TAB 3C: LEAVE MANAGEMENT */}
            {activePortalTab === 'leave' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <form onSubmit={handleLeaveSubmit} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h4 style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>📅 Submit Leave Request</h4>
                  
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Select Employee</label>
                    <select value={leaveEmpId} onChange={e => setLeaveEmpId(e.target.value)}
                      style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                      {employees.map(e => (
                        <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Leave Type</label>
                    <select value={leaveType} onChange={e => setLeaveType(e.target.value)}
                      style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
                      <option value="Paid Annual">Paid Annual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Unpaid">Unpaid Leave</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 800 }}>Start Date</label>
                      <input type="date" value={leaveStart} onChange={e => setLeaveStart(e.target.value)}
                        style={{ width: '100%', padding: '5px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 800 }}>End Date</label>
                      <input type="date" value={leaveEnd} onChange={e => setLeaveEnd(e.target.value)}
                        style={{ width: '100%', padding: '5px', fontSize: '0.75rem', border: '1px solid #cbd5e1', borderRadius: 4 }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: 3 }}>Reason</label>
                    <input type="text" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} placeholder="Reason for leave"
                      style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 6 }} />
                  </div>

                  <button type="submit" style={{ padding: '8px', background: '#0284c7', border: 'none', color: 'white', fontWeight: 700, borderRadius: 6, cursor: 'pointer', marginTop: 4 }}>
                    Submit Request
                  </button>
                </form>

                {/* Pending Requests List */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>📋 Leave Approval Queue</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {leaveRequests.map(req => (
                      <div key={req.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, background: '#f8fafc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.82rem' }}>{req.empName}</span>
                          <span style={{ background: req.status === 'Approved' ? '#d1fae5' : req.status === 'Rejected' ? '#fee2e2' : '#fef3c7', color: req.status === 'Approved' ? '#065f46' : req.status === 'Rejected' ? '#991b1b' : '#92400e', padding: '2px 6px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 800 }}>
                            {req.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>
                          {req.type} • {req.start} to {req.end}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#334155', fontStyle: 'italic', marginTop: 2 }}>"{req.reason}"</div>
                        
                        {req.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                            <button onClick={() => handleUpdateLeaveStatus(req.id, 'Approved')} style={{ background: '#16a34a', border: 'none', color: 'white', padding: '3px 8px', borderRadius: 4, fontSize: '0.7rem', cursor: 'pointer', fontWeight: 700 }}>
                              Approve
                            </button>
                            <button onClick={() => handleUpdateLeaveStatus(req.id, 'Rejected')} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '3px 8px', borderRadius: 4, fontSize: '0.7rem', cursor: 'pointer', fontWeight: 700 }}>
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3D: DEPARTMENT ANALYTICS */}
            {activePortalTab === 'analytics' && (
              <div>
                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#0284c7', color: 'white', padding: '1.2rem', borderRadius: 12 }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.8 }}>Total Staff Headcount</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{employees.length} Employees</div>
                  </div>
                  <div style={{ background: '#16a34a', color: 'white', padding: '1.2rem', borderRadius: 12 }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.8 }}>Total Annual Payroll</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>${analyticsData.totalPayroll.toLocaleString()}</div>
                  </div>
                  <div style={{ background: '#6366f1', color: 'white', padding: '1.2rem', borderRadius: 12 }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.8 }}>Average Salary</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>${Math.round(analyticsData.avgSalary).toLocaleString()}</div>
                  </div>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '1.2rem', borderRadius: 12 }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', opacity: 0.8 }}>Pending Leaves</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{analyticsData.pendingLeaves} Requests</div>
                  </div>
                </div>

                {/* Department Breakdown Table */}
                <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '12px 16px', background: '#f8fafc', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1' }}>
                    📊 Department ORM Aggregation Breakdown (annotate())
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9' }}>
                        <th style={{ padding: '10px 12px' }}>Department</th>
                        <th style={{ padding: '10px 12px' }}>Staff Count</th>
                        <th style={{ padding: '10px 12px' }}>Department Payroll</th>
                        <th style={{ padding: '10px 12px' }}>Avg Comp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(analyticsData.deptMap).map(([dept, data]) => (
                        <tr key={dept} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 800 }}>{dept}</td>
                          <td style={{ padding: '10px 12px' }}>{data.count} Staff</td>
                          <td style={{ padding: '10px 12px', color: '#16a34a', fontWeight: 800 }}>${data.totalPay.toLocaleString()}</td>
                          <td style={{ padding: '10px 12px' }}>${Math.round(data.totalPay / data.count).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sim Logs Console */}
            <div style={{ background: '#0a0f1d', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
                <span>⌨️ Django ORM SQL Query Stream &amp; View Logs</span>
                <button onClick={() => setSimLogs([])} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.68rem' }}>Clear Logs</button>
              </div>
              <div style={{ maxHeight: 120, minHeight: 120, overflowY: 'auto', padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {simLogs.map((log, i) => (
                  <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: log.startsWith('[Validation') ? '#f87171' : log.includes('Insert') || log.includes('Update') ? '#34d399' : '#94a3b8' }}>{log}</pre>
                ))}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('quiz')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Capstone Mastery Assessment Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 4. QUIZ ────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <Section key="quiz" eyebrow="Knowledge Check" title="Day 14 Quiz — Enterprise Portal Architecture">
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
                    Submit Quiz ({Object.keys(qAns).length}/{questions.length})
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: score >= 5 ? '#16a34a' : '#d97706' }}>
                      Score: {score} / {questions.length} ({Math.round((score/questions.length)*100)}%)
                    </span>
                    <button className="btn btn-outline" onClick={() => { setQAns({}); setQDone(false); }} style={{ minWidth: 120 }}>Retry Quiz</button>
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => go('assignment')} style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                Go to Capstone Implementation Checklist <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* ── 5. PROJECT ROADMAP & CHECKLIST ───────────────────────────────────── */}
      {activeTab === 'assignment' && (
        <Section key="asgn" eyebrow="Task Roadmap" title="Capstone 1 Implementation Checklist">
          <div className="panel" style={{ color: '#334155', lineHeight: 1.8 }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 800 }}>📋 Production Deployment Checklist</h4>
              <p style={{ fontSize: '0.9rem', margin: '0 0 14px' }}>Execute these 5 development phases to deploy the Capstone Employee Portal:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { step: 'Phase 1: Relational Schema & ORM Setup', detail: 'Define Department, Employee, and LeaveRequest models in models.py with ForeignKeys, string methods, and property helpers. Run makemigrations and migrate.' },
                  { step: 'Phase 2: Custom ModelForms & Clean Hooks', detail: 'Write EmployeeForm and LeaveRequestForm in forms.py. Add clean_email() domain validation and clean_salary() minimum threshold rules.' },
                  { step: 'Phase 3: Class-Based Views & Security Mixins', detail: 'Implement EmployeeListView (with search & pagination), EmployeeDetailView, EmployeeCreateView, and EmployeeUpdateView protected with LoginRequiredMixin.' },
                  { step: 'Phase 4: Leave Approval Workflow Engine', detail: 'Implement LeaveRequestCreateView with date range verification and write LeaveApprovalListView for HR managers to approve/reject requests.' },
                  { step: 'Phase 5: Analytics & Production Templates', detail: 'Create DepartmentAnalyticsView using ORM annotate(emp_count=Count(), total_payroll=Sum()) and render responsive HTML5/Bootstrap templates.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.85rem' }}>{idx + 1}. {item.step}</div>
                    <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: 3 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox icon={ShieldAlert} color="#7c2d12" bg="#fff7ed" border="#fed7aa">
              <strong>Enterprise Security Best Practice:</strong> Combine Django <code>PermissionRequiredMixin</code> with template permission tags (<code>{'{% if perms.directory.add_employee %}'}</code>) to enforce backend access security while presenting a clean UI experience.
            </InfoBox>

            <button className="btn btn-primary" style={{ backgroundColor: '#0284c7', borderColor: '#0284c7', display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }} onClick={() => onNavigate('django_module15', 'intro_sessions')}>
              Next: Day 15 — Capstone 2: DRF + Axios Board <ArrowRight size={16} />
            </button>
          </div>
        </Section>
      )}
    </AnimatePresence>
  );
}
