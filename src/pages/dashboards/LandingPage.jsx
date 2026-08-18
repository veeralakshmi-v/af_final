import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Menu, X, Star, Award, Users, TrendingUp, Shield, Zap, BookOpen, 
  Target, CheckCircle, Play, Mail, Phone, LogIn, Key, ShieldAlert, Sparkles, 
  Database, Code, Bot, Brain, Terminal, Layers, ArrowRight, BarChart3, Clock, MessageCircle, Send,
  MapPin, GitBranch, Server
} from 'lucide-react';

// --- 1. COUNTDOWN TIMER BANNER WITH GOOGLE RATING & SCROLLING MARQUEE ---
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let targetTime = localStorage.getItem('lms_countdown_target');
    if (!targetTime) {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      targetTime = date.getTime().toString();
      localStorage.setItem('lms_countdown_target', targetTime);
    }
    const targetDate = new Date(parseInt(targetTime, 10));

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    { text: "50% OFF Full Stack Course", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
    { text: "Free Certification", gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { text: "Lifetime Access", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" },
    { text: "1-on-1 Mentorship", gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)" },
    { text: "Job Guarantee", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { text: "Money Back Guarantee", gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" }
  ];

  return (
    <div style={{
      background: '#1e40af',
      width: '100%',
      padding: isMobile ? '1rem' : '0.8rem 2rem',
      color: '#ffffff',
      zIndex: 100,
      position: 'relative',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.2rem',
        minHeight: isMobile ? 'auto' : '4.5rem',
        textAlign: 'center'
      }}>
        {/* Google Rating Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Google Rating </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#facc15', fontSize: '1.1rem' }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>5/5</span>
          </div>
        </div>

        {/* Countdown Clock Column */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
          <Clock size={16} />
          <span>Enroll within</span>
          <div style={{ display: 'flex', gap: '4px', fontFamily: 'monospace' }}>
            <span style={{ background: '#FC6A03', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>{timeLeft.days}d</span>
            <span style={{ background: '#FC6A03', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>{timeLeft.hours}h</span>
            <span style={{ background: '#FC6A03', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>{timeLeft.minutes}m</span>
            <span style={{ background: '#FC6A03', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>{timeLeft.seconds}s</span>
          </div>
          <span>to claim</span>
          <span style={{ background: '#000000', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontWeight: 800, fontSize: '0.8rem' }}>
            50% OFF! 🎯
          </span>
        </div>

        {/* Marquee Offers Column */}
        <div className="marquee-container" style={{ width: isMobile ? '100%' : '30%', minWidth: '220px' }}>
          <div className="marquee-content">
            {[...offers, ...offers].map((offer, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  background: offer.gradient,
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {offer.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. VIDEO CARD COMPONENT ---
function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative', width: '100%', height: '220px' }}>
        <video
          ref={videoRef}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          controls
          preload="metadata"
          poster={video.thumbnail}
          onPause={handlePause}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <div
            onClick={handlePlay}
            style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <div style={{
              background: '#ffffff', borderRadius: '50%', width: '56px', height: '56px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              <Play className="h-6 w-6" style={{ fill: '#1e40af', color: '#1e40af', marginLeft: '3px' }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
          {video.title}
        </h4>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
          Experience our hands-on approach to learning with real-world projects.
        </p>
      </div>
    </div>
  );
}

// --- 3. FEATURES SECTION ---
function FeaturesSection() {
  const features = [
    { icon: Award, title: "Industry Experts", description: "Learn from professionals with 10+ years of real-world experience", color: "linear-gradient(135deg, #facc15 0%, #ca8a04 100%)" },
    { icon: Users, title: "Community Support", description: "Join 50,000+ students in our active learning community", color: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)" },
    { icon: TrendingUp, title: "Career Growth", description: "95% of our graduates get promoted or land better jobs", color: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)" },
    { icon: Shield, title: "Lifetime Access", description: "Keep learning with lifetime access to all course materials", color: "linear-gradient(135deg, #c084fc 0%, #9333ea 100%)" },
    { icon: Zap, title: "Hands-on Projects", description: "Build real-world projects for your professional portfolio", color: "linear-gradient(135deg, #f472b6 0%, #db2777 100%)" },
    { icon: BookOpen, title: "Flexible Learning", description: "Study at your own pace with 24/7 online access", color: "linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)" }
  ];

  return (
    <section id="why-choose" style={{ padding: '5rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
            Why Choose <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Alpha Fly</span>?
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
            Join thousands of successful graduates who have transformed their careers with our proven methodology.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} style={{
                background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem',
                boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
              >
                <div style={{
                  background: f.color, width: '64px', height: '64px', borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', margin: '0 auto 0.5rem'
                }}>
                  <Icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{f.title}</h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- 4. COURSE CAROUSEL / AVAILABLE COURSES ---
function CourseCarouselSection() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const coursesCatalog = [
    { 
      title: 'Web Design (HTML, CSS & Bootstrap)', 
      modules: '12 Modules', 
      desc: 'Build responsive layouts using semantic structures, CSS Grid, Flexbox, and Bootstrap.', 
      icon: <Layers size={24} />,
      color: '#2563eb', bg: 'rgba(37, 99, 235, 0.08)', accent: '#3b82f6',
      topics: ['HTML5 Semantic Elements & Media Tags', 'CSS3 Selectors & Box Model Layouts', 'Flexbox & CSS Grid Alignment', 'Bootstrap Grid System & Utility Classes', 'Responsive Media Queries & Custom Portfolios']
    },
    { 
      title: 'AI-Powered SQL Course', 
      modules: '9 Modules', 
      desc: 'Master relational databases, write DDL/DML, and optimize statements with AI assistants.', 
      icon: <Database size={24} />,
      color: '#059669', bg: 'rgba(5, 150, 105, 0.08)', accent: '#10b981',
      topics: ['Introduction to Relational DB & DDL Queries', 'DML Statements (Insert, Update, Delete)', 'SELECT Queries, WHERE Filters & ORDER BY', 'Relational Joins & Set Operations', 'Database Views, Subqueries & Indexes']
    },
    { 
      title: 'SQL for Data Analytics', 
      modules: '8 Modules + Capstone', 
      desc: 'Solve real-world sales and retail problems using SQL joins, aggregates, and window functions.', 
      icon: <Database size={24} />,
      color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)', accent: '#0ea5e9',
      topics: ['Analytic SQL Functions & GROUP BY Queries', 'Advanced Window Functions (ROW_NUMBER, RANK)', 'Common Table Expressions (CTEs) & Subqueries', 'Data Normalization & Star Schema Design', 'Sales Performance Analytics Capstone']
    },
    { 
      title: 'Python Core & OOPs Course', 
      modules: '13 Modules', 
      desc: 'Master variables, loops, file streams, regex, and core object-oriented structures in Python.', 
      icon: <Terminal size={24} />,
      color: '#d97706', bg: 'rgba(217, 119, 6, 0.08)', accent: '#f59e0b',
      topics: ['Python Syntax, Variables & Dynamic Typing', 'Control Flow Statements & Loop Loops', 'Functions, Return Values & Scope Limits', 'Object-Oriented Programming (Classes, Inheritance)', 'File Handling Operations & Regular Expressions']
    },
    { 
      title: 'Python for Data Analytics', 
      modules: '8 Modules', 
      desc: 'Master core programming constructs, files, regex, and data manipulation setups for analysts.', 
      icon: <Terminal size={24} />,
      color: '#b45309', bg: 'rgba(180, 83, 9, 0.08)', accent: '#d97706',
      topics: ['Introduction to Python for Data Analysis', 'Advanced List Comprehensions & Lambdas', 'Data Streams & Text Processing Pipelines', 'Exception Handling & Clean Code Rules', 'Data Extraction Case Studies']
    },
    { 
      title: 'JavaScript Programming Course', 
      modules: '10 Modules', 
      desc: 'Learn core scripting logic, variables, complex data types, and ES6+ features with modern tools.', 
      icon: <Code size={24} />,
      color: '#ca8a04', bg: 'rgba(202, 138, 4, 0.08)', accent: '#eab308',
      topics: ['Variables (var, let, const) & Data Types', 'Conditional Logic & Loop Iterators', 'Functions, Parameters & Execution Scopes', 'DOM Manipulations & Event Listeners', 'ES6 Modules & Package Import/Exports']
    },
    { 
      title: 'Core JavaScript', 
      modules: '1 Day (1 Module)', 
      desc: 'Master JavaScript fundamentals, variable scopes, data types, and execution context.', 
      icon: <Code size={24} />,
      color: '#854d0e', bg: 'rgba(133, 77, 14, 0.08)', accent: '#ca8a04',
      topics: ['Execution Context & Scope Chains', 'Functional Scope vs Block Scopes', 'DOM Dynamic Nodes Manipulation', 'ES6 Variables & Native Arrays Methods']
    },
    { 
      title: 'React JS Development', 
      modules: '15 Modules', 
      desc: 'Master component-driven architecture, declarative state models, DOM reconciliation, and Vite.', 
      icon: <Layers size={24} />,
      color: '#0891b2', bg: 'rgba(8, 145, 178, 0.08)', accent: '#06b6d4',
      topics: ['React Component Trees & Props Structures', 'Declarative Local States & Event Handling', 'React Hooks (useState, useEffect, useRef)', 'Vite Bundler & Dynamic Import Splits', 'Single Page Application Routing Hooks']
    },
    { 
      title: 'Git & GitHub', 
      modules: '2 Modules', 
      desc: 'Master local Git version control histories, branch merging, conflicts, and remote pushes.', 
      icon: <GitBranch size={24} />,
      color: '#4f46e5', bg: 'rgba(79, 70, 229, 0.08)', accent: '#6366f1',
      topics: ['Git Repository Init & Local Commits', 'Staging Area, git diff & Working Directories', 'GitHub Remotes, Repository Push & Pulls', 'Branch Management, Merging & Conflicts Resolution']
    },
    { 
      title: 'JSON Essentials', 
      modules: '1 Module', 
      desc: 'Learn standard JSON schema specifications, serialization, parsing, and validations.', 
      icon: <Code size={24} />,
      color: '#be185d', bg: 'rgba(190, 24, 93, 0.08)', accent: '#ec4899',
      topics: ['JSON Schema Specifications & Syntaxes', 'JSON Serialization & De-serialization Maps', 'Client-Server JSON Data Transfer Schemas']
    },
    { 
      title: 'Django Framework', 
      modules: '10 Modules', 
      desc: 'Master Python backend servers, MVT model systems, ORM databases, and built-in Admin portal.', 
      icon: <Server size={24} />,
      color: '#15803d', bg: 'rgba(21, 128, 61, 0.08)', accent: '#22c55e',
      topics: ['Django MVT (Model-View-Template) Pattern', 'Routing and URLs Mapping Parameters', 'Django ORM Models & SQLite Configurations', 'Built-in Admin Panel Dashboards Customization', 'Template Context Variables & Template Tags']
    },
    { 
      title: 'DevOps & Cloud Deploy', 
      modules: '3 Modules', 
      desc: 'Master continuous deployments, web servers config, lock configs, and cloud hosting.', 
      icon: <Server size={24} />,
      color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.08)', accent: '#8b5cf6',
      topics: ['Local Hosting Servers Setup & Configurations', 'Server Configuration Locking Strategies', 'Vite App Bundles Production Deployment']
    },
    { 
      title: 'Summer SQL Crash Course', 
      modules: '7 Modules', 
      desc: 'Learn primary relational commands, simple select filters, group calculations, and database structures.', 
      icon: <Database size={24} />,
      color: '#c2410c', bg: 'rgba(194, 65, 12, 0.08)', accent: '#f97316',
      topics: ['Relational Database Entities & Primary Keys', 'Relational Table Schema Configurations', 'Filtering Operators & Basic Join Queries', 'Aggregations & Math Analysis Operations']
    },
    { 
      title: 'Generative AI Masterclass', 
      modules: '20 Days (4 Modules)', 
      desc: 'Master prompt structuring, token contexts, API structures, context constraints, and ethics.', 
      icon: <Bot size={24} />,
      color: '#6d28d9', bg: 'rgba(109, 40, 217, 0.08)', accent: '#7c3aed',
      topics: ['Prompt Construction Systems & Engineering Rules', 'Tokenizer Systems & Word Token Map Visuals', 'In-Context Examples & Output Constraints', 'AI Ethics, Privacy & Safety Guidelines']
    },
    { 
      title: 'Agentic AI Engineering', 
      modules: '40 Days (8 Modules)', 
      desc: 'Master multi-agent systems, CrewAI schemas, Agno AI tools calling, and LangChain loops.', 
      icon: <Brain size={24} />,
      color: '#4338ca', bg: 'rgba(67, 56, 202, 0.08)', accent: '#4f46e5',
      topics: ['Multi-Agent Collaborative Design Patterns', 'CrewAI Agent Roles & Tasks Definitions', 'Tool Calling Orchestrations & Custom APIs', 'Agentic Router Workflows & Loop Control']
    },
    { 
      title: 'Power BI Data Analytics', 
      modules: '8 Days (8 Modules)', 
      desc: 'Master data modeling, ETL Power Query pipelines, DAX metrics engineering, and dashboard reports.', 
      icon: <BarChart3 size={24} />,
      color: '#a21caf', bg: 'rgba(162, 28, 175, 0.08)', accent: '#d946ef',
      topics: ['ETL Data Pipelines & Power Query Editors', 'Relational Data Modeling & Star Schemas', 'Calculated Columns vs Measures Calculations', 'DAX Syntax Rules & Math Formulations', 'Dynamic Visualizations & Report Dashboards']
    },
    { 
      title: 'Statistics for Data Analytics', 
      modules: '17 Days', 
      desc: 'Master descriptive & inferential stats, probability, hypothesis testing, and regressions.', 
      icon: <BarChart3 size={24} />,
      color: '#0369a1', bg: 'rgba(3, 105, 161, 0.08)', accent: '#0284c7',
      topics: ['Descriptive Stats (Mean, Median, Mode)', 'Measures of Dispersion (Variance, StdDev)', 'Probability Theories & Central Limit Theorem', 'Hypothesis Testing Frameworks & P-Values', 'Confidence Intervals & Data Skewness Checks']
    },
    { 
      title: 'NumPy for Data Science', 
      modules: '1 Day (Module 1)', 
      desc: 'Master multi-dimensional array operations, scientific calculations, indexing, and masking.', 
      icon: <Code size={24} />,
      color: '#475569', bg: 'rgba(71, 85, 105, 0.08)', accent: '#64748b',
      topics: ['Vectorized Array Calculations & Memory Layouts', 'Array Slicing, Reshaping & Transformations', 'Boolean Masking Filters & Mathematical Operations']
    },
    { 
      title: 'Pandas for Data Science', 
      modules: '6 Days (6 Modules)', 
      desc: 'Master DataFrame operations, Series, data ingestion, filtering, grouping, and EDA in Pandas.', 
      icon: <Database size={24} />,
      color: '#1e3a8a', bg: 'rgba(30, 58, 138, 0.08)', accent: '#1e40af',
      topics: ['Pandas Series & DataFrames Data Ingestions', 'DataFrame Filtering, Slicing & Subsettings', 'Null Data Cleaning & Typings Replacements', 'Grouping Data & Advanced Aggregations Methods', 'Exploratory Data Analysis Case Studies']
    },
    { 
      title: 'Matplotlib for Data Science', 
      modules: '5 Days (5 Modules)', 
      desc: 'Master data visualization, line/bar/scatter charting styles, subplots, and annotations.', 
      icon: <BarChart3 size={24} />,
      color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)', accent: '#f43f5e',
      topics: ['Custom Line & Bar Charts Layouts Customization', 'Scatter Plotting & Data Distributions Mappings', 'Subplots Grids Configurations & Layout Padding', 'Dynamic Annotations & Legends Formatting']
    },
    { 
      title: 'Seaborn for Data Science', 
      modules: '4 Days (4 Modules)', 
      desc: 'Master professional statistical plots, categorical box/violin charts, and heatmaps.', 
      icon: <Layers size={24} />,
      color: '#0f766e', bg: 'rgba(15, 118, 110, 0.08)', accent: '#14b8a6',
      topics: ['Statistical Grid Plots & Relationships Mappings', 'Categorical Box Plots & Violin Curves Charts', 'Correlation Matrix Heatmaps Color Customization', 'Clean Grid Themes & Color Palettes Configurations']
    },
    { 
      title: 'AI powered Tally', 
      modules: '5 Modules (41 Days)', 
      desc: 'Master double-entry accounting, GST, TDS, inventory audits, bank reconciliation, and AI-assisted financial checking.', 
      icon: <Database size={24} />,
      color: '#047857', bg: 'rgba(4, 120, 87, 0.08)', accent: '#10b981',
      topics: ['Double-Entry Ledger & Voucher Entries', 'Educational Mode Multi-currency Transactions', 'Statutory GST & TDS Return Fillings Diagnostics', 'Bank Reconciliations & Cost Center Budgets', 'AI-Powered Accounting Audits & Capstone Review']
    }
  ];

  const visibleCardsCount = isMobile ? 1 : 3;
  const maxIndex = coursesCatalog.length - visibleCardsCount;

  useEffect(() => {
    if (selectedCourse) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex, selectedCourse]);
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="courses" style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.15)',
            fontSize: '0.78rem', fontWeight: 800, padding: '0.3rem 0.8rem', borderRadius: '20px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem'
          }}>
            Featured Courses
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>Available Courses</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Explore our comprehensive courses designed to help you master new skills.
          </p>
        </div>

        {/* Carousel Container */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{
              position: 'absolute', left: '-15px', zIndex: 10,
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '50%',
              width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', opacity: currentIndex === 0 ? 0.3 : 1,
              transition: 'var(--transition)'
            }}
          >
            <ChevronLeft size={22} style={{ color: '#0f172a' }} />
          </button>

          {/* Carousel Slider Window */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(-${currentIndex * (100 / visibleCardsCount)}%)`
            }}>
              {coursesCatalog.map((c, i) => (
                <div key={i} style={{
                  flex: `0 0 ${100 / visibleCardsCount}%`,
                  padding: '0 12px',
                  boxSizing: 'border-box'
                }}>
                  <div 
                    onClick={() => setSelectedCourse(c)}
                    style={{
                      background: '#ffffff', border: '1px solid #e2e8f0', borderTop: `4px solid ${c.accent}`, borderRadius: '24px', padding: '2rem',
                      boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px',
                      cursor: 'pointer', transition: 'var(--transition)', position: 'relative', height: '100%'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = `0 12px 24px ${c.bg}`;
                      e.currentTarget.style.borderColor = c.accent;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div>
                      <div style={{ background: c.bg, color: c.color, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                        {c.icon}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>{c.title}</h3>
                      <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.desc}</p>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>{c.modules}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: c.accent, display: 'flex', alignItems: 'center', gap: '2px' }}>
                        View Syllabus
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            style={{
              position: 'absolute', right: '-15px', zIndex: 10,
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '50%',
              width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)', cursor: currentIndex === maxIndex ? 'not-allowed' : 'pointer', opacity: currentIndex === maxIndex ? 0.3 : 1,
              transition: 'var(--transition)'
            }}
          >
            <ChevronRight size={22} style={{ color: '#0f172a' }} />
          </button>
        </div>

        {/* Modal Overlay for Course Overview Syllabus */}
        {selectedCourse && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}>
            <div style={{
              background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '2.5rem',
              maxWidth: '560px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)', maxHeight: '90vh', overflowY: 'auto', position: 'relative'
            }}>
              {/* Close Icon Button */}
              <button 
                onClick={() => setSelectedCourse(null)}
                style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none',
                  color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedCourse.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{selectedCourse.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{selectedCourse.modules} • Alpha Fly Syllabus</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Course Overview</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>{selectedCourse.desc}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.6rem' }}>Core Modules Syllabus</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedCourse.topics.map((topic, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem', lineHeight: 1.2 }}>✓</span>
                      <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Alert Banner - Self-Enrollment Disabled */}
              <div style={{
                display: 'flex', gap: '12px', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '12px', color: '#991b1b', fontSize: '0.85rem', lineHeight: 1.4
              }}>
                <ShieldAlert size={20} style={{ flexShrink: 0 }} />
                <div>
                  <span style={{ fontWeight: 800 }}>Enrollment Policy:</span> Direct self-enrollment is disabled for this syllabus. Registration is handled manually by counselor staff at the campus office.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setSelectedCourse(null)}
                  style={{
                    flex: 1, background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.8rem',
                    borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', transition: 'var(--transition)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e293b'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0f172a'}
                >
                  Close Overview
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

// --- 5. TESTIMONIALS WITH ELFSIGHT GOOGLE REVIEWS INJECTION ---
function TestimonialsSection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="testimonials" style={{ padding: '5rem 2rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
            What Our <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Students Say</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Don't just take our word for it - hear from our successful students who have transformed their careers.
          </p>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <div className="elfsight-app-a7b120ec-7306-4e76-8c57-4a04e5e999eb" data-elfsight-app-lazy></div>
        </div>

      </div>
    </section>
  );
}

// --- 6. CONTACT SECTION WITH DETAILED ADDRESS & INQUIRY FORM ---
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    alert(`Message sent successfully! Our counselors will get back to you within 24 hours.`);
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" style={{ padding: '5rem 2rem', background: '#f8fafc', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 0.5rem 0' }}>
            Ready to Start Your <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Learning Journey?</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.55 }}>
            Connect with our expert team today and discover how Alpha Fly can transform your career through cutting-edge education and hands-on experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
          
          {/* Left Column: Form */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>Send us a Message</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '2rem' }}>We'll get back to you within 24 hours</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                  <input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="name@example.com"
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Phone Number</label>
                  <input
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Course of Interest</label>
                  <input
                    value={formData.course}
                    onChange={e => setFormData({ ...formData, course: e.target.value })}
                    placeholder="e.g. Full Stack"
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.4rem' }}>Message *</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  placeholder="Tell us about your learning goals..."
                  style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem', outline: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#ffffff', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', fontSize: '1rem' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column: Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: 'rgba(59,130,246,0.08)', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>Visit Our Campus</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  K S Complex, Old Bus Stand, Subban Chetty Street, Suppan Ragavan Colony, NRT Nagar, Theni, Tamil Nadu 625531
                </p>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: 'rgba(59,130,246,0.08)', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>Call Us</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>
                  +91 8015 8016 89
                </p>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: 'rgba(59,130,246,0.08)', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0' }}>Email Us</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>
                  alphafly.edu@gmail.com
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- 7. FLOATING COURSE CHATBOT ASSISTANT ---
function CourseChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', type: 'bot', content: 'Hello! 👋 I\'m here to help you with course inquiries. What would you like to know about our courses?', timestamp: new Date() }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });

  const predefinedResponses = {
    'courses': 'We offer various courses including:\n• Web Development (Frontend & Backend)\n• Data Science & Machine Learning\n• UI/UX Design\n• Digital Marketing\n• Mobile App Development\n• Cloud Computing\n\nWould you like more details about any specific course?',
    'web development': 'Our Web Development course covers:\n• HTML, CSS, JavaScript\n• React.js & Node.js\n• Database Management\n• API Development\n• Deployment & DevOps\n\nDuration: 6 months\nMode: Online & Offline\nCertification: Industry recognized\n\nWould you like to get more information or speak with our counselor?',
    'data science': 'Our Data Science course includes:\n• Python Programming\n• Statistics & Mathematics\n• Machine Learning\n• Data Visualization\n• Big Data Analytics\n\nDuration: 8 months\nMode: Online & Offline\nPlacement Support: 100%\n\nInterested in enrolling or need more details?',
    'ui/ux': 'Our UI/UX Design course covers:\n• Design Principles\n• Figma & Adobe XD\n• User Research\n• Prototyping\n• Portfolio Development\n\nDuration: 4 months\nMode: Online\nIncludes: Live Projects\n\nWant to know about admission process?',
    'fees': 'Our course fees vary based on the program:\n• Web Development: ₹45,000\n• Data Science: ₹65,000\n• UI/UX Design: ₹35,000\n• Digital Marketing: ₹25,000\n\nWe offer:\n• EMI options available\n• Early bird discounts\n• Scholarship programs\n\nWould you like to discuss payment options?',
    'placement': 'We have excellent placement support:\n• 95% placement rate\n• Average salary: ₹8.5 LPA\n• 500+ hiring partners\n• Dedicated placement team\n• Interview preparation\n• Resume building support\n\nWant to connect with our placement team?',
    'contact': 'You can reach us at:\n📍 No 10, K S Complex, Old Bus Stand, Theni, Tamil Nadu\n📞 080158 01689\n✉️ info@alphaflyeducation.com\n\nWould you like to schedule a counseling session?'
  };

  const addMessage = (content, type) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), type, content, timestamp: new Date() }]);
  };

  const handleUserMessage = (text) => {
    addMessage(text, 'user');
    const input = text.toLowerCase();
    let botResponse = '';

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (input.includes(key)) {
        botResponse = response;
        break;
      }
    }

    if (!botResponse) {
      botResponse = 'Thank you for your inquiry! You can ask me about:\n\n• Available Courses\n• Fees & Payment Options\n• Placement Support\n• Contact Information\n\nOr click the green button below to fill out a counseling request!';
    }

    setTimeout(() => {
      addMessage(botResponse, 'bot');
    }, 1000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    alert('Thank you! Inquiry submitted successfully. Our counselors will reach out within 24 hours.');
    addMessage(`Thank you ${formData.name}! Your inquiry has been submitted. We'll contact you soon.`, 'bot');
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    setIsSubmitting(false);
  };

  const quickReplies = ['Available Courses', 'Web Development', 'Data Science', 'Fees & Payment', 'Placement Support', 'Contact Information'];

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #FC6A15 0%, #FC6A03 100%)',
            color: '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(252,106,3,0.35)'
          }}
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div style={{ width: '380px', height: '540px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #4f46e5 100%)', padding: '1.25rem', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Course Assistant</h4>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Online to help you</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ border: 'none', background: 'none', color: '#ffffff', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Chat content */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc' }}>
            {!showForm ? (
              <>
                {messages.map(m => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: m.type === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      background: m.type === 'user' ? '#1e40af' : '#ffffff',
                      color: m.type === 'user' ? '#ffffff' : '#334155',
                      border: m.type === 'user' ? 'none' : '1px solid #e2e8f0',
                      padding: '0.8rem 1rem',
                      borderRadius: m.type === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      maxWidth: '80%',
                      fontSize: '0.85rem',
                      lineHeight: 1.45,
                      whiteSpace: 'pre-line'
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '0.2rem' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Quick Inquiry</h4>
                <input
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                />
                <input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                />
                <input
                  placeholder="Course Interest"
                  value={formData.course}
                  onChange={e => setFormData({ ...formData, course: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Inquiry detail..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem 0.8rem', fontSize: '0.85rem', border: '1px solid #e2e8f0', borderRadius: '6px', resize: 'none' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '0.4rem' }}>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem' }}>Back</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem' }} disabled={isSubmitting}>Submit</button>
                </div>
              </form>
            )}
          </div>

          {/* Footer quick replies */}
          {!showForm && (
            <div style={{ padding: '0.8rem', borderTop: '1px solid #e2e8f0', background: '#ffffff' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                {quickReplies.slice(0, 3).map((reply, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleUserMessage(reply)}
                    style={{
                      border: '1px solid #3b82f6', color: '#3b82f6', background: 'rgba(59,130,246,0.05)',
                      padding: '3px 8px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    {reply}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  width: '100%', background: '#10b981', color: '#ffffff', border: 'none', padding: '0.5rem',
                  borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                }}
              >
                Get Personalized Assistance
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// --- MAIN PORTAL HOMEPAGE EXPORT ---
export default function LandingPage({ onLoginSuccess }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [accessCode, setAccessCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOrCreateDeviceId = () => {
    let id = localStorage.getItem('lms_device_uuid');
    if (!id) {
      id = 'dev-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('lms_device_uuid', id);
    }
    return id;
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!accessCode.trim()) {
      setErrorMsg('Please enter your Access Code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode: accessCode.trim(), deviceId: getOrCreateDeviceId() })
      });
      if (res.ok) {
        const studentData = await res.json();
        onLoginSuccess({
          role: 'student',
          name: studentData.name,
          username: studentData.accessCode,
          enrolledCourse: studentData.enrolledCourse,
          token: 'mock-student-session-token',
          accessCode: studentData.accessCode,
          studentId: studentData._id || studentData.id
        });
      } else {
        const err = await res.json();
        setErrorMsg(err.error || 'Login failed. Check Access Key.');
      }
    } catch (err) {
      setErrorMsg('Could not reach database server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStaffAdminSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: activeTab, username: username.trim(), password: password.trim() })
      });
      if (res.ok) {
        const authData = await res.json();
        onLoginSuccess({
          role: authData.role,
          name: authData.name,
          username: authData.username,
          token: authData.token,
          enrolledCourse: 'all'
        });
      } else {
        const err = await res.json();
        setErrorMsg(err.error || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorMsg('Could not reach database server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (role) => {
    setActiveTab(role);
    setErrorMsg('');
    setAccessCode('');
    setUsername('');
    setPassword('');
  };

  const videos = [
    { id: 1, title: "Programming Fundamentals", src: "/videos/alphavideo1.mp4", thumbnail: "/thumbnails/a11.jpg" },
    { id: 2, title: "Web Development Mastery", src: "/videos/alphavideo2.mp4", thumbnail: "/thumbnails/a10.jpg" },
    { id: 3, title: "Data Science Excellence", src: "/videos/alphavideo3.mp4", thumbnail: "/thumbnails/a7.png" }
  ];

  return (
    <div style={{ fontFamily: 'var(--font-family)', background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ⏳ Countdown Banner */}
      <CountdownTimer />

      {/* 🧭 NAVIGATION BAR */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 90, boxShadow: 'var(--shadow-sm)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
          
          {/* Logo brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="images/logo1.png" alt="Alpha Fly Logo" style={{ height: isMobile ? '48px' : '72px', width: 'auto' }} />
          </div>

          {isMobile ? (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem'
              }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          ) : (
            /* Desktop Nav anchors */
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="#courses" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Courses</a>
              <a href="#why-choose" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Why Choose Us</a>
              <a href="#contact" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Contact</a>
              
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                style={{
                  background: '#1e40af', color: '#ffffff', border: 'none', padding: '0.6rem 1.4rem', 
                  fontSize: '0.9rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', transition: 'var(--transition)'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1e40af'}
              >
                LOGIN
              </button>
            </div>
          )}

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobile && isMobileMenuOpen && (
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            borderTop: '1px solid #e2e8f0',
            padding: '1.5rem 2rem',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            boxSizing: 'border-box'
          }}>
            <a 
              href="#courses" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '1rem' }}
            >
              Courses
            </a>
            <a 
              href="#why-choose" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '1rem' }}
            >
              Why Choose Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '1rem' }}
            >
              Contact
            </a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLoginModalOpen(true);
              }}
              style={{
                background: '#1e40af', color: '#ffffff', border: 'none', padding: '0.6rem 1.4rem', 
                fontSize: '0.95rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', width: 'fit-content'
              }}
            >
              LOGIN
            </button>
          </div>
        )}
      </header>

      {/* 🚀 HERO BLUE SPACE BANNER & DEMO GALLERY */}
      <section style={{ background: '#1e40af', color: '#ffffff', padding: '4rem 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23ffffff'/%3E%3C/svg%3E\")" }} />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', zIndex: 10, position: 'relative' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.8rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
            Next Generation Learning Space
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
            Unlocking the Power of Minds
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00FF00', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1.2rem', borderRadius: '9999px' }}>📚 Enrolled Students: 300+</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00FF00', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1.2rem', borderRadius: '9999px' }}>✅ Success Rate: 90%+</span>
          </div>

          {/* Videos gallery row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            {videos.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 SECTIONS */}
      <FeaturesSection />
      <CourseCarouselSection />
      <TestimonialsSection />
      <ContactSection />

      {/* 🏛️ FOOTER */}
      <footer style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '4rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <img src="images/logo2.png" alt="Alpha Fly Logo" style={{ height: '72px', width: 'auto', alignSelf: 'flex-start' }} />
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Transforming careers through quality education and practical skills development since 2023.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>Courses</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
              <li><a href="#courses" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.88rem' }}>Full Stack Development</a></li>
              <li><a href="#courses" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.88rem' }}>Data Science & AI</a></li>
              <li><a href="#courses" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.88rem' }}>SAP Operations</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0 }}>
              <li><span style={{ color: '#64748b', fontSize: '0.88rem' }}>Help Center</span></li>
              <li><span style={{ color: '#64748b', fontSize: '0.88rem' }}>Career Mentors</span></li>
              <li><span style={{ color: '#64748b', fontSize: '0.88rem' }}>Success Stories</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem' }}>Contact Office</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0, color: '#64748b', fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> alphafly.edu@gmail.com</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> +91 8015 8016 89</li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem' }}>
          <p>&copy; 2026 Alpha Fly. All rights reserved.</p>
        </div>
      </footer>

      {/* 🔐 INTERACTIVE GLASSMORPHIC LOGIN MODAL */}
      {isLoginModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          
          <div style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--surface-border)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '440px',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem', border: 'none', background: 'none',
                color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px'
              }}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 0.4rem 0' }}>LMS Study Portal</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>Select role type to authenticate credentials</p>
            </div>

            {/* Role Tab Switches */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'var(--bg-color)',
              border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '0.25rem', marginBottom: '1.8rem'
            }}>
              {['student', 'staff', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleTabChange(role)}
                  style={{
                    background: activeTab === role ? 'var(--surface-color)' : 'none',
                    border: 'none',
                    color: activeTab === role ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    textTransform: 'capitalize',
                    padding: '0.5rem 0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Student Auth Form */}
            {activeTab === 'student' ? (
              <form onSubmit={handleStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                    Access Key Code
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Key size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="e.g. STU-1234"
                      required
                      style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.25rem', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex', gap: '8px', alignItems: 'flex-start', backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: '12px', padding: '0.8rem 1rem',
                  fontSize: '0.78rem', color: '#d97706', lineHeight: 1.45
                }}>
                  <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    <strong>Device Lock Security:</strong> Student keys lock dynamically to your first logging browser device. Contact staff to reset locks if needed.
                  </span>
                </div>

                {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 700 }}>⚠️ {errorMsg}</div>}

                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '12px', fontSize: '0.95rem' }} disabled={isLoading}>
                  {isLoading ? 'Verifying access key...' : 'Access LMS Portal'}
                </button>
              </form>
            ) : (
              // Staff/Admin Auth Form
              <form onSubmit={handleStaffAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                    Username ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                    Password Key
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.92rem' }}
                  />
                </div>

                {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 700 }}>⚠️ {errorMsg}</div>}

                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: '12px', fontSize: '0.95rem' }} disabled={isLoading}>
                  {isLoading ? 'Verifying credentials...' : `Authenticate as ${activeTab}`}
                </button>
              </form>
            )}

          </div>

        </div>
      )}

      {/* 💬 Floating chatbot assistant */}
      <CourseChatbot />

    </div>
  );
}
