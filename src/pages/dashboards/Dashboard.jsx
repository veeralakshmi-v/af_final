import React, { useState, useEffect } from 'react';
import {
  LayoutTemplate, Database, Code, ArrowRight, Sparkles, Bot, Terminal, Brain,
  UserPlus, Users, LogIn, LogOut, CheckCircle, BarChart3, Layers, GitBranch,
  Server, RefreshCw, Trash2, Key, Star, ShieldAlert, Award, Grid, HelpCircle,
  BookOpen, ExternalLink, Upload, Download, FileText, Lock, AlertTriangle, Menu, X,
  Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Copy, Receipt, Briefcase,
  CreditCard, FileCheck2, Eye, TrendingUp, MessageSquare, ShieldCheck
} from 'lucide-react';
import {
  getAssignmentValidations,
  saveAssignmentValidation,
  HTML_CSS_ASSIGNMENTS_CONFIG,
  isModuleLocked
} from '../../utils/htmlCssLocking';
import * as CourseData from '../../courseData';
import InvoiceGenerator from '../invoice/InvoiceGenerator';
import CertificateManager from '../certificate/CertificateManager';
import AdmissionVerificationDashboard from './AdmissionVerificationDashboard';
import StudentAdmissionStatusModal from './StudentAdmissionStatusModal';

const mainCourses = [
  {
    id: 'fullstack',
    title: 'AI-Powered Full Stack',
    desc: 'Frontend layouts, scripts logic, Python/Django backend engines, React SPAs, and Git workflows.',
    icon: <Layers size={24} />,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    bgLight: 'rgba(59, 130, 246, 0.08)'
  },
  {
    id: 'dataanalytics',
    title: 'AI Data Analytics',
    desc: 'Database architecture designs, relational SQL queries, complex DAX pipelines, and Power BI dashboards.',
    icon: <BarChart3 size={24} />,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
    bgLight: 'rgba(99, 102, 241, 0.08)'
  },
  {
    id: 'summer',
    title: 'Summer Crash Program',
    desc: 'Rapid database fundamentals, basic querying, structures, and entry-level operations.',
    icon: <Sparkles size={24} />,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    bgLight: 'rgba(16, 185, 129, 0.08)'
  },
  {
    id: 'aidevelopment',
    title: 'Cognitive AI Development',
    desc: 'Language models fine-tuning, prompt engineering structures, vector DBs, and agent systems.',
    icon: <Brain size={24} />,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
    bgLight: 'rgba(236, 72, 153, 0.08)'
  },
  {
    id: 'accounting_finance',
    title: 'Accounting & Finance',
    desc: 'Ledger management, taxation, auditing, inventory control, statutory compliances, and AI-powered accounting productivity.',
    icon: <Database size={24} />,
    color: '#059669',
    gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
    bgLight: 'rgba(5, 150, 105, 0.08)'
  },
  {
    id: 'spoko_english',
    title: 'Spoko English Communication',
    desc: 'Practical English fluency through story reading immersion, bilingual vocabulary, real dialogues, speed teleprompter, video stories, and retell writing.',
    icon: <BookOpen size={24} />,
    color: '#ea580c',
    gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
    bgLight: 'rgba(234, 88, 12, 0.08)'
  }
];

const subCourses = [
  {
    id: 'web_design_20days',
    mainCourseId: 'fullstack',
    title: 'AI-Powered Web Design & Frontend Development',
    desc: '20-Day progressive practical course building real responsive business websites with HTML, CSS, JavaScript & AI workflows.',
    icon: <Sparkles size={24} />,
    bgColor: 'rgba(99, 102, 241, 0.08)',
    borderColor: '#6366f1',
    shadowColor: 'rgba(99,102,241,0.15)',
    modulesCount: '20 Modules',
    enrolledKey: 'web_design_20days'
  },
  {
    id: 'html_css',
    mainCourseId: 'fullstack',
    title: 'Web Design (HTML, CSS & Bootstrap)',
    desc: 'Build responsive layouts using semantic structures, CSS Grid, Flexbox layouts, and custom animations.',
    icon: <LayoutTemplate size={24} />,
    bgColor: 'rgba(37, 99, 235, 0.08)',
    borderColor: '#3b82f6',
    shadowColor: 'rgba(37,99,235,0.15)',
    modulesCount: '12 Modules',
    enrolledKey: 'html_css'
  },
  {
    id: 'sql',
    mainCourseId: 'fullstack',
    title: 'AI-Powered SQL Course',
    desc: 'Master relational databases, write DDL/DML, optimize statements with AI assistants, and integrate smart workflows.',
    icon: <Database size={24} />,
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: '#10b981',
    shadowColor: 'rgba(16,185,129,0.15)',
    modulesCount: '9 Modules',
    enrolledKey: 'sql'
  },
  {
    id: 'python_course',
    mainCourseId: 'fullstack',
    title: 'Python Core & OOPs Course',
    desc: 'Master variables, loops, file streams, regex, and core object-oriented structures with AI enhancements.',
    icon: <Terminal size={24} />,
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: '#0ea5e9',
    shadowColor: 'rgba(14,165,233,0.15)',
    modulesCount: '13 Modules',
    enrolledKey: 'python_course'
  },
  {
    id: 'core_js',
    mainCourseId: 'fullstack',
    title: 'Vanilla JS',
    desc: 'Master Vanilla JavaScript fundamentals, DOM manipulation, variables, functions, Async/Fetch API, Capstone Projects, and AI Power Tools.',
    icon: <Code size={24} />,
    bgColor: 'rgba(234, 179, 8, 0.08)',
    borderColor: '#eab308',
    shadowColor: 'rgba(234,179,8,0.15)',
    modulesCount: '10 Modules',
    enrolledKey: 'core_js'
  },
  {
    id: 'react_course',
    mainCourseId: 'fullstack',
    title: 'React JS Development',
    desc: 'Master component-driven architecture, declarative state models, DOM reconciliation diffing, and environment scaffolds via Vite.',
    icon: <Layers size={24} />,
    bgColor: 'rgba(129, 140, 248, 0.08)',
    borderColor: '#818cf8',
    shadowColor: 'rgba(129,140,248,0.15)',
    modulesCount: '15 Modules',
    enrolledKey: 'react_course'
  },
  {
    id: 'git_github',
    mainCourseId: 'fullstack',
    title: 'Git & GitHub',
    desc: 'Master local Git version control histories, branch merging protocols, conflicts audit, and remote project push methods.',
    icon: <GitBranch size={24} />,
    bgColor: 'rgba(71, 85, 105, 0.08)',
    borderColor: '#64748b',
    shadowColor: 'rgba(71,85,105,0.15)',
    modulesCount: '2 Modules',
    enrolledKey: 'git_github'
  },
  {
    id: 'json_course',
    mainCourseId: 'fullstack',
    title: 'JSON Essentials',
    desc: 'Learn standard JSON schema specifications, serialization, parsing APIs, and validation protocols.',
    icon: <Code size={24} />,
    bgColor: 'rgba(219, 39, 119, 0.08)',
    borderColor: '#ec4899',
    shadowColor: 'rgba(219,39,119,0.15)',
    modulesCount: '1 Module',
    enrolledKey: 'json_course'
  },
  {
    id: 'django_course',
    mainCourseId: 'fullstack',
    title: 'Django Framework',
    desc: 'Master Python backend servers, MVT model systems, ORM databases query structure, and built-in Admin security.',
    icon: <Server size={24} />,
    bgColor: 'rgba(21, 128, 61, 0.08)',
    borderColor: '#10b981',
    shadowColor: 'rgba(21,128,61,0.15)',
    modulesCount: '10 Modules',
    enrolledKey: 'django_course'
  },
  {
    id: 'devops',
    mainCourseId: 'fullstack',
    title: 'DevOps & Cloud Deploy',
    desc: 'Master continuous deployments, web servers config, lock configurations, process managers, and deployment hosting.',
    icon: <Server size={24} />,
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: '#0ea5e9',
    shadowColor: 'rgba(14,165,233,0.15)',
    modulesCount: '3 Modules',
    enrolledKey: 'devops'
  },
  {
    id: 'summer_sql',
    mainCourseId: 'summer',
    title: 'Summer SQL Crash Course',
    desc: 'Learn primary relational commands, simple select filters, group calculations, and database structures in 7 days.',
    icon: <Database size={24} />,
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: '#10b981',
    shadowColor: 'rgba(16,185,129,0.15)',
    modulesCount: '7 Modules',
    enrolledKey: 'summer_sql'
  },
  {
    id: 'generative_ai_course',
    mainCourseId: 'aidevelopment',
    title: 'Generative AI Masterclass',
    desc: 'Master prompt structuring, token contexts, API structures, context constraints, and AI ethics benchmarks.',
    icon: <Bot size={24} />,
    bgColor: 'rgba(219, 39, 119, 0.08)',
    borderColor: '#ec4899',
    shadowColor: 'rgba(219,39,119,0.15)',
    modulesCount: '20 Modules',
    enrolledKey: 'generative_ai_course'
  },
  {
    id: 'agentic_ai',
    mainCourseId: 'aidevelopment',
    title: 'Agentic AI Engineering',
    desc: 'Master multi-agent systems, CrewAI schemas, Agno AI tools calling, Flowise visual designs, and LangChain loops.',
    icon: <Brain size={24} />,
    bgColor: 'rgba(124, 58, 237, 0.08)',
    borderColor: '#818cf8',
    shadowColor: 'rgba(124,58,237,0.15)',
    modulesCount: '40 Modules',
    enrolledKey: 'agentic_ai'
  },
  {
    id: 'powerbi',
    mainCourseId: 'dataanalytics',
    title: 'Power BI Data Analytics',
    desc: 'Master data modeling, ETL Power Query pipelines, DAX metrics engineering, and visually interactive reports.',
    icon: <BarChart3 size={24} />,
    bgColor: 'rgba(234, 179, 8, 0.08)',
    borderColor: '#eab308',
    shadowColor: 'rgba(234,179,8,0.15)',
    modulesCount: '8 Modules',
    enrolledKey: 'powerbi'
  },
  {
    id: 'stats_course',
    mainCourseId: 'dataanalytics',
    title: 'Statistics for Data Analytics',
    desc: 'Master descriptive & inferential statistics, probability distributions, hypothesis testing, regression analysis, and Python-based statistical computations.',
    icon: <BarChart3 size={24} />,
    bgColor: 'rgba(219, 39, 119, 0.08)',
    borderColor: '#ec4899',
    shadowColor: 'rgba(219,39,119,0.15)',
    modulesCount: '17 Modules',
    enrolledKey: 'stats_course'
  },
  {
    id: 'numpy_course',
    mainCourseId: 'dataanalytics',
    title: 'NumPy for Data Science',
    desc: 'Master multi-dimensional array operations, scientific calculations, indexing, masking, and memory structures in NumPy.',
    icon: <Code size={24} />,
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: '#0ea5e9',
    shadowColor: 'rgba(14,165,233,0.15)',
    modulesCount: '5 Modules',
    enrolledKey: 'numpy_course'
  },
  {
    id: 'pandas_course',
    mainCourseId: 'dataanalytics',
    title: 'Pandas for Data Science',
    desc: 'Master DataFrame operations, Series, data ingestion, filtering, grouping, merging, cleaning, and basic EDA in Pandas.',
    icon: <Database size={24} />,
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: '#10b981',
    shadowColor: 'rgba(16,185,129,0.15)',
    modulesCount: '6 Modules',
    enrolledKey: 'pandas_course'
  },
  {
    id: 'matplotlib_course',
    mainCourseId: 'dataanalytics',
    title: 'Matplotlib for Data Science',
    desc: 'Master professional data visualization, line/bar/scatter charting styles, subplots grid, customize annotations, and export figures.',
    icon: <BarChart3 size={24} />,
    bgColor: 'rgba(249, 115, 22, 0.08)',
    borderColor: '#f97316',
    shadowColor: 'rgba(249,115,22,0.15)',
    modulesCount: '5 Modules',
    enrolledKey: 'matplotlib_course'
  },
  {
    id: 'seaborn_course',
    mainCourseId: 'dataanalytics',
    title: 'Seaborn for Data Science',
    desc: 'Master professional statistical plots, relational trends, distributions, heatmaps, categorical box/violin charts, and pair plots.',
    icon: <Layers size={24} />,
    bgColor: 'rgba(99, 102, 241, 0.08)',
    borderColor: '#6366f1',
    shadowColor: 'rgba(99,102,241,0.15)',
    modulesCount: '4 Modules',
    enrolledKey: 'seaborn_course'
  },
  {
    id: 'sql_da',
    mainCourseId: 'dataanalytics',
    title: 'SQL for Data Analytics',
    desc: 'Master SQL queries, joins, aggregations, window functions, and analytics query structures to solve real-world retail sales problems.',
    icon: <Database size={24} />,
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: '#0ea5e9',
    shadowColor: 'rgba(14,165,233,0.15)',
    modulesCount: '8 Modules',
    enrolledKey: 'sql_da'
  },
  {
    id: 'python_da',
    mainCourseId: 'dataanalytics',
    title: 'Python for Data Analytics',
    desc: 'Master core Python programming, variables, loops, data structures, functions, regex, and files for data manipulation.',
    icon: <Terminal size={24} />,
    bgColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: '#0ea5e9',
    shadowColor: 'rgba(14,165,233,0.15)',
    modulesCount: '8 Modules',
    enrolledKey: 'python_da'
  },
  {
    id: 'tally_prime',
    mainCourseId: 'accounting_finance',
    title: 'AI powered Tally',
    desc: 'Master double-entry accounting, GST, TDS, inventory audits, bank reconciliation, and AI-assisted financial checking in 41 days.',
    icon: <Database size={24} />,
    bgColor: 'rgba(5, 150, 105, 0.08)',
    borderColor: '#059669',
    shadowColor: 'rgba(5,150,105,0.15)',
    modulesCount: '5 Modules',
    enrolledKey: 'tally_prime'
  },
  {
    id: 'spoko_story',
    mainCourseId: 'spoko_english',
    title: 'Story-Based Learning (Spoko English)',
    desc: 'Master English fluency through immersive story reading, vocabulary cards, dialogues, reading speed highlighter, video stories, and observation exercises.',
    icon: <BookOpen size={24} />,
    bgColor: 'rgba(234, 88, 12, 0.08)',
    borderColor: '#f97316',
    shadowColor: 'rgba(234, 88, 12, 0.15)',
    modulesCount: '30 Modules',
    enrolledKey: 'spoko_story'
  },
  {
    id: 'spoko_pro',
    mainCourseId: 'spoko_english',
    title: 'Professional Track (Soft Skills & Workplace Mastery)',
    desc: 'Executive communication, interview mastery, LinkedIn optimization, email & meeting etiquette, conflict resolution, and workplace dialogue simulations.',
    icon: <Briefcase size={24} />,
    bgColor: 'rgba(5, 150, 105, 0.08)',
    borderColor: '#059669',
    shadowColor: 'rgba(5, 150, 105, 0.15)',
    modulesCount: '16 Topics (Professional Soft Skills Course)',
    enrolledKey: 'spoko_pro'
  },
  {
    id: 'spoko_hr',
    mainCourseId: 'spoko_english',
    title: 'HR Interview Mastery (100 Questions & Answers)',
    desc: 'Master the top 100 HR interview questions with structured sample answers for freshers and experienced candidates, STAR method, and practice timers.',
    icon: <Users size={24} />,
    bgColor: 'rgba(99, 102, 241, 0.08)',
    borderColor: '#6366f1',
    shadowColor: 'rgba(99, 102, 241, 0.15)',
    modulesCount: '5 Modules',
    enrolledKey: 'spoko_hr'
  },
  {
    id: 'spoko_reasoning',
    mainCourseId: 'spoko_english',
    title: 'Logical Reasoning & Analytical Thinking',
    desc: 'Master foundational logic, number series, alphabet positions, symbol patterns, classification & odd-one-out, and 80 aptitude practice questions.',
    icon: <Brain size={24} />,
    bgColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: '#8b5cf6',
    shadowColor: 'rgba(139, 92, 246, 0.15)',
    modulesCount: '3 Levels',
    enrolledKey: 'spoko_reasoning'
  }
];

const formatSubmittedDate = (dateStr) => {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  } catch (e) { }
  return dateStr;
};

const formatTaskTitle = (task) => {
  if (task.moduleTitle && task.moduleTitle !== task.moduleId) return task.moduleTitle;
  const id = task.moduleId || task.tabId || '';
  if (id.startsWith('spoko_story_day')) return `Spoko English: Story Day ${id.replace('spoko_story_day', '')}`;
  if (id.startsWith('python_day')) return `Python Day ${id.replace('python_day', '')}`;
  if (id === 'python_games') return 'Python Game Projects Capstone';
  if (id === 'python_apps') return 'Python Desktop & Utility Apps';
  if (id.startsWith('sql_module')) return `SQL Day ${id.replace('sql_module', '')}`;
  if (id.startsWith('module')) return `Day ${id.replace('module', '')}`;
  return id.replace(/_/g, ' ').toUpperCase();
};

// 🎓 8 Main Courses with structured Sub-Courses configuration
export const COURSE_CATEGORIES = [
  {
    id: 'python_fullstack',
    title: 'Python Full Stack Development',
    badge: '10 Tracks',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    subCourses: [
      { value: 'web_design_20days', label: 'AI-Powered Web Design (20 Days)' },
      { value: 'html_css', label: 'HTML, CSS & Bootstrap' },
      { value: 'sql', label: 'Databases & SQL (Full Stack)' },
      { value: 'python_course', label: 'Core Python & OOPs' },
      { value: 'core_js', label: 'AI-Powered JavaScript' },
      { value: 'react_course', label: 'AI-Powered React JS' },
      { value: 'django_course', label: 'Django Framework' },
      { value: 'git_github', label: 'Git & GitHub' },
      { value: 'json_course', label: 'JSON Essentials' },
      { value: 'devops', label: 'DevOps Framework' }
    ]
  },
  {
    id: 'data_analysis',
    title: 'Data Analysis',
    badge: '3 Tracks',
    color: '#0284c7',
    bg: '#f0f9ff',
    border: '#bae6fd',
    subCourses: [
      { value: 'python_da', label: 'Python for Data Analytics' },
      { value: 'sql_da', label: 'SQL for Data Analytics' },
      { value: 'powerbi', label: 'Power BI Data Analytics' }
    ]
  },
  {
    id: 'data_analytics',
    title: 'Data Analytics',
    badge: '5 Tracks',
    color: '#6366f1',
    bg: '#eef2ff',
    border: '#c7d2fe',
    subCourses: [
      { value: 'stats_course', label: 'Statistics for Data Analytics' },
      { value: 'numpy_course', label: 'NumPy for Data Science' },
      { value: 'pandas_course', label: 'Pandas for Data Science' },
      { value: 'matplotlib_course', label: 'Matplotlib for Data Science' },
      { value: 'seaborn_course', label: 'Seaborn for Data Science' }
    ]
  },
  {
    id: 'accounting',
    title: 'Accounting',
    badge: '1 Track',
    color: '#059669',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    subCourses: [
      { value: 'tally_prime', label: 'AI Powered Tally Prime' }
    ]
  },
  {
    id: 'cognitive_ai',
    title: 'Cognitive AI',
    badge: '2 Tracks',
    color: '#db2777',
    bg: '#fdf2f8',
    border: '#fbcfe8',
    subCourses: [
      { value: 'generative_ai_course', label: 'Generative AI Masterclass' },
      { value: 'agentic_ai', label: 'Agentic AI Engineering' }
    ]
  },
  {
    id: 'spoko',
    title: 'Spoko',
    badge: '1 Track',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    subCourses: [
      { value: 'spoko_story', label: 'Story-Based Learning (Spoko English)' }
    ]
  },
  {
    id: 'skill_development',
    title: 'Skill Development',
    badge: '3 Tracks',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    subCourses: [
      { value: 'spoko_pro', label: 'Professional Track (Soft Skills)' },
      { value: 'spoko_hr', label: 'HR Interview Mastery (100 Q&A)' },
      { value: 'spoko_reasoning', label: 'Logical Reasoning & Analytical Thinking' }
    ]
  },
  {
    id: 'summer_course',
    title: 'Summer Course',
    badge: '1 Track',
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    subCourses: [
      { value: 'summer_sql', label: 'Summer SQL Crash Course' }
    ]
  }
];

const availableCourseOptions = [
  { value: "web_design_20days", label: "AI-Powered Web Design (20 Days)" },
  { value: "html_css", label: "HTML, CSS & Bootstrap" },
  { value: "sql", label: "Databases & SQL (Full Stack)" },
  { value: "sql_da", label: "SQL for Data Analytics" },
  { value: "python_course", label: "Core Python & OOPs" },
  { value: "python_da", label: "Python for Data Analytics" },
  { value: "javascript_course", label: "AI-Powered JavaScript" },
  { value: "generative_ai_course", label: "Generative AI" },
  { value: "agentic_ai", label: "Agentic AI Development" },
  { value: "summer_sql", label: "Summer SQL" },
  { value: "powerbi", label: "Power BI Data Analytics" },
  { value: "react_course", label: "AI-Powered React JS" },
  { value: "git_github", label: "Git & GitHub" },
  { value: "json_course", label: "JSON Essentials" },
  { value: "django_course", label: "Django Framework" },
  { value: "devops", label: "DevOps Framework" },
  { value: "stats_course", label: "Statistics for Data Analytics" },
  { value: "numpy_course", label: "NumPy for Data Science" },
  { value: "pandas_course", label: "Pandas for Data Science" },
  { value: "matplotlib_course", label: "Matplotlib for Data Science" },
  { value: "seaborn_course", label: "Seaborn for Data Science" },
  { value: "core_js", label: "Core JavaScript" },
  { value: "tally_prime", label: "AI powered Tally" },
  { value: "spoko_story", label: "Story-Based Learning (Spoko English)" },
  { value: "spoko_pro", label: "Professional Track (Soft Skills)" },
  { value: "spoko_hr", label: "HR Interview Mastery (100 Q&A)" },
  { value: "spoko_reasoning", label: "Logical Reasoning & Analytical Thinking" }
];

function getCourseLabel(courseKey) {
  if (!courseKey) return 'Unassigned';
  if (courseKey === 'all') return 'All Access';
  if (courseKey.includes(',')) {
    return courseKey.split(',').map(k => getCourseLabel(k.trim())).filter(Boolean).join(', ');
  }
  const found = availableCourseOptions.find(c => c.value === courseKey);
  if (found) return found.label;
  const labels = {
    web_design_20days: 'AI-Powered Web Design (20 Days)',
    web_design: 'AI-Powered Web Design',
    html_css: 'Web Design (HTML, CSS & Bootstrap)',
    sql: 'AI-Powered SQL Course',
    sql_da: 'SQL for Data Analytics',
    python_course: 'Core Python & OOPs',
    python_da: 'Python for Data Analytics',
    javascript_course: 'AI-Powered JavaScript',
    generative_ai_course: 'Generative AI',
    agentic_ai: 'Agentic AI Development',
    summer_sql: 'Summer SQL Crash Course',
    powerbi: 'AI-Powered Data Analytics (Power BI)',
    react_course: 'AI-Powered React JS',
    git_github: 'Git & GitHub',
    json_course: 'JSON Essentials',
    django_course: 'Django Framework',
    devops: 'DevOps Framework',
    stats_course: 'Statistics for Data Analytics',
    numpy_course: 'NumPy for Data Science',
    pandas_course: 'Pandas for Data Science',
    matplotlib_course: 'Matplotlib for Data Science',
    seaborn_course: 'Seaborn for Data Science',
    core_js: 'Core JavaScript',
    tally_prime: 'AI powered Tally',
    spoko_story: 'Story-Based Learning (Spoko English)',
    spoko_pro: 'Professional Track (Soft Skills)',
    softskills: 'Professional Track (Soft Skills)',
    spoko_hr: 'HR Interview Mastery (100 Q&A)',
    hr_interview_mastery: 'HR Interview Mastery (100 Q&A)',
    spoko_reasoning: 'Logical Reasoning & Analytical Thinking'
  };
  if (labels[courseKey]) return labels[courseKey];
  return courseKey.replace(/_/g, ' ').toUpperCase();
}

// 🎓 Returns matched main course category objects for an enrolledCourse string
export function getMainCourseCategories(courseKey) {
  if (!courseKey) return [];
  if (courseKey === 'all') {
    return COURSE_CATEGORIES;
  }
  const keys = (Array.isArray(courseKey) ? courseKey : courseKey.split(','))
    .map(k => k.trim())
    .filter(Boolean);

  if (keys.length === 0) return [];

  // Match which main course categories contain any of the enrolled sub-courses
  const matched = COURSE_CATEGORIES.filter(cat =>
    cat.subCourses.some(sc => keys.includes(sc.value))
  );

  return matched;
}

// 🎓 Returns clean comma-separated Main Course Names (e.g. "Data Analysis, Data Analytics")
export function getMainCourseLabels(courseKey) {
  if (!courseKey) return 'Unassigned';
  if (courseKey === 'all') return 'All Courses';

  const matched = getMainCourseCategories(courseKey);
  if (matched.length > 0) {
    return matched.map(m => m.title).join(', ');
  }

  // Fallback to legacy single label if none matched
  return getCourseLabel(courseKey);
}

function getCourseDataList(courseKey) {
  if (!courseKey) return [];
  const map = {
    html_css: CourseData.htmlCourseData,
    sql: CourseData.sqlCourseData,
    summer_sql: CourseData.summerSqlCourseData,
    sql_da: CourseData.daSqlCourseData,
    powerbi: CourseData.powerBiCourseData,
    agentic_ai: CourseData.agenticAiCourseData,
    python_fullstack: CourseData.pythonFullStackCourseData,
    python_course: CourseData.pythonCourseData,
    python_da: CourseData.pythonDaCourseData,
    generative_ai_course: CourseData.generativeAiCourseData,
    react_course: CourseData.reactCourseData,
    git_github: CourseData.gitCourseData,
    json_course: CourseData.jsonCourseData,
    django_course: CourseData.djangoCourseData,
    devops: CourseData.devopsCourseData,
    stats_course: CourseData.statsCourseData,
    numpy_course: CourseData.numpyCourseData,
    pandas_course: CourseData.pandasCourseData,
    matplotlib_course: CourseData.matplotlibCourseData,
    seaborn_course: CourseData.seabornCourseData,
    core_js: CourseData.coreJsCourseData,
    induction: CourseData.inductionCourseData,
    tally: CourseData.tallyCourseData,
    web_design_20days: CourseData.webDesignCourseData,
    spoko_story: CourseData.spokoStoryCourseData,
    spoko_pro: CourseData.spokoProCourseData,
    softskills: CourseData.spokoProCourseData,
    spoko_hr: CourseData.spokoHrCourseData,
    hr_interview_mastery: CourseData.spokoHrCourseData,
    spoko_reasoning: CourseData.spokoReasoningCourseData
  };
  return map[courseKey] || [];
}

