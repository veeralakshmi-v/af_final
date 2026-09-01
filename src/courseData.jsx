import React from 'react';
import {
  BookOpen, LayoutTemplate, Type, Box, Image as ImageIcon, FileText,
  Code, CheckCircle, LayoutGrid, Layers, MonitorPlay, MousePointerClick,
  Video, Edit3, Palette, Layout, Brush, FileCode2, Target, Type as TypeIcon,
  Wand2, FastForward, Move3d, Clapperboard, Smartphone, Database, Table, Columns, List, Terminal, ShieldAlert, PenTool, Settings, PieChart, Link, Activity, Store,
  Briefcase, Map, Zap, Brain, Bot, Cpu, GitBranch, Rocket, Eye, Sliders, Filter, Trophy, Shield, FileSpreadsheet, Music, RefreshCw, Sparkles, Hash, Globe, Wifi, AlertTriangle, AlertCircle, Award, Send, Home, Compass, User, Lock, ShoppingCart, Folder, Server, Trash2, Plus, LogIn, LogOut, UserPlus, Users, UserCheck, BarChart2, GitMerge, Radio, Key, Copy, CheckSquare
} from 'lucide-react';


export const htmlCourseData = [
  {
    id: 'module1',
    title: 'Day 1 - HTML Fundamentals',
    items: [
      { id: 'intro', label: 'HTML Introduction', icon: <BookOpen size={18} /> },
      { id: 'toc', label: 'Table of Content', icon: <FileText size={18} /> },
      { id: 'theory', label: 'What is HTML?', icon: <BookOpen size={18} /> },
      { id: 'structure', label: 'Document Structure', icon: <LayoutTemplate size={18} /> },
      { id: 'formatting', label: 'Formatting Tags', icon: <Type size={18} /> },
      { id: 'lists', label: 'HTML Lists', icon: <FileText size={18} /> },
      { id: 'linksmedia', label: 'Links & Media', icon: <ImageIcon size={18} /> },
      { id: 'semantic', label: 'Semantic HTML', icon: <Box size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <Box size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module2',
    title: 'Day 2 - HTML Advanced',
    items: [
      { id: 'tables', label: 'HTML Tables', icon: <LayoutGrid size={18} /> },
      { id: 'semantic', label: 'Semantic HTML5', icon: <Layers size={18} /> },
      { id: 'meta_iframes', label: 'Meta & Iframes', icon: <MonitorPlay size={18} /> },
      { id: 'media', label: 'Media Tags', icon: <Video size={18} /> },
      { id: 'forms', label: 'HTML Forms', icon: <Edit3 size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'html_project',
    title: 'HTML Final Project',
    items: [
      { id: 'topic1', label: 'Personal Portfolio', icon: <LayoutTemplate size={18} /> },
      { id: 'topic2', label: 'Restaurant Menu', icon: <FileText size={18} /> },
      { id: 'topic3', label: 'Event Registration', icon: <Edit3 size={18} /> },
      { id: 'topic4', label: 'Product Landing Page', icon: <MonitorPlay size={18} /> },
      { id: 'topic5', label: 'News Article Layout', icon: <BookOpen size={18} /> },
      { id: 'assignment', label: '📝 Capstone & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module3',
    title: 'Day 3 - Introduction to CSS',
    items: [
      { id: 'intro', label: 'Introduction to CSS', icon: <Palette size={18} /> },
      { id: 'types', label: 'Types of CSS', icon: <FileCode2 size={18} /> },
      { id: 'selectors', label: 'CSS Selectors', icon: <Target size={18} /> },
      { id: 'backgrounds', label: 'Background Properties', icon: <Layout size={18} /> },
      { id: 'text', label: 'Text Properties', icon: <FileText size={18} /> },
      { id: 'lists', label: 'List & Opacity', icon: <Brush size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module4',
    title: 'Day 4 - CSS Box Model',
    items: [
      { id: 'boxmodel', label: 'Introduction to Box Model', icon: <Box size={18} /> },
      { id: 'position', label: 'Position Property', icon: <Target size={18} /> },
      { id: 'zindex', label: 'Z-index Property', icon: <Layers size={18} /> },
      { id: 'float', label: 'Float Property', icon: <Layout size={18} /> },
      { id: 'overflow', label: 'Overflow Property', icon: <FileText size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module5',
    title: 'Day 5 - Flex Box',
    items: [
      { id: 'display_props', label: 'Display Properties', icon: <LayoutTemplate size={18} /> },
      { id: 'flex_intro', label: 'Introduction to Flex Box', icon: <Box size={18} /> },
      { id: 'flex_container', label: 'Flex Container Properties', icon: <LayoutGrid size={18} /> },
      { id: 'flex_items', label: 'Flex Item Properties', icon: <Layers size={18} /> },
      { id: 'flex_grow_shrink', label: 'Grow, Shrink & Basis', icon: <Layout size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module6',
    title: 'Day 6 - Modern Layouts',
    items: [
      { id: 'grid_intro', label: 'CSS Grid Intro', icon: <LayoutGrid size={18} /> },
      { id: 'grid_structure', label: 'Grid Structure', icon: <Box size={18} /> },
      { id: 'grid_spacing_align', label: 'Spacing & Alignment', icon: <LayoutTemplate size={18} /> },
      { id: 'grid_items', label: 'Grid Item Placement', icon: <Layers size={18} /> },
      { id: 'grid_auto_flow', label: 'Auto Flow & Dense', icon: <Sliders size={18} /> },
      { id: 'grid_responsive', label: 'Responsive Grid Areas', icon: <Columns size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> }
    ]
  },
  {
    id: 'module7',
    title: 'Day 7 - CSS Units & Pseudo',
    items: [
      { id: 'absolute_units', label: 'Absolute Units', icon: <Target size={18} /> },
      { id: 'relative_units', label: 'Relative Units', icon: <Layers size={18} /> },
      { id: 'pseudo_classes', label: 'Pseudo-classes', icon: <MousePointerClick size={18} /> },
      { id: 'pseudo_elements', label: 'Pseudo-elements', icon: <Wand2 size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module8',
    title: 'Day 8 - Animations & Media',
    items: [
      { id: 'effects_intro', label: 'Intro to CSS Effects', icon: <Sparkles size={18} /> },
      { id: 'transitions', label: 'CSS Transitions', icon: <FastForward size={18} /> },
      { id: 'transforms', label: '2D/3D Transforms', icon: <Move3d size={18} /> },
      { id: 'keyframes', label: 'Keyframe Animations', icon: <Clapperboard size={18} /> },
      { id: 'media_queries', label: 'Media Queries', icon: <Smartphone size={18} /> },
      { id: 'playground', label: 'Live Coding', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'bootstrap_day1',
    title: 'Day 9 - Bootstrap Basics',
    items: [
      { id: 'intro', label: 'Introduction to Bootstrap', icon: <BookOpen size={18} /> },
      { id: 'containers', label: 'Containers & Spacing', icon: <LayoutTemplate size={18} /> },
      { id: 'typography', label: 'Typography & Colors', icon: <Type size={18} /> },
      { id: 'utilities', label: 'Bootstrap Utilities', icon: <Sliders size={18} /> },
      { id: 'buttons_alerts', label: 'Buttons, Alerts & Badges', icon: <Layers size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'bootstrap_day2',
    title: 'Day 10 - Bootstrap Grid & Components',
    items: [
      { id: 'grid_system', label: 'Responsive Grid System', icon: <LayoutGrid size={18} /> },
      { id: 'navbar', label: 'Navigation Bar (Navbar)', icon: <Columns size={18} /> },
      { id: 'cards_tables', label: 'Cards & Tables', icon: <Table size={18} /> },
      { id: 'js_components', label: 'Modals & Carousels', icon: <Layers size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'project', label: 'Mini Project', icon: <MousePointerClick size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: '📝 Assignment & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'module9',
    title: 'Day 11 - HTML, CSS & Bootstrap Final Project',
    items: [
      { id: 'project_brief', label: 'Project Brief', icon: <Target size={18} /> },
      { id: 'project_demo', label: 'Live Demo', icon: <MonitorPlay size={18} /> },
      { id: 'assignment', label: '📝 Capstone & Staff Review', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'html_ai_module',
    title: '🤖 AI Power Tools for HTML',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_ui_gen', label: '🎨 AI UI Generation', icon: <Wand2 size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'css_ai_module',
    title: '🤖 AI Power Tools for CSS',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_ui_gen', label: '🎨 AI UI Generation', icon: <Wand2 size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'bootstrap_ai_module',
    title: '🤖 AI Power Tools for Bootstrap',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_ui_gen', label: '🎨 AI UI Generation', icon: <Wand2 size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> },
    ]
  }
];

export const sqlCourseData = [
  {
    id: 'sql_module1',
    title: 'Day 1 - AI-Powered Intro to Databases & SQL',
    items: [
      { id: 'data_db', label: 'Data & Databases', icon: <Database size={18} /> },
      { id: 'dbms_rdbms', label: 'DBMS vs RDBMS', icon: <Columns size={18} /> },
      { id: 'table_structure', label: 'Tables & Structure', icon: <Table size={18} /> },
      { id: 'install_sql', label: 'Install MySQL & Workbench', icon: <Terminal size={18} /> },
      { id: 'ai_workbench', label: 'AI in SQL Workbench', icon: <Cpu size={18} /> },
      { id: 'assignment', label: 'Day 1 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module2',
    title: 'Day 2 - AI-Assisted DB Creation & Table Design',
    items: [
      { id: 'db_commands', label: 'Database Commands', icon: <Database size={18} /> },
      { id: 'data_types', label: 'Data Types', icon: <TypeIcon size={18} /> },
      { id: 'assignment', label: 'Day 2 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module3',
    title: 'Day 3 - SQL Categories & DDL with AI',
    items: [
      { id: 'sql_categories', label: 'SQL Categories', icon: <List size={18} /> },
      { id: 'theory_ddl', label: 'Theory: DDL', icon: <BookOpen size={18} /> },
      { id: 'constraints', label: 'Constraints', icon: <ShieldAlert size={18} /> },
      { id: 'practical_tables', label: 'Practical: Create Tables', icon: <Table size={18} /> },
      { id: 'practical_ddl', label: 'Practical: Modify Tables', icon: <Table size={18} /> },
      { id: 'mini_project', label: 'Library Project', icon: <MousePointerClick size={18} /> },
    ]
  },
  {
    id: 'sql_module4',
    title: 'Day 4 - AI-Powered DML & DQL',
    items: [
      { id: 'dml_theory', label: 'DML Commands', icon: <Edit3 size={18} /> },
      { id: 'dql_theory', label: 'DQL (SELECT)', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 4 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module5',
    title: 'Day 5 - AI-Enhanced Filtering & Sorting',
    items: [
      { id: 'where_clause', label: 'WHERE & Operators', icon: <Code size={18} /> },
      { id: 'sorting', label: 'Sorting (ORDER BY)', icon: <List size={18} /> },
      { id: 'practical_filtering', label: 'Practical: Search', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 5 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module6',
    title: 'Day 6 - AI-Assisted SQL Functions',
    items: [
      { id: 'aggregate_functions', label: 'Aggregate Functions', icon: <Code size={18} /> },
      { id: 'grouping', label: 'GROUP BY & HAVING', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical: Reports', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 6 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module7',
    title: 'Day 7 - ER Model & Joins with AI',
    items: [
      { id: 'er_model', label: 'The ER Model', icon: <Code size={18} /> },
      { id: 'relationships', label: 'Relationships', icon: <List size={18} /> },
      { id: 'joins', label: 'SQL Joins', icon: <Table size={18} /> },
      { id: 'practical', label: 'Practical: Joins', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 7 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module8',
    title: 'Day 8 - AI-Powered Advanced SQL',
    items: [
      { id: 'subqueries', label: 'Subqueries', icon: <Code size={18} /> },
      { id: 'views', label: 'Views', icon: <List size={18} /> },
      { id: 'indexes', label: 'Indexes', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical: Advanced', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 8 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module9',
    title: 'Day 9 - AI-Assisted Professional SQL Concepts',
    items: [
      { id: 'dcl', label: 'DCL & Security', icon: <Code size={18} /> },
      { id: 'tcl', label: 'TCL & Transactions', icon: <List size={18} /> },
      { id: 'procedures', label: 'Stored Procedures', icon: <List size={18} /> },
      { id: 'triggers', label: 'Triggers', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 9 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_final_project',
    title: 'Day 10 - AI-Powered Final Project',
    items: [
      { id: 'overview', label: 'Project Overview', icon: <Code size={18} /> },
      { id: 'requirements', label: 'Requirements', icon: <List size={18} /> },
      { id: 'submission', label: 'Submission', icon: <Table size={18} /> },
    ]
  }
];

export const summerSqlCourseData = sqlCourseData.slice(0, 7);

export const daSqlCourseData = [
  {
    id: 'sql_module1',
    title: 'Day 1 - AI-Powered Intro to Databases & SQL',
    items: [
      { id: 'data_db', label: 'Data & Databases', icon: <Database size={18} /> },
      { id: 'dbms_rdbms', label: 'DBMS vs RDBMS', icon: <Columns size={18} /> },
      { id: 'table_structure', label: 'Tables & Structure', icon: <Table size={18} /> },
      { id: 'install_sql', label: 'Install MySQL & Workbench', icon: <Terminal size={18} /> },
      { id: 'ai_workbench', label: 'AI in SQL Workbench', icon: <Cpu size={18} /> },
      { id: 'assignment', label: 'Day 1 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module2',
    title: 'Day 2 - AI-Assisted DB Creation & Table Design',
    items: [
      { id: 'db_commands', label: 'Database Commands', icon: <Database size={18} /> },
      { id: 'data_types', label: 'Data Types', icon: <TypeIcon size={18} /> },
      { id: 'assignment', label: 'Day 2 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module3',
    title: 'Day 3 - SQL Categories & DDL with AI',
    items: [
      { id: 'sql_categories', label: 'SQL Categories', icon: <List size={18} /> },
      { id: 'theory_ddl', label: 'Theory: DDL', icon: <BookOpen size={18} /> },
      { id: 'constraints', label: 'Constraints', icon: <ShieldAlert size={18} /> },
      { id: 'practical_tables', label: 'Practical: Create Tables', icon: <Table size={18} /> },
      { id: 'practical_ddl', label: 'Practical: Modify Tables', icon: <Table size={18} /> },
      { id: 'mini_project', label: 'Library Project', icon: <MousePointerClick size={18} /> },
    ]
  },
  {
    id: 'sql_module4',
    title: 'Day 4 - AI-Powered DML & DQL',
    items: [
      { id: 'dml_theory', label: 'DML Commands', icon: <Edit3 size={18} /> },
      { id: 'dql_theory', label: 'DQL (SELECT)', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 4 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module5',
    title: 'Day 5 - AI-Enhanced Filtering & Sorting',
    items: [
      { id: 'where_clause', label: 'WHERE & Operators', icon: <Code size={18} /> },
      { id: 'sorting', label: 'Sorting (ORDER BY)', icon: <List size={18} /> },
      { id: 'practical_filtering', label: 'Practical: Search', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 5 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module6',
    title: 'Day 6 - AI-Assisted SQL Functions',
    items: [
      { id: 'aggregate_functions', label: 'Aggregate Functions', icon: <Code size={18} /> },
      { id: 'grouping', label: 'GROUP BY & HAVING', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical: Reports', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 6 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_module7',
    title: 'Day 7 - ER Model & Joins with AI',
    items: [
      { id: 'er_model', label: 'The ER Model', icon: <Code size={18} /> },
      { id: 'relationships', label: 'Relationships', icon: <List size={18} /> },
      { id: 'joins', label: 'SQL Joins', icon: <Table size={18} /> },
      { id: 'practical', label: 'Practical: Joins', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Day 7 Assignment', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'sql_da_day8',
    title: 'Day 8 - SQL for Data Analysis',
    items: [
      { id: 'intro', label: 'SQL for Data Analysis', icon: <BookOpen size={18} /> },
      { id: 'sales', label: 'Sales Analysis', icon: <BarChart2 size={18} /> },
      { id: 'customer', label: 'Customer Analysis', icon: <ShoppingCart size={18} /> },
      { id: 'employee', label: 'Employee Analysis', icon: <Users size={18} /> },
      { id: 'product', label: 'Product Analysis', icon: <Table size={18} /> },
      { id: 'revenue', label: 'Revenue Analysis', icon: <Zap size={18} /> },
      { id: 'monthly', label: 'Monthly Report Generation', icon: <FileText size={18} /> },
      { id: 'kpi', label: 'KPI Calculation', icon: <Target size={18} /> },
      { id: 'biz_questions', label: 'Business Questions SQL', icon: <Target size={18} /> },
      { id: 'assessment', label: 'Day 8 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'sql_da_final_project',
    title: 'Final Project - Retail Sales Analytics',
    items: [
      { id: 'overview', label: 'Project Overview', icon: <BookOpen size={18} /> },
      { id: 'import_db', label: 'Import SQL Database', icon: <Database size={18} /> },
      { id: 'queries', label: 'Write 40-50 SQL Queries', icon: <Terminal size={18} /> },
      { id: 'joins_groups', label: 'Joins, Group By & Aggregates', icon: <Table size={18} /> },
      { id: 'advanced_analytics', label: 'Window Functions & Ranking', icon: <Layers size={18} /> },
      { id: 'reports', label: 'Monthly Sales & Insights', icon: <BarChart2 size={18} /> },
      { id: 'export_bi', label: 'Export to Power BI & Excel', icon: <FileSpreadsheet size={18} /> }
    ]
  }
];

export const powerBiCourseData = [
  {
    id: 'powerbi_module1',
    title: 'Day 1 - Data Analytics & Analysis',
    items: [
      { id: 'intro', label: 'Introduction', icon: <Code size={18} /> },
      { id: 'analytics_vs_analysis', label: 'Analytics vs Analysis', icon: <List size={18} /> },
      { id: 'kpi_intro', label: 'What is a KPI?', icon: <Target size={18} /> },
      { id: 'data_types', label: 'Types of Data', icon: <Database size={18} /> },
      { id: 'process', label: 'Analysis Process', icon: <Settings size={18} /> },
      { id: 'methods', label: 'Methods & Stages', icon: <Table size={18} /> },
      { id: 'assignment', label: 'Mini Project & Assignment', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module2',
    title: 'Day 2 - Intro to PowerBI',
    items: [
      { id: 'what_why', label: 'What & Why PowerBI', icon: <Code size={18} /> },
      { id: 'architecture', label: 'Architecture', icon: <Layers size={18} /> },
      { id: 'install_interface', label: 'Install & Interface', icon: <Layout size={18} /> },
      { id: 'data_ops', label: 'Import, Types & Refresh', icon: <Database size={18} /> },
      { id: 'charts', label: 'Charts in PowerBI', icon: <PieChart size={18} /> },
      { id: 'assignment', label: 'Mini Project & Assignment', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module3',
    title: 'Day 3 - Power Query Editor',
    items: [
      { id: 'intro_pq', label: 'Intro & Interface', icon: <Box size={18} /> },
      { id: 'import_data', label: 'Importing Data', icon: <Database size={18} /> },
      { id: 'transformations', label: 'Transformations', icon: <Settings size={18} /> },
      { id: 'custom_columns', label: 'Custom & Conditional', icon: <Code size={18} /> },
      { id: 'combine_data', label: 'Merge & Append', icon: <Layers size={18} /> },
      { id: 'assignment', label: 'Mini Project & Assignment', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module4',
    title: 'Day 4 - Data Modeling',
    items: [
      { id: 'intro_norm', label: 'Intro & Normalization', icon: <Database size={18} /> },
      { id: 'relationships', label: 'Relationships & Cardinality', icon: <Link size={18} /> },
      { id: 'create_rel', label: 'Creating Relationships', icon: <Settings size={18} /> },
      { id: 'active_filter', label: 'Active Rel & Filtering', icon: <Activity size={18} /> },
      { id: 'schemas', label: 'Star & Snowflake Schema', icon: <Box size={18} /> },
      { id: 'assignment', label: 'Mini Project & Assignment', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module5',
    title: 'Day 5 - DAX Fundamentals',
    items: [
      { id: 'intro_syntax', label: 'Intro & Syntax', icon: <Terminal size={18} /> },
      { id: 'calc_vs_measures', label: 'Calculated Cols vs Measures', icon: <Columns size={18} /> },
      { id: 'aggregations', label: 'Basic Aggregations', icon: <PieChart size={18} /> },
      { id: 'logical_functions', label: 'Logical Functions', icon: <Settings size={18} /> },
      { id: 'assignment', label: 'DAX Basics Exercise', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module6',
    title: 'Day 6 - Intermediate DAX',
    items: [
      { id: 'calculate_magic', label: 'The CALCULATE Function', icon: <Wand2 size={18} /> },
      { id: 'time_intel', label: 'Basic Time Intelligence', icon: <FastForward size={18} /> },
      { id: 'related', label: 'Working Across Tables', icon: <Link size={18} /> },
      { id: 'variables', label: 'Using Variables (VAR)', icon: <Code size={18} /> },
      { id: 'assignment', label: 'Intermediate Exercise', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module7',
    title: 'Day 7 - Visuals, Formatting & Interactivity',
    items: [
      { id: 'intro', label: 'Day 7 Overview', icon: <Eye size={18} /> },
      { id: 'vis_selection', label: 'Best Visual Selection', icon: <PieChart size={18} /> },
      { id: 'drill_tooltips', label: 'Drill Down & Tooltips', icon: <Layers size={18} /> },
      { id: 'bookmarks_buttons', label: 'Bookmarks & Buttons', icon: <MousePointerClick size={18} /> },
      { id: 'slicers_sync', label: 'Slicers & Sync Slicers', icon: <Sliders size={18} /> },
      { id: 'themes_formatting', label: 'Formatting & Themes', icon: <Palette size={18} /> },
      { id: 'assignment_day7', label: 'Day 7 Mini Project', icon: <FileCode2 size={18} /> },
    ]
  },
  {
    id: 'powerbi_module8',
    title: 'Day 8 - AI, Python & Live Connections',
    items: [
      { id: 'intro_day8', label: 'Day 8 Overview', icon: <Eye size={18} /> },
      { id: 'ai_prompt_engineering', label: 'AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_data_cleaning', label: 'AI Data Cleaning', icon: <Settings size={18} /> },
      { id: 'ai_dashboard_creation', label: 'AI Dashboard Creation', icon: <Layout size={18} /> },
      { id: 'ai_data_visualization', label: 'AI Data Visualization', icon: <PieChart size={18} /> },
      { id: 'ai_report_generation', label: 'AI Report Generation', icon: <FileText size={18} /> },
      { id: 'ai_insight_generation', label: 'AI Insight Generation', icon: <Brain size={18} /> },
      { id: 'python_powerbi', label: 'Python in Power BI', icon: <Terminal size={18} /> },
      { id: 'live_connections', label: 'Live Connections & DirectQuery', icon: <Radio size={18} /> },
      { id: 'assignment_day8', label: 'Day 8 Mini Project', icon: <FileCode2 size={18} /> }
    ]
  },
  {
    id: 'powerbi_module9',
    title: 'Day 9 - AI Final Projects',
    items: [
      { id: 'ai_retail_capstone', label: 'Project 1: AI Tech Retail Live Demo', icon: <Activity size={18} /> },
      { id: 'project1', label: 'Project 2: AI E-Commerce Sales', icon: <PieChart size={18} /> },
      { id: 'project2', label: 'Project 3: AI HR Attrition', icon: <Target size={18} /> },
      { id: 'project3', label: 'Project 4: AI Bakery Forecasting', icon: <Store size={18} /> },
      { id: 'submission', label: 'AI Project Submission Rules', icon: <CheckCircle size={18} /> },
    ]
  }
];

export const agenticAiCourseData = [
  {
    id: 'agentic_ai_foundation',
    title: 'Module 1 - Agentic AI Foundation',
    items: [
      { id: 'day1', label: 'Day 1: Intro to Agentic AI', icon: <Bot size={18} /> },
      { id: 'day2', label: 'Day 2: Agentic AI Architecture', icon: <Cpu size={18} /> },
      { id: 'day3', label: 'Day 3: Prompt Engineering', icon: <Code size={18} /> },
      { id: 'day4', label: 'Day 4: Agent Reasoning & Loops', icon: <RefreshCw size={18} /> },
      { id: 'day5', label: 'Day 5: Building an Agent Flow', icon: <GitBranch size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module2',
    title: 'Module 2 - Prompting & Tool Calling',
    items: [
      { id: 'day6', label: 'Day 6: Agent Instructions & System Prompts', icon: <Code size={18} /> },
      { id: 'day7', label: 'Day 7: Function Calling & Tool Calling', icon: <Zap size={18} /> },
      { id: 'day8', label: 'Day 8: Connecting Agents with APIs', icon: <Layers size={18} /> },
      { id: 'day9', label: 'Day 9: Structured Outputs', icon: <Sliders size={18} /> },
      { id: 'day10', label: 'Day 10: Real-Time Agent Project', icon: <Trophy size={18} /> },
      { id: 'module2_project', label: 'Final Project: AI Agent Workspace', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module3',
    title: 'Module 3 - AI Automation with n8n',
    items: [
      { id: 'day11', label: 'Day 11: Intro to n8n & Workflows', icon: <GitBranch size={18} /> },
      { id: 'day12', label: 'Day 12: Triggers, Actions & APIs', icon: <Cpu size={18} /> },
      { id: 'day13', label: 'Day 13: AI Automation in n8n', icon: <Bot size={18} /> },
      { id: 'day14', label: 'Day 14: Business App Automation', icon: <Briefcase size={18} /> },
      { id: 'day15', label: 'Day 15: Capstone: n8n AI Admission System', icon: <Trophy size={18} /> },
      { id: 'module3_project', label: 'Final Project: Student Admission System', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module4',
    title: 'Module 4 - Flowise & Visual AI Agents',
    items: [
      { id: 'day16', label: 'Day 16: Intro to Flowise & Visual Agents', icon: <Eye size={18} /> },
      { id: 'day17', label: 'Day 17: RAG & Document QA in Flowise', icon: <Database size={18} /> },
      { id: 'day18', label: 'Day 18: Tool-Calling Agents in Flowise', icon: <Zap size={18} /> },
      { id: 'day19', label: 'Day 19: Deploying Flowise — Embed & API', icon: <Rocket size={18} /> },
      { id: 'day20', label: 'Day 20: Capstone: Enterprise AI Agent System', icon: <Trophy size={18} /> },
      { id: 'module4_project', label: 'Final Project: Master AI Agent Platform', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module5',
    title: 'Module 5 - LangChain & Agent Development',
    items: [
      { id: 'day21', label: 'Day 21: Intro to LangChain & Chains', icon: <Link size={18} /> },
      { id: 'day22', label: 'Day 22: LCEL & Advanced Prompt Templates', icon: <Sliders size={18} /> },
      { id: 'day23', label: 'Day 23: LangChain Memory & Chat History', icon: <Database size={18} /> },
      { id: 'day24', label: 'Day 24: LangChain Agents & Custom Tools', icon: <Bot size={18} /> },
      { id: 'day25', label: 'Day 25: Capstone: LangChain Orchestrator', icon: <Trophy size={18} /> },
      { id: 'module5_project', label: 'Final Project: LangChain Orchestrator', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module6',
    title: 'Module 6 - LangGraph & Stateful Agents',
    items: [
      { id: 'day26', label: 'Day 26: Intro to LangGraph & State', icon: <GitBranch size={18} /> },
      { id: 'day27', label: 'Day 27: Nodes, Edges & State Updates', icon: <Cpu size={18} /> },
      { id: 'day28', label: 'Day 28: Conditional Edges & Routing', icon: <GitBranch size={18} /> },
      { id: 'day29', label: 'Day 29: LangGraph Persistence & Memory', icon: <Database size={18} /> },
      { id: 'day30', label: 'Day 30: Capstone: LangGraph Agent', icon: <Trophy size={18} /> },
      { id: 'module6_project', label: 'Final Project: LangGraph Agent', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module7',
    title: 'Module 7 - CrewAI Multi-Agent Systems',
    items: [
      { id: 'day31', label: 'Day 31: Intro to CrewAI: Agents & Tasks', icon: <Bot size={18} /> },
      { id: 'day32', label: 'Day 32: CrewAI Tools & Custom Tools', icon: <Cpu size={18} /> },
      { id: 'day33', label: 'Day 33: Memory & Context Collaboration', icon: <Database size={18} /> },
      { id: 'day34', label: 'Day 34: Sequential vs Hierarchical Crews', icon: <GitBranch size={18} /> },
      { id: 'day35', label: 'Day 35: Capstone: Multi-Agent Crew', icon: <Trophy size={18} /> },
      { id: 'module7_project', label: 'Final Project: CrewAI System', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'agentic_ai_module8',
    title: 'Module 8 - Agno AI & Advanced Agent Development',
    items: [
      { id: 'day36', label: 'Day 36: Intro to Agno & Agno Agents', icon: <Bot size={18} /> },
      { id: 'day37', label: 'Day 37: Agno Tools & Custom Toolkits', icon: <Cpu size={18} /> },
      { id: 'day38', label: 'Day 38: Agno Knowledge Bases & Vector DBs', icon: <Database size={18} /> },
      { id: 'day39', label: 'Day 39: Agno Teams & Agent Collaboration', icon: <GitBranch size={18} /> },
      { id: 'day40', label: 'Day 40: Capstone: Production Agent with Agno', icon: <Trophy size={18} /> },
      { id: 'module8_project', label: 'Final Project: Agno AI System', icon: <Trophy size={18} /> }
    ]
  }
];

export const tallyCourseData = [
  {
    id: 'tally_prime_module1',
    title: 'Module 1 - Accounting & Tally Foundations',
    items: [
      { id: 'day1', label: 'Day 1: Accounting Foundations & Tally Prime Setup', icon: <BookOpen size={18} /> },
      { id: 'day2', label: 'Day 2: Pre-defined & Custom Groups in Tally Prime', icon: <Layers size={18} /> },
      { id: 'day3', label: 'Day 3: Ledgers Creation & Classification', icon: <FileText size={18} /> },
      { id: 'day4', label: 'Day 4: Voucher Types & Chart of Accounts', icon: <Sliders size={18} /> },
      { id: 'tally_project1', label: 'Mini Project: Small Trading Business', icon: <Trophy size={18} /> },
      { id: 'day5', label: 'Day 5: Complete Accounting Practice', icon: <CheckCircle size={18} /> }
    ]
  }
];

export const inductionCourseData = [
  {
    id: 'powerbi_demo',
    title: '1. AI Data Analytics',
    items: [
      { id: 'intro', label: 'Welcome to Data', icon: <Target size={18} /> },
      { id: 'what_is_it', label: 'What is Analytics?', icon: <Database size={18} /> },
      { id: 'vs', label: 'Analysis vs Analytics', icon: <Layers size={18} /> },
      { id: 'why_important', label: 'Why is it Important?', icon: <Zap size={18} /> },
      { id: 'topics', label: 'Course Topics', icon: <Code size={18} /> },
      { id: 'paths', label: 'Learning Paths', icon: <Map size={18} /> },
      { id: 'jobs', label: 'Jobs & Industries', icon: <Briefcase size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_demo',
    title: '2. Agentic AI Development',
    items: [
      { id: 'intro', label: 'Welcome to Agentic AI', icon: <Rocket size={18} /> },
      { id: 'what_is_it', label: 'What are AI Agents?', icon: <Bot size={18} /> },
      { id: 'vs', label: 'Agentic vs Automation', icon: <GitBranch size={18} /> },
      { id: 'why_important', label: 'Why AI Agents?', icon: <Zap size={18} /> },
      { id: 'topics', label: 'Technologies & Tools', icon: <Cpu size={18} /> },
      { id: 'syllabus', label: '40-Day Roadmap', icon: <Map size={18} /> },
    ]
  },
  {
    id: 'python_fullstack_demo',
    title: '3. AI Python Full Stack',
    items: [
      { id: 'intro', label: 'Welcome to Full Stack', icon: <Rocket size={18} /> },
      { id: 'what_is_it', label: 'What is Full Stack?', icon: <Layers size={18} /> },
      { id: 'vs', label: 'Traditional vs AI Coding', icon: <GitBranch size={18} /> },
      { id: 'why_important', label: 'Why Learn This Now?', icon: <Zap size={18} /> },
      { id: 'topics', label: 'Technologies & Tools', icon: <Cpu size={18} /> },
      { id: 'syllabus', label: '140-Day Roadmap (~5 Months)', icon: <Map size={18} /> },
      { id: 'jobs', label: 'Career Paths & Jobs', icon: <Briefcase size={18} /> },
    ]
  },
  {
    id: 'generative_ai_demo',
    title: '4. AI-Powered Generative AI',
    items: [
      { id: 'intro', label: 'Welcome to Gen AI', icon: <Rocket size={18} /> },
      { id: 'what_is_it', label: 'What is Gen AI?', icon: <Brain size={18} /> },
      { id: 'vs', label: 'Gen AI vs Agentic AI', icon: <GitBranch size={18} /> },
      { id: 'why_important', label: 'Why is it Important?', icon: <Zap size={18} /> },
      { id: 'topics', label: 'What We Cover', icon: <Layers size={18} /> },
      { id: 'tools', label: 'AI Tools Covered', icon: <Cpu size={18} /> },
      { id: 'careers', label: 'Jobs & Salaries', icon: <Briefcase size={18} /> },
    ]
  }
];

export const pythonFullStackCourseData = [
  {
    id: 'python_fullstack_demo',
    title: 'AI Python Full Stack',
    items: [
      { id: 'intro', label: 'Welcome to Full Stack', icon: <Rocket size={18} /> },
      { id: 'what_is_it', label: 'What is Full Stack?', icon: <Layers size={18} /> },
      { id: 'vs', label: 'Traditional vs AI Coding', icon: <GitBranch size={18} /> },
      { id: 'why_important', label: 'Why Learn This Now?', icon: <Zap size={18} /> },
      { id: 'topics', label: 'Technologies & Tools', icon: <Cpu size={18} /> },
      { id: 'syllabus', label: '140-Day Roadmap (~5 Months)', icon: <Map size={18} /> },
      { id: 'jobs', label: 'Career Paths & Jobs', icon: <Briefcase size={18} /> },
    ]
  }
];

export const pythonCourseData = [
  {
    id: 'python_day1',
    title: 'Day 1 - Introduction to Python',
    items: [
      { id: 'intro', label: 'What is Python?', icon: <BookOpen size={18} /> },
      { id: 'install', label: 'Installation & Setup', icon: <Cpu size={18} /> },
      { id: 'variables', label: 'Variables & Data Types', icon: <Database size={18} /> },
      { id: 'print_input', label: 'print() & input()', icon: <Terminal size={18} /> },
      { id: 'type_casting', label: 'Type Casting', icon: <Filter size={18} /> },
      { id: 'ai_superpowers', label: 'AI Python Superpowers', icon: <Zap size={18} /> },
      { id: 'playground', label: 'Live Python Playground', icon: <Code size={18} /> },
    ]
  },
  {
    id: 'python_day2',
    title: 'Day 2 - Operators',
    items: [
      { id: 'intro', label: 'What are Operators?', icon: <BookOpen size={18} /> },
      { id: 'arithmetic', label: 'Arithmetic Operators', icon: <Cpu size={18} /> },
      { id: 'relational', label: 'Relational Operators', icon: <Filter size={18} /> },
      { id: 'logical', label: 'Logical Operators', icon: <Zap size={18} /> },
      { id: 'assignment_ops', label: 'Assignment Operators', icon: <Database size={18} /> },
      { id: 'membership_identity', label: 'Membership & Identity', icon: <Terminal size={18} /> },
      { id: 'practice', label: '🌡️ Temperature Converter', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day3',
    title: 'Day 3 - Conditional Statements',
    items: [
      { id: 'intro', label: 'What are Conditionals?', icon: <BookOpen size={18} /> },
      { id: 'if_statement', label: 'if Statement', icon: <Cpu size={18} /> },
      { id: 'if_else', label: 'if / else Statement', icon: <Filter size={18} /> },
      { id: 'elif_statement', label: 'elif Statement', icon: <Zap size={18} /> },
      { id: 'elif_ladder', label: 'elif Ladder', icon: <Database size={18} /> },
      { id: 'nested_if', label: 'Nested if', icon: <Terminal size={18} /> },
      { id: 'practice', label: '🎓 Student Grade System', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day4',
    title: 'Day 4 - Loops',
    items: [
      { id: 'intro', label: 'What is a Loop?', icon: <BookOpen size={18} /> },
      { id: 'for_loop', label: 'for loop', icon: <Cpu size={18} /> },
      { id: 'while_loop', label: 'while loop', icon: <Filter size={18} /> },
      { id: 'nested_loops', label: 'Nested Loops', icon: <Terminal size={18} /> },
      { id: 'loop_control', label: 'Loop Control', icon: <Zap size={18} /> },
      { id: 'pattern_printing', label: 'Pattern Printing', icon: <Database size={18} /> },
      { id: 'practice', label: '🎲 Number Guessing Game', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_games',
    title: 'Text-Based Game Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'rock_paper_scissor', label: '✊ Rock Paper Scissors', icon: <Code size={18} /> },
      { id: 'number_guessing', label: '🎯 Number Guessing', icon: <Code size={18} /> },
      { id: 'memory_game', label: 'Memory Game', icon: <Code size={18} /> },
      { id: 'reaction_time', label: '⚡ Reaction Time Test', icon: <Code size={18} /> },
      { id: 'police_thief', label: '👮 Police & Thief', icon: <Code size={18} /> },
    ]
  },
  {
    id: 'python_day5',
    title: 'Day 5 - Data Structures',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'list_tab', label: 'Lists', icon: <Cpu size={18} /> },
      { id: 'tuple_tab', label: 'Tuples', icon: <Filter size={18} /> },
      { id: 'set_tab', label: 'Sets', icon: <Terminal size={18} /> },
      { id: 'dict_tab', label: 'Dictionaries', icon: <Zap size={18} /> },
      { id: 'practice', label: '📞 Phonebook App', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day6',
    title: 'Day 6 - Functions',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'builtin', label: 'Built-in Functions', icon: <Cpu size={18} /> },
      { id: 'user_defined', label: 'User-Defined Functions', icon: <Filter size={18} /> },
      { id: 'lambda_tab', label: 'Lambda Functions', icon: <Terminal size={18} /> },
      { id: 'recursion', label: 'Recursive Functions', icon: <Zap size={18} /> },
      { id: 'args_kwargs', label: '*args & **kwargs', icon: <Database size={18} /> },
      { id: 'practice', label: '💼 Expense Tracker', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day7',
    title: 'Day 7 - String & RegEx',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'manipulation', label: 'String Slicing & Methods', icon: <Cpu size={18} /> },
      { id: 'regex_basics', label: 'RegEx Patterns', icon: <Filter size={18} /> },
      { id: 'regex_functions', label: 're Module Functions', icon: <Terminal size={18} /> },
      { id: 'practice', label: '🤖 Chatbot Application', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_apps',
    title: 'Application Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'password_gen', label: '🔑 Password Generator', icon: <Code size={18} /> },
      { id: 'quiz_app', label: 'Quiz App', icon: <Code size={18} /> },
      { id: 'url_shortener', label: '🔗 URL Shortener', icon: <Code size={18} /> },
      { id: 'chat_app', label: '💬 Chat Application', icon: <Code size={18} /> },
      { id: 'countdown_timer', label: '⏱️ Countdown Timer', icon: <Code size={18} /> },
    ]
  },
  {
    id: 'python_day8',
    title: 'Day 8 - Comprehensive File & Exception Handling',
    items: [
      { id: 'intro', label: 'Overview & Storage', icon: <BookOpen size={18} /> },
      { id: 'file_modes', label: 'Opening Modes & Encoding', icon: <Cpu size={18} /> },
      { id: 'file_reading', label: 'Reading Files & Iteration', icon: <FileText size={18} /> },
      { id: 'file_writing', label: 'Writing, Appending & Flush', icon: <Terminal size={18} /> },
      { id: 'file_copying', label: 'Copying Files (File to File)', icon: <Copy size={18} /> },
      { id: 'context_managers', label: 'Context Managers (with)', icon: <Sliders size={18} /> },
      { id: 'structured_data', label: 'JSON, CSV & Pickle', icon: <Database size={18} /> },
      { id: 'exception_handling', label: 'Exception Handling Safety', icon: <ShieldAlert size={18} /> },
      { id: 'practice', label: '💾 Log & File Capstone', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (15 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day9',
    title: 'Day 9 - Modules & APIs',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'modules_basics', label: 'Module Basics', icon: <Layers size={18} /> },
      { id: 'stdlib', label: 'Standard Library', icon: <Cpu size={18} /> },
      { id: 'custom_modules', label: 'Custom Modules', icon: <Code size={18} /> },
      { id: 'db_connection', label: 'Database (SQL) Connection', icon: <Database size={18} /> },
      { id: 'what_is_api', label: 'What is an API?', icon: <Link size={18} /> },
      { id: 'http_methods', label: 'HTTP Methods', icon: <Terminal size={18} /> },
      { id: 'api_steps', label: 'API Connection Steps', icon: <Sliders size={18} /> },
      { id: 'api_practice', label: 'Practice API Calls', icon: <Zap size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day10',
    title: 'Day 10 - Intro to OOPs',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'class_objects', label: 'Classes & Objects', icon: <Cpu size={18} /> },
      { id: 'self_init', label: 'self & __init__', icon: <Terminal size={18} /> },
      { id: 'constructor_destructor', label: 'Constructors & Destructors', icon: <Filter size={18} /> },
      { id: 'capstone', label: '📚 Library Management', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day11',
    title: 'Day 11 - Inheritance',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'single', label: 'Single Inheritance', icon: <Terminal size={18} /> },
      { id: 'multiple', label: 'Multiple Inheritance', icon: <Link size={18} /> },
      { id: 'multilevel', label: 'Multilevel Inheritance', icon: <Sliders size={18} /> },
      { id: 'hierarchical', label: 'Hierarchical Inheritance', icon: <Filter size={18} /> },
      { id: 'hybrid', label: 'Hybrid Inheritance', icon: <Cpu size={18} /> },
      { id: 'overriding', label: 'Method Overriding', icon: <Zap size={18} /> },
      { id: 'capstone', label: '📚 Library Capstone', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day12',
    title: 'Day 12 - Encapsulation',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'specifiers', label: 'Access Specifiers', icon: <ShieldAlert size={18} /> },
      { id: 'mangling', label: 'Private & Mangling', icon: <Cpu size={18} /> },
      { id: 'getters_setters', label: 'Getters & Setters', icon: <Sliders size={18} /> },
      { id: 'capstone', label: '📚 Secure Library', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day13',
    title: 'Day 13 - Abstraction & Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'abstraction', label: 'Data Abstraction', icon: <Filter size={18} /> },
      { id: 'polymorphism', label: 'Polymorphism', icon: <Zap size={18} /> },
      { id: 'capstone', label: '🚙 Vehicle Capstone', icon: <Code size={18} /> },
      { id: 'project1', label: '💳 Payment Project', icon: <Sliders size={18} /> },
      { id: 'project2', label: '🏠 Smart Home Project', icon: <Cpu size={18} /> },
      { id: 'project3', label: '🏫 School DB Project', icon: <Link size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_final_projects',
    title: 'Final Demo Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'project1', label: '🤖 AI Chat Assistant', icon: <Cpu size={18} /> },
      { id: 'project2', label: '🗄️ Database Manager', icon: <Database size={18} /> },
      { id: 'project3', label: '📊 API Data Dashboard', icon: <Sliders size={18} /> },
      { id: 'tasks', label: '📝 3 Final Project Tasks', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_ai_module',
    title: '🤖 AI Power Tools for Python',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> },
    ]
  }
];

export const pythonDaCourseData = pythonCourseData.slice(0, 10);


export const generativeAiCourseData = [
  {
    id: 'genai_module1',
    title: 'Module 1 - AI Foundations',
    items: [
      { id: 'day1', label: 'Day 1: Intro to Gen AI', icon: <BookOpen size={18} /> },
      { id: 'day2', label: 'Day 2: History & Transformers', icon: <Map size={18} /> },
      { id: 'day3', label: 'Day 3: LLMs, Tokens & Context', icon: <Layers size={18} /> },
      { id: 'day4', label: 'Day 4: Popular AI Models', icon: <Zap size={18} /> },
      { id: 'day5', label: 'Day 5: AI Ethics & Best Practices', icon: <Shield size={18} /> },
      { id: 'mini_project', label: 'Mini Project: AI Prompt Library', icon: <Sliders size={18} /> },
    ]
  },
  {
    id: 'genai_module2',
    title: 'Module 2 - Prompt Engineering',
    items: [
      { id: 'day6', label: 'Day 6: Prompt Engineering', icon: <Code size={18} /> },
      { id: 'day7', label: 'Day 7: Advanced Prompting', icon: <Zap size={18} /> },
      { id: 'day8', label: 'Day 8: Reasoning & Grounding', icon: <Layers size={18} /> },
      { id: 'day9', label: 'Day 9: Structured Outputs', icon: <Sliders size={18} /> },
      { id: 'day10', label: 'Day 10: Reusable Templates', icon: <LayoutTemplate size={18} /> },
      { id: 'module2_project', label: 'Final Project: AI Agent Workspace', icon: <Trophy size={18} /> }
    ]
  },
  {
    id: 'genai_module3',
    title: 'Module 3 - AI Productivity & Creation',
    items: [
      { id: 'day11', label: 'Day 11: Writing & Document Editing', icon: <FileText size={18} /> },
      { id: 'day12', label: 'Day 12: Careers, Resumes & Socials', icon: <Briefcase size={18} /> },
      { id: 'day13', label: 'Day 13: Spreadsheets & Research', icon: <FileSpreadsheet size={18} /> },
      { id: 'day14', label: 'Day 14: Slide Decks & Presentations', icon: <MonitorPlay size={18} /> },
      { id: 'day15', label: 'Day 15: Video Scripts & Podcasts', icon: <Music size={18} /> }
    ]
  },
  {
    id: 'genai_module4',
    title: 'Module 4 - AI APIs & Knowledge Retrieval',
    items: [
      { id: 'day16', label: 'Day 16: Intro to AI APIs & Keys', icon: <Shield size={18} /> },
      { id: 'day17', label: 'Day 17: RAG & Knowledge Retrieval', icon: <Database size={18} /> },
      { id: 'day18', label: 'Day 18: RAG Implementation & SDKs', icon: <Terminal size={18} /> },
      { id: 'day19', label: 'Day 19: Capstone Projects Chooser', icon: <Wand2 size={18} /> },
      { id: 'day20', label: 'Day 20: Submission & Graduation', icon: <Trophy size={18} /> }
    ]
  }
];



export const reactCourseData = [
  {
    id: 'react_js_essentials',
    title: '⚡ JavaScript Essentials for React',
    items: [
      { id: 'intro_essentials', label: 'Overview & Why JS First', icon: <BookOpen size={18} /> },
      { id: 'var_let_const', label: 'var, let & const', icon: <Hash size={18} /> },
      { id: 'arrow_functions', label: 'Arrow Functions', icon: <Zap size={18} /> },
      { id: 'destructuring', label: 'Destructuring', icon: <Box size={18} /> },
      { id: 'spread_rest', label: 'Spread & Rest Operator', icon: <Code size={18} /> },
      { id: 'template_literals', label: 'Template Literals', icon: <Terminal size={18} /> },
      { id: 'array_methods', label: 'Array Methods (map/filter/reduce)', icon: <Filter size={18} /> },
      { id: 'short_circuit', label: 'Short-circuit & Ternary', icon: <GitBranch size={18} /> },
      { id: 'modules_import', label: 'Modules: import & export', icon: <Layers size={18} /> },
      { id: 'js_quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'js_assignment', label: 'Assignment', icon: <FileText size={18} /> },
    ]
  },
  {
    id: 'react_module1',
    title: 'Day 1 - Introduction to React',
    items: [
      { id: 'intro_react', label: 'Introduction to React', icon: <BookOpen size={18} /> },
      { id: 'react_vs_traditional', label: 'React vs Traditional JS', icon: <GitBranch size={18} /> },
      { id: 'react_jsx', label: 'React JSX Syntax', icon: <Code size={18} /> },
      { id: 'react_components', label: 'Component Architecture', icon: <Layers size={18} /> },
      { id: 'react_vdom', label: 'Virtual DOM Concept', icon: <Database size={18} /> },
      { id: 'react_features', label: 'Key Features of React', icon: <Sparkles size={18} /> },
      { id: 'react_lifecycle', label: 'React Component Life Cycle', icon: <RefreshCw size={18} /> },
      { id: 'react_setup', label: 'Setting up Environment', icon: <Settings size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module2',
    title: 'Day 2 - Components in React',
    items: [
      { id: 'intro_components', label: 'Introduction to Components', icon: <BookOpen size={18} /> },
      { id: 'functional_components', label: 'Functional Components', icon: <Code size={18} /> },
      { id: 'nesting_reusability', label: 'Nesting & Reusability', icon: <Layers size={18} /> },
      { id: 'naming_rules', label: 'Component Naming Rules', icon: <Terminal size={18} /> },
      { id: 'fragments', label: 'Fragments', icon: <Database size={18} /> },
      { id: 'mini_project', label: 'Mini Project: Food Agenda', icon: <Sparkles size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module3',
    title: 'Day 3 - Props in React',
    items: [
      { id: 'intro_props', label: 'Introduction to Props', icon: <BookOpen size={18} /> },
      { id: 'passing_props', label: 'Passing Props', icon: <Code size={18} /> },
      { id: 'props_destructuring', label: 'Props Destructuring', icon: <Layers size={18} /> },
      { id: 'default_props', label: 'Default Props', icon: <Database size={18} /> },
      { id: 'props_drilling', label: 'Props Drilling', icon: <GitBranch size={18} /> },
      { id: 'immutable_props', label: 'Immutable Props', icon: <Shield size={18} /> },
      { id: 'props_vs_state', label: 'Props vs State', icon: <Sparkles size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module4',
    title: 'Day 4 - State & useState',
    items: [
      { id: 'intro_react', label: 'Introduction to State', icon: <BookOpen size={18} /> },
      { id: 'useState_hook', label: 'useState Hook', icon: <Code size={18} /> },
      { id: 'multiple_states', label: 'Multiple States', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'Object & Array State', icon: <Database size={18} /> },
      { id: 'nested_state', label: 'Updating Nested State', icon: <Sliders size={18} /> },
      { id: 'state_lifting', label: 'State Lifting', icon: <GitBranch size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module5',
    title: 'Day 5 - Events & Forms',
    items: [
      { id: 'intro_react', label: 'Event Handling', icon: <BookOpen size={18} /> },
      { id: 'useState_hook', label: 'Synthetic Events', icon: <Code size={18} /> },
      { id: 'multiple_states', label: 'Controlled Components', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'Handling Multiple Inputs', icon: <Database size={18} /> },
      { id: 'nested_state', label: 'Form Submission & Reset', icon: <Sliders size={18} /> },
      { id: 'state_lifting', label: 'Form Validation', icon: <GitBranch size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module6',
    title: 'Day 6 - Conditional Rendering',
    items: [
      { id: 'intro_react', label: 'if / else rendering', icon: <BookOpen size={18} /> },
      { id: 'useState_hook', label: 'Ternary operator', icon: <Code size={18} /> },
      { id: 'multiple_states', label: 'Conditional component', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'Logical AND (&&)', icon: <Database size={18} /> },
      { id: 'nested_state', label: 'Loading & error UI', icon: <Sliders size={18} /> },
      { id: 'state_lifting', label: 'Empty state UI', icon: <GitBranch size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module7',
    title: 'Day 7 - CRUD Operations',
    items: [
      { id: 'intro_react', label: 'Rendering Lists', icon: <BookOpen size={18} /> },
      { id: 'useState_hook', label: 'Add & Delete Operations', icon: <Code size={18} /> },
      { id: 'multiple_states', label: 'Edit Item Operations', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'Search, Filter & Sorting', icon: <Database size={18} /> },
      { id: 'nested_state', label: 'React To-Do CRUD App', icon: <Sliders size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module8',
    title: 'Day 8 - Styling in React',
    items: [
      { id: 'intro_react', label: 'Inline Styling', icon: <BookOpen size={18} /> },
      { id: 'useState_hook', label: 'CSS Files & Modules', icon: <Code size={18} /> },
      { id: 'multiple_states', label: 'Styled Components', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'Tailwind CSS Setup', icon: <Database size={18} /> },
      { id: 'nested_state', label: 'Tailwind Student Dashboard', icon: <Sliders size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module9',
    title: 'Day 9 - useEffect Hook',
    items: [
      { id: 'intro_react', label: 'What is useEffect?', icon: <BookOpen size={18} /> },
      { id: 'useState_hook', label: 'No Dependency Array', icon: <Code size={18} /> },
      { id: 'multiple_states', label: 'Empty Array []', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'Specific Dependencies', icon: <Database size={18} /> },
      { id: 'nested_state', label: 'Cleanup Function', icon: <Sliders size={18} /> },
      { id: 'state_lifting', label: 'Fetching Data (API)', icon: <GitBranch size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module10',
    title: 'Day 10 - API Integration',
    items: [
      { id: 'intro_react', label: 'REST API & JSON', icon: <Globe size={18} /> },
      { id: 'useState_hook', label: 'fetch() vs axios', icon: <Wifi size={18} /> },
      { id: 'multiple_states', label: 'GET, POST, PUT, DELETE', icon: <Activity size={18} /> },
      { id: 'object_state', label: 'Loading & Error Handling', icon: <AlertTriangle size={18} /> },
      { id: 'nested_state', label: 'Pagination Basics', icon: <List size={18} /> },
      { id: 'state_lifting', label: 'Capstone: Student API UI', icon: <Database size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module11',
    title: 'Day 11 - React Router',
    items: [
      { id: 'intro_react', label: 'Why Client Routing?', icon: <Compass size={18} /> },
      { id: 'useState_hook', label: 'Link vs NavLink', icon: <Link size={18} /> },
      { id: 'multiple_states', label: 'Dynamic params (useParams)', icon: <Layers size={18} /> },
      { id: 'object_state', label: 'useNavigate Redirects', icon: <Compass size={18} /> },
      { id: 'nested_state', label: 'Protected Routes & 404', icon: <Lock size={18} /> },
      { id: 'state_lifting', label: 'Capstone: Multi-page App', icon: <Home size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module12',
    title: 'Day 12 - Advanced Hooks',
    items: [
      { id: 'intro_react', label: 'useRef Hook', icon: <Layers size={18} /> },
      { id: 'useState_hook', label: 'useMemo Cache', icon: <Cpu size={18} /> },
      { id: 'multiple_states', label: 'useCallback Actions', icon: <Activity size={18} /> },
      { id: 'object_state', label: 'Custom Hooks', icon: <Sparkles size={18} /> },
      { id: 'nested_state', label: 'Hook Cheat Sheet', icon: <FileText size={18} /> },
      { id: 'state_lifting', label: 'Capstone: Form Focus & List', icon: <Sliders size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module13',
    title: 'Day 13 - State Management',
    items: [
      { id: 'intro_react', label: 'State Lifting Sibling Sync', icon: <Sliders size={18} /> },
      { id: 'useState_hook', label: 'Context API (useContext)', icon: <Layout size={18} /> },
      { id: 'multiple_states', label: 'Global State & Redux', icon: <Database size={18} /> },
      { id: 'object_state', label: 'Capstone: Theme Switcher', icon: <Palette size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module14',
    title: 'Day 14 - Capstone Projects',
    items: [
      { id: 'intro_react', label: 'Project Folder structure', icon: <Folder size={18} /> },
      { id: 'useState_hook', label: 'LMS Capstone Projects', icon: <Layers size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_module15',
    title: 'Day 15 - Completion & Deployment',
    items: [
      { id: 'intro_react', label: 'Build & Production config', icon: <Globe size={18} /> },
      { id: 'useState_hook', label: 'Hosting Providers', icon: <Server size={18} /> },
      { id: 'multiple_states', label: 'Capstone: Cloud Deploy', icon: <Rocket size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Course Feedback Survey', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'react_ai_module',
    title: '🤖 AI Power Tools for React',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_ui_gen', label: '🎨 AI UI Generation', icon: <Wand2 size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> }
    ]
  }
];

export const gitCourseData = [
  {
    id: 'git_module1',
    title: 'Day 1 - Git Basics',
    items: [
      { id: 'intro_git', label: 'Version Control & Basics', icon: <BookOpen size={18} /> },
      { id: 'git_install_config', label: 'Git Installation & Config', icon: <Settings size={18} /> },
      { id: 'git_commands', label: 'Git Commands (add/commit)', icon: <Terminal size={18} /> },
      { id: 'git_time_travel', label: 'Git Log & Time Travel', icon: <GitBranch size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'git_module2',
    title: 'Day 2 - GitHub & Remotes',
    items: [
      { id: 'intro_github', label: 'GitHub Repositories', icon: <Globe size={18} /> },
      { id: 'git_remotes', label: 'Git Remote (Push & Pull)', icon: <Server size={18} /> },
      { id: 'git_branching', label: 'Branching & Merging', icon: <GitBranch size={18} /> },
      { id: 'github_pages', label: 'Live Sites (GitHub Pages)', icon: <Rocket size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'git_ai_module',
    title: '🤖 AI Power Tools for Git',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> }
    ]
  }
];

export const jsonCourseData = [
  {
    id: 'json_module1',
    title: 'Day 1 - JSON Fundamentals',
    items: [
      { id: 'intro_json', label: 'What is JSON?', icon: <BookOpen size={18} /> },
      { id: 'json_syntax', label: 'JSON Syntax & Types', icon: <Code size={18} /> },
      { id: 'json_methods', label: 'Parsing & Stringifying', icon: <Terminal size={18} /> },
      { id: 'json_datatypes', label: 'JSON Data Types', icon: <Database size={18} /> },
      { id: 'nested_objects', label: 'Nested Objects', icon: <Layers size={18} /> },
      { id: 'array_objects', label: 'Array of Objects', icon: <Table size={18} /> },
      { id: 'quiz', label: 'Quiz & MCQs', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignments', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'json_ai_module',
    title: '🤖 AI Power Tools for JSON',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> }
    ]
  }
];

export const djangoCourseData = [
  {
    id: 'django_module1',
    title: 'Day 1 - Introduction to Django',
    items: [
      { id: 'intro_django', label: 'Introduction to Django', icon: <BookOpen size={18} /> },
      { id: 'env_setup', label: 'Virtual Environment & Install', icon: <Settings size={18} /> },
      { id: 'project_app', label: 'Project & App Creation', icon: <Terminal size={18} /> },
      { id: 'views_urls', label: 'Views, URL Mapping & Server', icon: <Cpu size={18} /> },
      { id: 'quiz', label: 'Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module2',
    title: 'Day 2 - Templates & Static Files',
    items: [
      { id: 'intro_templates', label: 'Introduction & MVT', icon: <BookOpen size={18} /> },
      { id: 'setup_templates', label: 'Templates Setup', icon: <Settings size={18} /> },
      { id: 'base_template', label: 'base.html Creation', icon: <Code size={18} /> },
      { id: 'template_tags', label: 'Template Tags & Logic', icon: <Cpu size={18} /> },
      { id: 'child_template', label: 'dashboard.html Creation', icon: <Code size={18} /> },
      { id: 'static_files', label: 'Static Assets & CSS', icon: <FileText size={18} /> },
      { id: 'routing_views', label: 'Interactive Workspace', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 2 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 2 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module3',
    title: 'Day 3 - Models & Admin Panel',
    items: [
      { id: 'intro_models', label: 'Introduction & ORM', icon: <BookOpen size={18} /> },
      { id: 'models_py', label: 'Category & Product Models', icon: <Code size={18} /> },
      { id: 'migrations_db', label: 'Database Migrations', icon: <Terminal size={18} /> },
      { id: 'admin_panel', label: 'Admin Panel & Superuser', icon: <Settings size={18} /> },
      { id: 'views_post', label: 'Form Handlers: GET & POST', icon: <Cpu size={18} /> },
      { id: 'url_routing_post', label: 'Forms Routing URLs', icon: <FileText size={18} /> },
      { id: 'templates_forms', label: 'Product List & Form HTML', icon: <Code size={18} /> },
      { id: 'include_filter', label: '{% include %} & Filters', icon: <FileText size={18} /> },
      { id: 'interactive_workspace_post', label: 'Interactive Workspace', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 3 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 3 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module4',
    title: 'Day 4 - HTML, Django & Model Forms',
    items: [
      { id: 'intro_forms', label: 'Introduction & Forms', icon: <BookOpen size={18} /> },
      { id: 'forms_py', label: 'forms.py & Clean Hooks', icon: <Code size={18} /> },
      { id: 'views_form', label: 'views.py ModelForms', icon: <Cpu size={18} /> },
      { id: 'templates_form', label: 'Form HTML & Validation', icon: <Code size={18} /> },
      { id: 'interactive_workspace_form', label: 'Interactive Workspace', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 4 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 4 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module5',
    title: 'Day 5 - CRUD Operations',
    items: [
      { id: 'intro_crud', label: 'Introduction to CRUD', icon: <BookOpen size={18} /> },
      { id: 'read_views', label: 'Read: List & Detail Views', icon: <Eye size={18} /> },
      { id: 'create_view', label: 'Create: add_product View', icon: <Plus size={18} /> },
      { id: 'update_view', label: 'Update: update_product View', icon: <Edit3 size={18} /> },
      { id: 'delete_view', label: 'Delete: delete_product View', icon: <Trash2 size={18} /> },
      { id: 'urls_crud', label: 'CRUD URL Configuration', icon: <Link size={18} /> },
      { id: 'interactive_crud', label: 'Live CRUD Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 5 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 5 Assignment', icon: <FileText size={18} /> },
    ]
  },
  {
    id: 'django_module6',
    title: 'Day 6 - User Authentication',
    items: [
      { id: 'intro_auth', label: 'Introduction to Auth', icon: <Lock size={18} /> },
      { id: 'login_view', label: 'Login View', icon: <LogIn size={18} /> },
      { id: 'logout_view', label: 'Logout View', icon: <LogOut size={18} /> },
      { id: 'register_view', label: 'Register View', icon: <UserPlus size={18} /> },
      { id: 'login_required', label: 'Protecting Views', icon: <Shield size={18} /> },
      { id: 'urls_auth', label: 'Auth URL Configuration', icon: <Link size={18} /> },
      { id: 'interactive_auth', label: 'Live Auth Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 6 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 6 Assignment', icon: <FileText size={18} /> },
    ]
  },
  {
    id: 'django_module7',
    title: 'Day 7 - User Roles & Permissions',
    items: [
      { id: 'intro_roles', label: 'User Roles & Flags', icon: <Shield size={18} /> },
      { id: 'groups_permissions', label: 'Groups & Permissions', icon: <Users size={18} /> },
      { id: 'permission_required', label: '@permission_required View Guard', icon: <Lock size={18} /> },
      { id: 'user_passes_test', label: 'Custom user_passes_test', icon: <UserCheck size={18} /> },
      { id: 'template_permissions', label: 'Permissions in Templates', icon: <Code size={18} /> },
      { id: 'admin_roles', label: 'Admin Panel Roles', icon: <Settings size={18} /> },
      { id: 'interactive_roles', label: 'Interactive Roles Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 7 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 7 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module8',
    title: 'Day 8 - Sessions, Cookies & Middleware',
    items: [
      { id: 'intro_sessions', label: 'Sessions & Cookies', icon: <Lock size={18} /> },
      { id: 'session_config', label: 'Session Configuration', icon: <Settings size={18} /> },
      { id: 'session_views', label: 'Sessions in Views', icon: <Code size={18} /> },
      { id: 'middleware_intro', label: 'Django Middleware', icon: <RefreshCw size={18} /> },
      { id: 'custom_middleware', label: 'Custom Activity Middleware', icon: <Activity size={18} /> },
      { id: 'interactive_sessions', label: 'Interactive Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 8 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 8 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module9',
    title: 'Day 9 - Django ORM, Aggregation & Annotation',
    items: [
      { id: 'intro_orm', label: 'Introduction to ORM', icon: <Database size={18} /> },
      { id: 'aggregation', label: 'Database Aggregations', icon: <BarChart2 size={18} /> },
      { id: 'annotation', label: 'QuerySet Annotations', icon: <Plus size={18} /> },
      { id: 'views_implementation', label: 'Insights Dashboard', icon: <Code size={18} /> },
      { id: 'interactive_orm', label: 'Live ORM Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 9 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 9 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module10',
    title: 'Day 10 - Advanced QuerySets & Model Relations',
    items: [
      { id: 'intro_roles', label: 'Model Relationships', icon: <Shield size={18} /> },
      { id: 'groups_permissions', label: 'Declaring Relationships', icon: <Users size={18} /> },
      { id: 'permission_required', label: 'F Expressions & Filtering', icon: <Zap size={18} /> },
      { id: 'template_permissions', label: 'Relations in Templates', icon: <Code size={18} /> },
      { id: 'admin_roles', label: 'Admin Relationships', icon: <Settings size={18} /> },
      { id: 'interactive_roles', label: 'Live Relations Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 10 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 10 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module11',
    title: 'Day 11 - Class-Based Views & Mixins',
    items: [
      { id: 'intro_sessions', label: 'FBV vs CBV Overview', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Detail & Create Views', icon: <Code size={18} /> },
      { id: 'session_views', label: 'Django Mixins Reuse', icon: <Layers size={18} /> },
      { id: 'middleware_intro', label: 'Generic Views Suite', icon: <RefreshCw size={18} /> },
      { id: 'interactive_sessions', label: 'Live Flow Simulator', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 11 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 11 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module12',
    title: 'Day 12 - Django REST Framework Basics',
    items: [
      { id: 'intro_sessions', label: 'Introduction to DRF', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Serializers & Models', icon: <Layers size={18} /> },
      { id: 'session_views', label: 'APIViews vs ViewSets', icon: <Code size={18} /> },
      { id: 'middleware_intro', label: 'Installing & Config DRF', icon: <Settings size={18} /> },
      { id: 'deployment_drf', label: 'DRF API Deployment', icon: <Server size={18} /> },
      { id: 'interactive_sessions', label: 'API Endpoint Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 12 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 12 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module13',
    title: 'Day 13 - DRF Authentication, Permissions & Pagination',
    items: [
      { id: 'intro_sessions', label: 'API Security Overview', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Authentication Classes', icon: <Key size={18} /> },
      { id: 'session_views', label: 'JWT Setup & Configurations', icon: <Lock size={18} /> },
      { id: 'middleware_intro', label: 'Permissions & Pagination', icon: <Shield size={18} /> },
      { id: 'interactive_sessions', label: 'Secure Stack Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 13 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 13 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module14',
    title: 'Day 14 - Capstone 1: Employee Directory MVT',
    items: [
      { id: 'intro_sessions', label: 'Capstone Architecture', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Full Project Source Code', icon: <Code size={18} /> },
      { id: 'session_views', label: 'Live Portal Sandbox', icon: <Users size={18} /> },
      { id: 'quiz', label: 'Day 14 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 14 Project Checklist', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_module15',
    title: 'Day 15 - Capstone 2: DRF + Axios Board',
    items: [
      { id: 'intro_sessions', label: 'Decoupled Architecture', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Full Project Source Code', icon: <Code size={18} /> },
      { id: 'session_views', label: 'Live Kanban Sandbox', icon: <BarChart2 size={18} /> },
      { id: 'quiz', label: 'Day 15 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 15 Project Checklist', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'django_ai_module',
    title: '🤖 AI Power Tools for Django',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> }
    ]
  }
];

export const devopsCourseData = [
  {
    id: 'devops_module1',
    title: 'Day 1 - DevOps Intro & Git Workflow',
    items: [
      { id: 'intro_sessions', label: 'DevOps & SDLC Lifecycle', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Git Workflow Review', icon: <Code size={18} /> },
      { id: 'session_views', label: 'Branching & GitHub Actions', icon: <GitBranch size={18} /> },
      { id: 'middleware_intro', label: 'Environment Variables (.env)', icon: <Shield size={18} /> },
      { id: 'interactive_sessions', label: 'Actions Runner Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 1 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 1 Assignment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'devops_module2',
    title: 'Day 2 - Docker & Containerization',
    items: [
      { id: 'intro_sessions', label: 'What is Docker? & Installation', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Images vs Containers & Commands', icon: <Code size={18} /> },
      { id: 'session_views', label: 'Dockerfile & Compose Basics', icon: <Layers size={18} /> },
      { id: 'quiz', label: 'Day 2 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Day 2 Assignment (5 Tasks)', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'devops_module3',
    title: 'Day 3 - Deployment & CI/CD Pipelines',
    items: [
      { id: 'intro_sessions', label: 'Cloud Deployment (React & Django)', icon: <BookOpen size={18} /> },
      { id: 'session_config', label: 'Database & Env Secrets', icon: <Code size={18} /> },
      { id: 'session_views', label: 'CI/CD Pipelines & Domains/SSL', icon: <Globe size={18} /> },
      { id: 'interactive_sessions', label: 'Live Deploy Sandbox', icon: <Terminal size={18} /> },
      { id: 'quiz', label: 'Day 3 Quiz', icon: <CheckCircle size={18} /> },
      { id: 'assignment', label: 'Final Deployment Project', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'devops_ai_module',
    title: '🤖 AI Power Tools for DevOps',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> }
    ]
  }
];

export const statsCourseData = [
  {
    id: 'stats_day1',
    title: 'Day 1 - Population, Samples & Bias',
    items: [
      { id: 'theory', label: 'Population vs Sample', icon: <BookOpen size={18} /> },
      { id: 'methods', label: 'Sampling Methods & Bias', icon: <Layers size={18} /> },
      { id: 'math', label: 'Parameter vs Statistic Math', icon: <Target size={18} /> },
      { id: 'python', label: 'Python Sampling Example', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 1 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day2',
    title: 'Day 2 - Inferential Stats & CLT',
    items: [
      { id: 'theory', label: 'CLT & Sampling Distributions', icon: <BookOpen size={18} /> },
      { id: 'inference', label: 'SE, CI & Hypothesis Testing', icon: <Layers size={18} /> },
      { id: 'math', label: 'Standard Error & CI Math', icon: <Target size={18} /> },
      { id: 'python', label: 'Python Error Calculations', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 2 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day3',
    title: 'Day 3 - Measures of Central Tendency',
    items: [
      { id: 'theory', label: 'Mean, Median & Mode', icon: <BookOpen size={18} /> },
      { id: 'advanced', label: 'Weighted & Geometric Mean', icon: <Layers size={18} /> },
      { id: 'math', label: 'Manual Calculations', icon: <Target size={18} /> },
      { id: 'python', label: 'Python Computations', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 3 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day4',
    title: 'Day 4 - Measures of Dispersion & Shape',
    items: [
      { id: 'theory', label: 'Measures of Dispersion', icon: <BookOpen size={18} /> },
      { id: 'freqpos', label: 'Frequency & Position', icon: <Layers size={18} /> },
      { id: 'shapes', label: 'Measures of Shapes', icon: <Target size={18} /> },
      { id: 'math', label: 'Manual & Python Examples', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 4 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day5',
    title: 'Day 5 - Exploratory Data Analysis (EDA)',
    items: [
      { id: 'theory', label: 'EDA & Data Cleaning', icon: <BookOpen size={18} /> },
      { id: 'analysis', label: 'Univariate & Bivariate', icon: <Layers size={18} /> },
      { id: 'playground', label: 'Interactive EDA Simulator', icon: <Sparkles size={18} /> },
      { id: 'programming', label: 'Python & Walkthrough', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 5 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day6',
    title: 'Day 6 - Five Number Summary & Box Plots',
    items: [
      { id: 'theory', label: 'Five Number Summary', icon: <BookOpen size={18} /> },
      { id: 'boxplot', label: 'Box Plots & Outliers', icon: <Layers size={18} /> },
      { id: 'playground', label: 'Interactive Box Plot', icon: <Sparkles size={18} /> },
      { id: 'programming', label: 'Python & Calculations', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 6 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day7',
    title: 'Day 7 - Distribution Analysis',
    items: [
      { id: 'theory', label: 'Normal Distribution', icon: <BookOpen size={18} /> },
      { id: 'skewness', label: 'Skewness', icon: <Layers size={18} /> },
      { id: 'kurtosis', label: 'Kurtosis', icon: <Target size={18} /> },
      { id: 'playground', label: 'Interactive Bell Curve', icon: <Sparkles size={18} /> },
      { id: 'assessment', label: 'Day 7 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day8',
    title: 'Day 8 - Correlation & Covariance',
    items: [
      { id: 'theory', label: 'Covariance & Correlation', icon: <BookOpen size={18} /> },
      { id: 'types', label: 'Correlation Types', icon: <Layers size={18} /> },
      { id: 'playground', label: 'Interactive Scatter Plot', icon: <Sparkles size={18} /> },
      { id: 'programming', label: 'Python & Heatmap', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 8 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day9',
    title: 'Day 9 - Inferential Statistics',
    items: [
      { id: 'theory', label: 'Population & Sample', icon: <BookOpen size={18} /> },
      { id: 'estimation', label: 'Point & Interval Estimation', icon: <Target size={18} /> },
      { id: 'workflow', label: 'Inferential Workflow', icon: <Layers size={18} /> },
      { id: 'assessment', label: 'Day 9 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day10',
    title: 'Day 10 - Sampling Methods',
    items: [
      { id: 'theory', label: 'What is Sampling?', icon: <BookOpen size={18} /> },
      { id: 'probability', label: 'Probability Sampling', icon: <Layers size={18} /> },
      { id: 'nonprob', label: 'Non-Probability Sampling', icon: <Target size={18} /> },
      { id: 'playground', label: 'Sampling Simulator', icon: <Sparkles size={18} /> },
      { id: 'assessment', label: 'Day 10 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day11',
    title: 'Day 11 - Probability & CLT',
    items: [
      { id: 'theory', label: 'Probability Basics', icon: <BookOpen size={18} /> },
      { id: 'conditional', label: 'Conditional & Bayes', icon: <Layers size={18} /> },
      { id: 'clt', label: 'Sampling Dist. & CLT', icon: <Target size={18} /> },
      { id: 'playground', label: 'CLT Simulator', icon: <Sparkles size={18} /> },
      { id: 'assessment', label: 'Day 11 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day12',
    title: 'Day 12 - Hypothesis Testing',
    items: [
      { id: 'theory', label: 'Hypotheses & Errors', icon: <BookOpen size={18} /> },
      { id: 'metrics', label: 'α, p-value & Power', icon: <Target size={18} /> },
      { id: 'steps', label: 'Testing Workflow', icon: <Layers size={18} /> },
      { id: 'playground', label: 'Interactive Test Simulator', icon: <Sparkles size={18} /> },
      { id: 'assessment', label: 'Day 12 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day13',
    title: 'Day 13 - Types of Hypothesis Tests',
    items: [
      { id: 'zttest', label: 'Z-Test & T-Tests', icon: <BookOpen size={18} /> },
      { id: 'chi_anova', label: 'Chi-Square & ANOVA', icon: <Layers size={18} /> },
      { id: 'selector', label: 'Test Selector Guide', icon: <Target size={18} /> },
      { id: 'python', label: 'Python Examples', icon: <Terminal size={18} /> },
      { id: 'assessment', label: 'Day 13 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day14',
    title: 'Day 14 - Linear Algebra',
    items: [
      { id: 'theory', label: 'Scalars, Vectors & Matrices', icon: <BookOpen size={18} /> },
      { id: 'operations', label: 'Matrix Operations', icon: <Layers size={18} /> },
      { id: 'tensors', label: 'Tensors & Applications', icon: <Target size={18} /> },
      { id: 'python', label: 'Python Examples', icon: <Terminal size={18} /> },
      { id: 'assessment', label: 'Day 14 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day15',
    title: 'Day 15 - Matrix Operations',
    items: [
      { id: 'basics', label: 'Add / Sub / Mul / Transpose', icon: <BookOpen size={18} /> },
      { id: 'advanced', label: 'Inverse, Det & Rank', icon: <Layers size={18} /> },
      { id: 'eigen', label: 'Eigenvalues & Eigenvectors', icon: <Target size={18} /> },
      { id: 'playground', label: 'Matrix Playground', icon: <Sparkles size={18} /> },
      { id: 'assessment', label: 'Day 15 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day16',
    title: 'Day 16 - Calculus for Data Analytics',
    items: [
      { id: 'basics', label: 'Limits & Derivatives', icon: <BookOpen size={18} /> },
      { id: 'rules', label: 'Chain Rule & Partial Derivatives', icon: <Layers size={18} /> },
      { id: 'gradients', label: 'Gradients & Optimization', icon: <Target size={18} /> },
      { id: 'playground', label: 'Gradient Descent Simulator', icon: <Sparkles size={18} /> },
      { id: 'assessment', label: 'Day 16 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_day17',
    title: 'Day 17 - Statistics Capstone Project',
    items: [
      { id: 'overview', label: 'Project Overview', icon: <BookOpen size={18} /> },
      { id: 'requirements', label: 'Detailed Requirements', icon: <Layers size={18} /> },
      { id: 'dashboard', label: 'Interactive Dashboard', icon: <Sparkles size={18} /> },
      { id: 'submission', label: 'Submission Guide', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'stats_mini_projects',
    title: 'Statistics Mini Projects',
    items: [
      { id: 'student_marks', label: '1. Student Marks Analysis', icon: <FileSpreadsheet size={18} /> },
      { id: 'sales_eda', label: '2. Sales Data EDA', icon: <BarChart2 size={18} /> },
      { id: 'customer_purchase', label: '3. Customer Purchase Analysis', icon: <ShoppingCart size={18} /> },
      { id: 'hypothesis_biz', label: '4. Hypothesis Testing', icon: <Target size={18} /> }
    ]
  },
  {
    id: 'stats_final_project',
    title: 'Final Project',
    items: [
      { id: 'final_overview', label: 'Business Analytics Brief', icon: <Briefcase size={18} /> },
      { id: 'final_dashboard', label: 'Interactive Final Dashboard', icon: <Sparkles size={18} /> },
      { id: 'final_submission', label: 'Final Project Submission', icon: <FileText size={18} /> }
    ]
  }
];

export const numpyCourseData = [
  {
    id: 'numpy_day1',
    title: 'Day 1 - NumPy Fundamentals',
    items: [
      { id: 'install', label: 'Install & Setup', icon: <Settings size={18} /> },
      { id: 'dimensions', label: '1D, 2D & 3D Arrays', icon: <Layers size={18} /> },
      { id: 'creation_fns', label: 'Array Creation Functions', icon: <Sparkles size={18} /> },
      { id: 'ranges_strides', label: 'Ranges, Strides & Memory', icon: <Activity size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 1 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'numpy_day2',
    title: 'Day 2 - NumPy Operators & Math',
    items: [
      { id: 'operators', label: 'NumPy Operators', icon: <Zap size={18} /> },
      { id: 'manipulation', label: 'Array Manipulation', icon: <Sliders size={18} /> },
      { id: 'ufuncs', label: 'Mathematical Functions', icon: <Activity size={18} /> },
      { id: 'broadcasting', label: 'Broadcasting Rules', icon: <Compass size={18} /> },
      { id: 'sets', label: 'Set Operations', icon: <Database size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 2 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'numpy_day3',
    title: 'Day 3 - Math, Slicing & Filtering',
    items: [
      { id: 'table', label: 'Math Operations', icon: <Table size={18} /> },
      { id: 'datatypes', label: 'Data Types & Casting', icon: <Layers size={18} /> },
      { id: 'indexing', label: 'Indexing & Slicing', icon: <Sliders size={18} /> },
      { id: 'filtering', label: 'Conditional Filtering', icon: <Filter size={18} /> },
      { id: 'conditionals', label: 'any(), all() & where()', icon: <Brain size={18} /> },
      { id: 'advanced', label: 'Data Cleaning using Arrays', icon: <Activity size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 3 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'numpy_day4',
    title: 'Day 4 - Shaping, Stacking & Sort',
    items: [
      { id: 'shaping', label: 'Shaping & Transpose', icon: <Layers size={18} /> },
      { id: 'stacking', label: 'Concatenation & Stacking', icon: <Columns size={18} /> },
      { id: 'iteration', label: 'Iteration & Performance', icon: <Zap size={18} /> },
      { id: 'searching', label: 'Splitting & Searching', icon: <Compass size={18} /> },
      { id: 'sorting', label: 'Sorting Operations', icon: <List size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 4 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'numpy_day5',
    title: 'Day 5 - Universal Functions (ufuncs)',
    items: [
      { id: 'intro', label: 'Introduction to ufuncs', icon: <Layers size={18} /> },
      { id: 'unary_binary', label: 'Unary & Binary ufuncs', icon: <Columns size={18} /> },
      { id: 'comparisons', label: 'Comparison & Logical ufuncs', icon: <Compass size={18} /> },
      { id: 'broadcasting', label: 'Broadcasting & Custom ufuncs', icon: <Zap size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 5 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'numpy_day6',
    title: 'Day 6 - Advanced NumPy & Algebra',
    items: [
      { id: 'copy_view', label: 'Copy vs View & Memory', icon: <Layers size={18} /> },
      { id: 'vectorization', label: 'Vectorization & Performance', icon: <Zap size={18} /> },
      { id: 'random', label: 'Random Module', icon: <Compass size={18} /> },
      { id: 'files', label: 'Saving & Loading Arrays', icon: <Database size={18} /> },
      { id: 'linalg', label: 'Linear Algebra Intro', icon: <Columns size={18} /> },
      { id: 'capstone', label: 'AI Data Prep Project', icon: <BarChart2 size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Final Assessment', icon: <FileText size={18} /> }
    ]
  }
];

export const coreJsCourseData = [
  {
    id: 'core_js_day1',
    title: 'Day 1 - JavaScript Basics',
    items: [
      { id: 'intro', label: 'Introduction to JS', icon: <BookOpen size={18} /> },
      { id: 'connecting_js', label: 'Connecting JS & innerHTML', icon: <Link size={18} /> },
      { id: 'variables', label: 'JS Variables & Scope', icon: <Layers size={18} /> },
      { id: 'datatypes', label: 'JS Data Types', icon: <Database size={18} /> },
      { id: 'conversions', label: 'Type Conversions & Equality', icon: <RefreshCw size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 1 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day2',
    title: 'Day 2 - JavaScript Operators',
    items: [
      { id: 'intro', label: 'Operators Overview', icon: <BookOpen size={18} /> },
      { id: 'assignment_arithmetic', label: 'Assignment & Arithmetic', icon: <Layers size={18} /> },
      { id: 'comparison_logical', label: 'Comparison & Logical', icon: <Database size={18} /> },
      { id: 'bitwise_string_ternary', label: 'Bitwise, String & Ternary', icon: <Zap size={18} /> },
      { id: 'expressions', label: 'Expressions', icon: <RefreshCw size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 2 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day3',
    title: 'Day 3 - Conditional Statements',
    items: [
      { id: 'intro', label: 'Conditionals Introduction', icon: <BookOpen size={18} /> },
      { id: 'if_statements', label: 'if & else Statements', icon: <Layers size={18} /> },
      { id: 'ladder_switch', label: 'Ladder & Switch', icon: <Database size={18} /> },
      { id: 'ternary_operator', label: 'Ternary & parseInt', icon: <Zap size={18} /> },
      { id: 'atm_simulator', label: 'ATM Simulator', icon: <Activity size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 3 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day4',
    title: 'Day 4 - Loops in JavaScript',
    items: [
      { id: 'intro', label: 'Loops Introduction', icon: <BookOpen size={18} /> },
      { id: 'for_loops', label: 'for, for...in & for...of', icon: <Layers size={18} /> },
      { id: 'comparison_table', label: 'Loop Comparison', icon: <Table size={18} /> },
      { id: 'while_loops', label: 'while & do-while', icon: <RefreshCw size={18} /> },
      { id: 'mini_project', label: 'Multiples Table', icon: <Activity size={18} /> },
      { id: 'foreach', label: 'forEach() Method', icon: <List size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 4 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day5',
    title: 'Day 5 - Functions in JavaScript',
    items: [
      { id: 'intro', label: 'Functions Introduction', icon: <BookOpen size={18} /> },
      { id: 'function_types', label: 'Types of Functions', icon: <Layers size={18} /> },
      { id: 'rest_spread', label: 'Rest & Spread Operators', icon: <Activity size={18} /> },
      { id: 'array_methods', label: 'map(), filter() & reduce()', icon: <Table size={18} /> },
      { id: 'inventory_manager', label: 'Inventory Manager', icon: <Database size={18} /> },
      { id: 'shopping_cart', label: 'Shopping Cart', icon: <ShoppingCart size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 5 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day6',
    title: 'Day 6 - Data Structures (Part 1)',
    items: [
      { id: 'math_functions', label: 'Math Object Utilities', icon: <Activity size={18} /> },
      { id: 'string_functions', label: 'Strings & String Methods', icon: <Layers size={18} /> },
      { id: 'array_concepts', label: 'Arrays & Array Operations', icon: <Table size={18} /> },
      { id: 'objects', label: 'JavaScript Objects', icon: <Database size={18} /> },
      { id: 'student_manager', label: 'Student Record Manager', icon: <Briefcase size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 6 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day7',
    title: 'Day 7 - Data Structures (Part 2)',
    items: [
      { id: 'sets', label: 'JavaScript Sets (Unique Lists)', icon: <Layers size={18} /> },
      { id: 'maps', label: 'JavaScript Maps (Key-Value)', icon: <Map size={18} /> },
      { id: 'map_vs_map', label: 'map() vs new Map()', icon: <GitMerge size={18} /> },
      { id: 'set_vs_set', label: 'new Set() vs .set() Method', icon: <GitBranch size={18} /> },
      { id: 'contact_manager', label: 'Contact Book Project', icon: <Briefcase size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 7 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day8',
    title: 'Day 8 - Document Object Model',
    items: [
      { id: 'intro', label: 'Introduction to DOM', icon: <Compass size={18} /> },
      { id: 'selectors', label: 'DOM Selectors', icon: <Layers size={18} /> },
      { id: 'manipulation', label: 'DOM Node Manipulation', icon: <Plus size={18} /> },
      { id: 'dom_programs', label: 'DOM Programs', icon: <Terminal size={18} /> },
      { id: 'dom_builder', label: 'DOM Element Tree Builder', icon: <Database size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 8 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day9',
    title: 'Day 9 - Event Listeners & BOM',
    items: [
      { id: 'handlers', label: 'Event Handlers & Types', icon: <Zap size={18} /> },
      { id: 'listeners', label: 'addEventListener()', icon: <Plus size={18} /> },
      { id: 'bom_core', label: 'BOM – window, navigator', icon: <MonitorPlay size={18} /> },
      { id: 'bom_location', label: 'Location & History', icon: <Compass size={18} /> },
      { id: 'mini_program', label: 'Mini Program – Monitor', icon: <Briefcase size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 9 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'core_js_day10',
    title: 'Day 10 - Modern JS',
    items: [
      { id: 'promises', label: 'JavaScript Promises', icon: <Zap size={18} /> },
      { id: 'async_await', label: 'Async & Await', icon: <RefreshCw size={18} /> },
      { id: 'fetch_api', label: 'Fetch API', icon: <Globe size={18} /> },
      { id: 'error_handling', label: 'Error Handling', icon: <AlertTriangle size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 10 Assessment', icon: <FileText size={18} /> },
      { id: 'mini_project_1', label: 'Demo: Weather Dashboard', icon: <Activity size={18} /> },
      { id: 'mini_project_2', label: 'Demo: GitHub User Finder', icon: <Eye size={18} /> },
      { id: 'submissions', label: 'Submission Projects', icon: <Briefcase size={18} /> }
    ]
  },
  {
    id: 'js_final_projects',
    title: 'JavaScript Capstone Projects',
    items: [
      { id: 'project_weather', label: '1. Weather Forecast Dashboard', icon: <Zap size={18} /> },
      { id: 'project_cart', label: '2. E-Commerce Shopping Portal', icon: <Settings size={18} /> },
      { id: 'project_kanban', label: '3. Task Management Kanban Board', icon: <Layers size={18} /> },
      { id: 'project_quiz', label: '4. Interactive Quiz Portal', icon: <Terminal size={18} /> },
      { id: 'project_contacts', label: '5. Contact Management Hub', icon: <PenTool size={18} /> },
    ]
  },
  {
    id: 'js_ai_module',
    title: '🤖 AI Power Tools for JS',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_ui_gen', label: '🎨 AI UI Generation', icon: <Wand2 size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> },
    ]
  }
];

export const pandasCourseData = [
  {
    id: 'pandas_day1',
    title: 'Day 1 - Intro & DataFrames',
    items: [
      { id: 'intro', label: 'Pandas Fundamentals', icon: <BookOpen size={18} /> },
      { id: 'creation', label: 'Creating DataFrames', icon: <Layers size={18} /> },
      { id: 'attributes', label: 'DataFrame Attributes', icon: <Sliders size={18} /> },
      { id: 'activity', label: 'AI Activity: Student Marks', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 1 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'pandas_day2',
    title: 'Day 2 - Reading, Selecting & Filtering',
    items: [
      { id: 'loading', label: 'Ingesting Data Files', icon: <Database size={18} /> },
      { id: 'selection', label: 'loc, iloc & Selection', icon: <Sliders size={18} /> },
      { id: 'filtering', label: 'Boolean Mask Filtering', icon: <Filter size={18} /> },
      { id: 'activity', label: 'AI Activity: Filter Scores', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 2 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'pandas_day3',
    title: 'Day 3 - Data Cleaning & Preprocessing',
    items: [
      { id: 'missing', label: 'Handling Missing Values', icon: <AlertTriangle size={18} /> },
      { id: 'replacing', label: 'Replacing & Renaming', icon: <RefreshCw size={18} /> },
      { id: 'duplicates', label: 'Duplicates & Data Types', icon: <Layers size={18} /> },
      { id: 'activity', label: 'AI Activity: Clean Employees', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 3 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'pandas_day4',
    title: 'Day 4 - Sorting, Grouping & Combining Data',
    items: [
      { id: 'sorting', label: 'Sorting Data', icon: <Sliders size={18} /> },
      { id: 'groupby', label: 'GroupBy & Aggregations', icon: <Columns size={18} /> },
      { id: 'combining', label: 'Combining Data', icon: <Link size={18} /> },
      { id: 'activity', label: 'AI Activity: Sales by City', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 4 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'pandas_day5',
    title: 'Day 5 - Data Analysis & Visualization',
    items: [
      { id: 'analysis', label: 'Descriptive & Mapping', icon: <Activity size={18} /> },
      { id: 'pivoting', label: 'Pivot Tables & Crosstabs', icon: <Table size={18} /> },
      { id: 'plotting', label: 'Built-in plotting', icon: <BarChart2 size={18} /> },
      { id: 'activity', label: 'AI Activity: Company Sales', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 5 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'pandas_day6',
    title: 'Day 6 - Real-Time Mini Project',
    items: [
      { id: 'project_brief', label: 'Project Brief', icon: <Trophy size={18} /> },
      { id: 'ai_challenge', label: 'AI Challenge Comparison', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Final Assessment', icon: <FileText size={18} /> }
    ]
  }
];

export const matplotlibCourseData = [
  {
    id: 'matplotlib_day1',
    title: 'Day 1 - Intro to Matplotlib',
    items: [
      { id: 'intro', label: 'Pyplot Fundamentals', icon: <BookOpen size={18} /> },
      { id: 'activity', label: 'AI Activity: Marks Line Chart', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 1 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'matplotlib_day2',
    title: 'Day 2 - Line, Bar & Scatter Charts',
    items: [
      { id: 'basic_charts', label: 'Line & Bar Customizations', icon: <Sliders size={18} /> },
      { id: 'scatter_stem', label: 'Scatter & Stem Plots', icon: <Layers size={18} /> },
      { id: 'activity', label: 'AI Activity: Monthly Sales', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 2 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'matplotlib_day3',
    title: 'Day 3 - Distribution & Statistical Charts',
    items: [
      { id: 'distributions', label: 'Histogram & Pie Charts', icon: <Activity size={18} /> },
      { id: 'statistical', label: 'Box, Area & Stack Plots', icon: <Layers size={18} /> },
      { id: 'activity', label: 'AI Activity: Exam Scores', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 3 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'matplotlib_day4',
    title: 'Day 4 - Chart Customization & Layouts',
    items: [
      { id: 'customization', label: 'Colors, Fonts & Annotations', icon: <Sliders size={18} /> },
      { id: 'subplots', label: 'Subplots & Output resolution', icon: <Columns size={18} /> },
      { id: 'activity', label: 'AI Activity: Custom Dashboards', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 4 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'matplotlib_day5',
    title: 'Day 5 - Real-Time Capstone Project',
    items: [
      { id: 'project_brief', label: 'Project Brief', icon: <Trophy size={18} /> },
      { id: 'ai_challenge', label: 'AI Challenge Comparison', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Final Assessment', icon: <FileText size={18} /> }
    ]
  }
];

export const seabornCourseData = [
  {
    id: 'seaborn_day1',
    title: 'Day 1 - Introduction to Seaborn',
    items: [
      { id: 'intro', label: 'Seaborn Fundamentals', icon: <BookOpen size={18} /> },
      { id: 'activity', label: 'AI Activity: Student Perf', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 1 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'seaborn_day2',
    title: 'Day 2 - Distribution & Categorical Plots',
    items: [
      { id: 'distributions', label: 'Distribution Charts', icon: <Activity size={18} /> },
      { id: 'categorical', label: 'Categorical Charts', icon: <Sliders size={18} /> },
      { id: 'activity', label: 'AI Activity: Salary Dist', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 2 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'seaborn_day3',
    title: 'Day 3 - Statistical Relationships',
    items: [
      { id: 'relationships', label: 'Relationships & Heatmaps', icon: <Layers size={18} /> },
      { id: 'activity', label: 'AI Activity: Housing Plots', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Day 3 Assessment', icon: <FileText size={18} /> }
    ]
  },
  {
    id: 'seaborn_day4',
    title: 'Day 4 - Customer Insights Dashboard',
    items: [
      { id: 'project_brief', label: 'Project Brief', icon: <Trophy size={18} /> },
      { id: 'ai_challenge', label: 'AI Challenge Comparison', icon: <Sparkles size={18} /> },
      { id: 'playground', label: 'Live Coding Lab', icon: <Code size={18} /> },
      { id: 'assessment', label: 'Final Assessment', icon: <FileText size={18} /> }
    ]
  }
];

export const webDesignCourseData = [
  {
    id: 'web_design_day1',
    title: 'Day 1 — Introduction to Websites & Layout',
    items: [
      { id: 'intro', label: 'What is a Website?', icon: <BookOpen size={18} /> },
      { id: 'layout', label: 'Website Layout', icon: <LayoutGrid size={18} /> },
      { id: 'visual', label: 'Website Sections', icon: <MonitorPlay size={18} /> },
      { id: 'layers', label: 'HTML + CSS + JavaScript', icon: <Layers size={18} /> },
      { id: 'first_output', label: 'Live Example', icon: <Code size={18} /> },
      { id: 'practice', label: 'Practice', icon: <PenTool size={18} /> },
      { id: 'assignment', label: 'Assignment', icon: <Briefcase size={18} /> },
      { id: 'ai_challenge', label: 'AI Challenge', icon: <Sparkles size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Progress', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day2',
    title: 'Day 2 — Professional Navbar Section',
    items: [
      { id: 'intro', label: 'Today You Will Learn', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Result & Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML', icon: <Code size={18} /> },
      { id: 'css_flexbox', label: 'CSS Flexbox & Spacing', icon: <LayoutGrid size={18} /> },
      { id: 'hover_responsive', label: 'Hover & Mobile Layout', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (10 Stages)', icon: <PenTool size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day3',
    title: 'Day 3 — Hero Section & Call to Action',
    items: [
      { id: 'intro', label: 'Day 3 Objective & Real-World Hero', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Result & Hero Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML Hero', icon: <Code size={18} /> },
      { id: 'css_layout', label: 'CSS Flexbox 2-Column & Container', icon: <LayoutGrid size={18} /> },
      { id: 'typography_cta', label: 'Typography, Headings & CTAs', icon: <PenTool size={18} /> },
      { id: 'responsive', label: 'Responsive Hero & Device Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (10 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day4',
    title: 'Day 4 — Professional About Section',
    items: [
      { id: 'intro', label: 'Day 4 Objective & Business Context', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Output & About Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML About', icon: <Code size={18} /> },
      { id: 'css_layout', label: 'Flexbox 2-Column & Image Styling', icon: <LayoutGrid size={18} /> },
      { id: 'stats_reusable', label: 'Statistics & Reusable Classes', icon: <PenTool size={18} /> },
      { id: 'responsive', label: 'Responsive About & Device Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (10 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day5',
    title: 'Day 5 — Services Section & Cards',
    items: [
      { id: 'intro', label: 'Day 5 Objective & Business Context', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Output & Services Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML Cards', icon: <Code size={18} /> },
      { id: 'css_grid', label: 'CSS Grid Layout & Visualizer', icon: <LayoutGrid size={18} /> },
      { id: 'cards_hover', label: 'Service Cards & Hover Effects', icon: <PenTool size={18} /> },
      { id: 'responsive', label: 'Responsive Grid & Device Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (12 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day6',
    title: 'Day 6 — Portfolio & Showcase Section',
    items: [
      { id: 'intro', label: 'Day 6 Objective & Business Context', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Output & Portfolio Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML Cards', icon: <Code size={18} /> },
      { id: 'css_grid', label: 'CSS Grid & Image Handling', icon: <LayoutGrid size={18} /> },
      { id: 'js_filter', label: 'DOM Interaction & JS Category Filtering', icon: <PenTool size={18} /> },
      { id: 'responsive', label: 'Responsive Portfolio & Device Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (18 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day7',
    title: 'Day 7 — Testimonials & Social Proof',
    items: [
      { id: 'intro', label: 'Day 7 Objective & Social Proof', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Output & Testimonial Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML Cards', icon: <Code size={18} /> },
      { id: 'css_card', label: 'Card Styling, Avatars & Ratings', icon: <LayoutGrid size={18} /> },
      { id: 'responsive', label: 'Responsive Grid & Device Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (16 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day8',
    title: 'Day 8 — Pricing & Fee Packages',
    items: [
      { id: 'intro', label: 'Day 8 Objective & Business Context', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Output & Pricing Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML Pricing', icon: <Code size={18} /> },
      { id: 'css_positioning', label: 'CSS Positioning & Badge Design', icon: <LayoutGrid size={18} /> },
      { id: 'billing_toggle', label: 'Billing Toggle & JavaScript', icon: <PenTool size={18} /> },
      { id: 'comparison', label: 'Feature Comparison Table', icon: <Table size={18} /> },
      { id: 'responsive', label: 'Responsive Grid & Device Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (18 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day9',
    title: 'Day 9 — Contact & Lead Generation Form',
    items: [
      { id: 'intro', label: 'Day 9 Objective & Business Context', icon: <BookOpen size={18} /> },
      { id: 'visual', label: 'Target Output & Contact Explorer', icon: <MonitorPlay size={18} /> },
      { id: 'html_build', label: 'Step-by-Step HTML Form', icon: <Code size={18} /> },
      { id: 'inputs_explorer', label: 'Form Controls & Input Types', icon: <LayoutGrid size={18} /> },
      { id: 'validation', label: 'Form Validation & JavaScript', icon: <PenTool size={18} /> },
      { id: 'responsive', label: 'Responsive Form Grid Tester', icon: <Layers size={18} /> },
      { id: 'guided_build', label: 'Guided Implementation (18 Stages)', icon: <Sliders size={18} /> },
      { id: 'playground', label: 'Live Code Playground', icon: <Terminal size={18} /> },
      { id: 'challenges', label: 'Code Challenges & Debugging', icon: <Sparkles size={18} /> },
      { id: 'assignment', label: 'Assignment & AI Challenge', icon: <Briefcase size={18} /> },
      { id: 'quiz', label: 'Knowledge Check & Completion', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'web_design_day10',
    title: 'Day 10 — 🚀 MINI PROJECT 1: Complete Business Website',
    items: [
      { id: 'intro', label: 'Project Brief & Business Goals', icon: <BookOpen size={18} /> },
      { id: 'builder', label: 'Independent Project Workspace', icon: <Code size={18} /> },
      { id: 'sections_guide', label: '9-Section Explorer & Checklist', icon: <Layout size={18} /> },
      { id: 'js_lab', label: 'JS Validation & Form Logic', icon: <Terminal size={18} /> },
      { id: 'responsive_tester', label: 'Responsive Viewport Tester', icon: <Smartphone size={18} /> },
      { id: 'challenges', label: 'Debugging & AI Code Audit', icon: <Sparkles size={18} /> },
      { id: 'submission', label: 'Presentation & Project Submission', icon: <Send size={18} /> },
      { id: 'quiz', label: 'Knowledge Check', icon: <CheckCircle size={18} /> }
    ]
  },
  {
    id: 'web_design_day11',
    title: 'Day 11 — Modern CSS Styling & Refactoring',
    items: [
      { id: 'intro', label: '1. Intro to Modern CSS & Design Systems', icon: <BookOpen size={18} /> },
      { id: 'variables', label: '2. CSS Variables & Design Tokens', icon: <Sliders size={18} /> },
      { id: 'typography', label: '3. Typography Hierarchy System', icon: <Type size={18} /> },
      { id: 'spacing', label: '4. Spacing System & Box Model', icon: <LayoutTemplate size={18} /> },
      { id: 'grids', label: '5. Modern Grids & Component Layouts', icon: <LayoutGrid size={18} /> },
      { id: 'buttons', label: '6. Professional Button System', icon: <PenTool size={18} /> },
      { id: 'cards', label: '7. Cards & Micro Visual Feedback', icon: <Layers size={18} /> },
      { id: 'refactoring', label: '8. CSS Refactoring Principles', icon: <Code size={18} /> },
      { id: 'before_after', label: '9. Before & After Transformation', icon: <MonitorPlay size={18} /> },
      { id: 'assessment', label: '10. Practice, Quiz, Task & Assessment', icon: <CheckCircle size={18} /> }
    ]
  },
  {
    id: 'web_design_day12',
    title: 'Day 12 — JavaScript Fundamentals & DOM Interaction',
    items: [
      { id: 'intro', label: 'Topic 1: Intro to JavaScript & Role', icon: <BookOpen size={18} /> },
      { id: 'connecting_js', label: 'Topic 2: Project Structure & Dev Console', icon: <Code size={18} /> },
      { id: 'data_types', label: 'Topic 3: Variables (const/let) & Types', icon: <Sliders size={18} /> },
      { id: 'operators', label: 'Topic 4: Operators & Template Literals', icon: <Terminal size={18} /> },
      { id: 'dom_intro', label: 'Topic 5: The DOM & querySelector', icon: <MousePointerClick size={18} /> },
      { id: 'dom_text_events', label: 'Topic 6: Modifying Text Content', icon: <Zap size={18} /> },
      { id: 'events', label: 'Topic 7: Event Listeners & Interaction', icon: <PenTool size={18} /> },
      { id: 'functions_classlist', label: 'Topic 8: Functions & Reusable Logic', icon: <LayoutGrid size={18} /> },
      { id: 'classlist', label: 'Topic 9: Manipulating CSS classList', icon: <Layers size={18} /> },
      { id: 'mobile_menu', label: 'Topic 10: Mobile Drawer Project & Quiz', icon: <CheckCircle size={18} /> }
    ]
  }
];