// 🎙️ HR Mock Interview 5-Day Curriculum Configuration
export const HR_MOCK_DAYS = [
  { day: 1, title: 'Introduction & Personal Background', qCount: 10, range: 'Qs 1–20', badge: 'Self Pitch', color: '#4f46e5', bgLight: '#eef2ff' },
  { day: 2, title: 'Career Goals, Motivation & Job Change', qCount: 10, range: 'Qs 21–40', badge: 'Ambition', color: '#059669', bgLight: '#ecfdf5' },
  { day: 3, title: 'Behavioral, Situational & Teamwork (STAR)', qCount: 10, range: 'Qs 41–60', badge: 'STAR Method', color: '#d97706', bgLight: '#fffbeb' },
  { day: 4, title: 'Salary, Work Preferences & Challenging Qs', qCount: 10, range: 'Qs 61–80', badge: 'Negotiation', color: '#dc2626', bgLight: '#fef2f2' },
  { day: 5, title: 'Experience, Professionalism & Final Qs', qCount: 10, range: 'Qs 81–100', badge: 'Closing Mastery', color: '#7c3aed', bgLight: '#f5f3ff' }
];

export function getStudentMockInterviews(student) {
  if (!student) return [];
  if (Array.isArray(student.mockInterviews) && student.mockInterviews.length > 0) {
    return student.mockInterviews;
  }
  try {
    const userKey = student.accessCode || student.studentId || student._id || student.id;
    if (userKey) {
      const local = localStorage.getItem(`spoko_hr_mock_interviews_${userKey}`);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    }
  } catch (e) { }
  return [];
}

export function calculateStudentMockSummary(mockList) {
  const list = Array.isArray(mockList) ? mockList : [];
  const completed = HR_MOCK_DAYS.filter(d => list.some(m => Number(m.day) === d.day));
  const completedCount = completed.length;

  if (completedCount === 0) {
    return {
      completedCount: 0,
      totalDays: 5,
      averageScore: 0,
      grade: 'Not Attempted',
      dayMap: {}
    };
  }

  const dayMap = {};
  let sum = 0;
  HR_MOCK_DAYS.forEach(d => {
    const records = list.filter(m => Number(m.day) === d.day);
    if (records.length > 0) {
      const latest = records[records.length - 1];
      dayMap[d.day] = latest;
      sum += Number(latest.totalScore || 0);
    }
  });

  const avg = Math.round(sum / completedCount);
  let grade = 'C';
  if (avg >= 90) grade = 'S';
  else if (avg >= 80) grade = 'A';
  else if (avg >= 70) grade = 'B';
  else if (avg >= 60) grade = 'C';
  else grade = 'Needs Practice';

  return {
    completedCount,
    totalDays: 5,
    averageScore: avg,
    grade,
    dayMap
  };
}

// 🧠 Logical Thinking & Analytical Reasoning Evaluation Helpers
export function computeLogicalGrade(pct) {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 60) return 'C';
  return 'Needs Practice';
}

export function getLogicalGradeStyle(grade) {
  switch (grade) {
    case 'A+':
    case 'S':
      return { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' };
    case 'A':
      return { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' };
    case 'B':
      return { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' };
    case 'C':
      return { bg: '#fffbeb', text: '#d97706', border: '#fde68a' };
    case 'Needs Practice':
      return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
    default:
      return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' };
  }
}

export function isLogicalItem(s) {
  if (!s) return false;
  if (s.isLogicalReasoning === true || s.trackType === 'logical_reasoning') return true;
  const mod = (s.moduleId || '').toLowerCase();
  const title = (s.moduleTitle || '').toLowerCase();
  return mod.includes('reasoning') || mod.includes('logical') || title.includes('reasoning') || title.includes('logical');
}

export function isSpokoItem(s) {
  if (!s) return false;
  if (isLogicalItem(s)) return false; // Strictly isolate logical reasoning from Spoko English
  if (s.isSpoko === true || s.trackType === 'spoko') return true;
  const mod = (s.moduleId || '').toLowerCase();
  const title = (s.moduleTitle || '').toLowerCase();
  return (mod.includes('spoko') || title.includes('spoko'));
}

export function getStudentLogicalThinkingScore(student) {
  if (!student) {
    return {
      score: null,
      total: 100,
      percentage: null,
      grade: 'Pending',
      status: 'Not Evaluated',
      feedback: '',
      updatedAt: null,
      isEvaluated: false
    };
  }

  // 1. Check explicit score on student profile
  const lts = student.logicalThinkingScore;
  if (lts && (lts.score !== undefined && lts.score !== null) && Number(lts.score) > 0) {
    const scoreVal = Number(lts.score) || 0;
    const totalVal = Number(lts.total) || 100;
    const percentage = totalVal > 0 ? Math.round((scoreVal / totalVal) * 100) : 0;
    const grade = lts.grade || computeLogicalGrade(percentage);
    return {
      score: scoreVal,
      total: totalVal,
      percentage,
      grade,
      status: percentage >= 80 ? 'Mastery' : percentage >= 60 ? 'Proficient' : 'Developing',
      feedback: lts.feedback || '',
      updatedAt: lts.updatedAt || null,
      isEvaluated: true
    };
  }

  // 2. Check local reasoning quiz progress in localStorage
  try {
    const userKey = student.accessCode || student.studentId || student._id || student.id;
    if (userKey && typeof localStorage !== 'undefined') {
      let localScores = [];
      for (let day = 1; day <= 21; day++) {
        const item = localStorage.getItem(`spoko_reasoning_d${day}_progress_${userKey}`);
        if (item) {
          const parsed = JSON.parse(item);
          if (parsed && typeof parsed.quizScore === 'number' && parsed.quizScore > 0) {
            localScores.push(parsed.quizScore);
          }
        }
      }
      if (localScores.length > 0) {
        const avg20 = localScores.reduce((a, b) => a + b, 0) / localScores.length;
        const normalized100 = Math.round((avg20 / 20) * 100);
        return {
          score: normalized100,
          total: 100,
          percentage: normalized100,
          grade: computeLogicalGrade(normalized100),
          status: 'Auto (Quizzes)',
          feedback: `Average across ${localScores.length} completed reasoning quiz sessions.`,
          updatedAt: new Date().toISOString(),
          isEvaluated: true
        };
      }
    }
  } catch (e) { }

  // 3. Fallback: check reasoning progress in completedLessons
  const completedLessons = Array.isArray(student.completedLessons) ? student.completedLessons : [];
  const reasoningLessons = completedLessons.filter(l =>
    typeof l === 'string' && (l.includes('spoko_reasoning') || l.includes('reasoning'))
  );
  if (reasoningLessons.length > 0) {
    const estimatedPct = Math.min(100, Math.round((reasoningLessons.length / 21) * 100));
    return {
      score: estimatedPct,
      total: 100,
      percentage: estimatedPct,
      grade: computeLogicalGrade(estimatedPct),
      status: `${reasoningLessons.length}/21 Days Done`,
      feedback: `Based on ${reasoningLessons.length} completed logical reasoning daily modules.`,
      updatedAt: null,
      isEvaluated: true
    };
  }

  return {
    score: null,
    total: 100,
    percentage: null,
    grade: 'Pending',
    status: 'Pending Assessment',
    feedback: '',
    updatedAt: null,
    isEvaluated: false
  };
}

// Detailed Per-Course Progress breakdown for a student
function calculateDetailedCourseProgress(student) {
  if (!student) return [];
  const completedLessons = Array.isArray(student.completedLessons) ? student.completedLessons : [];
  const enrolledCourse = student.enrolledCourse || 'all';

  let courseKeys = [];
  if (enrolledCourse === 'all') {
    courseKeys = [
      'html_css', 'react_course', 'python_course', 'django_course', 'git_github',
      'core_js', 'web_design_20days', 'sql', 'powerbi', 'stats_course', 'devops',
      'json_course', 'numpy_course', 'pandas_course', 'matplotlib_course', 'seaborn_course',
      'summer_sql', 'sql_da', 'python_da', 'agentic_ai', 'generative_ai_course', 'induction', 'tally', 'spoko_story', 'spoko_pro', 'spoko_hr', 'spoko_reasoning'
    ];
  } else if (Array.isArray(enrolledCourse)) {
    courseKeys = enrolledCourse;
  } else if (typeof enrolledCourse === 'string') {
    courseKeys = enrolledCourse.split(',').map(k => k.trim()).filter(Boolean);
  }

  return courseKeys.map(courseKey => {
    const label = getCourseLabel(courseKey);
    const modules = getCourseDataList(courseKey) || [];

    let courseTotal = 0;
    let courseCompleted = 0;

    const moduleBreakdown = modules.map(m => {
      const items = m.items || [];
      let moduleCompleted = 0;

      const itemBreakdown = items.map(item => {
        const fullKey = `${courseKey}:${m.id}:${item.id}`;
        const midKey = `${m.id}:${item.id}`;
        const isDone = completedLessons.includes(fullKey) ||
          completedLessons.includes(midKey) ||
          completedLessons.includes(item.id) ||
          completedLessons.some(c => typeof c === 'string' && (c === item.id || c.endsWith(`:${item.id}`)));
        if (isDone) moduleCompleted++;
        return {
          id: item.id,
          label: item.label,
          isCompleted: isDone
        };
      });

      courseTotal += items.length;
      courseCompleted += moduleCompleted;

      const modulePercentage = items.length > 0 ? Math.round((moduleCompleted / items.length) * 100) : 0;

      return {
        id: m.id,
        title: m.title,
        itemsCount: items.length,
        completedCount: moduleCompleted,
        percentage: modulePercentage,
        items: itemBreakdown
      };
    });

    const coursePercentage = courseTotal > 0 ? Math.min(100, Math.round((courseCompleted / courseTotal) * 100)) : 0;

    return {
      courseKey,
      courseLabel: label,
      totalTopics: courseTotal,
      completedTopics: courseCompleted,
      percentage: coursePercentage,
      modules: moduleBreakdown
    };
  }).filter(c => c.totalTopics > 0 || c.modules.length > 0);
}

// Calculate Course Completion Progress % based on Mark Completed topics
function calculateStudentProgress(student) {
  if (!student) return { completedCount: 0, totalCount: 0, percentage: 0 };

  const completedLessons = Array.isArray(student.completedLessons) ? student.completedLessons : [];
  const enrolledCourse = student.enrolledCourse || 'all';

  let enrolledList = [];
  if (enrolledCourse === 'all') {
    const allKeys = [
      'html_css', 'sql', 'sql_da', 'summer_sql', 'powerbi', 'agentic_ai',
      'python_fullstack', 'python_course', 'python_da', 'generative_ai_course',
      'react_course', 'git_github', 'json_course', 'django_course', 'devops',
      'stats_course', 'numpy_course', 'pandas_course', 'matplotlib_course',
      'seaborn_course', 'core_js', 'induction', 'tally', 'web_design_20days', 'spoko_story', 'spoko_pro', 'spoko_hr', 'spoko_reasoning'
    ];
    allKeys.forEach(k => {
      const data = getCourseDataList(k);
      if (data) enrolledList = [...enrolledList, ...data];
    });
  } else {
    enrolledList = getCourseDataList(enrolledCourse);
  }

  const allItems = enrolledList.flatMap(m => m.items || []);
  const totalItems = allItems.length;

  if (totalItems === 0) {
    return {
      completedCount: completedLessons.length,
      totalCount: completedLessons.length || 0,
      percentage: completedLessons.length > 0 ? 100 : 0
    };
  }

  const completedCount = allItems.filter(item => {
    return completedLessons.includes(item.id) ||
      completedLessons.some(c => typeof c === 'string' && (c === item.id || c.endsWith(`:${item.id}`)));
  }).length;

  const percentage = Math.min(100, Math.round((completedCount / totalItems) * 100));

  return {
    completedCount,
    totalCount: totalItems,
    percentage
  };
}

export default function Dashboard({ onSelectCourse, enrolledCourse, setEnrolledCourse, session, onLogout, completedLessons = [], taskSubmissions = [] }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'courses' | 'register' | 'database' | 'demos' | 'grading'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmissionStatusModalOpen, setIsAdmissionStatusModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 868);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 868;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [enrollRole, setEnrollRole] = useState('student'); // 'student' | 'staff'
  const [dbTab, setDbTab] = useState('students'); // 'students' | 'staff'

  // Student Search & Pagination States
  const [studentSearch, setStudentSearch] = useState('');
  const [studentPage, setStudentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewingProgressStudent, setViewingProgressStudent] = useState(null);
  const [expandedCourseModule, setExpandedCourseModule] = useState({});

  // 🎙️ AI Mock Interview Tracking States
  const [studentMockInterviews, setStudentMockInterviews] = useState(() => {
    try {
      const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
      const saved = localStorage.getItem(`spoko_hr_mock_interviews_${userKey}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [viewingMockReport, setViewingMockReport] = useState(null);
  const [inspectingMockStudent, setInspectingMockStudent] = useState(null);
  const [inspectingMockDay, setInspectingMockDay] = useState(1);
  const [mockSearch, setMockSearch] = useState('');
  const [mockDayFilter, setMockDayFilter] = useState('all');
  const [mockGradeFilter, setMockGradeFilter] = useState('all');

  // Sync student's mock interviews from backend
  useEffect(() => {
    if (session?.role === 'student') {
      const studentId = session?.studentId || session?.accessCode;
      if (studentId) {
        fetch(`/api/students/${studentId}/mock-interviews`)
          .then(res => res.ok ? res.json() : [])
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              setStudentMockInterviews(data);
              try {
                const userKey = session?.accessCode || session?.studentId || session?.username || 'guest';
                localStorage.setItem(`spoko_hr_mock_interviews_${userKey}`, JSON.stringify(data));
              } catch { }
            }
          })
          .catch(() => { });
      }
    }
  }, [session]);

  // Filtered Students for Live Database
  const filteredStudents = students.filter(s => {
    if (!studentSearch.trim()) return true;
    const query = studentSearch.toLowerCase().trim();
    const nameMatch = (s.name || '').toLowerCase().includes(query);
    const codeMatch = (s.accessCode || '').toLowerCase().includes(query);
    const rawCourse = (s.enrolledCourse || '').toLowerCase();
    const courseLabel = getCourseLabel(s.enrolledCourse).toLowerCase();
    const mainCourseLabel = getMainCourseLabels(s.enrolledCourse).toLowerCase();
    const courseMatch = rawCourse.includes(query) || courseLabel.includes(query) || mainCourseLabel.includes(query);

    const { percentage, completedCount, totalCount } = calculateStudentProgress(s);
    const progressMatch = `${percentage}%`.includes(query) || `${completedCount}/${totalCount}`.includes(query);

    return nameMatch || codeMatch || courseMatch || progressMatch;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const safeStudentPage = Math.min(Math.max(1, studentPage), totalPages);
  const startIndex = (safeStudentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // HTML & CSS Course Validation State
  const [htmlCssValidations, setHtmlCssValidations] = useState(() => getAssignmentValidations());
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected' | 'spoko' | 'logical_reasoning'
  const [reviewSearch, setReviewSearch] = useState('');

  useEffect(() => {
    const handleSync = () => setHtmlCssValidations(getAssignmentValidations());
    window.addEventListener('html_css_validation_changed', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('html_css_validation_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // 1) Spoko Track Score Submissions (AI Mock Interview evaluations, STAR ratings, Spoko English tasks)
  const spokoMockSubmissions = students.flatMap(s => {
    const mocks = getStudentMockInterviews(s);
    return mocks.map((m, idx) => {
      const dayInfo = HR_MOCK_DAYS.find(d => Number(d.day) === Number(m.day)) || { title: `Day ${m.day} Interview` };
      return {
        _id: `spoko_mock_${s._id || s.id}_d${m.day || idx}`,
        id: `spoko_mock_${s._id || s.id}_d${m.day || idx}`,
        isSpoko: true,
        isLogicalReasoning: false,
        trackType: 'spoko',
        studentName: s.name,
        studentId: s._id || s.id,
        accessCode: s.accessCode,
        moduleId: `spoko_hr_day${m.day}`,
        moduleTitle: `Spoko HR Mock Interview Day ${m.day}: ${dayInfo.title}`,
        tabId: 'mock_interview',
        score: m.totalScore || 0,
        total: 100,
        grade: m.grade || 'B',
        submittedAt: m.completedAt || s.updatedAt || 'Recently',
        status: 'Approved',
        taskText: `[AI Mock Interview Evaluation]: Score: ${m.totalScore || 0}/100 • Grade: ${m.grade || 'B'}\nEvaluation Rubric: STAR Method (Situation, Task, Action, Result)\n${m.overallFeedback ? `Feedback: ${m.overallFeedback}` : 'Completed with 1-on-1 AI interviewer.'}`,
        staffFeedback: m.overallFeedback || 'Evaluated by AI with STAR Scoring Rubric'
      };
    });
  });

  // 2) Logical Reasoning Score Submissions (Benchmark assessments, daily reasoning quiz reports & evaluator scores)
  const logicalReasoningScoreSubmissions = students.flatMap(s => {
    const list = [];
    const studentId = s._id || s.id;
    const accessCode = s.accessCode;

    // A. Explicit staff evaluator score on student (only if valid non-zero score and real feedback exist)
    const lt = getStudentLogicalThinkingScore(s);
    if (lt && lt.isEvaluated && typeof lt.score === 'number' && lt.score > 0 && s.logicalThinkingScore?.feedback) {
      list.push({
        _id: `logical_score_${studentId}`,
        id: `logical_score_${studentId}`,
        isSpoko: false,
        isLogicalReasoning: true,
        trackType: 'logical_reasoning',
        studentName: s.name,
        studentId,
        accessCode,
        moduleId: 'logical_evaluator_score',
        moduleTitle: 'Logical Reasoning Evaluator Score Report',
        tabId: 'logical_reasoning',
        totalQuestions: lt.total || 100,
        correctAnswers: lt.score,
        incorrectAnswers: lt.total ? Math.max(0, lt.total - lt.score) : 0,
        score: lt.score,
        total: lt.total || 100,
        percentage: lt.percentage !== undefined ? lt.percentage : (lt.total ? Math.round((lt.score / lt.total) * 100) : lt.score),
        grade: lt.grade || computeLogicalGrade(lt.score),
        submittedAt: lt.updatedAt || s.updatedAt || 'Recently',
        status: (lt.score >= 70) ? 'Approved' : 'Pending',
        taskText: `[Logical Reasoning Evaluator Score]: ${lt.score}/100 • Grade: ${lt.grade} • Notes: ${s.logicalThinkingScore.feedback}`,
        staffFeedback: s.logicalThinkingScore.feedback
      });
    }

    // B. Daily Reasoning Assessments in student.tasks (only real completed exercises)
    (s.tasks || []).forEach((t, idx) => {
      const modLower = (t.moduleId || '').toLowerCase();
      if ((modLower.includes('reasoning') || modLower.includes('logical') || t.tabId === 'assessment') && t.moduleId !== 'spoko_reasoning_benchmark') {
        const scoreVal = t.score !== undefined ? Number(t.score) : undefined;
        const totalVal = t.total !== undefined ? Number(t.total) : 20;
        const pctVal = t.percentage !== undefined ? Number(t.percentage) : (scoreVal !== undefined && totalVal ? Math.round((scoreVal / totalVal) * 100) : undefined);
        const correctVal = t.correct !== undefined ? Number(t.correct) : scoreVal;
        const incorrectVal = t.incorrect !== undefined ? Number(t.incorrect) : (scoreVal !== undefined ? Math.max(0, totalVal - scoreVal) : undefined);
        const rawStatus = (t.status || 'Pending').toLowerCase();
        const normalizedStatus = rawStatus === 'approved' ? 'Approved' : rawStatus === 'rejected' ? 'Rejected' : 'Pending';

        list.push({
          _id: t._id || t.id || `logical_task_${studentId}_${t.moduleId || idx}`,
          id: t._id || t.id || `logical_task_${studentId}_${t.moduleId || idx}`,
          isSpoko: false,
          isLogicalReasoning: true,
          trackType: 'logical_reasoning',
          studentName: s.name,
          studentId,
          accessCode,
          moduleId: t.moduleId,
          moduleTitle: t.moduleTitle || (t.moduleId.startsWith('spoko_reasoning_day') ? `Day ${t.moduleId.replace('spoko_reasoning_day', '')} Assessment Report: Logical Reasoning & Analytical Thinking (Level 1 Beginner)` : formatTaskTitle(t)),
          tabId: t.tabId || 'assessment',
          totalQuestions: totalVal,
          correctAnswers: correctVal,
          incorrectAnswers: incorrectVal,
          score: scoreVal,
          total: totalVal,
          percentage: pctVal,
          grade: t.grade || (pctVal !== undefined ? computeLogicalGrade(pctVal) : 'A'),
          feedbackBand: t.feedback || t.feedbackBand || '',
          submittedAt: t.submittedAt || s.updatedAt || 'Recently',
          status: normalizedStatus,
          taskText: t.taskText || `[Assessment Report]: Score: ${scoreVal}/${totalVal} (${pctVal}%)`,
          staffFeedback: t.feedback || ''
        });
      }
    });

    // C. Check local storage for any completed reasoning assessments (Days 1 to 21)
    const uKeys = [accessCode, studentId, s._id, s.id].filter(Boolean);
    if (typeof localStorage !== 'undefined') {
      for (const uKey of uKeys) {
        for (let day = 1; day <= 21; day++) {
          try {
            const raw = localStorage.getItem(`spoko_reasoning_d${day}_progress_${uKey}`);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed && (parsed.quizFinished || typeof parsed.quizScore === 'number' || (parsed.quizAnswers && Object.keys(parsed.quizAnswers).length > 0))) {
                const qScore = Number(parsed.quizScore) || 0;
                const qPct = Math.round((qScore / 20) * 100);
                const qGrade = qPct >= 90 ? 'A+' : qPct >= 80 ? 'A' : qPct >= 70 ? 'B' : qPct >= 60 ? 'C' : 'Needs Practice';
                const bandText = qPct >= 90 ? '🌟 90–100%: Excellent Understanding!' :
                                 qPct >= 70 ? '🎉 70–89%: Good Progress!' :
                                 qPct >= 50 ? '📚 50–69%: Keep Practising!' :
                                 '⚠️ Below 50%: Review the Learning Material & Try Again.';
                list.push({
                  _id: `logical_day_${day}_${studentId}`,
                  id: `logical_day_${day}_${studentId}`,
                  isSpoko: false,
                  isLogicalReasoning: true,
                  trackType: 'logical_reasoning',
                  studentName: s.name,
                  studentId,
                  accessCode,
                  moduleId: `spoko_reasoning_day${day}`,
                  moduleTitle: `Day ${day} Assessment Report: Logical Reasoning & Analytical Thinking (Level 1 Beginner)`,
                  tabId: 'assessment',
                  totalQuestions: 20,
                  correctAnswers: qScore,
                  incorrectAnswers: Math.max(0, 20 - qScore),
                  score: qScore,
                  total: 20,
                  percentage: qPct,
                  grade: qGrade,
                  feedbackBand: bandText,
                  submittedAt: parsed.lastActivity || s.updatedAt || 'Recently',
                  status: qPct >= 70 ? 'Approved' : 'Pending',
                  taskText: `[Day ${day} Assessment Report]: Total Questions: 20 • Correct: ${qScore} • Incorrect: ${Math.max(0, 20 - qScore)} • Final Percentage: ${qPct}%\n${bandText}`,
                  staffFeedback: bandText
                });
              }
            }
          } catch {}
        }
      }
    }

    return list;
  });

  // 3) HTML & CSS Course Day Submissions
  const htmlCssSubmissions = Object.keys(htmlCssValidations).map(modId => {
    const rec = htmlCssValidations[modId] || {};
    const cfg = HTML_CSS_ASSIGNMENTS_CONFIG[modId] || {};
    const hasData = rec.studentFeedback || rec.submissionUrl || rec.submissionNotes || rec.submittedAt;
    if (!hasData) return null;

    return {
      _id: `html_css_${modId}`,
      id: `html_css_${modId}`,
      isHtmlCss: true,
      isSpoko: false,
      isLogicalReasoning: false,
      moduleId: modId,
      moduleTitle: cfg.dayTitle || modId,
      tabId: 'assignment',
      studentName: rec.studentName || 'Student Learner',
      accessCode: rec.studentAccessCode || 'STUDENT',
      submissionUrl: rec.submissionUrl || '',
      submissionNotes: rec.submissionNotes || '',
      studentFeedback: rec.studentFeedback || '',
      taskUrl: rec.submissionUrl || '',
      taskText: rec.studentFeedback ? `[Student Reflection]: ${rec.studentFeedback}${rec.submissionNotes ? `\n\n[Code / Notes]: ${rec.submissionNotes}` : ''}` : rec.submissionNotes || '',
      submittedAt: rec.submittedAt || rec.updatedAt || 'Recently',
      status: (rec.status || '').toLowerCase() === 'approved' ? 'Approved' : (rec.status || '').toLowerCase() === 'rejected' ? 'Rejected' : 'Pending',
      staffFeedback: rec.staffFeedback || '',
      validatedAt: rec.validatedAt || '',
      validatedBy: rec.validatedBy || ''
    };
  }).filter(Boolean);

  // 4) Topic Homework Submissions from Students Backend
  const topicSubmissions = students.flatMap(s =>
    (s.tasks || []).map((t, idx) => {
      const rawStatus = (t.status || 'Pending').toLowerCase();
      const normalizedStatus = rawStatus === 'approved' ? 'Approved' : rawStatus === 'rejected' ? 'Rejected' : 'Pending';
      const taskId = t._id || t.id || `task_${s._id || s.id}_${t.moduleId || idx}`;
      const isReasoning = isLogicalItem(t);
      const isSpoko = isSpokoItem(t);
      return {
        ...t,
        _id: taskId,
        id: taskId,
        isHtmlCss: false,
        isSpoko,
        isLogicalReasoning: isReasoning,
        studentName: s.name,
        studentId: s._id || s.id,
        accessCode: s.accessCode,
        moduleId: t.moduleId,
        tabId: t.tabId || 'assignment',
        moduleTitle: formatTaskTitle(t),
        status: normalizedStatus
      };
    })
  );

  // Combined Chronological Submissions with clean key deduplication
  const rawSubmissions = [
    ...spokoMockSubmissions,
    ...logicalReasoningScoreSubmissions,
    ...htmlCssSubmissions,
    ...topicSubmissions
  ];

  const seenSubKeys = new Set();
  const allSubmissions = rawSubmissions.filter(item => {
    const key = item.moduleId ? `${item.studentId || ''}_${item.moduleId}` : (item._id || item.id);
    if (seenSubKeys.has(key)) return false;
    seenSubKeys.add(key);
    return true;
  }).sort((a, b) => {
    const da = new Date(a.submittedAt).getTime() || 0;
    const db = new Date(b.submittedAt).getTime() || 0;
    return db - da;
  });

  const spokoSubmissions = allSubmissions.filter(isSpokoItem);
  const logicalReasoningSubmissions = allSubmissions.filter(isLogicalItem);

  const pendingSubmissions = allSubmissions.filter(s => (s.status || '').toLowerCase() === 'pending');
  const pendingCount = pendingSubmissions.length;
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleQuickApprove = async (task) => {
    const taskKey = task._id || task.id || `${task.studentId}_${task.moduleId}`;
    setActionLoadingId(taskKey);

    if (task.isHtmlCss) {
      const rec = htmlCssValidations[task.moduleId] || {};
      const updatedRecord = {
        ...rec,
        staffFeedback: 'Great work! Code meets semantic standards and feedback is thoughtful. Approved.',
        status: 'approved',
        validatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        validatedBy: session?.name || 'Staff Instructor'
      };
      saveAssignmentValidation(task.moduleId, updatedRecord);
      setHtmlCssValidations(getAssignmentValidations());
      setActionLoadingId(null);
    } else {
      try {
        const taskId = task._id || task.id || 'module_review';
        const res = await fetch(`/api/students/tasks/${taskId}/grade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: task.studentId,
            accessCode: task.accessCode,
            moduleId: task.moduleId,
            tabId: task.tabId || 'assignment',
            status: 'Approved',
            feedback: 'Approved by staff',
            grade: 'A+'
          })
        });
        if (res.ok) {
          if (task.moduleId) {
            saveAssignmentValidation(task.moduleId, {
              status: 'approved',
              studentName: task.studentName,
              staffFeedback: 'Approved by staff'
            });
          }
          // Optimistically update students state so pending count and badge update immediately
          setStudents(prev => prev.map(s => {
            if (s._id === task.studentId || s.id === task.studentId || s.accessCode === task.accessCode) {
              const updatedTasks = (s.tasks || []).map(t => {
                if ((task._id && (t._id === task._id || t.id === task._id)) || t.moduleId === task.moduleId) {
                  return { ...t, status: 'Approved', feedback: 'Approved by staff', grade: 'A+' };
                }
                return t;
              });
              const completed = Array.isArray(s.completedLessons) ? [...s.completedLessons] : [];
              if (task.moduleId && !completed.includes(task.moduleId)) {
                completed.push(task.moduleId);
              }
              return { ...s, tasks: updatedTasks, completedLessons: completed };
            }
            return s;
          }));
          await fetchStudents();
        } else {
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Failed to approve task.');
        }
      } catch (err) {
        console.warn('API error approving task:', err);
        alert('Could not reach backend API server.');
      } finally {
        setActionLoadingId(null);
      }
    }
  };

  const handleQuickReject = async (task) => {
    const taskKey = task._id || task.id || `${task.studentId}_${task.moduleId}`;
    setActionLoadingId(taskKey);

    if (task.isHtmlCss) {
      const rec = htmlCssValidations[task.moduleId] || {};
      const updatedRecord = {
        ...rec,
        staffFeedback: 'Please revise your submission details according to criteria and resubmit.',
        status: 'rejected',
        validatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        validatedBy: session?.name || 'Staff Instructor'
      };
      saveAssignmentValidation(task.moduleId, updatedRecord);
      setHtmlCssValidations(getAssignmentValidations());
      setActionLoadingId(null);
    } else {
      try {
        const taskId = task._id || task.id || 'module_review';
        const res = await fetch(`/api/students/tasks/${taskId}/grade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: task.studentId,
            accessCode: task.accessCode,
            moduleId: task.moduleId,
            tabId: task.tabId || 'assignment',
            status: 'Rejected',
            feedback: 'Revision requested by staff. Please review comments and resubmit.',
            grade: 'Needs Revision'
          })
        });
        if (res.ok) {
          if (task.moduleId) {
            saveAssignmentValidation(task.moduleId, {
              status: 'rejected',
              studentName: task.studentName,
              staffFeedback: 'Revision requested by staff'
            });
          }
          // Optimistically update students state
          setStudents(prev => prev.map(s => {
            if (s._id === task.studentId || s.id === task.studentId || s.accessCode === task.accessCode) {
              const updatedTasks = (s.tasks || []).map(t => {
                if ((task._id && (t._id === task._id || t.id === task._id)) || t.moduleId === task.moduleId) {
                  return { ...t, status: 'Rejected', feedback: 'Revision requested by staff', grade: 'Needs Revision' };
                }
                return t;
              });
              return { ...s, tasks: updatedTasks };
            }
            return s;
          }));
          await fetchStudents();
        } else {
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Failed to request revision.');
        }
      } catch (err) {
        console.warn('API error requesting revision:', err);
        alert('Could not reach backend API server.');
      } finally {
        setActionLoadingId(null);
      }
    }
  };

  // Grading Modal States
  const [gradingTask, setGradingTask] = useState(null);
  const [gradingStudentId, setGradingStudentId] = useState('');
  const [gradingStatus, setGradingStatus] = useState('Approved');
  const [gradingFeedback, setGradingFeedback] = useState('');
  const [gradingGrade, setGradingGrade] = useState('A+');
  const [gradingLoading, setGradingLoading] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [assignedCourse, setAssignedCourse] = useState('html_css');
  const [valIdCard, setValIdCard] = useState(false);
  const [valFeeInitiated, setValFeeInitiated] = useState(false);
  const [valInduction, setValInduction] = useState(false);
  const allValidationsChecked = valIdCard && valFeeInitiated && valInduction;

  // Accordion state for course categories in enroll & edit modals (all expanded by default)
  const [expandedEnrollCats, setExpandedEnrollCats] = useState(() => COURSE_CATEGORIES.map(c => c.id));
  const [expandedEditCats, setExpandedEditCats] = useState(() => COURSE_CATEGORIES.map(c => c.id));

  const toggleEnrollCatExpand = (catId) => {
    setExpandedEnrollCats(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const toggleEditCatExpand = (catId) => {
    setExpandedEditCats(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  // Student course editing states
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingAccessCode, setEditingAccessCode] = useState('');
  const [editingCourses, setEditingCourses] = useState('');
  const [editingAdmissionConfirmed, setEditingAdmissionConfirmed] = useState(true);
  const [editingValIdCard, setEditingValIdCard] = useState(false);
  const [editingValFeeInitiated, setEditingValFeeInitiated] = useState(false);
  const [editingValInduction, setEditingValInduction] = useState(false);
  const [editingLogicalScore, setEditingLogicalScore] = useState('');
  const [editingLogicalFeedback, setEditingLogicalFeedback] = useState('');
  const [editingLoading, setEditingLoading] = useState(false);
  const [editingError, setEditingError] = useState('');

  // Quick Logical Thinking Score Modal states
  const [quickLogicalStudent, setQuickLogicalStudent] = useState(null);
  const [quickLogicalScore, setQuickLogicalScore] = useState('');
  const [quickLogicalFeedback, setQuickLogicalFeedback] = useState('');
  const [quickLogicalLoading, setQuickLogicalLoading] = useState(false);

  const handleOpenQuickLogicalModal = (student) => {
    setQuickLogicalStudent(student);
    const cur = student.logicalThinkingScore?.score !== undefined && student.logicalThinkingScore.score !== null
      ? student.logicalThinkingScore.score
      : '';
    setQuickLogicalScore(cur !== '' && Number(cur) > 0 ? String(cur) : '');
    setQuickLogicalFeedback(student.logicalThinkingScore?.feedback || '');
  };

  const handleSaveQuickLogicalScore = async (e) => {
    if (e) e.preventDefault();
    if (!quickLogicalStudent) return;
    setQuickLogicalLoading(true);
    try {
      const sId = quickLogicalStudent._id || quickLogicalStudent.id || quickLogicalStudent.accessCode;
      const res = await fetch(`/api/students/${sId}/logical-thinking-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: quickLogicalScore !== '' ? Number(quickLogicalScore) : 0,
          total: 100,
          feedback: quickLogicalFeedback
        })
      });
      if (res.ok) {
        setQuickLogicalStudent(null);
        fetchStudents();
      } else {
        alert('Failed to save logical thinking score');
      }
    } catch (err) {
      alert('Network error while saving logical thinking score');
    } finally {
      setQuickLogicalLoading(false);
    }
  };

  const handleOpenEditCoursesModal = (student) => {
    setEditingStudent(student);
    setEditingName(student.name || '');
    setEditingAccessCode(student.accessCode || '');
    setEditingCourses(student.enrolledCourse || '');
    const isConfirmed = student.admissionStatus === 'Approved' || (student.isCourseActivated !== false && student.admissionStatus !== 'Pending');
    setEditingAdmissionConfirmed(isConfirmed);
    setEditingValIdCard(student.idCardIssued !== undefined ? Boolean(student.idCardIssued) : isConfirmed);
    setEditingValFeeInitiated(student.feeInitiated !== undefined ? Boolean(student.feeInitiated) : isConfirmed);
    setEditingValInduction(student.inductionCompleted !== undefined ? Boolean(student.inductionCompleted) : isConfirmed);
    const currentScore = student.logicalThinkingScore?.score !== undefined && student.logicalThinkingScore?.score !== null
      ? student.logicalThinkingScore.score
      : '';
    setEditingLogicalScore(currentScore !== '' && Number(currentScore) > 0 ? String(currentScore) : '');
    setEditingLogicalFeedback(student.logicalThinkingScore?.feedback || '');
    setEditingError('');

    // Expand only the categories student has enrolled tracks in (or all if none)
    const enrolledKeys = (student.enrolledCourse || '').split(',').map(s => s.trim()).filter(Boolean);
    const activeCats = COURSE_CATEGORIES.filter(cat =>
      cat.subCourses.some(sc => enrolledKeys.includes(sc.value))
    ).map(c => c.id);
    setExpandedEditCats(activeCats.length > 0 ? activeCats : COURSE_CATEGORIES.map(c => c.id));
  };

  const handleSaveCourses = async (e) => {
    e.preventDefault();
    setEditingError('');
    setEditingLoading(true);
    const allEditingChecked = editingValIdCard && editingValFeeInitiated && editingValInduction;
    try {
      const res = await fetch(`/api/students/${editingStudent._id || editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingName,
          accessCode: editingAccessCode,
          enrolledCourse: editingCourses,
          idCardIssued: editingValIdCard,
          feeInitiated: editingValFeeInitiated,
          inductionCompleted: editingValInduction,
          admissionConfirmed: allEditingChecked,
          logicalThinkingScore: editingLogicalScore !== '' ? Number(editingLogicalScore) : null,
          logicalThinkingFeedback: editingLogicalFeedback
        })
      });
      if (res.ok) {
        setEditingStudent(null);
        fetchStudents();
      } else {
        const err = await res.json();
        setEditingError(err.error || 'Failed to save student profile.');
      }
    } catch (err) {
      setEditingError('Could not reach backend API server.');
    } finally {
      setEditingLoading(false);
    }
  };

  const handleToggleAdmission = async (studentId) => {
    try {
      const res = await fetch(`/api/students/${studentId}/toggle-admission`, { method: 'POST' });
      if (res.ok) {
        fetchStudents();
      }
    } catch (e) {
      console.warn('Failed to toggle admission status:', e);
    }
  };

  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffUsername, setNewStaffUsername] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');

  const [adminError, setAdminError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Certificate States
  const [certStudentId, setCertStudentId] = useState('');
  const [certFile, setCertFile] = useState(null);
  const [certUploading, setCertUploading] = useState(false);
  const [certSuccessMsg, setCertSuccessMsg] = useState('');
  const [certError, setCertError] = useState('');
  const [studentCertificate, setStudentCertificate] = useState(null); // for student dashboard

  const getCourseDataList = (courseKey) => {
    if (!courseKey) return [];
    if (courseKey === 'all') return [];
    if (courseKey.includes(',')) {
      const keys = courseKey.split(',');
      let combined = [];
      keys.forEach(k => {
        const data = getCourseDataList(k);
        if (data) combined = [...combined, ...data];
      });
      return combined;
    }
    const map = {
      html_css: CourseData.htmlCourseData,
      sql: CourseData.sqlCourseData,
      sql_da: CourseData.daSqlCourseData,
      summer_sql: CourseData.summerSqlCourseData,
      powerbi: CourseData.powerBiCourseData,
      agentic_ai: CourseData.agenticAiCourseData,
      python_fullstack: CourseData.pythonFullStackCourseData,
      python_course: CourseData.pythonCourseData,
      python_da: CourseData.pythonDaCourseData,
      generative_ai_course: CourseData.generativeAiCourseData,
      react_course: CourseData.reactCourseData,
      git_github: CourseData.gitCourseData,
      json_course: CourseData.jsonCourseData,
      django_course: CourseData.djangoCourseData,
      devops: CourseData.devopsCourseData,
      stats_course: CourseData.statsCourseData,
      numpy_course: CourseData.numpyCourseData,
      pandas_course: CourseData.pandasCourseData,
      matplotlib_course: CourseData.matplotlibCourseData,
      seaborn_course: CourseData.seabornCourseData,
      core_js: CourseData.coreJsCourseData,
      induction: CourseData.inductionCourseData,
      tally: CourseData.tallyCourseData,
      web_design: CourseData.webDesignCourseData,
      web_design_20days: CourseData.webDesignCourseData,
      spoko_story: CourseData.spokoStoryCourseData,
      spoko_pro: CourseData.spokoProCourseData,
      softskills: CourseData.spokoProCourseData,
      spoko_hr: CourseData.spokoHrCourseData,
      hr_interview_mastery: CourseData.spokoHrCourseData,
      spoko_reasoning: CourseData.spokoReasoningCourseData
    };
    return map[courseKey] || [];
  };

  const getInitialMainCourse = () => {
    const list = enrolledCourse ? enrolledCourse.split(',') : [];
    const firstCourse = list[0];
    if (firstCourse === 'powerbi' || firstCourse === 'stats_course' || firstCourse === 'numpy_course' || firstCourse === 'pandas_course' || firstCourse === 'matplotlib_course' || firstCourse === 'seaborn_course' || firstCourse === 'sql_da' || firstCourse === 'python_da') return 'dataanalytics';
    if (firstCourse === 'summer_sql') return 'summer';
    if (firstCourse === 'generative_ai_course' || firstCourse === 'agentic_ai') return 'aidevelopment';
    return 'fullstack';
  };
  const [activeMainCourse, setActiveMainCourse] = useState(getInitialMainCourse);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (e) {
      console.warn('API error fetching students:', e);
    }
  };

  const fetchStudentCertificate = async (studentId) => {
    try {
      const res = await fetch(`/api/students/${studentId}/certificate`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.data) setStudentCertificate(data);
      }
    } catch (e) {
      console.warn('Error fetching student certificate:', e);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await fetch('/api/staff');
      if (res.ok) {
        const data = await res.json();
        setStaff(data);
      }
    } catch (e) {
      console.warn('API error fetching staff:', e);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchStaff();
    if (session?.role === 'student' && session?.studentId) {
      fetchStudentCertificate(session.studentId);
    }
  }, []);

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    setAdminError('');
    setSuccessMsg('');
    if (!newStudentName.trim()) {
      setAdminError('Student Name is required!');
      return;
    }

    if (!allValidationsChecked) {
      setAdminError('Please tick all 3 validation checks (ID Card, Fee Initiated, Induction Session) before enrolling!');
      return;
    }

    if (!assignedCourse || !assignedCourse.trim()) {
      setAdminError('Please select at least one curriculum pathway for this student!');
      return;
    }

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStudentName.trim(),
          enrolledCourse: assignedCourse,
          idCardIssued: valIdCard,
          feeInitiated: valFeeInitiated,
          inductionCompleted: valInduction,
          admissionConfirmed: allValidationsChecked
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSuccessMsg(`Student registered! Access Code: ${data.accessCode} • All 3 validations completed & course unlocked.`);
        setNewStudentName('');
        setValIdCard(false);
        setValFeeInitiated(false);
        setValInduction(false);
        fetchStudents();
        setActiveTab('database');
      } else {
        const err = await res.json();
        setAdminError(err.error || 'Registration failed.');
      }
    } catch (err) {
      setAdminError('Could not reach backend API server.');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('Are you sure you want to delete this student record?')) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStudents();
      }
    } catch (e) {
      console.warn('API error deleting student:', e);
    }
  };

  const handleRegisterStaff = async (e) => {
    e.preventDefault();
    setAdminError('');
    setSuccessMsg('');
    if (!newStaffName.trim() || !newStaffUsername.trim() || !newStaffPassword.trim()) {
      setAdminError('All staff fields are required!');
      return;
    }

    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStaffName.trim(),
          username: newStaffUsername.trim(),
          password: newStaffPassword.trim()
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSuccessMsg(`Staff credentials created successfully for ${data.name}!`);
        setNewStaffName('');
        setNewStaffUsername('');
        setNewStaffPassword('');
        fetchStaff();
        setDbTab('staff');
        setActiveTab('database');
      } else {
        const err = await res.json();
        setAdminError(err.error || 'Failed to register staff.');
      }
    } catch (err) {
      setAdminError('Could not reach backend API server.');
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!confirm('Are you sure you want to remove this staff instructor?')) return;
    try {
      const res = await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStaff();
      }
    } catch (e) {
      console.warn('API error removing staff:', e);
    }
  };

  const handleResetDevice = async (id) => {
    try {
      const res = await fetch(`/api/students/${id}/reset-device`, { method: 'POST' });
      if (res.ok) {
        fetchStudents();
        alert('Student device lock has been successfully cleared! They can now access this link from a new device.');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to reset device lock.');
      }
    } catch (err) {
      console.warn('API error resetting device lock:', err);
    }
  };

  const handleGradeTaskSubmit = async (e) => {
    e.preventDefault();
    if (!gradingTask) return;

    const statusTrimmed = gradingStatus ? gradingStatus.trim() : '';
    const feedbackTrimmed = gradingFeedback ? gradingFeedback.trim() : '';
    const gradeTrimmed = gradingGrade ? gradingGrade.trim() : '';

    if (statusTrimmed === 'Rejected' && feedbackTrimmed.length < 5) {
      alert('Evaluation feedback is required when requesting a revision.');
      return;
    }

    setGradingLoading(true);
    try {
      if (gradingTask.isHtmlCss) {
        const rec = htmlCssValidations[gradingTask.moduleId] || {};
        const updatedRecord = {
          ...rec,
          staffFeedback: feedbackTrimmed || (statusTrimmed === 'Approved' ? 'Approved by staff' : 'Revision requested'),
          status: statusTrimmed.toLowerCase(),
          validatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          validatedBy: session?.name || 'Staff Instructor'
        };
        saveAssignmentValidation(gradingTask.moduleId, updatedRecord);
        setHtmlCssValidations(getAssignmentValidations());
        alert('Task evaluated successfully!');
        setGradingTask(null);
      } else {
        const taskId = gradingTask._id || gradingTask.id || 'module_review';
        const res = await fetch(`/api/students/tasks/${taskId}/grade`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: gradingStudentId || gradingTask.studentId,
            accessCode: gradingTask.accessCode,
            moduleId: gradingTask.moduleId,
            tabId: gradingTask.tabId || 'assignment',
            status: statusTrimmed,
            feedback: feedbackTrimmed,
            grade: gradeTrimmed || (statusTrimmed === 'Approved' ? 'A+' : statusTrimmed === 'Rejected' ? 'Needs Revision' : '')
          })
        });
        if (res.ok) {
          if (gradingTask.moduleId) {
            saveAssignmentValidation(gradingTask.moduleId, {
              status: statusTrimmed.toLowerCase(),
              studentName: gradingTask.studentName,
              staffFeedback: feedbackTrimmed
            });
          }
          // Optimistically update students state
          setStudents(prev => prev.map(s => {
            if (s._id === (gradingStudentId || gradingTask.studentId) || s.id === (gradingStudentId || gradingTask.studentId) || s.accessCode === gradingTask.accessCode) {
              const updatedTasks = (s.tasks || []).map(t => {
                if ((gradingTask._id && (t._id === gradingTask._id || t.id === gradingTask._id)) || t.moduleId === gradingTask.moduleId) {
                  return { ...t, status: statusTrimmed, feedback: feedbackTrimmed, grade: gradeTrimmed };
                }
                return t;
              });
              const completed = Array.isArray(s.completedLessons) ? [...s.completedLessons] : [];
              if (statusTrimmed === 'Approved' && gradingTask.moduleId && !completed.includes(gradingTask.moduleId)) {
                completed.push(gradingTask.moduleId);
              }
              return { ...s, tasks: updatedTasks, completedLessons: completed };
            }
            return s;
          }));
          alert('Task graded successfully!');
          setGradingTask(null);
          await fetchStudents();
        } else {
          const err = await res.json().catch(() => ({}));
          alert(err.error || 'Failed to grade task.');
        }
      }
    } catch (err) {
      console.warn('API error grading task:', err);
      alert('Could not reach backend API server.');
    } finally {
      setGradingLoading(false);
    }
  };

  const handleUploadCertificate = async () => {
    setCertError('');
    setCertSuccessMsg('');
    if (!certStudentId) {
      setCertError('Please select a student.');
      return;
    }
    if (!certFile) {
      setCertError('Please choose a certificate file.');
      return;
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (certFile.size > maxSize) {
      setCertError('File is too large. Maximum size is 2MB.');
      return;
    }
    setCertUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result; // full data URL: "data:application/pdf;base64,..."
        try {
          const res = await fetch(`/api/students/${certStudentId}/certificate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              certificateData: base64,
              filename: certFile.name,
              mimeType: certFile.type
            })
          });
          if (res.ok) {
            const data = await res.json();
            setCertSuccessMsg(`Certificate uploaded successfully for ${data.student?.name || 'student'}!`);
            setCertFile(null);
            fetchStudents();
          } else {
            const err = await res.json();
            setCertError(err.error || 'Upload failed. Please try again.');
          }
        } catch (err) {
          setCertError('Could not reach backend API server.');
        } finally {
          setCertUploading(false);
        }
      };
      reader.readAsDataURL(certFile);
    } catch (e) {
      setCertError('Error reading file.');
      setCertUploading(false);
    }
  };

  const handleDownloadCertificate = () => {
    if (!studentCertificate || !studentCertificate.data) return;
    const link = document.createElement('a');
    link.href = studentCertificate.data;
    link.download = studentCertificate.filename || 'certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const totalLocked = students.filter(s => s.deviceId).length;
  const totalStudents = students.length;

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', width: '100%', background: 'var(--bg-color)', position: 'relative' }}>

      {/* 📱 MOBILE STICKY HEADER BAR */}
      {isMobile && (
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          background: '#ffffff',
          borderBottom: '1px solid var(--surface-border)',
          position: 'sticky',
          top: 0,
          zIndex: 900,
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
                ALPHA FLY
              </h2>
              <span style={{ fontSize: '0.62rem', color: 'var(--accent-primary)', letterSpacing: '1.5px', fontWeight: 800 }}>STUDY PORTAL</span>
            </div>
          </div>

          {session?.role !== 'student' && pendingCount > 0 && (
            <button
              type="button"
              onClick={() => { setActiveTab('grading'); setIsMobileMenuOpen(false); }}
              style={{
                background: '#fef2f2',
                border: '1px solid #fca5a5',
                color: '#dc2626',
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              🔔 {pendingCount}
            </button>
          )}
        </header>
      )}

      {/* 🌫️ BACKDROP FOR MOBILE SIDEBAR DRAWER */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 999
          }}
        />
      )}

      {/* 🧭 LEFT SIDE NAVIGATION PANEL (DESKTOP + MOBILE DRAWER) */}
      <aside style={{
        width: isMobile ? '280px' : '260px',
        background: '#ffffff',
        borderRight: '1px solid var(--surface-border)',
        padding: '2.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        boxShadow: isMobile ? '0 20px 25px -5px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: isMobile ? 1000 : 'auto',
        transform: isMobile && !isMobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowY: 'auto'
      }}>
        <div>
          {/* Logo Brand */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
                ALPHA FLY
              </h2>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', letterSpacing: '2px', fontWeight: 800 }}>STUDY PORTAL</span>
            </div>
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 4 }}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => { setActiveTab('overview'); if (isMobile) setIsMobileMenuOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                background: activeTab === 'overview' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === 'overview' ? 'var(--glow-primary)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <Grid size={18} /> Overview
            </button>

            <button
              onClick={() => { setActiveTab('courses'); if (isMobile) setIsMobileMenuOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                background: activeTab === 'courses' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                color: activeTab === 'courses' ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === 'courses' ? 'var(--glow-primary)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <BookOpen size={18} /> Course Catalog
            </button>

            {/* Admin only sections */}
            {(session?.role === 'admin' || session?.role === 'staff') && (
              <>
                <div style={{ height: '1px', background: 'var(--surface-border)', margin: '1rem 0' }} />
                <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontWeight: 800, textTransform: 'uppercase', paddingLeft: '1rem', marginBottom: '0.4rem', display: 'block', letterSpacing: '0.5px' }}>Administration</span>

                <button
                  onClick={() => { setActiveTab('register'); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'register' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'register' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'register' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <UserPlus size={18} /> Enroll Student
                </button>

                <button
                  onClick={() => { setActiveTab('database'); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'database' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'database' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'database' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Users size={18} /> Students Database
                </button>

                <button
                  onClick={() => { setActiveTab('grading'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'grading' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'grading' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'grading' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)',
                    position: 'relative'
                  }}
                >
                  <CheckCircle size={18} /> Review Tasks
                  {pendingCount > 0 && (
                    <span style={{
                      background: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      marginLeft: 'auto',
                      boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                    }}>
                      {pendingCount} New
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { setActiveTab('certificates'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'certificates' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                    color: activeTab === 'certificates' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'certificates' ? '0 4px 12px rgba(245,158,11,0.35)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Upload size={18} /> Certificate Upload
                </button>

                <button
                  onClick={() => { setActiveTab('af_certificates'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: (activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                    color: (activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: (activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') ? '0 4px 12px rgba(245,158,11,0.35)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Award size={18} /> Prepare Certificate / ID Card
                </button>

                <button
                  onClick={() => { setActiveTab('invoices'); fetchStudents(); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'invoices' ? 'linear-gradient(135deg, #0A3D91 0%, #1d4ed8 100%)' : 'transparent',
                    color: activeTab === 'invoices' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'invoices' ? '0 4px 12px rgba(10, 61, 145, 0.35)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Receipt size={18} /> Fee Invoices
                </button>
              </>
            )}

            {session?.role !== 'student' && (
              <>
                <div style={{ height: '1px', background: 'var(--surface-border)', margin: '1rem 0' }} />
                <button
                  onClick={() => { setActiveTab('demos'); if (isMobile) setIsMobileMenuOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%', border: 'none', padding: '0.8rem 1rem',
                    fontSize: '0.92rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                    background: activeTab === 'demos' ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' : 'transparent',
                    color: activeTab === 'demos' ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'demos' ? 'var(--glow-primary)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <Sparkles size={18} /> Induction Sessions
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Footer Account Details */}
        <div style={{
          background: 'var(--bg-color)',
          border: '1px solid var(--surface-border)',
          borderRadius: '16px',
          padding: '0.88rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.name}</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{session.role} Portal</div>
          </div>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.15)',
              borderRadius: '8px', padding: '0.4rem 0', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'var(--transition)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN WORKSPACE CONTENT CONTAINER */}
      <main style={{ flex: 1, padding: activeTab === 'invoices' ? 0 : (isMobile ? '1.25rem 1rem' : '3rem 4rem'), minHeight: '100vh', overflowY: 'auto', minWidth: 0, background: activeTab === 'invoices' ? '#0f172a' : 'transparent' }}>

        {/* Dynamic header title based on active tab */}
        {activeTab !== 'invoices' && activeTab !== 'prepare_certs' && activeTab !== 'af_certificates' && activeTab !== 'idcards' && activeTab !== 'foclen' && (
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '1rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                {activeTab === 'overview' && 'LMS Workspace Overview'}
                {activeTab === 'courses' && 'Interactive Course Catalog'}
                {activeTab === 'register' && 'Enroll a New Student'}
                {activeTab === 'database' && 'Student Credentials Directory'}
                {activeTab === 'demos' && 'Alpha Fly Induction & Demo Classes'}
                {activeTab === 'grading' && 'Review and Grade Assignments'}
                {activeTab === 'certificates' && 'Certificate Upload'}
                {activeTab === 'mock_interviews' && 'AI Mock Interviews & Student Progress'}
              </h1>
              <p style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                {activeTab === 'overview' && 'Overview stats, role privileges, and quick configuration access.'}
                {activeTab === 'courses' && 'Browse, select, and launch learning timelines and bootcamp environments.'}
                {activeTab === 'register' && 'Assign course tracks and generate direct student login credential links.'}
                {activeTab === 'database' && 'Review and clear access token keys, device locks, or student databases.'}
                {activeTab === 'demos' && 'Review AI-Powered workspaces, job roadmaps, salaries, and masterclass sessions.'}
                {activeTab === 'grading' && 'View, grade, and leave feedback on student task/homework submissions.'}
                {activeTab === 'certificates' && 'Upload completion certificates for students. Students can download them from their dashboard.'}
                {activeTab === 'mock_interviews' && 'Track and evaluate student marks across 5 days of one-to-one AI mock interview sessions (10 questions/day).'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {session?.role !== 'student' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('grading')}
                  style={{
                    background: pendingCount > 0 ? '#fef2f2' : '#ffffff',
                    border: `1px solid ${pendingCount > 0 ? '#fca5a5' : 'var(--surface-border)'}`,
                    color: pendingCount > 0 ? '#dc2626' : 'var(--text-secondary)',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  🔔 {pendingCount} Pending Approvals
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', background: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
                <Award size={14} color="#eab308" /> LMS Engine Active
              </div>
            </div>
          </div>
        )}

        {/* 📊 TAB 1: WORKSPACE OVERVIEW VIEW */}
        {activeTab === 'overview' && session.role === 'student' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Student Welcome & Enrolled Course Highlight Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              borderRadius: '24px',
              padding: '2.5rem',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>Welcome back, {session.name}! 👋</h2>
                <p style={{ fontSize: '1.05rem', color: '#eff6ff', opacity: 0.9, margin: '0 0 1.5rem 0', fontWeight: 500, fontFamily: 'system-ui' }}>
                  We are glad to see you continue your learning journey.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontFamily: 'system-ui' }}>
                    Active Track
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'system-ui' }}>
                    {getCourseLabel(enrolledCourse)}
                  </span>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1, color: '#ffffff' }}>
                <Award size={200} />
              </div>
            </div>

            {/* Student Admission Verification Status Banner */}
            {session?.role === 'student' && (
              <div style={{
                background: session?.isCourseActivated === false || session?.admissionStatus === 'Pending'
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.12) 100%)'
                  : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.12) 100%)',
                border: session?.isCourseActivated === false || session?.admissionStatus === 'Pending'
                  ? '1px solid #f59e0b'
                  : '1px solid #10b981',
                borderRadius: '20px',
                padding: '1.25rem 1.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '14px',
                    background: session?.isCourseActivated === false || session?.admissionStatus === 'Pending' ? '#fef3c7' : '#d1fae5',
                    color: session?.isCourseActivated === false || session?.admissionStatus === 'Pending' ? '#d97706' : '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                        Admission Verification & Enrollment Status
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: session?.isCourseActivated === false || session?.admissionStatus === 'Pending' ? '#fef3c7' : '#d1fae5',
                        color: session?.isCourseActivated === false || session?.admissionStatus === 'Pending' ? '#b45309' : '#047857'
                      }}>
                        {session?.admissionStatus === 'Approved' || session?.isCourseActivated ? 'Verified & Activated' : 'Verification In Progress'}
                      </span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                      {session?.isCourseActivated === false || session?.admissionStatus === 'Pending'
                        ? 'Your enrollment requires admission form, fee payment, joining date, and ID card verification before course access unlocks.'
                        : `Student ID: ${session?.studentId || 'Assigned'} • All admission milestones verified and course content unlocked.`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAdmissionStatusModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #0A3D91 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(10, 61, 145, 0.25)'
                  }}
                >
                  <Eye size={16} /> Track Verification Progress
                </button>
              </div>
            )}

            {/* Course Progress Card & Actions */}
            {(() => {
              const enrolledList = getCourseDataList(enrolledCourse);
              const totalItems = enrolledList.flatMap(m => m.items || []).length || 1;
              const completedInThisCourse = enrolledList.flatMap(m => m.items || []).filter(item => {
                return completedLessons.includes(item.id) ||
                  completedLessons.some(c => c.endsWith(`:${item.id}`));
              }).length;

              const progressPercent = Math.min(100, Math.round((completedInThisCourse / totalItems) * 100));

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  {/* Progress Gauge */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 1rem 0', fontFamily: 'system-ui' }}>Your Course Progress</h3>
                      <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', width: `${progressPercent}%`, height: '100%' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'system-ui' }}>
                        <span>Completion Rate:</span>
                        <span style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 800 }}>{progressPercent}%</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', fontFamily: 'system-ui' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Completed <strong>{completedInThisCourse}</strong> of <strong>{totalItems}</strong> steps</span>
                      <button
                        onClick={() => {
                          const firstCourse = enrolledCourse ? enrolledCourse.split(',')[0] : 'html_css';
                          onSelectCourse(firstCourse);
                        }}
                        style={{
                          border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff',
                          padding: '0.55rem 1.2rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
                        }}
                      >
                        Resume Learning <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Quick Course Catalog Portal */}
                  <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>Course Syllabus Portal</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, fontFamily: 'system-ui' }}>
                        Access all modules, interactive code play areas, and homework guides in your enrolled program.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('courses')}
                      style={{
                        width: '100%', border: '1px solid var(--surface-border)', background: 'var(--bg-color)', color: 'var(--text-primary)',
                        padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '1.5rem',
                        transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-color)'}
                    >
                      <BookOpen size={16} /> Open Syllabus
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 🧠 LOGICAL THINKING & ANALYTICAL REASONING SCORE (STUDENT OVERVIEW) */}
            {(() => {
              const currentStudent = students.find(s =>
                (session?.accessCode && s.accessCode === session.accessCode) ||
                (session?.studentId && s.studentId === session.studentId) ||
                (session?.username && s.accessCode === session.username) ||
                (session?.name && (s.name || '').toLowerCase() === (session.name || '').toLowerCase())
              ) || {
                name: session?.name,
                accessCode: session?.accessCode,
                studentId: session?.studentId,
                completedLessons: completedLessons
              };
              const lt = getStudentLogicalThinkingScore(currentStudent);
              const badgeStyle = getLogicalGradeStyle(lt.grade);

              return (
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '24px',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: 46,
                        height: 46,
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.25)'
                      }}>
                        <Brain size={24} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>
                          Logical Thinking &amp; Analytical Reasoning Benchmark
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '3px 0 0 0' }}>
                          Evaluated benchmark across pattern analysis, deductive logic, and analytical problem-solving.
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: badgeStyle.bg,
                        color: badgeStyle.text,
                        border: `1px solid ${badgeStyle.border}`
                      }}>
                        Score: {lt.isEvaluated ? `${lt.score} / 100` : 'Pending'} • Grade {lt.grade}
                      </span>
                      <button
                        onClick={() => onSelectCourse('spoko_reasoning')}
                        style={{
                          border: 'none',
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          color: '#ffffff',
                          padding: '0.5rem 1rem',
                          borderRadius: '10px',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 10px rgba(79, 70, 229, 0.25)'
                        }}
                      >
                        Practice Reasoning <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <span>Benchmark Proficiency:</span>
                      <span style={{ color: badgeStyle.text, fontWeight: 800 }}>{lt.isEvaluated ? `${lt.percentage}% (${lt.status})` : 'Awaiting instructor evaluation'}</span>
                    </div>
                    <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{
                        background: (lt.percentage || 0) >= 80 ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' :
                                    (lt.percentage || 0) >= 60 ? 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)' :
                                    'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                        width: `${lt.percentage || 0}%`,
                        height: '100%',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>

                  {lt.feedback && (
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', color: '#334155' }}>
                      <strong>Instructor Assessment Feedback:</strong> {lt.feedback}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 🎙️ DAILY AI MOCK INTERVIEW PERFORMANCE & MARKS (1-ON-1 AI INTERVIEWER) */}
            {(() => {
              const summary = calculateStudentMockSummary(studentMockInterviews);
              const gradeColors = {
                'S': { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
                'A': { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
                'B': { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
                'C': { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
                'Needs Practice': { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
                'Not Attempted': { bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0' }
              };
              const gCol = gradeColors[summary.grade] || gradeColors['Not Attempted'];

              return (
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '24px',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {/* Header Row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid var(--surface-border)',
                    paddingBottom: '1.25rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          color: '#ffffff',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          textTransform: 'uppercase'
                        }}>
                          1-on-1 AI Interviewer
                        </span>
                        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                          10 Live Questions / Day • 100 Marks Rubric
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>
                        Daily AI Mock Interview Marks &amp; Progress
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4, fontFamily: 'system-ui' }}>
                        Simulate realistic one-on-one HR interview rounds. Answer via voice or text with instant AI scoring across 4 evaluation rubrics.
                      </p>
                    </div>

                    {/* Aggregate KPI pill */}
                    <div style={{
                      background: gCol.bg,
                      border: `1px solid ${gCol.border}`,
                      borderRadius: '16px',
                      padding: '0.75rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: gCol.text, textTransform: 'uppercase' }}>
                          Overall Average
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: gCol.text }}>
                          {summary.completedCount > 0 ? `${summary.averageScore}/100` : '--/100'}
                        </div>
                      </div>
                      <div style={{ borderLeft: `1px solid ${gCol.border}`, paddingLeft: '12px' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: gCol.text, textTransform: 'uppercase' }}>
                          Grade
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: gCol.text }}>
                          {summary.grade}
                        </div>
                      </div>
                      <div style={{ borderLeft: `1px solid ${gCol.border}`, paddingLeft: '12px' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: gCol.text, textTransform: 'uppercase' }}>
                          Completed
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: gCol.text }}>
                          {summary.completedCount} / 5 Days
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 Days Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {HR_MOCK_DAYS.map(dayCfg => {
                      const dayRecord = summary.dayMap[dayCfg.day];
                      const isDone = !!dayRecord;

                      return (
                        <div
                          key={dayCfg.day}
                          style={{
                            background: isDone ? '#ffffff' : '#f8fafc',
                            border: `1.5px solid ${isDone ? dayCfg.color : '#e2e8f0'}`,
                            borderRadius: '16px',
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: isDone ? '0 4px 14px rgba(0,0,0,0.05)' : 'none'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{
                                background: dayCfg.bgLight,
                                color: dayCfg.color,
                                padding: '3px 8px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase'
                              }}>
                                Day {dayCfg.day} • {dayCfg.badge}
                              </span>
                              {isDone ? (
                                <span style={{
                                  background: '#10b981',
                                  color: '#ffffff',
                                  fontSize: '0.74rem',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '999px'
                                }}>
                                  ✓ Score: {dayRecord.totalScore}/100
                                </span>
                              ) : (
                                <span style={{
                                  background: '#f1f5f9',
                                  color: '#64748b',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: '999px'
                                }}>
                                  Pending
                                </span>
                              )}
                            </div>

                            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0', lineHeight: 1.3 }}>
                              {dayCfg.title}
                            </h4>
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.75rem' }}>
                              10 Live Interview Questions ({dayCfg.range})
                            </div>

                            {isDone ? (
                              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.65rem 0.75rem', marginBottom: '0.85rem', border: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.76rem', color: '#475569' }}>
                                  <div>Clarity: <strong>{dayRecord.clarityScore || 0}/25</strong></div>
                                  <div>Substance: <strong>{dayRecord.contentScore || 0}/30</strong></div>
                                  <div>Confidence: <strong>{dayRecord.confidenceScore || 0}/25</strong></div>
                                  <div>STAR Method: <strong>{dayRecord.structureScore || 0}/20</strong></div>
                                </div>
                                <div style={{ marginTop: 6, fontSize: '0.72rem', color: '#94a3b8' }}>
                                  Completed on {new Date(dayRecord.attemptedAt || dayRecord.completedAt).toLocaleDateString()}
                                </div>
                              </div>
                            ) : (
                              <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.85rem', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                                🎙️ Test your verbal composure under realistic interview conditions. Marks sync automatically with staff/admin.
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {isDone ? (
                              <>
                                <button
                                  onClick={() => setViewingMockReport(dayRecord)}
                                  style={{
                                    flex: 1,
                                    background: '#e0e7ff',
                                    color: '#3730a3',
                                    border: 'none',
                                    padding: '0.55rem 0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  <Eye size={13} /> View 10-Q Feedback
                                </button>
                                <button
                                  onClick={() => onSelectCourse('spoko_hr')}
                                  style={{
                                    background: '#ffffff',
                                    border: '1px solid #cbd5e1',
                                    color: '#475569',
                                    padding: '0.55rem 0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Retake
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => onSelectCourse('spoko_hr')}
                                style={{
                                  width: '100%',
                                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                                  color: '#ffffff',
                                  border: 'none',
                                  padding: '0.6rem 1rem',
                                  borderRadius: '8px',
                                  fontSize: '0.82rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  boxShadow: '0 3px 8px rgba(79, 70, 229, 0.25)'
                                }}
                              >
                                <Bot size={15} /> Start Day {dayCfg.day} AI Mock
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Task Submission History / Status List */}
            <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>Task Submission History</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', background: 'rgba(59, 130, 246, 0.08)', padding: '0.3rem 0.7rem', borderRadius: '20px', fontFamily: 'system-ui' }}>
                  {taskSubmissions.length} Submissions
                </span>
              </div>

              {taskSubmissions.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--surface-border)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Lesson Module</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Submitted At</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Project Link</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Submitted Feedback</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Review Status</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Grade</th>
                        <th style={{ padding: '0.75rem 1rem', fontFamily: 'system-ui' }}>Instructor Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskSubmissions.map(task => {
                        const statusColors = {
                          Pending: { text: '#ca8a04', bg: 'rgba(234, 179, 8, 0.08)' },
                          Approved: { text: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
                          Rejected: { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' }
                        };
                        const col = statusColors[task.status] || { text: '#64748b', bg: '#f1f5f9' };

                        return (
                          <tr key={task._id || task.id} style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-primary)' }}>
                            <td style={{ padding: '1rem', fontWeight: 700 }}>
                              <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--text-tertiary)' }}>{task.moduleId}</span>
                              {task.tabId}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                              {new Date(task.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              {task.taskUrl ? (
                                <a
                                  href={task.taskUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#3b82f6', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px'
                                  }}
                                >
                                  View Link <ExternalLink size={12} />
                                </a>
                              ) : (
                                <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Text Only</span>
                              )}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '200px', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                              {task.studentFeedback || task.taskText || task.submissionNotes || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>—</span>}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                color: col.text, background: col.bg, fontSize: '0.75rem', fontWeight: 800, padding: '0.35rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase'
                              }}>
                                {task.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', fontWeight: 800, color: task.grade ? '#8b5cf6' : 'var(--text-tertiary)' }}>
                              {task.grade || '--'}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '280px', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                              {task.feedback || <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Pending evaluation</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
                  <Sparkles size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>No task submissions yet. Open a lesson syllabus and submit your first assignment!</p>
                </div>
              )}
            </div>

            {/* 🎓 CERTIFICATE DOWNLOAD CARD */}
            <div style={{ background: '#ffffff', border: `2px solid ${studentCertificate ? '#f59e0b' : 'var(--surface-border)'}`, borderRadius: '24px', padding: '2rem', boxShadow: studentCertificate ? '0 8px 32px rgba(245,158,11,0.18)' : 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
              {/* Background decor */}
              <div style={{ position: 'absolute', right: '-24px', top: '-24px', opacity: 0.06 }}>
                <Award size={180} color={studentCertificate ? '#f59e0b' : '#94a3b8'} />
              </div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.25rem 0', fontFamily: 'system-ui' }}>Course Completion Certificate</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, fontFamily: 'system-ui' }}>
                      Issued by Alpha Fly Technologies
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: studentCertificate ? 'rgba(245,158,11,0.12)' : 'rgba(148,163,184,0.12)',
                    color: studentCertificate ? '#d97706' : '#94a3b8',
                    padding: '0.35rem 0.8rem', borderRadius: '20px', border: `1px solid ${studentCertificate ? 'rgba(245,158,11,0.3)' : 'rgba(148,163,184,0.3)'}`,
                    whiteSpace: 'nowrap'
                  }}>
                    {studentCertificate ? '✓ Certificate Ready' : '⏳ Pending'}
                  </span>
                </div>

                {studentCertificate ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Congrats message */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(251,191,36,0.05) 100%)', borderRadius: '16px', padding: '1.25rem 1.5rem', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#92400e', fontFamily: 'system-ui' }}>
                        🎉 Congratulations, {session.name}!
                      </p>
                      <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#b45309', lineHeight: 1.5, fontFamily: 'system-ui' }}>
                        Your certificate for <strong>{getCourseLabel(enrolledCourse)}</strong> is ready. Click the button below to download it.
                      </p>
                    </div>
                    {/* File info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', borderRadius: '12px', padding: '0.9rem 1.1rem', border: '1px solid #e2e8f0' }}>
                      <FileText size={28} color="#f59e0b" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'system-ui' }}>{studentCertificate.filename}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'system-ui' }}>
                          Uploaded on {studentCertificate.uploadedAt ? new Date(studentCertificate.uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown date'}
                        </div>
                      </div>
                    </div>
                    {/* Download button */}
                    <button
                      onClick={handleDownloadCertificate}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff', border: 'none', borderRadius: '14px',
                        padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(245,158,11,0.35)', transition: 'var(--transition)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <Download size={20} /> Download My Certificate
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1.5rem 0' }}>
                    <div style={{ background: '#f1f5f9', borderRadius: '50%', padding: '1.5rem', display: 'inline-flex' }}>
                      <Lock size={36} color="#94a3b8" />
                    </div>
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 0.4rem 0', fontFamily: 'system-ui' }}>Certificate Not Yet Available</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.5, fontFamily: 'system-ui' }}>
                        Complete your course and your instructor will upload your certificate here. Check back soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 📊 TAB 1: WORKSPACE OVERVIEW VIEW (ADMIN/STAFF ONLY) */}
        {activeTab === 'overview' && session.role !== 'student' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Registered Students</span>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#3b82f6', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={28} color="#3b82f6" /> {totalStudents}
                </div>
              </div>
              <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Device Locked Accounts</span>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f59e0b', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={28} color="#f59e0b" /> {totalLocked}
                </div>
              </div>
              <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Course Options</span>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10b981', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={28} color="#10b981" /> {subCourses.length}
                </div>
              </div>
              <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Role</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ec4899', marginTop: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {session.role}
                </div>
              </div>
            </div>

            {/* Profile Detail Workspace */}
            <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                <Star size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.4rem 0' }}>Welcome, {session.name}!</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  You have logged in securely with {session.role === 'admin' ? 'Root Administrator rights' : 'Staff Instructor status'}. You can assign subcourses, manage student logins, clear device lock security hashes, or launch modules within the course catalog using the navigation panel on the left.
                </p>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '2rem', marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '1rem' }}>Quick Actions Shortcuts</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div
                  onClick={() => setActiveTab('courses')}
                  style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '16px', padding: '1.25rem', cursor: 'pointer', transition: 'var(--transition)', boxShadow: 'var(--shadow-sm)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--surface-border)'}
                >
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.02rem', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>Course Catalog <ArrowRight size={14} /></h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Launch bootcamps, check syllabi, or run coding play areas.</p>
                </div>
                {(session?.role === 'admin' || session?.role === 'staff') && (
                  <div
                    onClick={() => setActiveTab('register')}
                    style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '16px', padding: '1.25rem', cursor: 'pointer', transition: 'var(--transition)', boxShadow: 'var(--shadow-sm)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--surface-border)'}
                  >
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.02rem', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>Register a Student <ArrowRight size={14} /></h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Enroll new records and generate sharable link credentials.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 📚 TAB 2: COURSE CATALOG VIEW */}
        {activeTab === 'courses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Main Course Categories Selector Cards */}
            <div>
              <div style={{ borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Select Main Stream Track</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {mainCourses.map(course => {
                  const isActive = activeMainCourse === course.id;

                  const hasEnrolledSubCourse = subCourses.some(sub => {
                    const belongs = Array.isArray(sub.mainCourseId)
                      ? sub.mainCourseId.includes(course.id)
                      : sub.mainCourseId === course.id;
                    const enrolledList = enrolledCourse ? enrolledCourse.split(',') : [];
                    return belongs && (enrolledCourse === 'all' || enrolledList.includes(sub.enrolledKey));
                  });

                  const isStudent = session?.role === 'student';
                  const isLocked = isStudent && !hasEnrolledSubCourse;

                  return (
                    <div
                      key={course.id}
                      onClick={() => {
                        if (isLocked) {
                          alert(`This curriculum track (${course.title}) is locked. Please contact support to enroll.`);
                          return;
                        }
                        setActiveMainCourse(course.id);
                      }}
                      style={{
                        background: isActive ? course.gradient : 'var(--surface-color)',
                        color: isActive ? '#ffffff' : 'var(--text-primary)',
                        border: isActive ? `1px solid ${course.color}` : '1px solid var(--surface-border)',
                        borderRadius: '24px',
                        padding: '1.5rem',
                        cursor: isLocked ? 'not-allowed' : 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'var(--transition)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '180px',
                        opacity: isLocked ? 0.6 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isLocked) {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLocked) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }
                      }}
                    >
                      <div>
                        <div style={{
                          background: isActive ? 'rgba(255, 255, 255, 0.18)' : course.bgLight,
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isActive ? '#ffffff' : course.color,
                          marginBottom: '1rem'
                        }}>
                          {course.icon}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.4rem 0', color: isActive ? '#ffffff' : 'var(--text-primary)' }}>
                          {course.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: isActive ? '#eff6ff' : 'var(--text-secondary)', opacity: 0.95, lineHeight: 1.4, margin: 0 }}>
                          {course.desc}
                        </p>
                      </div>

                      {hasEnrolledSubCourse && (
                        <span style={{
                          position: 'absolute',
                          top: '1.5rem',
                          right: '1.5rem',
                          background: isActive ? '#ffffff' : course.color,
                          color: isActive ? course.color : '#ffffff',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Enrolled
                        </span>
                      )}

                      {isLocked && (
                        <span style={{
                          position: 'absolute',
                          top: '1.5rem',
                          right: '1.5rem',
                          background: '#f1f5f9',
                          color: 'var(--text-secondary)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          border: '1px solid var(--surface-border)'
                        }}>
                          🔒 Locked
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-courses display gallery based on chosen category */}
            <div>
              <div style={{ borderLeft: `4px solid ${mainCourses.find(c => c.id === activeMainCourse)?.color || '#3b82f6'}`, paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                  {mainCourses.find(c => c.id === activeMainCourse)?.title} Modules Catalog
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {subCourses
                  .filter(sub => {
                    return Array.isArray(sub.mainCourseId)
                      ? sub.mainCourseId.includes(activeMainCourse)
                      : sub.mainCourseId === activeMainCourse;
                  })
                  .map(sub => {
                    const enrolledList = enrolledCourse ? enrolledCourse.split(',') : [];
                    const isEnrolled = enrolledCourse === 'all' || enrolledList.includes(sub.enrolledKey);

                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          if (isEnrolled) {
                            onSelectCourse(sub.id);
                          } else {
                            alert(`This course (${sub.title}) is locked. Please contact Alpha Fly to enroll.`);
                          }
                        }}
                        style={{
                          borderRadius: '24px',
                          padding: '2rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '260px',
                          cursor: 'pointer',
                          backgroundColor: isEnrolled ? 'var(--surface-color)' : '#f8fafc',
                          color: isEnrolled ? 'var(--text-primary)' : 'var(--text-tertiary)',
                          border: isEnrolled ? `1px solid ${sub.borderColor}` : '1px dashed var(--surface-border)',
                          opacity: isEnrolled ? 1 : 0.7,
                          position: 'relative',
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => {
                          if (isEnrolled) {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = `0 12px 24px -10px ${sub.shadowColor}`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                      >
                        <div>
                          <div style={{
                            background: sub.bgColor,
                            width: '54px',
                            height: '54px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.2rem',
                            color: sub.borderColor
                          }}>
                            {sub.icon}
                          </div>
                          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                            {sub.title}
                          </h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', opacity: 0.95, lineHeight: 1.5, margin: 0 }}>
                            {sub.desc}
                          </p>
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '2rem',
                          borderTop: '1px solid var(--surface-border)',
                          paddingTop: '1rem',
                          gap: '12px'
                        }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {sub.modulesCount}
                          </span>

                          {isEnrolled ? (
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', color: sub.borderColor, flexShrink: 0 }}>
                              Start Course <ArrowRight size={14} />
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                              🔒 Locked <ArrowRight size={14} />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

        {/* 👤 TAB 3: REGISTER NEW STUDENT/STAFF FORM VIEW */}
        {activeTab === 'register' && (session?.role === 'admin' || session?.role === 'staff') && (
          <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Toggle tabs for Admin role selection */}
            {session?.role === 'admin' && (
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.35rem', borderRadius: '14px', maxWidth: '380px' }}>
                <button
                  type="button"
                  onClick={() => { setEnrollRole('student'); setAdminError(''); setSuccessMsg(''); }}
                  style={{
                    flex: 1, padding: '0.65rem 1rem', border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                    background: enrollRole === 'student' ? '#ffffff' : 'transparent',
                    color: enrollRole === 'student' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: enrollRole === 'student' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <UserPlus size={16} /> Enroll Student
                </button>
                <button
                  type="button"
                  onClick={() => { setEnrollRole('staff'); setAdminError(''); setSuccessMsg(''); }}
                  style={{
                    flex: 1, padding: '0.65rem 1rem', border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                    background: enrollRole === 'staff' ? '#ffffff' : 'transparent',
                    color: enrollRole === 'staff' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: enrollRole === 'staff' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <Users size={16} /> Enroll Staff
                </button>
              </div>
            )}

            {enrollRole === 'student' ? (
              <form onSubmit={handleRegisterStudent} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.75rem', alignItems: 'stretch' }}>

                {/* 📝 LEFT COLUMN: Step 1 - Student Info & 3 Validations */}
                <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserPlus size={22} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                          Student &amp; Admission Validation
                        </h2>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                          Enter student credentials and complete all 3 onboarding milestones
                        </p>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                        Student Full Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        value={newStudentName}
                        onChange={e => setNewStudentName(e.target.value)}
                        placeholder="e.g. John Doe"
                        style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                      />
                    </div>

                    {/* 🛡️ 3-Step Admission Validation Checklist */}
                    <div
                      style={{
                        background: allValidationsChecked ? '#f0fdf4' : '#fffbeb',
                        border: `2px solid ${allValidationsChecked ? '#10b981' : '#f59e0b'}`,
                        borderRadius: '16px',
                        padding: '1.25rem',
                        transition: 'all 0.25s ease',
                        boxShadow: allValidationsChecked ? '0 4px 14px rgba(16, 185, 129, 0.12)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.95rem', color: allValidationsChecked ? '#166534' : '#92400e' }}>
                          <ShieldCheck size={18} color={allValidationsChecked ? '#16a34a' : '#d97706'} />
                          <span>Admission Validation Checklist</span>
                        </div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '20px',
                          background: allValidationsChecked ? '#dcfce7' : '#fef3c7',
                          color: allValidationsChecked ? '#15803d' : '#b45309',
                          border: `1px solid ${allValidationsChecked ? '#86efac' : '#fde68a'}`
                        }}>
                          {allValidationsChecked ? 'ALL VERIFIED (3/3)' : `PENDING (${[valIdCard, valFeeInitiated, valInduction].filter(Boolean).length}/3)`}
                        </span>
                      </div>

                      <p style={{
                        margin: '0 0 10px 0',
                        fontSize: '0.82rem',
                        color: allValidationsChecked ? '#15803d' : '#78350f',
                        lineHeight: '1.4'
                      }}>
                        {allValidationsChecked
                          ? '✅ All 3 onboarding milestones verified! Course selection unlocked on the right.'
                          : '⏳ Tick all 3 validation checkboxes below to unlock course pathways on the right.'}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {/* Checkbox 1: ID Card */}
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: valIdCard ? '#ecfdf5' : '#ffffff',
                            border: `1.5px solid ${valIdCard ? '#10b981' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={valIdCard}
                            onChange={(e) => setValIdCard(e.target.checked)}
                            style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                          />
                          <CreditCard size={18} color={valIdCard ? '#10b981' : '#64748b'} />
                          <div style={{ flex: 1, userSelect: 'none' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: valIdCard ? '#065f46' : 'var(--text-primary)' }}>
                              ID Card Issued
                            </div>
                            <div style={{ fontSize: '0.76rem', color: valIdCard ? '#047857' : 'var(--text-secondary)' }}>
                              Student identity card created, verified, and issued
                            </div>
                          </div>
                        </label>

                        {/* Checkbox 2: Fee Initiated */}
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: valFeeInitiated ? '#ecfdf5' : '#ffffff',
                            border: `1.5px solid ${valFeeInitiated ? '#10b981' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={valFeeInitiated}
                            onChange={(e) => setValFeeInitiated(e.target.checked)}
                            style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                          />
                          <Receipt size={18} color={valFeeInitiated ? '#10b981' : '#64748b'} />
                          <div style={{ flex: 1, userSelect: 'none' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: valFeeInitiated ? '#065f46' : 'var(--text-primary)' }}>
                              Fee Initiated
                            </div>
                            <div style={{ fontSize: '0.76rem', color: valFeeInitiated ? '#047857' : 'var(--text-secondary)' }}>
                              Enrollment fee or initial installment payment initiated
                            </div>
                          </div>
                        </label>

                        {/* Checkbox 3: Induction Session */}
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: valInduction ? '#ecfdf5' : '#ffffff',
                            border: `1.5px solid ${valInduction ? '#10b981' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={valInduction}
                            onChange={(e) => setValInduction(e.target.checked)}
                            style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                          />
                          <BookOpen size={18} color={valInduction ? '#10b981' : '#64748b'} />
                          <div style={{ flex: 1, userSelect: 'none' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: valInduction ? '#065f46' : 'var(--text-primary)' }}>
                              Induction Session Completed
                            </div>
                            <div style={{ fontSize: '0.76rem', color: valInduction ? '#047857' : 'var(--text-secondary)' }}>
                              Student attended orientation &amp; platform induction session
                            </div>
                          </div>
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !allValidationsChecked;
                            setValIdCard(nextState);
                            setValFeeInitiated(nextState);
                            setValInduction(nextState);
                          }}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: allValidationsChecked ? '#059669' : '#2563eb',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            padding: '2px 4px'
                          }}
                        >
                          {allValidationsChecked ? 'Deselect All Validations' : '✓ Tick All 3 Validations'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 📚 RIGHT COLUMN: Step 2 - Course Selection & Activation */}
                <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '12px', background: allValidationsChecked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: allValidationsChecked ? '#10b981' : '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {allValidationsChecked ? <CheckCircle size={22} /> : <Lock size={22} />}
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                          Course Assignment &amp; Access Key
                        </h2>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                          {allValidationsChecked ? 'Choose curriculum tracks and generate student login credentials' : 'Locked until all 3 validation milestones are completed'}
                        </p>
                      </div>
                    </div>

                    {!allValidationsChecked ? (
                      <div style={{
                        background: '#f8fafc',
                        border: '2px dashed #cbd5e1',
                        borderRadius: '16px',
                        padding: '2.5rem 1.5rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          background: '#fef3c7',
                          color: '#d97706',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Lock size={26} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1e293b' }}>
                          Course Selection Locked
                        </div>
                        <p style={{ fontSize: '0.86rem', color: '#64748b', maxWidth: '360px', margin: 0, lineHeight: '1.5' }}>
                          Please tick all 3 validation checks on the left:
                        </p>

                        {/* Live checklist preview */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', width: '100%', maxWidth: '320px', marginTop: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: valIdCard ? '#059669' : '#94a3b8' }}>
                            {valIdCard ? '✅' : '⏳'} ID Card: {valIdCard ? 'Verified' : 'Pending'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: valFeeInitiated ? '#059669' : '#94a3b8' }}>
                            {valFeeInitiated ? '✅' : '⏳'} Fee Initiated: {valFeeInitiated ? 'Verified' : 'Pending'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: valInduction ? '#059669' : '#94a3b8' }}>
                            {valInduction ? '✅' : '⏳'} Induction Session: {valInduction ? 'Verified' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ animation: 'fadeIn 0.3s ease-in-out', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '0.65rem 1rem',
                          background: '#f0fdf4',
                          border: '1px solid #86efac',
                          borderRadius: '12px',
                          color: '#166534',
                          fontSize: '0.84rem',
                          fontWeight: 700
                        }}>
                          <CheckCircle size={16} color="#16a34a" />
                          <span>Validations complete! Select student curriculum pathways below:</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                              Select Curriculums Pathways <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                if (expandedEnrollCats.length === COURSE_CATEGORIES.length) {
                                  setExpandedEnrollCats([]);
                                } else {
                                  setExpandedEnrollCats(COURSE_CATEGORIES.map(c => c.id));
                                }
                              }}
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#4f46e5',
                                background: '#eef2ff',
                                border: '1px solid #c7d2fe',
                                borderRadius: '6px',
                                padding: '2px 8px',
                                cursor: 'pointer'
                              }}
                            >
                              {expandedEnrollCats.length === COURSE_CATEGORIES.length ? 'Collapse All' : 'Expand All'}
                            </button>
                          </div>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: '#2563eb',
                            background: '#eff6ff',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            border: '1px solid #bfdbfe'
                          }}>
                            {(assignedCourse ? assignedCourse.split(',').filter(Boolean).length : 0)} Tracks Selected
                          </span>
                        </div>

                        {/* 🎓 Categorized Main Courses & Sub-Courses Grid */}
                        <div style={{
                          maxHeight: '440px',
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          paddingRight: '6px'
                        }}>
                          {COURSE_CATEGORIES.map(category => {
                            const currentList = assignedCourse ? assignedCourse.split(',').map(s => s.trim()).filter(Boolean) : [];
                            const catVals = category.subCourses.map(sc => sc.value);
                            const selectedCountInCat = catVals.filter(v => currentList.includes(v)).length;
                            const isAllInCatSelected = catVals.length > 0 && selectedCountInCat === catVals.length;
                            const isPartiallySelected = selectedCountInCat > 0 && !isAllInCatSelected;
                            const isExpanded = expandedEnrollCats.includes(category.id);

                            return (
                              <div
                                key={category.id}
                                style={{
                                  background: '#ffffff',
                                  border: `1.5px solid ${selectedCountInCat > 0 ? category.border : '#e2e8f0'}`,
                                  borderRadius: '14px',
                                  overflow: 'hidden',
                                  boxShadow: selectedCountInCat > 0 ? `0 2px 8px ${category.border}40` : '0 1px 3px rgba(0,0,0,0.03)',
                                  transition: 'all 0.2s ease',
                                  flexShrink: 0
                                }}
                              >
                                {/* Main Course Category Header */}
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 14px',
                                    background: selectedCountInCat > 0 ? category.bg : '#f8fafc',
                                    borderBottom: isExpanded ? `1px solid ${selectedCountInCat > 0 ? category.border : '#e2e8f0'}` : 'none',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                  }}
                                  onClick={() => toggleEnrollCatExpand(category.id)}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                      type="checkbox"
                                      checked={isAllInCatSelected}
                                      ref={el => { if (el) el.indeterminate = isPartiallySelected; }}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={() => {
                                        let newList;
                                        if (isAllInCatSelected) {
                                          const remaining = currentList.filter(v => !catVals.includes(v));
                                          newList = remaining.length > 0 ? remaining : [catVals[0]];
                                        } else {
                                          newList = Array.from(new Set([...currentList, ...catVals]));
                                        }
                                        setAssignedCourse(newList.join(','));
                                      }}
                                      style={{ width: '17px', height: '17px', cursor: 'pointer', accentColor: category.color, flexShrink: 0 }}
                                    />
                                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>
                                      {category.title}
                                    </span>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                      fontSize: '0.72rem',
                                      fontWeight: 800,
                                      padding: '3px 9px',
                                      borderRadius: '10px',
                                      background: selectedCountInCat > 0 ? category.color : '#e2e8f0',
                                      color: selectedCountInCat > 0 ? '#ffffff' : '#64748b',
                                      flexShrink: 0
                                    }}>
                                      {isAllInCatSelected ? 'All Selected' : selectedCountInCat > 0 ? `${selectedCountInCat}/${catVals.length}` : `${catVals.length} Tracks`}
                                    </span>
                                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
                                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </span>
                                  </div>
                                </div>

                                {/* Sub-Courses Checkboxes */}
                                {isExpanded && (
                                  <div style={{
                                    padding: '10px 12px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                                    gap: '8px',
                                    background: '#ffffff'
                                  }}>
                                    {category.subCourses.map(sc => {
                                      const isSubChecked = currentList.includes(sc.value);
                                      return (
                                        <label
                                          key={sc.value}
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '8px 12px',
                                            borderRadius: '10px',
                                            background: isSubChecked ? category.bg : '#f8fafc',
                                            border: `1.5px solid ${isSubChecked ? category.border : '#e2e8f0'}`,
                                            cursor: 'pointer',
                                            fontSize: '0.83rem',
                                            fontWeight: isSubChecked ? 700 : 500,
                                            color: isSubChecked ? category.color : '#1e293b',
                                            transition: 'all 0.15s ease',
                                            minHeight: '44px',
                                            lineHeight: '1.3',
                                            userSelect: 'none'
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isSubChecked}
                                            onChange={() => {
                                              let newList;
                                              if (currentList.includes(sc.value)) {
                                                if (currentList.length === 1) return;
                                                newList = currentList.filter(c => c !== sc.value);
                                              } else {
                                                newList = [...currentList, sc.value];
                                              }
                                              setAssignedCourse(newList.join(','));
                                            }}
                                            style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: category.color, flexShrink: 0 }}
                                          />
                                          <span style={{ wordBreak: 'break-word', flex: 1 }}>{sc.label}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {adminError && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(239, 68, 68, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #ef4444', marginBottom: '0.75rem' }}>⚠️ {adminError}</div>}
                    {successMsg && <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #10b981', marginBottom: '0.75rem' }}>{successMsg}</div>}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!allValidationsChecked}
                      style={{
                        width: '100%',
                        padding: '0.9rem',
                        borderRadius: '12px',
                        opacity: allValidationsChecked ? 1 : 0.65,
                        cursor: allValidationsChecked ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontWeight: 800,
                        fontSize: '0.95rem'
                      }}
                    >
                      {allValidationsChecked ? (
                        <>
                          <CheckCircle size={18} />
                          Generate Student Access Code &amp; Enroll
                        </>
                      ) : (
                        <>
                          <Lock size={18} />
                          Complete Validations on Left to Enroll
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.75rem', alignItems: 'stretch' }}>
                <form onSubmit={handleRegisterStaff} style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                    <UserPlus size={24} color="#6366f1" /> Enroll New Staff Tutor
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Tutor Full Name</label>
                    <input
                      value={newStaffName}
                      onChange={e => setNewStaffName(e.target.value)}
                      placeholder="Enter tutor name..."
                      style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Username ID</label>
                    <input
                      value={newStaffUsername}
                      onChange={e => setNewStaffUsername(e.target.value)}
                      placeholder="Enter login username ID..."
                      style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Password Key</label>
                    <input
                      type="text"
                      value={newStaffPassword}
                      onChange={e => setNewStaffPassword(e.target.value)}
                      placeholder="Enter login password..."
                      style={{ width: '100%', padding: '0.8rem 1rem', fontSize: '0.95rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  {adminError && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(239, 68, 68, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #ef4444' }}>⚠️ {adminError}</div>}
                  {successMsg && <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.05)', padding: '0.6rem 1rem', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>{successMsg}</div>}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', marginTop: '0.5rem' }}>
                    Create Staff Credentials
                  </button>
                </form>

                {/* Staff Privileges Guide */}
                <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.15rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                    <ShieldCheck size={22} color="#6366f1" /> Staff Tutor Role Capabilities
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    Staff instructors have dedicated privileges to support student learners across all curriculums.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <CheckCircle size={18} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Assignment Grading &amp; Review</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Evaluate student project submissions and assign grades and feedback.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <CheckCircle size={18} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Student Progress Oversight</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Monitor completion rates, interview scores, and module milestones.</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <CheckCircle size={18} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>Course Content Access</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Access the entire course catalog, demo environments, and code labs.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 📋 Recent Enrolled Students Preview Row */}
            {students.length > 0 && (
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--surface-border)',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    <Users size={18} color="#3b82f6" />
                    <span>Recently Enrolled Students</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>({students.length} total)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('database')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#2563eb',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View Full Directory <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                  {students.slice(0, 4).map(s => {
                    const isConfirmed = s.admissionStatus === 'Approved' || (s.isCourseActivated !== false && s.admissionStatus !== 'Pending');
                    return (
                      <div
                        key={s._id || s.id || s.accessCode}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '14px',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1e293b' }}>{s.name}</div>
                            <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>
                              Code: <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{s.accessCode}</span>
                            </div>
                          </div>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            background: isConfirmed ? '#dcfce7' : '#fef3c7',
                            color: isConfirmed ? '#15803d' : '#b45309'
                          }}>
                            {isConfirmed ? 'Active' : 'Pending'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Course: {getMainCourseLabels(s.enrolledCourse)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* 🗄️ TAB 4: LIVE USER DATABASE VIEW */}
        {activeTab === 'database' && (session?.role === 'admin' || session?.role === 'staff') && (
          <div style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>

            {/* Toggle tabs for Admin database selection */}
            {session?.role === 'admin' && (
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.3rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setDbTab('students')}
                  style={{
                    flex: 1, padding: '0.6rem', border: 'none', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                    background: dbTab === 'students' ? '#ffffff' : 'transparent',
                    color: dbTab === 'students' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: dbTab === 'students' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Students Database
                </button>
                <button
                  onClick={() => setDbTab('staff')}
                  style={{
                    flex: 1, padding: '0.6rem', border: 'none', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                    background: dbTab === 'staff' ? '#ffffff' : 'transparent',
                    color: dbTab === 'staff' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    boxShadow: dbTab === 'staff' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Staff Directory
                </button>
              </div>
            )}

            {dbTab === 'students' ? (
              <>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--surface-border)',
                  paddingBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem' }}>
                    <Users size={24} color="#10b981" />
                    <span>Enrolled Student Credentials Directory</span>
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px'
                    }}>
                      {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
                    </span>
                  </div>

                  {/* Search Bar */}
                  <div style={{
                    position: 'relative',
                    width: isMobile ? '100%' : '320px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', color: '#94a3b8', pointerEvents: 'none' }} />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={(e) => {
                        setStudentSearch(e.target.value);
                        setStudentPage(1);
                      }}
                      placeholder="Search student, access key, course..."
                      style={{
                        width: '100%',
                        padding: '0.55rem 2.2rem 0.55rem 2.3rem',
                        fontSize: '0.88rem',
                        borderRadius: '10px',
                        border: '1px solid var(--surface-border)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                    {studentSearch && (
                      <button
                        onClick={() => {
                          setStudentSearch('');
                          setStudentPage(1);
                        }}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: 2
                        }}
                        title="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {filteredStudents.length > 0 ? (
                  <>
                    {!isMobile ? (
                      /* 🖥️ DESKTOP TABLE VIEW */
                      <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>STUDENT NAME</th>
                              <th style={{ padding: '1rem 1.25rem' }}>ENROLLED CURRICULUMS</th>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>ACCESS CODE</th>
                              <th style={{ padding: '1rem 1.25rem', minWidth: '220px' }}>COURSE PROGRESS</th>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>SHAREABLE LINK</th>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>LOCK STATUS</th>
                              <th style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>ADMISSION</th>
                              <th style={{ padding: '1rem 1.25rem', textAlign: 'center', whiteSpace: 'nowrap' }}>ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedStudents.map(s => (
                              <tr key={s._id || s.id} style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--surface-border)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1rem 1.25rem', fontWeight: 800 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{
                                      width: 34, height: 34, borderRadius: '50%',
                                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                      color: '#ffffff', fontWeight: 900, fontSize: '0.82rem',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                      {s.name ? s.name.substring(0, 2).toUpperCase() : 'ST'}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setViewingProgressStudent(s)}
                                      style={{
                                        background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, cursor: 'pointer',
                                        fontSize: '0.92rem', textAlign: 'left', padding: 0
                                      }}
                                      title="Click to view detailed per-course progress breakdown"
                                    >
                                      {s.name}
                                    </button>
                                  </div>
                                </td>
                                <td style={{ padding: '1rem 1.25rem' }}>
                                  {(() => {
                                    const categories = getMainCourseCategories(s.enrolledCourse);
                                    if (categories.length === 0) {
                                      return (
                                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                          {getMainCourseLabels(s.enrolledCourse)}
                                        </span>
                                      );
                                    }
                                    return (
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: '320px' }}>
                                        {categories.map(cat => {
                                          const subKeys = (s.enrolledCourse || '').split(',').map(k => k.trim());
                                          const subCount = cat.subCourses.filter(sc => subKeys.includes(sc.value)).length;
                                          return (
                                            <span
                                              key={cat.id}
                                              style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                fontSize: '0.78rem',
                                                fontWeight: 700,
                                                color: cat.color,
                                                background: cat.bg,
                                                border: `1px solid ${cat.border}`,
                                                padding: '3px 9px',
                                                borderRadius: '8px',
                                                lineHeight: 1.3
                                              }}
                                              title={`Enrolled Tracks (${subCount}/${cat.subCourses.length}): ${cat.subCourses.filter(sc => subKeys.includes(sc.value)).map(sc => sc.label).join(', ')}`}
                                            >
                                              <span>{cat.title}</span>
                                              {subCount < cat.subCourses.length && (
                                                <span style={{ fontSize: '0.68rem', opacity: 0.75, fontWeight: 600 }}>
                                                  ({subCount})
                                                </span>
                                              )}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    );
                                  })()}
                                </td>
                                <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                                  <span style={{
                                    fontFamily: 'monospace', fontWeight: 800, color: '#d97706',
                                    background: '#fef3c7', border: '1px solid #fde68a',
                                    padding: '4px 10px', borderRadius: '8px', fontSize: '0.84rem'
                                  }}>
                                    {s.accessCode}
                                  </span>
                                </td>
                                <td style={{ padding: '1rem 1.25rem', minWidth: '220px' }}>
                                  {(() => {
                                    const detailed = calculateDetailedCourseProgress(s);
                                    const { completedCount, totalCount, percentage } = calculateStudentProgress(s);
                                    const badgeColor = percentage === 100 ? '#10b981' : percentage > 0 ? '#2563eb' : '#64748b';
                                    const bgLight = percentage === 100 ? 'rgba(16, 185, 129, 0.1)' : percentage > 0 ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9';

                                    return (
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {/* Progress Summary Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                          <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            color: badgeColor,
                                            background: bgLight,
                                            padding: '2px 8px',
                                            borderRadius: '12px'
                                          }}>
                                            {detailed.length} {detailed.length === 1 ? 'Track' : 'Tracks'} · {percentage}%
                                          </span>
                                          <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                                            {completedCount}/{totalCount} topics
                                          </span>
                                        </div>

                                        {/* Overall Progress Bar */}
                                        <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                          <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            background: percentage === 100
                                              ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                              : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                                            borderRadius: '10px',
                                            transition: 'width 0.4s ease'
                                          }} />
                                        </div>

                                        {/* Individual Course Micro Pills */}
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' }}>
                                          {detailed.slice(0, 3).map(c => (
                                            <span
                                              key={c.courseKey}
                                              style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                color: c.percentage === 100 ? '#059669' : c.percentage > 0 ? '#1d4ed8' : '#64748b',
                                                background: c.percentage === 100 ? '#d1fae5' : c.percentage > 0 ? '#eff6ff' : '#f8fafc',
                                                border: `1px solid ${c.percentage === 100 ? '#a7f3d0' : c.percentage > 0 ? '#bfdbfe' : '#e2e8f0'}`,
                                                padding: '1px 6px',
                                                borderRadius: '6px'
                                              }}
                                              title={`${c.courseLabel}: ${c.completedTopics}/${c.totalTopics} topics (${c.percentage}%)`}
                                            >
                                              {c.courseLabel.split(' ')[0]}: {c.percentage}%
                                            </span>
                                          ))}
                                          {detailed.length > 3 && (
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                                              +{detailed.length - 3}
                                            </span>
                                          )}
                                        </div>

                                        {/* Detail Modal Trigger Button */}
                                        <button
                                          type="button"
                                          onClick={() => setViewingProgressStudent(s)}
                                          style={{
                                            marginTop: '4px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                            color: '#ffffff',
                                            border: 'none',
                                            padding: '4px 10px',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)',
                                            width: 'fit-content'
                                          }}
                                        >
                                          <BarChart3 size={12} /> Audit Progress
                                        </button>
                                      </div>
                                    );
                                  })()}
                                </td>
                                <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                                  <button
                                    onClick={() => {
                                      const loginUrl = `${window.location.origin}/?code=${s.accessCode}`;
                                      navigator.clipboard.writeText(loginUrl);
                                      alert(`Copied direct access link for ${s.name}!\n\nLink: ${loginUrl}`);
                                    }}
                                    style={{
                                      background: '#f8fafc', border: '1px solid var(--surface-border)', color: 'var(--text-primary)',
                                      padding: '0.45rem 0.85rem', borderRadius: '8px', cursor: 'pointer',
                                      fontSize: '0.8rem', fontWeight: 700, transition: 'var(--transition)',
                                      display: 'inline-flex', alignItems: 'center', gap: '4px'
                                    }}
                                  >
                                    <Copy size={12} /> Copy Link
                                  </button>
                                </td>
                                <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                                  {s.deviceId ? (
                                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.78rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.35rem 0.75rem', borderRadius: '20px', display: 'inline-block', whiteSpace: 'nowrap' }}>
                                      🔒 Device Locked
                                    </span>
                                  ) : (
                                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.78rem', background: 'rgba(0, 0, 0, 0.03)', padding: '0.35rem 0.75rem', borderRadius: '20px', display: 'inline-block', whiteSpace: 'nowrap' }}>
                                      🆕 Unlocked
                                    </span>
                                  )}
                                </td>
                                <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                                  {(() => {
                                    const isConfirmed = s.admissionStatus === 'Approved' || (s.isCourseActivated !== false && s.admissionStatus !== 'Pending');
                                    return (
                                      <button
                                        type="button"
                                        onClick={() => handleToggleAdmission(s._id || s.id)}
                                        style={{
                                          border: `1px solid ${isConfirmed ? '#a7f3d0' : '#fde68a'}`,
                                          cursor: 'pointer',
                                          background: isConfirmed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.12)',
                                          color: isConfirmed ? '#059669' : '#d97706',
                                          padding: '0.35rem 0.75rem',
                                          borderRadius: '20px',
                                          fontWeight: 800,
                                          fontSize: '0.78rem',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '5px',
                                          transition: 'all 0.2s'
                                        }}
                                        title="Click to toggle Admission Confirmation status"
                                      >
                                        <ShieldCheck size={13} />
                                        {isConfirmed ? 'Confirmed' : 'Pending'}
                                      </button>
                                    );
                                  })()}
                                </td>
                                <td style={{ padding: '1rem 1.25rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <button
                                    onClick={() => handleOpenEditCoursesModal(s)}
                                    style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px', marginRight: '6px' }}
                                  >
                                    Edit Tracks
                                  </button>
                                  {s.deviceId && (
                                    <button
                                      onClick={() => handleResetDevice(s._id || s.id)}
                                      style={{ background: '#fffbe8', border: '1px solid #fde68a', color: '#d97706', fontWeight: 800, cursor: 'pointer', fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px', marginRight: '6px' }}
                                    >
                                      Reset Lock
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteStudent(s._id || s.id || s.accessCode)}
                                    style={{
                                      background: '#fef2f2',
                                      border: '1px solid #fecaca',
                                      color: '#ef4444',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      fontSize: '0.8rem',
                                      padding: '0.35rem 0.75rem',
                                      borderRadius: '8px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px'
                                    }}
                                    title="Delete this student record"
                                  >
                                    <Trash2 size={13} /> Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      /* 📱 MOBILE RESPONSIVE CARD GRID VIEW */
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {paginatedStudents.map(s => {
                          const detailed = calculateDetailedCourseProgress(s);
                          const { completedCount, totalCount, percentage } = calculateStudentProgress(s);

                          return (
                            <div
                              key={s._id || s.id}
                              style={{
                                background: '#ffffff',
                                border: '1px solid var(--surface-border)',
                                borderRadius: '18px',
                                padding: '1.25rem',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                              }}
                            >
                              {/* Student Header */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    color: '#ffffff', fontWeight: 900, fontSize: '0.9rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                  }}>
                                    {s.name ? s.name.substring(0, 2).toUpperCase() : 'ST'}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                                      {s.name}
                                    </div>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#d97706', background: '#fef3c7', border: '1px solid #fde68a', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                                      {s.accessCode}
                                    </span>
                                  </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                                  {s.deviceId ? (
                                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.74rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                      🔒 Locked
                                    </span>
                                  ) : (
                                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.74rem', background: 'rgba(0, 0, 0, 0.03)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                      🆕 Unlocked
                                    </span>
                                  )}
                                  {(() => {
                                    const isConfirmed = s.admissionStatus === 'Approved' || (s.isCourseActivated !== false && s.admissionStatus !== 'Pending');
                                    return (
                                      <button
                                        type="button"
                                        onClick={() => handleToggleAdmission(s._id || s.id)}
                                        style={{
                                          border: `1px solid ${isConfirmed ? '#a7f3d0' : '#fde68a'}`,
                                          cursor: 'pointer',
                                          background: isConfirmed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.12)',
                                          color: isConfirmed ? '#059669' : '#d97706',
                                          padding: '0.2rem 0.55rem',
                                          borderRadius: '20px',
                                          fontWeight: 800,
                                          fontSize: '0.72rem',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px'
                                        }}
                                        title="Click to toggle Admission Confirmation status"
                                      >
                                        <ShieldCheck size={11} />
                                        {isConfirmed ? 'Confirmed' : 'Pending'}
                                      </button>
                                    );
                                  })()}
                                </div>
                              </div>

                              {/* Enrolled Track Description */}
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: '#f8fafc', padding: '8px 12px', borderRadius: '10px' }}>
                                <strong>Main Course:</strong> {getMainCourseLabels(s.enrolledCourse)}
                              </div>

                              {/* Progress Card Section */}
                              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb' }}>
                                    {detailed.length} {detailed.length === 1 ? 'Track' : 'Tracks'} · {percentage}% Complete
                                  </span>
                                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
                                    {completedCount}/{totalCount} topics
                                  </span>
                                </div>

                                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                  <div style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    background: percentage === 100
                                      ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                      : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                                    borderRadius: '10px',
                                    transition: 'width 0.4s ease'
                                  }} />
                                </div>

                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                  {detailed.map(c => (
                                    <span
                                      key={c.courseKey}
                                      style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: c.percentage === 100 ? '#059669' : c.percentage > 0 ? '#1d4ed8' : '#64748b',
                                        background: c.percentage === 100 ? '#d1fae5' : c.percentage > 0 ? '#eff6ff' : '#ffffff',
                                        border: `1px solid ${c.percentage === 100 ? '#a7f3d0' : c.percentage > 0 ? '#bfdbfe' : '#e2e8f0'}`,
                                        padding: '2px 6px',
                                        borderRadius: '6px'
                                      }}
                                    >
                                      {c.courseLabel.split(' ')[0]}: {c.percentage}%
                                    </span>
                                  ))}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setViewingProgressStudent(s)}
                                  style={{
                                    marginTop: '4px',
                                    width: '100%',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '10px',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    cursor: 'pointer'
                                  }}
                                >
                                  <BarChart3 size={14} /> View Course Progress Breakdown
                                </button>
                              </div>

                              {/* Card Action Controls */}
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px', borderTop: '1px solid #f1f5f9' }}>
                                <button
                                  onClick={() => {
                                    const loginUrl = `${window.location.origin}/?code=${s.accessCode}`;
                                    navigator.clipboard.writeText(loginUrl);
                                    alert(`Copied direct access link for ${s.name}!\n\nLink: ${loginUrl}`);
                                  }}
                                  style={{
                                    flex: 1, background: '#f8fafc', border: '1px solid var(--surface-border)', color: 'var(--text-primary)',
                                    padding: '0.45rem 0.6rem', borderRadius: '8px', cursor: 'pointer',
                                    fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                                  }}
                                >
                                  <Copy size={12} /> Copy Link
                                </button>
                                <button
                                  onClick={() => handleOpenEditCoursesModal(s)}
                                  style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem', padding: '0.45rem 0.6rem', borderRadius: '8px' }}
                                >
                                  Edit Tracks
                                </button>
                                {s.deviceId && (
                                  <button
                                    onClick={() => handleResetDevice(s._id || s.id)}
                                    style={{ background: '#fffbe8', border: '1px solid #fde68a', color: '#d97706', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem', padding: '0.45rem 0.6rem', borderRadius: '8px' }}
                                  >
                                    Reset Lock
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteStudent(s._id || s.id || s.accessCode)}
                                  style={{
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    color: '#ef4444',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    fontSize: '0.78rem',
                                    padding: '0.45rem 0.6rem',
                                    borderRadius: '8px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                  title="Delete this student record"
                                >
                                  <Trash2 size={12} /> Delete
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Pagination Controls */}
                    <div style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginTop: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--surface-border)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>
                          Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong> of <strong>{filteredStudents.length}</strong> students
                          {studentSearch && ` (filtered from ${students.length} total)`}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span>Per page:</span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => {
                              setItemsPerPage(Number(e.target.value));
                              setStudentPage(1);
                            }}
                            style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              border: '1px solid var(--surface-border)',
                              background: 'var(--bg-color)',
                              color: 'var(--text-primary)',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={() => setStudentPage(p => Math.max(1, p - 1))}
                          disabled={safeStudentPage <= 1}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '0.4rem 0.7rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: safeStudentPage <= 1 ? '#f1f5f9' : '#ffffff',
                            color: safeStudentPage <= 1 ? '#cbd5e1' : 'var(--text-primary)',
                            fontWeight: 700,
                            cursor: safeStudentPage <= 1 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <ChevronLeft size={16} /> Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                          <button
                            key={pageNum}
                            onClick={() => setStudentPage(pageNum)}
                            style={{
                              padding: '0.4rem 0.75rem',
                              borderRadius: '8px',
                              border: pageNum === safeStudentPage ? 'none' : '1px solid var(--surface-border)',
                              background: pageNum === safeStudentPage ? '#10b981' : '#ffffff',
                              color: pageNum === safeStudentPage ? '#ffffff' : 'var(--text-primary)',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: pageNum === safeStudentPage ? '0 2px 6px rgba(16,185,129,0.3)' : 'none'
                            }}
                          >
                            {pageNum}
                          </button>
                        ))}

                        <button
                          onClick={() => setStudentPage(p => Math.min(totalPages, p + 1))}
                          disabled={safeStudentPage >= totalPages}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '0.4rem 0.7rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: safeStudentPage >= totalPages ? '#f1f5f9' : '#ffffff',
                            color: safeStudentPage >= totalPages ? '#cbd5e1' : 'var(--text-primary)',
                            fontWeight: 700,
                            cursor: safeStudentPage >= totalPages ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Next <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                    <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>
                      {studentSearch
                        ? `No students found matching "${studentSearch}". Try clearing your search.`
                        : 'No registered students found in database. Enroll new records above.'
                      }
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                  <Users size={24} color="#6366f1" /> Active Staff Instructors Directory
                </div>

                {staff.length > 0 ? (
                  <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', color: 'var(--text-secondary)' }}>
                          <th style={{ padding: '1rem' }}>Tutor Name</th>
                          <th style={{ padding: '1rem' }}>Username ID</th>
                          <th style={{ padding: '1rem' }}>Password Key</th>
                          <th style={{ padding: '1rem', textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staff.map(t => (
                          <tr key={t._id || t.id} style={{ color: 'var(--text-primary)' }}>
                            <td style={{ padding: '1rem', fontWeight: 800 }}>{t.name}</td>
                            <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 700 }}>{t.username}</td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{t.password}</td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <button
                                onClick={() => handleDeleteStaff(t._id || t.id)}
                                style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem' }}
                              >
                                Remove Tutor
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                    <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>No dynamic staff accounts enrolled. Use the "Enroll Staff" form to register staff instructors.</p>
                  </div>
                )}
              </>
            )}

          </div>
        )}

        {/* 🟢 TAB 5: INDUCTION & DEMO CLASSES */}
        {activeTab === 'demos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div
              onClick={() => onSelectCourse('induction')}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
                borderRadius: '24px',
                padding: '3rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 30px rgba(79, 70, 229, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
            >
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.15)', padding: '0.35rem 0.88rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <Sparkles size={12} color="#fef08a" /> Induction Sessions
                </div>
                <h2 style={{ fontSize: '2.2rem', color: 'white', fontWeight: 900, margin: '0 0 0.5rem 0' }}>Free Induction & Demo Classes</h2>
                <p style={{ color: '#e0e7ff', margin: 0, fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 500 }}>
                  Learn about AI-Powered workflows, job roadmaps, salaries, and masterclasses across our sub-courses curriculum.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', color: '#4f46e5', padding: '0.85rem 1.8rem', borderRadius: '30px', fontWeight: 800, fontSize: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                Launch Demos <ArrowRight size={18} />
              </div>
            </div>
          </div>
        )}

        {/* 🏆 TAB: CERTIFICATE MANAGEMENT (ADMIN/STAFF ONLY) */}
        {activeTab === 'certificates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', boxSizing: 'border-box' }}>

            {/* Upload Certificate Card */}
            <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '12px', padding: '0.6rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Upload size={20} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>Upload Student Certificate</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', fontFamily: 'system-ui' }}>Select a student and upload a PDF or image certificate (max 2MB).</p>
                </div>
              </div>

              {/* Responsive Student Selector & File Input Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                    Select Student *
                  </label>
                  <select
                    value={certStudentId}
                    onChange={e => { setCertStudentId(e.target.value); setCertSuccessMsg(''); setCertError(''); }}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.92rem', background: '#ffffff', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <option value="">— Choose a student —</option>
                    {students.map(s => (
                      <option key={s._id || s.id} value={s._id || s.id}>
                        {s.name} — {s.accessCode || s.studentId || s._id || s.id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                    Certificate File * (PDF or Image, max 2MB)
                  </label>
                  <label htmlFor="cert-file-input" style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '0.75rem 1rem', borderRadius: '12px',
                    border: `2px dashed ${certFile ? '#f59e0b' : '#cbd5e1'}`,
                    background: certFile ? 'rgba(245,158,11,0.05)' : '#fafafa',
                    cursor: 'pointer', transition: 'all 0.2s', boxSizing: 'border-box'
                  }}>
                    <FileText size={20} color={certFile ? '#f59e0b' : '#94a3b8'} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', color: certFile ? '#d97706' : '#94a3b8', fontWeight: certFile ? 700 : 500, fontFamily: 'system-ui', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {certFile ? certFile.name : 'Click to browse file...'}
                    </span>
                  </label>
                  <input
                    id="cert-file-input"
                    type="file"
                    accept=".pdf,image/*"
                    style={{ display: 'none' }}
                    onChange={e => {
                      setCertFile(e.target.files[0] || null);
                      setCertError('');
                      setCertSuccessMsg('');
                    }}
                  />
                  {certFile && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem', fontFamily: 'system-ui' }}>
                      Size: {(certFile.size / 1024).toFixed(1)} KB · Type: {certFile.type || 'Unknown'}
                    </div>
                  )}
                </div>
              </div>

              {/* Error / Success Messages */}
              {certError && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#dc2626', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'system-ui' }}>
                  ⚠️ {certError}
                </div>
              )}
              {certSuccessMsg && (
                <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#059669', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'system-ui' }}>
                  ✅ {certSuccessMsg}
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUploadCertificate}
                disabled={certUploading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: certUploading ? '#e2e8f0' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: certUploading ? '#94a3b8' : '#ffffff',
                  border: 'none', borderRadius: '12px', padding: '0.8rem 2rem',
                  fontSize: '0.95rem', fontWeight: 800, cursor: certUploading ? 'not-allowed' : 'pointer',
                  boxShadow: certUploading ? 'none' : '0 6px 16px rgba(245,158,11,0.3)',
                  transition: 'all 0.2s'
                }}
              >
                <Upload size={18} />
                {certUploading ? 'Uploading...' : 'Upload Certificate'}
              </button>
            </div>

            {/* Existing Certificates Table */}
            <div style={{ background: '#ffffff', border: '1px solid var(--surface-border)', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 2rem)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'system-ui' }}>Students With Certificates</h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(245,158,11,0.1)', color: '#d97706', padding: '0.35rem 0.85rem', borderRadius: '20px', fontFamily: 'system-ui' }}>
                  {students.filter(s => s.certificate && s.certificate.data).length} Issued
                </span>
              </div>

              {students.filter(s => s.certificate && s.certificate.data).length > 0 ? (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '14px', border: '1px solid var(--surface-border)' }}>
                  <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-secondary)', fontWeight: 700, textAlign: 'left' }}>
                        <th style={{ padding: '0.85rem 1rem', fontFamily: 'system-ui' }}>Student</th>
                        <th style={{ padding: '0.85rem 1rem', fontFamily: 'system-ui' }}>Certificate File</th>
                        <th style={{ padding: '0.85rem 1rem', fontFamily: 'system-ui' }}>Uploaded At</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontFamily: 'system-ui' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.filter(s => s.certificate && s.certificate.data).map(s => (
                        <tr key={s._id || s.id} style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-primary)', transition: 'background 0.15s' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{s.name}</div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(99, 102, 241, 0.08)', color: '#4f46e5', padding: '0.15rem 0.55rem', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700, marginTop: '4px', fontFamily: 'monospace' }}>
                              {s.accessCode || s.studentId || s._id || s.id}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.08)', padding: '0.35rem 0.75rem', borderRadius: '8px', maxWidth: '240px' }}>
                              <FileText size={15} color="#d97706" style={{ flexShrink: 0 }} />
                              <span style={{ fontSize: '0.82rem', color: '#b45309', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.certificate.filename}>
                                {s.certificate.filename}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                            {s.certificate.uploadedAt ? new Date(s.certificate.uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              {s.certificate.data && (
                                <a
                                  href={s.certificate.data}
                                  download={s.certificate.filename || 'certificate.pdf'}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                                    color: '#d97706', fontWeight: 700, textDecoration: 'none',
                                    fontSize: '0.8rem', borderRadius: '8px', padding: '0.4rem 0.75rem',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                  }}
                                >
                                  View / Download
                                </a>
                              )}
                              <button
                                onClick={() => { setCertStudentId(s._id || s.id); setCertFile(null); setCertSuccessMsg(''); setCertError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                  background: '#f8fafc', border: '1px solid #cbd5e1',
                                  color: '#475569', fontWeight: 700, cursor: 'pointer',
                                  fontSize: '0.8rem', borderRadius: '8px', padding: '0.4rem 0.75rem',
                                  transition: 'all 0.2s'
                                }}
                              >
                                Re-upload
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
                  <Award size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>No certificates uploaded yet. Use the form above to issue a certificate to a student.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 📝 TAB 6: UNIFIED REVIEW AND EVALUATION CENTER (STAFF/ADMIN ONLY) */}
        {activeTab === 'grading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', boxSizing: 'border-box' }}>

            {/* 📊 1) KPI Metrics Summary Bar */}
            {(() => {
              const approvedCount = allSubmissions.filter(s => (s.status || '').toLowerCase() === 'approved').length;
              const rejectedCount = allSubmissions.filter(s => (s.status || '').toLowerCase() === 'rejected').length;

              const filteredSubmissions = allSubmissions.filter(s => {
                const sStatus = (s.status || '').toLowerCase();
                if (reviewFilter === 'pending' && sStatus !== 'pending') return false;
                if (reviewFilter === 'approved' && sStatus !== 'approved') return false;
                if (reviewFilter === 'rejected' && sStatus !== 'rejected') return false;
                if (reviewFilter === 'spoko' && !isSpokoItem(s)) return false;
                if (reviewFilter === 'logical_reasoning' && !isLogicalItem(s)) return false;
                if (reviewFilter === 'html_css' && !s.isHtmlCss) return false;

                if (reviewSearch.trim()) {
                  const q = reviewSearch.trim().toLowerCase();
                  const nameMatch = (s.studentName || '').toLowerCase().includes(q);
                  const codeMatch = (s.accessCode || '').toLowerCase().includes(q);
                  const modMatch = (s.moduleId || '').toLowerCase().includes(q) || (s.moduleTitle || '').toLowerCase().includes(q);
                  return nameMatch || codeMatch || modMatch;
                }
                return true;
              });

              return (
                <>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {/* Card 1: Total */}
                    <div
                      onClick={() => setReviewFilter('all')}
                      style={{
                        background: reviewFilter === 'all' ? '#eff6ff' : '#ffffff',
                        border: reviewFilter === 'all' ? '2px solid #3b82f6' : '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: reviewFilter === 'all' ? '0 4px 14px rgba(59, 130, 246, 0.15)' : 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Show all submissions"
                    >
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Submissions</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>{allSubmissions.length}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={22} />
                      </div>
                    </div>

                    {/* Card 2: Pending */}
                    <div
                      onClick={() => setReviewFilter('pending')}
                      style={{
                        background: reviewFilter === 'pending' ? '#fef2f2' : '#ffffff',
                        border: reviewFilter === 'pending' ? '2px solid #dc2626' : pendingCount > 0 ? '1px solid #fca5a5' : '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: reviewFilter === 'pending' || pendingCount > 0 ? '0 4px 14px rgba(239,68,68,0.15)' : 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Filter by Pending Review"
                    >
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: pendingCount > 0 ? '#dc2626' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Review</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: pendingCount > 0 ? '#dc2626' : 'var(--text-primary)', marginTop: '4px' }}>{pendingCount}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: pendingCount > 0 ? '#fef2f2' : 'rgba(245, 158, 11, 0.1)', color: pendingCount > 0 ? '#dc2626' : '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={22} />
                      </div>
                    </div>

                    {/* Card 3: Approved */}
                    <div
                      onClick={() => setReviewFilter('approved')}
                      style={{
                        background: reviewFilter === 'approved' ? '#f0fdf4' : '#ffffff',
                        border: reviewFilter === 'approved' ? '2px solid #16a34a' : '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: reviewFilter === 'approved' ? '0 4px 14px rgba(22, 163, 74, 0.15)' : 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Filter by Approved Submissions"
                    >
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#16a34a', marginTop: '4px' }}>{approvedCount}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={22} />
                      </div>
                    </div>

                    {/* Card 4: Spoko Submissions */}
                    <div
                      onClick={() => setReviewFilter('spoko')}
                      style={{
                        background: reviewFilter === 'spoko' ? '#eef2ff' : '#ffffff',
                        border: reviewFilter === 'spoko' ? '2px solid #4f46e5' : '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: reviewFilter === 'spoko' ? '0 4px 14px rgba(79, 70, 229, 0.15)' : 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Filter strictly by Spoko English & HR Mock Interview Submissions"
                    >
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spoko Scores</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#4f46e5', marginTop: '4px' }}>{spokoSubmissions.length}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={22} />
                      </div>
                    </div>

                    {/* Card 5: Logical Reasoning Submissions */}
                    <div
                      onClick={() => setReviewFilter('logical_reasoning')}
                      style={{
                        background: reviewFilter === 'logical_reasoning' ? '#fdf2f8' : '#ffffff',
                        border: reviewFilter === 'logical_reasoning' ? '2px solid #db2777' : '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: reviewFilter === 'logical_reasoning' ? '0 4px 14px rgba(219, 39, 119, 0.15)' : 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Filter strictly by Logical Thinking & Analytical Reasoning Submissions"
                    >
                      <div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logical Reasoning</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#db2777', marginTop: '4px' }}>{logicalReasoningSubmissions.length}</div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Brain size={22} />
                      </div>
                    </div>
                  </div>

                  {/* 🔍 2) Search & Filter Control Bar */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '20px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'center',
                    gap: '1rem'
                  }}>
                    {/* Filter Chips */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('all')}
                        style={{
                          background: reviewFilter === 'all' ? '#3b82f6' : '#f1f5f9',
                          color: reviewFilter === 'all' ? '#ffffff' : '#475569',
                          border: reviewFilter === 'all' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          padding: '7px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        All ({allSubmissions.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('pending')}
                        style={{
                          background: reviewFilter === 'pending' ? '#dc2626' : '#fef2f2',
                          color: reviewFilter === 'pending' ? '#ffffff' : '#dc2626',
                          border: reviewFilter === 'pending' ? '1.5px solid #b91c1c' : '1px solid #fca5a5',
                          padding: '7px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        ⏳ Pending ({pendingCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('approved')}
                        style={{
                          background: reviewFilter === 'approved' ? '#16a34a' : '#f0fdf4',
                          color: reviewFilter === 'approved' ? '#ffffff' : '#16a34a',
                          border: reviewFilter === 'approved' ? '1.5px solid #15803d' : '1px solid #bbf7d0',
                          padding: '7px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        ✅ Approved ({approvedCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('rejected')}
                        style={{
                          background: reviewFilter === 'rejected' ? '#ea580c' : '#fff7ed',
                          color: reviewFilter === 'rejected' ? '#ffffff' : '#ea580c',
                          border: reviewFilter === 'rejected' ? '1.5px solid #c2410c' : '1px solid #fed7aa',
                          padding: '7px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        ⚠️ Revisions ({rejectedCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('spoko')}
                        style={{
                          background: reviewFilter === 'spoko' ? '#4f46e5' : '#eef2ff',
                          color: reviewFilter === 'spoko' ? '#ffffff' : '#4f46e5',
                          border: reviewFilter === 'spoko' ? '1.5px solid #4338ca' : '1px solid #c7d2fe',
                          padding: '7px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                          display: 'inline-flex', alignItems: 'center', gap: 6
                        }}
                      >
                        <MessageSquare size={13} /> Spoko Scores ({spokoSubmissions.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('logical_reasoning')}
                        style={{
                          background: reviewFilter === 'logical_reasoning' ? '#db2777' : '#fdf2f8',
                          color: reviewFilter === 'logical_reasoning' ? '#ffffff' : '#db2777',
                          border: reviewFilter === 'logical_reasoning' ? '1.5px solid #be123c' : '1px solid #fbcfe8',
                          padding: '7px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                          display: 'inline-flex', alignItems: 'center', gap: 6
                        }}
                      >
                        <Brain size={13} /> Logical Reasoning ({logicalReasoningSubmissions.length})
                      </button>
                    </div>

                    {/* Search Box */}
                    <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '280px' }}>
                      <input
                        type="text"
                        placeholder="Search student, code, or topic..."
                        value={reviewSearch}
                        onChange={e => setReviewSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.55rem 1rem 0.55rem 2.2rem',
                          borderRadius: '14px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#f8fafc',
                          outline: 'none'
                        }}
                      />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.45, fontSize: '0.85rem' }}>🔍</span>
                    </div>
                  </div>

                  {/* Active Filter Status Bar */}
                  {reviewFilter !== 'all' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.84rem',
                      color: '#475569',
                      flexWrap: 'wrap',
                      gap: 8
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Active Filter:</span>
                        <strong style={{ color: '#0f172a' }}>
                          {reviewFilter === 'pending' && `⏳ Pending Review (${filteredSubmissions.length})`}
                          {reviewFilter === 'approved' && `✅ Approved Submissions (${filteredSubmissions.length})`}
                          {reviewFilter === 'rejected' && `⚠️ Revisions Requested (${filteredSubmissions.length})`}
                          {reviewFilter === 'spoko' && `💬 Spoko Scores Track (${filteredSubmissions.length})`}
                          {reviewFilter === 'logical_reasoning' && `🧠 Logical Reasoning Assessment (${filteredSubmissions.length})`}
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('all')}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#3b82f6',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Reset to All ({allSubmissions.length})
                      </button>
                    </div>
                  )}

                  {/* 📋 3) Submission Cards List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', boxSizing: 'border-box' }}>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map(task => {
                        const statusColors = {
                          Pending: { text: '#b45309', bg: '#fffbe8', border: '#fde68a', leftBar: '#f59e0b', label: '⏳ Pending Approval' },
                          Approved: { text: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', leftBar: '#10b981', label: '✅ Approved' },
                          Rejected: { text: '#b91c1c', bg: '#fef2f2', border: '#fecaca', leftBar: '#ef4444', label: '⚠️ Revision Requested' }
                        };
                        const col = statusColors[task.status] || { text: '#475569', bg: '#f8fafc', border: '#cbd5e1', leftBar: '#94a3b8', label: task.status };

                        return (
                          <div
                            key={task._id || task.id}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderLeft: `5px solid ${col.leftBar}`,
                              borderRadius: '18px',
                              padding: isMobile ? '1.25rem' : '1.5rem',
                              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              transition: 'all 0.2s ease',
                              width: '100%',
                              boxSizing: 'border-box'
                            }}
                          >
                            {/* Top Header Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', width: '100%' }}>
                              {/* Student Info */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: 44,
                                  height: 44,
                                  borderRadius: '50%',
                                  background: task.isLogicalReasoning
                                    ? 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)'
                                    : (task.isSpoko || isSpokoItem(task))
                                    ? 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)'
                                    : task.isHtmlCss
                                    ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
                                    : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                  color: '#ffffff',
                                  fontWeight: 900,
                                  fontSize: '0.95rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
                                }}>
                                  {task.studentName ? task.studentName.substring(0, 2).toUpperCase() : 'ST'}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                                    {task.studentName}
                                  </div>
                                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace', fontWeight: 700, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                                    {task.accessCode}
                                  </span>
                                </div>
                              </div>

                              {/* Course / Module & Status Badges */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                {task.isLogicalReasoning ? (
                                  <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: '#be123c',
                                    background: '#fff1f2',
                                    border: '1px solid #fecdd3',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5
                                  }}>
                                    <Brain size={12} /> Logical Reasoning Score
                                  </span>
                                ) : (task.isSpoko || isSpokoItem(task)) ? (
                                  <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: '#4338ca',
                                    background: '#eef2ff',
                                    border: '1px solid #c7d2fe',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 5
                                  }}>
                                    <MessageSquare size={12} /> Spoko English Track
                                  </span>
                                ) : (
                                  <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: task.isHtmlCss ? '#7e22ce' : '#1d4ed8',
                                    background: task.isHtmlCss ? '#faf5ff' : '#eff6ff',
                                    border: `1px solid ${task.isHtmlCss ? '#e9d5ff' : '#bfdbfe'}`,
                                    padding: '4px 10px',
                                    borderRadius: '20px'
                                  }}>
                                    {task.isHtmlCss ? '🎨 HTML & CSS Course' : `📚 ${task.moduleId || 'Course Module'}`}
                                  </span>
                                )}

                                {task.score !== undefined && (
                                  <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: '#065f46',
                                    background: '#ecfdf5',
                                    border: '1px solid #a7f3d0',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 4
                                  }}>
                                    🎯 Score: {task.score}/{task.total || 100} {task.grade ? `(${task.grade})` : ''}
                                  </span>
                                )}

                                <span style={{
                                  color: col.text,
                                  background: col.bg,
                                  border: `1px solid ${col.border}`,
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  padding: '4px 12px',
                                  borderRadius: '20px'
                                }}>
                                  {col.label}
                                </span>
                              </div>
                            </div>

                            {/* Module Title Banner */}
                            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0.75rem 1rem', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6, width: '100%', boxSizing: 'border-box' }}>
                              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#1e293b' }}>
                                {formatTaskTitle(task)}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                                Submitted: <strong>{formatSubmittedDate(task.submittedAt)}</strong>
                              </div>
                            </div>

                            {/* Middle Body: Submission Content & Logical Reasoning Score Result Report */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {/* 🧠 Special Score Result Report Layout for Logical Reasoning */}
                              {task.isLogicalReasoning ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                  {/* Performance Cards Grid matching Assessment Report */}
                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                                    gap: '0.75rem'
                                  }}>
                                    <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Questions</div>
                                      <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
                                        {task.totalQuestions || task.total || 20}
                                      </div>
                                    </div>
                                    <div style={{ background: '#f0fdf4', padding: '0.85rem 1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Correct Answers</div>
                                      <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#16a34a', marginTop: '2px' }}>
                                        {task.correctAnswers !== undefined ? task.correctAnswers : (task.score !== undefined ? task.score : '—')}
                                      </div>
                                    </div>
                                    <div style={{ background: '#fff5f5', padding: '0.85rem 1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #fecaca' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Incorrect Answers</div>
                                      <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#dc2626', marginTop: '2px' }}>
                                        {task.incorrectAnswers !== undefined
                                          ? task.incorrectAnswers
                                          : (task.total && task.score !== undefined ? Math.max(0, task.total - task.score) : '—')}
                                      </div>
                                    </div>
                                    <div style={{ background: '#eef2ff', padding: '0.85rem 1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #c7d2fe' }}>
                                      <div style={{ fontSize: '0.72rem', color: '#4338ca', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Final Percentage</div>
                                      <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#4f46e5', marginTop: '2px' }}>
                                        {task.percentage !== undefined
                                          ? `${task.percentage}%`
                                          : (task.total ? `${Math.round(((task.score || 0) / task.total) * 100)}%` : `${task.score || 0}%`)}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Performance Feedback Band Banner */}
                                  {(() => {
                                    const pct = task.percentage !== undefined
                                      ? task.percentage
                                      : (task.total ? Math.round(((task.score || 0) / task.total) * 100) : (task.score || 0));

                                    const bandTitle = pct >= 90 ? '🌟 90–100%: Excellent Understanding!' :
                                                      pct >= 70 ? '🎉 70–89%: Good Progress!' :
                                                      pct >= 50 ? '📚 50–69%: Keep Practising!' :
                                                      '⚠️ Below 50%: Review the Learning Material & Try Again.';
                                    const bandDesc = pct >= 90 ? 'Outstanding work! Mastered the core tenets of logical thinking, deduction, and cause-effect analysis.' :
                                                     pct >= 70 ? 'Great job! Cleared the 70% passing threshold with solid step-by-step reasoning.' :
                                                     pct >= 50 ? 'Good effort! Grasping core concepts, but recommended to review difference between facts and assumptions.' :
                                                     'Take your time to re-read the reasoning sections. Focus on the simple clues and facts, then retry the assessment!';

                                    return (
                                      <div style={{
                                        background: pct >= 90 ? '#ecfdf5' : pct >= 70 ? '#f0fdf4' : pct >= 50 ? '#fffbeb' : '#fff1f2',
                                        border: `1.5px solid ${pct >= 90 ? '#a7f3d0' : pct >= 70 ? '#bbf7d0' : pct >= 50 ? '#fde68a' : '#fecdd3'}`,
                                        borderRadius: '12px',
                                        padding: '0.85rem 1.15rem'
                                      }}>
                                        <div style={{
                                          fontSize: '0.92rem',
                                          fontWeight: 800,
                                          color: pct >= 90 ? '#065f46' : pct >= 70 ? '#166534' : pct >= 50 ? '#92400e' : '#9f1239',
                                          marginBottom: '0.2rem'
                                        }}>
                                          {task.feedbackBand || bandTitle}
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569' }}>
                                          {bandDesc}
                                        </p>
                                      </div>
                                    );
                                  })()}

                                  {/* Staff Remarks Display */}
                                  {task.staffFeedback && (
                                    <div style={{
                                      background: '#f8fafc',
                                      borderLeft: '4px solid #4f46e5',
                                      padding: '8px 12px',
                                      borderRadius: '0 10px 10px 0',
                                      fontSize: '0.84rem',
                                      color: '#1e1b4b',
                                      fontWeight: 600
                                    }}>
                                      💬 Evaluator Remarks &amp; Notes: "{task.staffFeedback}" {task.validatedBy ? `— by ${task.validatedBy}` : ''}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <>
                                  {/* URL Button */}
                                  {task.submissionUrl && (
                                    <div>
                                      <a
                                        href={task.submissionUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: '#2563eb',
                                          textDecoration: 'none',
                                          fontWeight: 800,
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '6px',
                                          background: '#eff6ff',
                                          border: '1px solid #bfdbfe',
                                          padding: '6px 14px',
                                          borderRadius: '10px',
                                          fontSize: '0.85rem',
                                          boxShadow: '0 2px 4px rgba(37, 99, 235, 0.06)'
                                        }}
                                      >
                                        🔗 Open Student Project Link <ExternalLink size={13} />
                                      </a>
                                    </div>
                                  )}

                                  {/* Student Feedback Reflection Quote */}
                                  {(task.studentFeedback || task.taskText || task.submissionNotes) && (
                                    <div style={{
                                      background: '#f8fafc',
                                      borderLeft: '4px solid #3b82f6',
                                      padding: '10px 14px',
                                      borderRadius: '0 10px 10px 0',
                                      fontSize: '0.88rem',
                                      color: '#334155',
                                      lineHeight: 1.6,
                                      fontStyle: 'italic'
                                    }}>
                                      <span style={{ fontWeight: 800, color: '#2563eb', fontStyle: 'normal', display: 'block', fontSize: '0.75rem', marginBottom: 2 }}>
                                        💬 Student Reflection &amp; Learner Feedback:
                                      </span>
                                      "{task.studentFeedback || task.taskText || task.submissionNotes}"
                                    </div>
                                  )}

                                  {/* Default fallback notice when no feedback/link attached */}
                                  {!task.submissionUrl && !task.studentFeedback && !task.taskText && !task.submissionNotes && (
                                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', background: '#fafafa', padding: '8px 12px', borderRadius: 8 }}>
                                      📝 Practical topic homework exercise submission record.
                                    </div>
                                  )}

                                  {/* Staff Remarks Display */}
                                  {task.staffFeedback && (
                                    <div style={{
                                      background: '#f0fdf4',
                                      border: '1px solid #bbf7d0',
                                      padding: '8px 12px',
                                      borderRadius: '10px',
                                      fontSize: '0.82rem',
                                      color: '#15803d',
                                      fontWeight: 700
                                    }}>
                                      💬 Staff Evaluation Remarks: "{task.staffFeedback}" {task.validatedBy ? `— by ${task.validatedBy}` : ''}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Footer Actions Bar */}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              gap: '8px',
                              borderTop: '1px solid #f1f5f9',
                              paddingTop: '0.88rem',
                              flexWrap: 'wrap',
                              width: '100%',
                              boxSizing: 'border-box'
                            }}>
                              {task.isLogicalReasoning && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const st = students.find(s => s._id === task.studentId || s.id === task.studentId || s.accessCode === task.accessCode);
                                    if (st) handleOpenQuickLogicalModal(st);
                                  }}
                                  style={{
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1.1rem',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '0.82rem',
                                    fontWeight: 800,
                                    boxShadow: '0 3px 8px rgba(79, 70, 229, 0.25)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    transition: 'all 0.2s'
                                  }}
                                  title="Enter or update evaluator score &amp; notes"
                                >
                                  <Brain size={15} /> Evaluator Score Modal
                                </button>
                              )}

                              {((task.status || '').toLowerCase() === 'approved') ? (
                                <span
                                  style={{
                                    background: '#f0fdf4',
                                    border: '1.5px solid #bbf7d0',
                                    color: '#15803d',
                                    padding: '0.55rem 1.15rem',
                                    borderRadius: '10px',
                                    fontSize: '0.82rem',
                                    fontWeight: 800,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6
                                  }}
                                  title="Task is approved and unlocked"
                                >
                                  <CheckCircle size={15} color="#16a34a" /> Approved &amp; Unlocked
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  disabled={actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`)}
                                  onClick={() => handleQuickApprove(task)}
                                  style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1.25rem',
                                    borderRadius: '10px',
                                    cursor: actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`) ? 'not-allowed' : 'pointer',
                                    opacity: actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`) ? 0.7 : 1,
                                    fontSize: '0.82rem',
                                    fontWeight: 800,
                                    boxShadow: '0 3px 8px rgba(16, 185, 129, 0.25)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    transition: 'all 0.2s'
                                  }}
                                  title="Approve submission and unlock next content"
                                >
                                  <CheckCircle size={15} /> {actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`) ? 'Approving...' : 'Approve & Unlock Next Day'}
                                </button>
                              )}

                              {((task.status || '').toLowerCase() === 'rejected') ? (
                                <span
                                  style={{
                                    background: '#fef2f2',
                                    border: '1.5px solid #fecaca',
                                    color: '#b91c1c',
                                    padding: '0.55rem 1.15rem',
                                    borderRadius: '10px',
                                    fontSize: '0.82rem',
                                    fontWeight: 800,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6
                                  }}
                                >
                                  <AlertTriangle size={15} color="#ef4444" /> Revision Requested
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  disabled={actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`)}
                                  onClick={() => handleQuickReject(task)}
                                  style={{
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1.1rem',
                                    borderRadius: '10px',
                                    cursor: actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`) ? 'not-allowed' : 'pointer',
                                    opacity: actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`) ? 0.7 : 1,
                                    fontSize: '0.82rem',
                                    fontWeight: 800,
                                    boxShadow: '0 3px 8px rgba(239, 68, 68, 0.25)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    transition: 'all 0.2s'
                                  }}
                                  title="Request revision from student"
                                >
                                  <AlertTriangle size={15} /> {actionLoadingId === (task._id || task.id || `${task.studentId}_${task.moduleId}`) ? 'Updating...' : 'Request Revision'}
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  setGradingTask(task);
                                  setGradingStudentId(task.studentId || '');
                                  setGradingStatus(task.status);
                                  setGradingFeedback(task.staffFeedback || task.feedback || '');
                                  setGradingGrade(task.grade || 'Pass');
                                }}
                                style={{
                                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                  border: 'none',
                                  color: '#ffffff',
                                  padding: '0.55rem 1.1rem',
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  fontSize: '0.82rem',
                                  fontWeight: 800,
                                  boxShadow: '0 3px 8px rgba(59, 130, 246, 0.25)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  transition: 'all 0.2s'
                                }}
                              >
                                <FileText size={15} /> Custom Remarks &amp; Grade
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid var(--surface-border)',
                        borderRadius: '20px',
                        textAlign: 'center',
                        padding: '4rem 1.5rem',
                        color: 'var(--text-secondary)'
                      }}>
                        <CheckCircle size={52} style={{ opacity: 0.25, marginBottom: '1rem', color: '#3b82f6' }} />
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>No Submissions Found</h4>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>No student submission requests matched your current search or status filter.</p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}

          </div>
        )}

        {/* 🎓 TAB 6.5: CERTIFICATES & ID CARD MANAGEMENT (STAFF & ADMIN ONLY) */}
        {(activeTab === 'prepare_certs' || activeTab === 'af_certificates' || activeTab === 'idcards' || activeTab === 'foclen') && (session?.role === 'admin' || session?.role === 'staff') && (
          <CertificateManager
            session={session}
            students={students}
            initialModule={activeTab === 'idcards' ? 'idcards' : activeTab === 'foclen' ? 'foclen' : 'certificates'}
            onSelectModule={(mod) => {
              if (mod === 'certificates') setActiveTab('af_certificates');
              else if (mod === 'idcards') setActiveTab('idcards');
              else if (mod === 'foclen') setActiveTab('foclen');
            }}
            onBack={() => setActiveTab('overview')}
          />
        )}

        {/* 🧾 TAB 7: INVOICE GENERATOR & FEE BILLING (STAFF & ADMIN ONLY) */}
        {activeTab === 'invoices' && (session?.role === 'admin' || session?.role === 'staff') && (
          <InvoiceGenerator session={session} students={students} onBack={() => setActiveTab('overview')} />
        )}

        {/* 🛡️ TAB 7.5: ADMISSION VERIFICATION WORKFLOW (STAFF & ADMIN ONLY) */}
        {activeTab === 'admission_verification' && (session?.role === 'admin' || session?.role === 'staff') && (
          <AdmissionVerificationDashboard session={session} onBack={() => setActiveTab('overview')} />
        )}

        {/* 🎙️ TAB 8: AI MOCK INTERVIEW PERFORMANCE & STUDENT MARKS (STAFF & ADMIN ONLY) */}
        {activeTab === 'mock_interviews' && (session?.role === 'admin' || session?.role === 'staff') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {(() => {
              // Extract all mock summaries across students
              const studentMockData = students.map(s => {
                const mocks = getStudentMockInterviews(s);
                const summary = calculateStudentMockSummary(mocks);
                return {
                  student: s,
                  mocks,
                  summary
                };
              });

              // Compute overall stats
              const totalSessions = studentMockData.reduce((acc, curr) => acc + curr.summary.completedCount, 0);
              const studentsWithAttempts = studentMockData.filter(d => d.summary.completedCount > 0);
              const totalScoreSum = studentsWithAttempts.reduce((acc, curr) => acc + (curr.summary.averageScore || 0), 0);
              const platformAvg = studentsWithAttempts.length > 0 ? Math.round(totalScoreSum / studentsWithAttempts.length) : 0;
              const topPerformersCount = studentsWithAttempts.filter(d => d.summary.grade === 'S' || d.summary.grade === 'A').length;
              const needsPracticeCount = studentsWithAttempts.filter(d => d.summary.grade === 'Needs Practice' || (d.summary.averageScore && d.summary.averageScore < 60)).length;

              // Filter students
              const filteredMockData = studentMockData.filter(item => {
                const s = item.student;
                if (mockSearch.trim()) {
                  const q = mockSearch.toLowerCase().trim();
                  const nameMatch = (s.name || '').toLowerCase().includes(q);
                  const codeMatch = (s.accessCode || '').toLowerCase().includes(q);
                  const courseMatch = (s.enrolledCourse || '').toLowerCase().includes(q);
                  if (!nameMatch && !codeMatch && !courseMatch) return false;
                }

                if (mockDayFilter !== 'all') {
                  const targetDay = Number(mockDayFilter);
                  if (!item.summary.dayMap[targetDay]) return false;
                }

                if (mockGradeFilter !== 'all') {
                  if (item.summary.grade !== mockGradeFilter) return false;
                }

                return true;
              });

              return (
                <>
                  {/* KPI Cards Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem'
                  }}>
                    {/* Card 1: Total Completed Mock Sessions */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Total Sessions Completed
                        </span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e1b4b', marginTop: '4px' }}>
                          {totalSessions}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 700 }}>
                          Across {studentsWithAttempts.length} active students
                        </span>
                      </div>
                      <div style={{ width: 46, height: 46, borderRadius: '14px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot size={24} />
                      </div>
                    </div>

                    {/* Card 2: Platform Average Score */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Platform Average Score
                        </span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
                          {platformAvg > 0 ? `${platformAvg} / 100` : '--'}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                          Evaluated by STAR AI Rubric
                        </span>
                      </div>
                      <div style={{ width: 46, height: 46, borderRadius: '14px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={24} />
                      </div>
                    </div>

                    {/* Card 3: Top Performers (Grade S / A) */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Top Performers (Grade S / A)
                        </span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb', marginTop: '4px' }}>
                          {topPerformersCount}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700 }}>
                          Score &gt;= 80 / 100
                        </span>
                      </div>
                      <div style={{ width: 46, height: 46, borderRadius: '14px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={24} />
                      </div>
                    </div>

                    {/* Card 4: Needs Practice (<60%) */}
                    <div style={{
                      background: '#ffffff',
                      border: needsPracticeCount > 0 ? '1px solid #fecaca' : '1px solid var(--surface-border)',
                      borderRadius: '20px',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: needsPracticeCount > 0 ? '#dc2626' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Needs Coaching (&lt;60%)
                        </span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: needsPracticeCount > 0 ? '#dc2626' : '#64748b', marginTop: '4px' }}>
                          {needsPracticeCount}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
                          Requires STAR practice
                        </span>
                      </div>
                      <div style={{ width: 46, height: 46, borderRadius: '14px', background: needsPracticeCount > 0 ? '#fef2f2' : '#f1f5f9', color: needsPracticeCount > 0 ? '#dc2626' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '20px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}>
                    {/* Search Input */}
                    <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
                      <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        type="text"
                        value={mockSearch}
                        onChange={e => setMockSearch(e.target.value)}
                        placeholder="Search student by name or access code..."
                        style={{
                          width: '100%',
                          padding: '0.65rem 1rem 0.65rem 2.4rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Day Filter */}
                      <select
                        value={mockDayFilter}
                        onChange={e => setMockDayFilter(e.target.value)}
                        style={{
                          padding: '0.65rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#334155',
                          background: '#ffffff',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="all">All Days (1 to 5)</option>
                        <option value="1">Day 1: Intro & Background</option>
                        <option value="2">Day 2: Career Goals</option>
                        <option value="3">Day 3: Behavioral (STAR)</option>
                        <option value="4">Day 4: Salary & Negotiation</option>
                        <option value="5">Day 5: Experience & Closing</option>
                      </select>

                      {/* Grade Filter */}
                      <select
                        value={mockGradeFilter}
                        onChange={e => setMockGradeFilter(e.target.value)}
                        style={{
                          padding: '0.65rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#334155',
                          background: '#ffffff',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="all">All Grades</option>
                        <option value="S">Grade S (90-100)</option>
                        <option value="A">Grade A (80-89)</option>
                        <option value="B">Grade B (70-79)</option>
                        <option value="C">Grade C (60-69)</option>
                        <option value="Needs Practice">Needs Practice (&lt;60)</option>
                      </select>

                      <button
                        onClick={fetchStudents}
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          padding: '0.65rem 1rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#475569',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <RefreshCw size={14} /> Refresh Marks
                      </button>
                    </div>
                  </div>

                  {/* Main Registry Table */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                        Student Mock Performance Directory ({filteredMockData.length} Students)
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Click on any Day score pill to view that student's complete 10-Q response transcript
                      </span>
                    </div>

                    {filteredMockData.length > 0 ? (
                      <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid var(--surface-border)' }}>
                        <table style={{ width: '100%', minWidth: '880px', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                          <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--surface-border)', color: '#475569', fontWeight: 800 }}>
                              <th style={{ padding: '0.85rem 1rem' }}>Student Learner</th>
                              <th style={{ padding: '0.85rem 0.75rem' }}>Track</th>
                              <th style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>Day 1 (Intro)</th>
                              <th style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>Day 2 (Goals)</th>
                              <th style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>Day 3 (STAR)</th>
                              <th style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>Day 4 (Salary)</th>
                              <th style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>Day 5 (Final)</th>
                              <th style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>Avg Score &amp; Grade</th>
                              <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Evaluation Audit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredMockData.map(({ student: s, summary }) => {
                              return (
                                <tr key={s._id || s.id} style={{ borderBottom: '1px solid var(--surface-border)', transition: 'background 0.15s' }}>
                                  {/* Student Name */}
                                  <td style={{ padding: '0.9rem 1rem' }}>
                                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>
                                      {s.name}
                                    </div>
                                    <span style={{
                                      fontSize: '0.74rem',
                                      fontFamily: 'monospace',
                                      color: '#4f46e5',
                                      background: '#eef2ff',
                                      padding: '1px 6px',
                                      borderRadius: 4,
                                      fontWeight: 700
                                    }}>
                                      {s.accessCode}
                                    </span>
                                  </td>

                                  {/* Enrolled Track */}
                                  <td style={{ padding: '0.9rem 0.75rem', fontSize: '0.82rem', color: '#64748b', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={getMainCourseLabels(s.enrolledCourse)}>
                                    {getMainCourseLabels(s.enrolledCourse)}
                                  </td>

                                  {/* Days 1 to 5 Scores */}
                                  {[1, 2, 3, 4, 5].map(dayNum => {
                                    const rec = summary.dayMap[dayNum];
                                    return (
                                      <td key={dayNum} style={{ padding: '0.9rem 0.75rem', textAlign: 'center' }}>
                                        {rec ? (
                                          <button
                                            onClick={() => {
                                              setInspectingMockStudent(s);
                                              setInspectingMockDay(dayNum);
                                            }}
                                            style={{
                                              background: rec.totalScore >= 80 ? '#ecfdf5' : rec.totalScore >= 60 ? '#eff6ff' : '#fef2f2',
                                              border: `1px solid ${rec.totalScore >= 80 ? '#a7f3d0' : rec.totalScore >= 60 ? '#bfdbfe' : '#fecaca'}`,
                                              color: rec.totalScore >= 80 ? '#059669' : rec.totalScore >= 60 ? '#2563eb' : '#dc2626',
                                              padding: '3px 8px',
                                              borderRadius: '6px',
                                              fontSize: '0.76rem',
                                              fontWeight: 800,
                                              cursor: 'pointer',
                                              whiteSpace: 'nowrap'
                                            }}
                                            title="Click to view 10-question transcript & AI score"
                                          >
                                            {rec.totalScore}/100 • {rec.grade}
                                          </button>
                                        ) : (
                                          <span style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 600 }}>
                                            —
                                          </span>
                                        )}
                                      </td>
                                    );
                                  })}

                                  {/* Overall Average & Grade */}
                                  <td style={{ padding: '0.9rem 0.75rem', textAlign: 'center' }}>
                                    {summary.completedCount > 0 ? (
                                      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e1b4b' }}>
                                          {summary.averageScore}/100
                                        </span>
                                        <span style={{
                                          fontSize: '0.72rem',
                                          fontWeight: 800,
                                          color: summary.grade === 'S' || summary.grade === 'A' ? '#059669' : summary.grade === 'B' ? '#2563eb' : '#d97706',
                                          background: summary.grade === 'S' || summary.grade === 'A' ? '#ecfdf5' : '#f8fafc',
                                          padding: '1px 6px',
                                          borderRadius: 4
                                        }}>
                                          Grade {summary.grade} ({summary.completedCount}/5 Days)
                                        </span>
                                      </div>
                                    ) : (
                                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                        Not attempted
                                      </span>
                                    )}
                                  </td>

                                  {/* Action button */}
                                  <td style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>
                                    <button
                                      onClick={() => {
                                        setInspectingMockStudent(s);
                                        const firstAttemptDay = [1, 2, 3, 4, 5].find(d => summary.dayMap[d]) || 1;
                                        setInspectingMockDay(firstAttemptDay);
                                      }}
                                      style={{
                                        background: summary.completedCount > 0 ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : '#f1f5f9',
                                        color: summary.completedCount > 0 ? '#ffffff' : '#64748b',
                                        border: 'none',
                                        padding: '0.45rem 0.85rem',
                                        borderRadius: '8px',
                                        fontSize: '0.78rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                      }}
                                    >
                                      <Eye size={13} /> {summary.completedCount > 0 ? 'Inspect 10-Q Feedback' : 'Audit Profile'}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                        <Bot size={44} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 800, color: '#1e293b' }}>
                          No Student Mock Records Match Filters
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.85rem' }}>
                          Try clearing your search query or switching your Day/Grade filter.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </main>

      {/* 📝 GRADING / EVALUATION MODAL */}
      {gradingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '520px',
            padding: '2.25rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>
              Evaluate Assignment
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.4, fontFamily: 'system-ui' }}>
              Review submission for <strong>{gradingTask.studentName}</strong> ({gradingTask.moduleId} → {gradingTask.tabId})
            </p>

            <form onSubmit={handleGradeTaskSubmit}>
              {/* Submission details display */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block' }}>Submission URL</span>
                  {gradingTask.taskUrl ? (
                    <a href={gradingTask.taskUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {gradingTask.taskUrl} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.88rem', color: '#94a3b8', fontStyle: 'italic' }}>No URL provided</span>
                  )}
                </div>
                {gradingTask.taskText && (
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block' }}>Student Notes</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{gradingTask.taskText}</p>
                  </div>
                )}
              </div>

              {/* Status Select */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  Review Status
                </label>
                <select
                  value={gradingStatus}
                  onChange={(e) => setGradingStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    background: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="Approved">Approved / Completed</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Rejected">Rejected / Needs Redo</option>
                </select>
              </div>



              {/* Feedback Text */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  Evaluation Feedback
                </label>
                <textarea
                  placeholder="Enter comments, hints, or reviews for the student..."
                  rows={3}
                  value={gradingFeedback}
                  onChange={(e) => setGradingFeedback(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setGradingTask(null)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={gradingLoading}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {gradingLoading ? 'Saving...' : 'Submit Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📝 EDIT STUDENT COURSES MODAL */}
      {editingStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #cbd5e1',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              background: '#f8fafc',
              flexShrink: 0
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'system-ui' }}>
                  Edit Student Credentials &amp; Tracks
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  Update student name, access key ID, or assign/remove curriculum tracks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px'
                }}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCourses} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '1.25rem 1.75rem',
                overflowY: 'auto',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem', fontFamily: 'system-ui' }}>
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem', fontFamily: 'system-ui' }}>
                    Access Key (Student ID)
                  </label>
                  <input
                    type="text"
                    value={editingAccessCode}
                    onChange={(e) => setEditingAccessCode(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: '#d97706',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* 🧠 Logical Thinking Score Input */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px', margin: 0, fontFamily: 'system-ui' }}>
                    <Brain size={16} color="#4f46e5" />
                    Logical Thinking &amp; Reasoning Score
                  </label>
                  {editingLogicalScore !== '' && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: getLogicalGradeStyle(computeLogicalGrade(Number(editingLogicalScore))).bg,
                      color: getLogicalGradeStyle(computeLogicalGrade(Number(editingLogicalScore))).text,
                      border: `1px solid ${getLogicalGradeStyle(computeLogicalGrade(Number(editingLogicalScore))).border}`
                    }}>
                      Grade {computeLogicalGrade(Number(editingLogicalScore))}
                    </span>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px' }}>
                  <div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={editingLogicalScore}
                      onChange={(e) => setEditingLogicalScore(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        color: '#1e1b4b',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Optional evaluator feedback / reasoning notes..."
                      value={editingLogicalFeedback}
                      onChange={(e) => setEditingLogicalFeedback(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.82rem',
                        color: '#334155',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', margin: 0, fontFamily: 'system-ui' }}>
                      Select Course Tracks
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (expandedEditCats.length === COURSE_CATEGORIES.length) {
                          setExpandedEditCats([]);
                        } else {
                          setExpandedEditCats(COURSE_CATEGORIES.map(c => c.id));
                        }
                      }}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#4f46e5',
                        background: '#eef2ff',
                        border: '1px solid #c7d2fe',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      {expandedEditCats.length === COURSE_CATEGORIES.length ? 'Collapse All' : 'Expand All'}
                    </button>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: 700 }}>
                    {(editingCourses ? editingCourses.split(',').filter(Boolean).length : 0)} Tracks Selected
                  </span>
                </div>

                <div style={{
                  maxHeight: '320px',
                  overflowY: 'auto',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  background: '#f8fafc',
                  boxSizing: 'border-box'
                }}>
                  {COURSE_CATEGORIES.map(category => {
                    const currentList = editingCourses ? editingCourses.split(',').map(s => s.trim()).filter(Boolean) : [];
                    const catVals = category.subCourses.map(sc => sc.value);
                    const selectedCountInCat = catVals.filter(v => currentList.includes(v)).length;
                    const isAllInCatSelected = catVals.length > 0 && selectedCountInCat === catVals.length;
                    const isPartiallySelected = selectedCountInCat > 0 && !isAllInCatSelected;
                    const isExpanded = expandedEditCats.includes(category.id);

                    return (
                      <div
                        key={category.id}
                        style={{
                          background: '#ffffff',
                          border: `1px solid ${selectedCountInCat > 0 ? category.border : '#e2e8f0'}`,
                          borderRadius: '10px',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            background: selectedCountInCat > 0 ? category.bg : '#f1f5f9',
                            cursor: 'pointer',
                            userSelect: 'none',
                            borderBottom: isExpanded ? `1px solid ${selectedCountInCat > 0 ? category.border : '#e2e8f0'}` : 'none'
                          }}
                          onClick={() => toggleEditCatExpand(category.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={isAllInCatSelected}
                              ref={el => { if (el) el.indeterminate = isPartiallySelected; }}
                              onClick={(e) => e.stopPropagation()}
                              onChange={() => {
                                let newList;
                                if (isAllInCatSelected) {
                                  const remaining = currentList.filter(v => !catVals.includes(v));
                                  newList = remaining.length > 0 ? remaining : [catVals[0]];
                                } else {
                                  newList = Array.from(new Set([...currentList, ...catVals]));
                                }
                                setEditingCourses(newList.join(','));
                              }}
                              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: category.color, flexShrink: 0 }}
                            />
                            <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b' }}>
                              {category.title}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: selectedCountInCat > 0 ? category.color : '#64748b', flexShrink: 0 }}>
                              {selectedCountInCat}/{catVals.length}
                            </span>
                            <span style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
                              {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            </span>
                          </div>
                        </div>

                        {isExpanded && (
                          <div style={{
                            padding: '8px 10px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                            gap: '6px',
                            background: '#ffffff'
                          }}>
                            {category.subCourses.map(sc => {
                              const isSubChecked = currentList.includes(sc.value);
                              return (
                                <label
                                  key={sc.value}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    background: isSubChecked ? category.bg : '#f8fafc',
                                    border: `1px solid ${isSubChecked ? category.border : '#e2e8f0'}`,
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: isSubChecked ? 700 : 500,
                                    color: isSubChecked ? category.color : '#334155',
                                    minHeight: '36px',
                                    lineHeight: '1.25'
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSubChecked}
                                    onChange={() => {
                                      let newList;
                                      if (currentList.includes(sc.value)) {
                                        if (currentList.length === 1) return;
                                        newList = currentList.filter(c => c !== sc.value);
                                      } else {
                                        newList = [...currentList, sc.value];
                                      }
                                      setEditingCourses(newList.join(','));
                                    }}
                                    style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: category.color, flexShrink: 0 }}
                                  />
                                  <span style={{ wordBreak: 'break-word', flex: 1 }}>{sc.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 🛡️ 3 Validation Checkboxes in Edit Modal */}
              <div style={{
                marginBottom: '1.5rem',
                background: (editingValIdCard && editingValFeeInitiated && editingValInduction) ? '#f0fdf4' : '#fffbeb',
                border: `1.5px solid ${(editingValIdCard && editingValFeeInitiated && editingValInduction) ? '#10b981' : '#f59e0b'}`,
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: (editingValIdCard && editingValFeeInitiated && editingValInduction) ? '#065f46' : '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color={(editingValIdCard && editingValFeeInitiated && editingValInduction) ? '#10b981' : '#f59e0b'} />
                    <span>Admission Validations (3 Checklist Steps)</span>
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: (editingValIdCard && editingValFeeInitiated && editingValInduction) ? '#dcfce7' : '#fef3c7',
                    color: (editingValIdCard && editingValFeeInitiated && editingValInduction) ? '#15803d' : '#b45309'
                  }}>
                    {(editingValIdCard && editingValFeeInitiated && editingValInduction) ? 'APPROVED (3/3)' : 'PENDING'}
                  </span>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <input
                    type="checkbox"
                    checked={editingValIdCard}
                    onChange={(e) => setEditingValIdCard(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer' }}
                  />
                  <CreditCard size={15} color={editingValIdCard ? '#10b981' : '#64748b'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: editingValIdCard ? '#065f46' : '#334155' }}>
                    ID Card Issued
                  </span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <input
                    type="checkbox"
                    checked={editingValFeeInitiated}
                    onChange={(e) => setEditingValFeeInitiated(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer' }}
                  />
                  <Receipt size={15} color={editingValFeeInitiated ? '#10b981' : '#64748b'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: editingValFeeInitiated ? '#065f46' : '#334155' }}>
                    Fee Initiated
                  </span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <input
                    type="checkbox"
                    checked={editingValInduction}
                    onChange={(e) => setEditingValInduction(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer' }}
                  />
                  <BookOpen size={15} color={editingValInduction ? '#10b981' : '#64748b'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: editingValInduction ? '#065f46' : '#334155' }}>
                    Induction Session Completed
                  </span>
                </label>
              </div>

              {editingError && (
                <div style={{
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: 'rgba(239, 68, 68, 0.05)',
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  borderLeft: '3px solid #ef4444'
                }}>
                  ⚠️ {editingError}
                </div>
              )}
              </div>

              {/* Modal Footer - Always visible at bottom */}
              <div style={{
                padding: '1rem 1.75rem',
                borderTop: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexShrink: 0
              }}>
                <button
                  type="button"
                  onClick={() => {
                    const sId = editingStudent._id || editingStudent.id || editingStudent.accessCode;
                    setEditingStudent(null);
                    handleDeleteStudent(sId);
                  }}
                  style={{
                    padding: '0.65rem 1.1rem',
                    borderRadius: '10px',
                    border: '1px solid #fecaca',
                    background: '#fef2f2',
                    color: '#ef4444',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Permanently delete this student"
                >
                  <Trash2 size={15} /> Delete Student
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    style={{
                      padding: '0.65rem 1.25rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#475569',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editingLoading}
                    style={{
                      padding: '0.65rem 1.5rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {editingLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📊 DETAILED COURSE PROGRESS BREAKDOWN MODAL */}
      {viewingProgressStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '880px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: '#ffffff', fontWeight: 900, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {viewingProgressStudent.name ? viewingProgressStudent.name.substring(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, fontFamily: 'system-ui', color: '#ffffff' }}>
                    {viewingProgressStudent.name} — Course Progress Audit
                  </h3>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 700, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 4 }}>
                  Access Key: {viewingProgressStudent.accessCode}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setViewingProgressStudent(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - List of Courses */}
            <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Daily AI Mock Interview Marks Summary */}
              {(() => {
                const mocks = getStudentMockInterviews(viewingProgressStudent);
                const summary = calculateStudentMockSummary(mocks);
                return (
                  <div style={{
                    background: '#ffffff',
                    border: '1.5px solid #6366f1',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: '0 2px 10px rgba(99, 102, 241, 0.08)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>🎙️</span>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e1b4b' }}>
                            Daily AI Mock Interview Marks (HR Interview Mastery)
                          </h4>
                          <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                            10 Live Questions / Day • Evaluated by AI with STAR Scoring Rubric
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: summary.completedCount > 0 ? '#dcfce7' : '#f1f5f9',
                          color: summary.completedCount > 0 ? '#15803d' : '#64748b',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 800
                        }}>
                          {summary.completedCount} / 5 Days Completed
                        </span>
                        {summary.completedCount > 0 && (
                          <span style={{
                            background: '#4f46e5',
                            color: '#ffffff',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontSize: '0.78rem',
                            fontWeight: 800
                          }}>
                            Avg: {summary.averageScore}/100 • Grade {summary.grade}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 5 Days pills */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '0.85rem' }}>
                      {HR_MOCK_DAYS.map(d => {
                        const r = summary.dayMap[d.day];
                        return (
                          <div
                            key={d.day}
                            style={{
                              background: r ? '#f0fdf4' : '#f8fafc',
                              border: `1px solid ${r ? '#86efac' : '#e2e8f0'}`,
                              borderRadius: '10px',
                              padding: '8px',
                              textAlign: 'center'
                            }}
                          >
                            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569' }}>Day {d.day}</div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 900, color: r ? '#15803d' : '#94a3b8', margin: '2px 0' }}>
                              {r ? `${r.totalScore}/100` : '--'}
                            </div>
                            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: r ? '#16a34a' : '#94a3b8' }}>
                              {r ? `Grade ${r.grade}` : 'Pending'}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {summary.completedCount > 0 && (
                      <button
                        onClick={() => {
                          setInspectingMockStudent(viewingProgressStudent);
                          const firstDoneDay = HR_MOCK_DAYS.find(d => summary.dayMap[d.day])?.day || 1;
                          setInspectingMockDay(firstDoneDay);
                        }}
                        style={{
                          background: '#4f46e5',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={13} /> View Complete 10-Q Transcript &amp; Feedback →
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* 🧠 Logical Thinking & Analytical Reasoning Performance Card */}
              {(() => {
                const lt = getStudentLogicalThinkingScore(viewingProgressStudent);
                const badgeStyle = getLogicalGradeStyle(lt.grade);
                return (
                  <div style={{
                    background: '#ffffff',
                    border: '1.5px solid #818cf8',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    boxShadow: '0 2px 10px rgba(99, 102, 241, 0.08)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '10px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Brain size={20} />
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e1b4b' }}>
                            Logical Thinking &amp; Analytical Reasoning Benchmark
                          </h4>
                          <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                            Deductive Syllogisms • Number &amp; Pattern Series • Boundary Tests • Critical Fallacy Audits
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: badgeStyle.bg,
                          color: badgeStyle.text,
                          border: `1px solid ${badgeStyle.border}`,
                          padding: '3px 12px',
                          borderRadius: '999px',
                          fontSize: '0.82rem',
                          fontWeight: 800
                        }}>
                          Score: {lt.isEvaluated ? `${lt.score}/100` : 'Not Evaluated'} • Grade {lt.grade}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenQuickLogicalModal(viewingProgressStudent)}
                          style={{
                            background: '#4f46e5',
                            color: '#ffffff',
                            border: 'none',
                            padding: '5px 12px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          Update Score
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar & Status */}
                    <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <div style={{
                        width: `${lt.percentage || 0}%`,
                        height: '100%',
                        background: (lt.percentage || 0) >= 80 ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' :
                                    (lt.percentage || 0) >= 60 ? 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)' :
                                    'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '10px',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>

                    {lt.feedback && (
                      <div style={{ fontSize: '0.82rem', color: '#475569', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: '8px', marginBottom: '0.85rem' }}>
                        <strong>Instructor Feedback:</strong> {lt.feedback}
                      </div>
                    )}

                    {/* 4 Core Competence Pillars */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                      {[
                        { label: 'Pattern Recognition', desc: 'Number, Alphabet, Matrix' },
                        { label: 'Deductive Reasoning', desc: 'Syllogisms & Invariants' },
                        { label: 'Analytical Constraints', desc: 'Seating & Combinatorics' },
                        { label: 'Critical Thinking', desc: 'Fallacy Detection & Truth' }
                      ].map((pillar, i) => (
                        <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#334155' }}>{pillar.label}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>{pillar.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {(() => {
                const coursesList = calculateDetailedCourseProgress(viewingProgressStudent);
                if (coursesList.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                      <BookOpen size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>No enrolled course progress records found for this student.</p>
                    </div>
                  );
                }

                return coursesList.map(c => {
                  const courseColor = c.percentage === 100 ? '#10b981' : c.percentage > 50 ? '#3b82f6' : c.percentage > 0 ? '#d97706' : '#64748b';

                  return (
                    <div
                      key={c.courseKey}
                      style={{
                        background: '#f8fafc',
                        border: `1px solid ${c.percentage === 100 ? '#bbf7d0' : '#e2e8f0'}`,
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      {/* Course Header Bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '0.75rem' }}>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', fontFamily: 'system-ui' }}>
                            📚 {c.courseLabel}
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                            {c.modules.length} Modules · Completed <strong>{c.completedTopics}</strong> of <strong>{c.totalTopics}</strong> topics
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontSize: '0.88rem',
                            fontWeight: 800,
                            color: courseColor,
                            background: c.percentage === 100 ? '#d1fae5' : c.percentage > 50 ? '#eff6ff' : 'rgba(245, 158, 11, 0.1)',
                            border: `1px solid ${c.percentage === 100 ? '#86efac' : c.percentage > 50 ? '#bfdbfe' : '#fde68a'}`,
                            padding: '4px 12px',
                            borderRadius: '20px'
                          }}>
                            {c.percentage}% Completed
                          </span>
                        </div>
                      </div>

                      {/* Course Overall Progress Bar */}
                      <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                        <div style={{
                          width: `${c.percentage}%`,
                          height: '100%',
                          background: c.percentage === 100
                            ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                            : 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                          borderRadius: '10px',
                          transition: 'width 0.4s ease'
                        }} />
                      </div>

                      {/* Modules & Sub-topics Accordion List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {c.modules.map(mod => {
                          const modKey = `${c.courseKey}_${mod.id}`;
                          const isExpanded = expandedCourseModule[modKey] !== false; // default expanded

                          return (
                            <div
                              key={mod.id}
                              style={{
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                overflow: 'hidden'
                              }}
                            >
                              {/* Module Header Toggle */}
                              <div
                                onClick={() => setExpandedCourseModule(prev => ({ ...prev, [modKey]: !isExpanded }))}
                                style={{
                                  padding: '0.75rem 1rem',
                                  background: '#f1f5f9',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  justify: 'space-between',
                                  alignItems: 'center',
                                  userSelect: 'none'
                                }}
                              >
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                                  {mod.title}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{
                                    fontSize: '0.76rem',
                                    fontWeight: 800,
                                    color: mod.percentage === 100 ? '#16a34a' : '#475569',
                                    background: mod.percentage === 100 ? '#dcfce7' : '#ffffff',
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                  }}>
                                    {mod.completedCount}/{mod.itemsCount} Done ({mod.percentage}%)
                                  </span>
                                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {isExpanded ? '▲' : '▼'}
                                  </span>
                                </div>
                              </div>

                              {/* Topics List when expanded */}
                              {isExpanded && (
                                <div style={{ padding: '0.75rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
                                  {mod.items.map(item => (
                                    <div
                                      key={item.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justify: 'space-between',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        background: item.isCompleted ? '#f0fdf4' : '#fafafa',
                                        border: `1px solid ${item.isCompleted ? '#bbf7d0' : '#f1f5f9'}`,
                                        fontSize: '0.82rem'
                                      }}
                                    >
                                      <span style={{ color: item.isCompleted ? '#166534' : '#64748b', fontWeight: item.isCompleted ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {item.label}
                                      </span>
                                      {item.isCompleted ? (
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '1px 6px', borderRadius: 4, flexShrink: 0 }}>
                                          ✓ Done
                                        </span>
                                      ) : (
                                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, flexShrink: 0 }}>
                                          Pending
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setViewingProgressStudent(null)}
                style={{
                  padding: '0.65rem 1.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎙️ STUDENT MODAL: VIEW 10-QUESTION DETAILED AI MOCK REPORT */}
      {viewingMockReport && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    Day {viewingMockReport.day} Evaluation
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#c7d2fe' }}>
                    10 Live HR Questions
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
                  {viewingMockReport.topic || `Day ${viewingMockReport.day} AI Mock Interview`}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fef08a' }}>
                    {viewingMockReport.totalScore} / 100
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a7f3d0' }}>
                    Grade {viewingMockReport.grade}
                  </div>
                </div>
                <button
                  onClick={() => setViewingMockReport(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: 'none',
                    color: '#ffffff',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Rubric Breakdown Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '10px'
              }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b' }}>Clarity &amp; Conciseness</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#4f46e5', marginTop: 2 }}>{viewingMockReport.clarityScore || 0} / 25</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b' }}>Substance &amp; Relevance</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#059669', marginTop: 2 }}>{viewingMockReport.contentScore || 0} / 30</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b' }}>Confidence &amp; Delivery</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#d97706', marginTop: 2 }}>{viewingMockReport.confidenceScore || 0} / 25</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b' }}>STAR Structure &amp; Method</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#7c3aed', marginTop: 2 }}>{viewingMockReport.structureScore || 0} / 20</div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 800, color: '#166534' }}>
                    ✓ Key Strengths
                  </h5>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#14532d', lineHeight: 1.5 }}>
                    {(viewingMockReport.strengths || ['Thoughtful answers', 'Natural conversational flow']).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '14px', padding: '1rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 800, color: '#92400e' }}>
                    💡 Key Areas to Polish
                  </h5>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#78350f', lineHeight: 1.5 }}>
                    {(viewingMockReport.improvements || ['Add measurable project outcomes', 'Follow STAR framework strictly']).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 10 Questions Detailed Transcript */}
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
                  Complete 10-Question Transcript &amp; Marks
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(viewingMockReport.questions || []).map((q, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '8px' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b' }}>
                          Q{idx + 1}: {q.question || `Question #${idx + 1}`}
                        </span>
                        <span style={{
                          background: (q.score || 0) >= 8 ? '#ecfdf5' : (q.score || 0) >= 6 ? '#eff6ff' : '#fef2f2',
                          color: (q.score || 0) >= 8 ? '#059669' : (q.score || 0) >= 6 ? '#2563eb' : '#dc2626',
                          border: `1px solid ${(q.score || 0) >= 8 ? '#a7f3d0' : (q.score || 0) >= 6 ? '#bfdbfe' : '#fecaca'}`,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          flexShrink: 0
                        }}>
                          Score: {q.score || 0} / 10
                        </span>
                      </div>

                      {/* Student's answer */}
                      <div style={{
                        background: '#f8fafc',
                        borderLeft: '3px solid #6366f1',
                        padding: '8px 12px',
                        borderRadius: '0 8px 8px 0',
                        fontSize: '0.82rem',
                        color: '#334155',
                        marginBottom: '0.5rem',
                        lineHeight: 1.5,
                        fontStyle: 'italic'
                      }}>
                        "{q.studentAnswer || q.answer || 'No response recorded'}"
                      </div>

                      {/* AI Feedback */}
                      {q.feedback && (
                        <div style={{ fontSize: '0.78rem', color: '#059669', background: '#f0fdf4', padding: '6px 10px', borderRadius: '6px' }}>
                          💬 <strong>AI Coach:</strong> {q.feedback}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setViewingMockReport(null)}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎙️ STAFF & ADMIN MODAL: INSPECT STUDENT 10-QUESTION AI MOCK INTERVIEW EVALUATION */}
      {inspectingMockStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '880px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            {(() => {
              const studentMocks = getStudentMockInterviews(inspectingMockStudent);
              const summary = calculateStudentMockSummary(studentMocks);
              const currentDayRecord = summary.dayMap[inspectingMockDay];

              return (
                <>
                  <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid #e2e8f0',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          background: 'rgba(255,255,255,0.15)',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          textTransform: 'uppercase'
                        }}>
                          Staff / Admin Evaluation Audit
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                          Key: {inspectingMockStudent.accessCode}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
                        {inspectingMockStudent.name} — AI Mock Interview Marks
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: '#a5b4fc' }}>
                        Course: {getMainCourseLabels(inspectingMockStudent.enrolledCourse)} • Overall Avg: {summary.completedCount > 0 ? `${summary.averageScore}/100 (Grade ${summary.grade})` : 'No attempts'}
                      </span>
                    </div>

                    <button
                      onClick={() => setInspectingMockStudent(null)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: 'none',
                        color: '#ffffff',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Day Navigation Tabs */}
                  <div style={{
                    display: 'flex',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '0.5rem 1.5rem',
                    gap: '8px',
                    overflowX: 'auto'
                  }}>
                    {HR_MOCK_DAYS.map(dayCfg => {
                      const dayRec = summary.dayMap[dayCfg.day];
                      const isActive = inspectingMockDay === dayCfg.day;

                      return (
                        <button
                          key={dayCfg.day}
                          onClick={() => setInspectingMockDay(dayCfg.day)}
                          style={{
                            background: isActive ? '#ffffff' : 'transparent',
                            color: isActive ? '#4f46e5' : '#64748b',
                            border: `1px solid ${isActive ? '#6366f1' : 'transparent'}`,
                            borderRadius: '10px',
                            padding: '6px 12px',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <span>Day {dayCfg.day}</span>
                          <span style={{
                            background: dayRec ? '#10b981' : '#cbd5e1',
                            color: '#ffffff',
                            fontSize: '0.68rem',
                            padding: '1px 6px',
                            borderRadius: 4
                          }}>
                            {dayRec ? `${dayRec.totalScore}/100` : 'Pending'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Modal Body */}
                  <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {currentDayRecord ? (
                      <>
                        {/* Day Top Bar */}
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '16px',
                          padding: '1.25rem 1.5rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '1rem'
                        }}>
                          <div>
                            <span style={{
                              background: '#eef2ff',
                              color: '#4f46e5',
                              padding: '2px 8px',
                              borderRadius: 4,
                              fontSize: '0.74rem',
                              fontWeight: 800,
                              textTransform: 'uppercase'
                            }}>
                              Day {currentDayRecord.day} of 5
                            </span>
                            <h4 style={{ margin: '4px 0 2px 0', fontSize: '1.15rem', fontWeight: 900, color: '#1e1b4b' }}>
                              {currentDayRecord.topic || `Day ${currentDayRecord.day} AI Mock Interview`}
                            </h4>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                              Attempted: {new Date(currentDayRecord.attemptedAt || currentDayRecord.completedAt).toLocaleString()}
                            </span>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: currentDayRecord.totalScore >= 80 ? '#059669' : currentDayRecord.totalScore >= 60 ? '#2563eb' : '#dc2626' }}>
                              {currentDayRecord.totalScore} / 100
                            </div>
                            <span style={{
                              background: currentDayRecord.totalScore >= 80 ? '#ecfdf5' : '#eff6ff',
                              color: currentDayRecord.totalScore >= 80 ? '#059669' : '#2563eb',
                              padding: '2px 10px',
                              borderRadius: 999,
                              fontSize: '0.75rem',
                              fontWeight: 800
                            }}>
                              Grade {currentDayRecord.grade}
                            </span>
                          </div>
                        </div>

                        {/* 4 Rubric Metric Pillars */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                          gap: '10px'
                        }}>
                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Clarity &amp; Delivery</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4f46e5', marginTop: 2 }}>
                              {currentDayRecord.clarityScore || 0} / 25
                            </div>
                          </div>
                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Content Substance</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#059669', marginTop: 2 }}>
                              {currentDayRecord.contentScore || 0} / 30
                            </div>
                          </div>
                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>Confidence &amp; Tone</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#d97706', marginTop: 2 }}>
                              {currentDayRecord.confidenceScore || 0} / 25
                            </div>
                          </div>
                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>STAR Framework</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#7c3aed', marginTop: 2 }}>
                              {currentDayRecord.structureScore || 0} / 20
                            </div>
                          </div>
                        </div>

                        {/* Strengths & Improvements */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '10px 14px' }}>
                            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.84rem', fontWeight: 800, color: '#166534' }}>
                              ✓ Strengths Noted by AI
                            </h5>
                            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#14532d', lineHeight: 1.4 }}>
                              {(currentDayRecord.strengths || ['Good attempt', 'Natural phrasing']).map((s, idx) => (
                                <li key={idx}>{s}</li>
                              ))}
                            </ul>
                          </div>

                          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '10px 14px' }}>
                            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.84rem', fontWeight: 800, color: '#92400e' }}>
                              💡 Actionable Coaching Advice
                            </h5>
                            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#78350f', lineHeight: 1.4 }}>
                              {(currentDayRecord.improvements || ['Add measurable metrics', 'Use STAR method']).map((s, idx) => (
                                <li key={idx}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* All 10 Questions Audit Table */}
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.85rem 0' }}>
                            10 Live Questions Detailed Answers &amp; Marks
                          </h4>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {(currentDayRecord.questions || []).map((q, idx) => (
                              <div
                                key={idx}
                                style={{
                                  background: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '12px',
                                  padding: '0.9rem 1.1rem',
                                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem', gap: '8px' }}>
                                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                                    Q{idx + 1}: {q.question || `Question #${idx + 1}`}
                                  </span>
                                  <span style={{
                                    background: (q.score || 0) >= 8 ? '#ecfdf5' : (q.score || 0) >= 6 ? '#eff6ff' : '#fef2f2',
                                    color: (q.score || 0) >= 8 ? '#059669' : (q.score || 0) >= 6 ? '#2563eb' : '#dc2626',
                                    border: `1px solid ${(q.score || 0) >= 8 ? '#a7f3d0' : (q.score || 0) >= 6 ? '#bfdbfe' : '#fecaca'}`,
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    fontWeight: 800,
                                    flexShrink: 0
                                  }}>
                                    Score: {q.score || 0} / 10
                                  </span>
                                </div>

                                {/* Student Answer Transcript */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderLeft: '3px solid #6366f1',
                                  padding: '8px 12px',
                                  borderRadius: '0 8px 8px 0',
                                  fontSize: '0.8rem',
                                  color: '#334155',
                                  marginBottom: '0.4rem',
                                  lineHeight: 1.5,
                                  fontStyle: 'italic'
                                }}>
                                  "{q.studentAnswer || q.answer || 'No response recorded'}"
                                </div>

                                {/* AI Evaluator Feedback */}
                                {q.feedback && (
                                  <div style={{ fontSize: '0.76rem', color: '#059669', background: '#f0fdf4', padding: '5px 10px', borderRadius: '6px' }}>
                                    💬 <strong>AI Feedback:</strong> {q.feedback}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: '#64748b' }}>
                        <Bot size={48} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
                          Day {inspectingMockDay} Mock Round Not Attempted Yet
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.88rem' }}>
                          The student has not yet completed the 10 live questions for Day {inspectingMockDay} ({HR_MOCK_DAYS.find(d => d.day === inspectingMockDay)?.title}).
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div style={{ padding: '1rem 2rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setInspectingMockStudent(null)}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.75rem',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                      }}
                    >
                      Close Evaluation Audit
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* 🧠 QUICK LOGICAL THINKING SCORE MODAL */}
      {quickLogicalStudent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f8fafc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Brain size={20} color="#4f46e5" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Logical Thinking Score
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuickLogicalStudent(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveQuickLogicalScore} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Student Name</span>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  {quickLogicalStudent.name} ({quickLogicalStudent.accessCode})
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Score (0 to 100)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    placeholder="e.g. 85"
                    value={quickLogicalScore}
                    onChange={(e) => setQuickLogicalScore(e.target.value)}
                    style={{
                      width: '120px',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: '#1e1b4b'
                    }}
                  />
                  {quickLogicalScore !== '' && (
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      background: getLogicalGradeStyle(computeLogicalGrade(Number(quickLogicalScore))).bg,
                      color: getLogicalGradeStyle(computeLogicalGrade(Number(quickLogicalScore))).text,
                      border: `1px solid ${getLogicalGradeStyle(computeLogicalGrade(Number(quickLogicalScore))).border}`
                    }}>
                      Grade {computeLogicalGrade(Number(quickLogicalScore))}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Evaluator Feedback &amp; Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Strong deductive reasoning and series recognition..."
                  value={quickLogicalFeedback}
                  onChange={(e) => setQuickLogicalFeedback(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setQuickLogicalStudent(null)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quickLogicalLoading}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {quickLogicalLoading ? 'Saving...' : 'Save Score'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🛡️ STUDENT ADMISSION STATUS MODAL */}
      <StudentAdmissionStatusModal
        isOpen={isAdmissionStatusModalOpen}
        onClose={() => setIsAdmissionStatusModalOpen(false)}
        session={session}
        requestedCourseName={getCourseLabel(enrolledCourse)}
      />
    </div>
  );
}
