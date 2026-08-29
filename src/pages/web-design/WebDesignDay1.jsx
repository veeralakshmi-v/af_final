import React, { useState } from 'react';
import { 
  BookOpen, MonitorPlay, LayoutGrid, Layers, Code, PenTool,
  Briefcase, Sparkles, CheckCircle, Trophy, ChevronRight, 
  ArrowRight, Lightbulb, RefreshCw, Terminal, Eye
} from 'lucide-react';

export default function WebDesignDay1({ activeTab = 'intro', onNavigate, openAITutor }) {
  const handleTabChange = (tabId) => {
    if (onNavigate) {
      onNavigate('web_design_day1', tabId);
    }
  };

  // --- Meaningful Completion & Progress Tracking State ---
  const [completedSteps, setCompletedSteps] = useState({
    intro: true,
    practice: false,
    assignment: false,
    quiz: false
  });

  // --- Interactive Visual Wireframe State ---
  const [selectedWireframeSection, setSelectedWireframeSection] = useState('navbar');

  // --- Section Explorer State ---
  const [selectedExplorerSection, setSelectedExplorerSection] = useState('hero');

  // --- 3-Layer Visual Demo State ---
  const [activeLayer, setActiveLayer] = useState('all'); // 'html' | 'css' | 'js' | 'all'
  const [isDemoLoggedIn, setIsDemoLoggedIn] = useState(false);

  // --- Topic 5: Live Output View Mode ---
  const [liveOutputView, setLiveOutputView] = useState('preview'); // 'preview' | 'code'

  // --- Topic 6: Practice Playground State ---
  const [practiceHtml, setPlaygroundHtml] = useState(`<h1>Alpha Fly IT Training Institute</h1>
<p>Build Skills. Build Confidence. Start Your Tech Career Today.</p>
<button style="background:#2563eb; color:white; padding:10px 20px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">
  Explore Courses
</button>`);

  const [showPracticeHint, setShowPracticeHint] = useState(false);
  const [showPracticeSolution, setShowPracticeSolution] = useState(false);

  // --- Topic 7: Task-Based Assignment State ---
  const [selectedBusiness, setSelectedBusiness] = useState('alphafly');
  const [assignmentCode, setAssignmentCode] = useState(`<header style="background:#1e1b4b; padding:1rem 1.5rem; border-radius:12px; color:#ffffff; display:flex; justify-content:space-between; align-items:center;">
  <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly Theni</div>
  <button style="background:#2563eb; color:white; border:none; padding:6px 14px; border-radius:6px; font-weight:800;">Contact Us</button>
</header>

<main style="background:#f8fafc; padding:1.75rem; border-radius:12px; margin-top:1rem; border:1px solid #cbd5e1; color:#0f172a;">
  <h1 style="color:#0f172a; font-size:1.8rem; margin:0 0 0.5rem 0;">Build Job-Ready Digital Skills in Theni</h1>
  <p style="color:#64748b; font-size:0.95rem; margin:0 0 1.25rem 0; line-height:1.6;">Join 100% practical web design and full-stack software development tracks with hands-on client projects.</p>

  <h3 style="color:#1e1b4b; font-size:1.1rem; margin:0 0 0.5rem 0;">Featured Learning Tracks:</h3>
  <ul style="color:#334155; line-height:1.8; margin:0 0 1.25rem 1.25rem;">
    <li>💻 <strong>Web Design &amp; Frontend Development</strong></li>
    <li>📊 <strong>Data Analytics &amp; Python</strong></li>
    <li>🤖 <strong>AI Engineering &amp; Automation</strong></li>
  </ul>

  <button style="background:#16a34a; color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:bold; cursor:pointer;">
    Enroll In Day 2 Track →
  </button>
</main>`);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // --- Topic 8: AI Challenge State ---
  const [aiBusinessType, setAiBusinessType] = useState('Dental Clinic');
  const [aiResult, setAiResult] = useState(null);

  // --- Topic 9: Quiz Answers State ---
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ---------------- Progress Calculation ----------------
  const quizAttempted = Object.keys(quizAnswers).length === 5;
  const isDay1FullyCompleted = completedSteps.practice && completedSteps.assignment && quizAttempted;
  
  // Progress score: Day 1 equals 5% of 20-Day Course (5% max for Day 1)
  const stepsDone = (completedSteps.intro ? 1 : 0) + (completedSteps.practice ? 1 : 0) + (completedSteps.assignment ? 1 : 0) + (quizAttempted ? 2 : 0);
  const day1Percent = Math.round((stepsDone / 5) * 100);
  const overallCourseProgress = isDay1FullyCompleted ? 5 : Math.round((stepsDone / 5) * 4);

  // ---------------- Data Collections ----------------
  const wireframeData = {
    navbar: {
      name: 'Navigation Bar (Navbar)',
      purpose: 'Helps visitors navigate smoothly between different pages and sections of the business website.',
      learnedLater: 'Day 2: Navigation Bar Construction & Hyperlinks',
      example: 'Logo + Home, About, Courses, Contact links + [Enroll Now] action button.',
      color: '#3b82f6'
    },
    hero: {
      name: 'Hero Banner Section',
      purpose: 'The top prominent banner that captures immediate attention and tells visitors what the business offers.',
      learnedLater: 'Day 5: Hero Image Assets & Day 9: Eye-catching CSS Gradients',
      example: 'Headline: "Build Job-Ready Digital Skills" + Subheading + Primary Call-to-Action button.',
      color: '#8b5cf6'
    },
    about: {
      name: 'About Us Section',
      purpose: 'Builds trust and credibility by sharing the business story, mission, and team experience.',
      learnedLater: 'Day 3: Text Formatting & Day 12: Two-Column Layouts',
      example: 'Institute story, mission statement, student enrollment stats, and campus photos.',
      color: '#ec4899'
    },
    services: {
      name: 'Services / Courses Cards Grid',
      purpose: 'Displays key services or training programs in clean, structured cards.',
      learnedLater: 'Day 6: Service Cards & Day 14: CSS Grid Multi-Column Layouts',
      example: 'Cards for Web Development, Data Analytics, Python Programming, and AI Engineering.',
      color: '#10b981'
    },
    testimonials: {
      name: 'Student Testimonials & Reviews',
      purpose: 'Provides social proof from previous clients or graduates to validate service quality.',
      learnedLater: 'Day 19: Interactive Testimonial Carousel & Review Sliders',
      example: 'Quotes from placed students with star ratings and job title badges.',
      color: '#f59e0b'
    },
    contact: {
      name: 'Lead Contact Form & Map',
      purpose: 'Allows prospective clients or students to send inquiries or locate the office.',
      learnedLater: 'Day 8: HTML Forms & Day 18: Real-Time Input Validation',
      example: 'Fields for Name, Email, Phone, Course, Message + [Submit] button.',
      color: '#06b6d4'
    },
    footer: {
      name: 'Website Footer',
      purpose: 'Contains copyright information, quick links, social media handles, and legal policies.',
      learnedLater: 'Day 4: Footer Hyperlinks & Day 10: Multi-Column Spacing',
      example: 'Copyright © 2026 Alpha Fly IT Training Institute • Privacy Policy • Terms.',
      color: '#64748b'
    }
  };

  const layoutSections = [
    { id: 'header', name: 'Header', purpose: 'Top area containing brand logo and primary contacts.', expect: 'Logo, emergency phone, operating hours.' },
    { id: 'navbar', name: 'Navigation Bar', purpose: 'Main menu for routing users across pages.', expect: 'Links to Home, Courses, Pricing, Contact.' },
    { id: 'hero', name: 'Hero Section', purpose: 'Primary headline banner with call to action.', expect: 'Big bold headline, short paragraph, button.' },
    { id: 'about', name: 'About Section', purpose: 'Explains who you are and why you exist.', expect: 'Company history, mission, photos.' },
    { id: 'services', name: 'Services / Courses', purpose: 'Showcases what products/services you offer.', expect: 'Grid of cards with titles and descriptions.' },
    { id: 'portfolio', name: 'Portfolio / Projects', purpose: 'Shows real proof of work completed.', expect: 'Gallery of student projects or case studies.' },
    { id: 'testimonials', name: 'Testimonials', purpose: 'Social proof and customer reviews.', expect: 'Quotes, star ratings, client names.' },
    { id: 'pricing', name: 'Pricing Table', purpose: 'Clear breakdown of pricing options.', expect: 'Tiered cards (Basic, Pro, Ultimate).' },
    { id: 'faq', name: 'FAQ Section', purpose: 'Answers common questions before purchase.', expect: 'Expandable question/answer list.' },
    { id: 'contact', name: 'Contact Section', purpose: 'Captures inquiries from interested visitors.', expect: 'Input form, phone, email, address.' },
    { id: 'footer', name: 'Footer', purpose: 'Bottom bar for legal links and social channels.', expect: 'Copyright info, sitemap links, social icons.' }
  ];

  const businessOptions = {
    alphafly: {
      name: 'Alpha Fly IT Training Institute',
      tag: 'IT Institute',
      code: `<div style="background:#0f172a; color:#f8fafc; border-radius:18px; padding:2rem; font-family:system-ui, sans-serif; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
  <header style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:1rem 1.5rem; border-radius:12px; margin-bottom:1.5rem; border:1px solid #334155;">
    <div style="font-size:1.2rem; font-weight:900; color:#60a5fa;">🚀 Alpha Fly IT</div>
    <nav style="display:flex; gap:1.2rem; font-size:0.85rem;">
      <a href="#" style="color:#cbd5e1; text-decoration:none; font-weight:600;">Home</a>
      <a href="#" style="color:#cbd5e1; text-decoration:none; font-weight:600;">Courses</a>
      <a href="#" style="color:#cbd5e1; text-decoration:none; font-weight:600;">Placements</a>
      <a href="#" style="color:#cbd5e1; text-decoration:none; font-weight:600;">Contact</a>
    </nav>
    <button style="background:#2563eb; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; font-size:0.8rem; cursor:pointer;">Enroll Now</button>
  </header>

  <div style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding:2rem; border-radius:14px; margin-bottom:1.5rem; border:1px solid #4338ca;">
    <span style="background:rgba(255,255,255,0.15); color:#a5b4fc; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">TOP-RATED IT ACADEMY</span>
    <h1 style="color:#ffffff; font-size:1.9rem; font-weight:900; margin:0.75rem 0 0.5rem 0;">Master Web Engineering &amp; AI Development</h1>
    <p style="color:#c7d2fe; font-size:0.95rem; margin:0 0 1.25rem 0; max-width:600px; line-height:1.5;">Build job-ready responsive websites, full-stack web applications, and AI integrations with 100% practical hands-on projects.</p>
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
      <button style="background:#2563eb; color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:bold; font-size:0.85rem; cursor:pointer;">Browse 20-Day Course</button>
      <button style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2); padding:10px 20px; border-radius:8px; font-weight:bold; font-size:0.85rem; cursor:pointer;">Download Syllabus</button>
    </div>
  </div>

  <h3 style="color:#ffffff; font-size:1.1rem; font-weight:800; margin:0 0 1rem 0;">🔥 Featured Programs</h3>
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
    <div style="background:#1e293b; padding:1.25rem; border-radius:12px; border:1px solid #334155;">
      <div style="color:#38bdf8; font-weight:800; font-size:0.8rem; text-transform:uppercase;">Track 1</div>
      <div style="color:#ffffff; font-weight:800; font-size:1rem; margin:4px 0;">AI Web Design</div>
      <div style="color:#94a3b8; font-size:0.82rem; line-height:1.4;">HTML5, CSS3, Flexbox, Grid, JS &amp; AI Prompt Engineering.</div>
    </div>
    <div style="background:#1e293b; padding:1.25rem; border-radius:12px; border:1px solid #334155;">
      <div style="color:#34d399; font-weight:800; font-size:0.8rem; text-transform:uppercase;">Track 2</div>
      <div style="color:#ffffff; font-weight:800; font-size:1rem; margin:4px 0;">Python FullStack</div>
      <div style="color:#94a3b8; font-size:0.82rem; line-height:1.4;">Django, REST APIs, PostgreSQL databases, &amp; Deployment.</div>
    </div>
    <div style="background:#1e293b; padding:1.25rem; border-radius:12px; border:1px solid #334155;">
      <div style="color:#fbbf24; font-weight:800; font-size:0.8rem; text-transform:uppercase;">Track 3</div>
      <div style="color:#ffffff; font-weight:800; font-size:1rem; margin:4px 0;">Agentic AI Systems</div>
      <div style="color:#94a3b8; font-size:0.82rem; line-height:1.4;">Building LLM agents, LangChain workflows, &amp; Automation.</div>
    </div>
  </div>

  <div style="display:flex; justify-content:space-between; background:#1e293b; padding:1rem 1.5rem; border-radius:12px; border:1px solid #334155; font-size:0.82rem; color:#94a3b8; flex-wrap:wrap; gap:10px;">
    <span>✅ 100% Practical Projects</span>
    <span>✅ 1-on-1 Code Reviews</span>
    <span>✅ Career Placement Assistance</span>
  </div>
</div>`
    },
    fitness: {
      name: 'PulseFit Gym & Fitness',
      tag: 'Health & Fitness',
      code: `<div style="background:#090d16; color:#f8fafc; border-radius:18px; padding:2rem; font-family:system-ui, sans-serif; border:1px solid #1e293b;">
  <header style="display:flex; justify-content:space-between; align-items:center; background:#111827; padding:1rem 1.5rem; border-radius:12px; margin-bottom:1.5rem; border-bottom:3px solid #ef4444;">
    <div style="font-size:1.2rem; font-weight:900; color:#ef4444;">⚡ PulseFit Gym</div>
    <nav style="display:flex; gap:1.2rem; font-size:0.85rem;">
      <a href="#" style="color:#f3f4f6; text-decoration:none; font-weight:600;">Home</a>
      <a href="#" style="color:#f3f4f6; text-decoration:none; font-weight:600;">Workouts</a>
      <a href="#" style="color:#f3f4f6; text-decoration:none; font-weight:600;">Trainers</a>
      <a href="#" style="color:#f3f4f6; text-decoration:none; font-weight:600;">Pricing</a>
    </nav>
    <button style="background:#ef4444; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; font-size:0.8rem; cursor:pointer;">Free Trial</button>
  </header>

  <div style="background:linear-gradient(135deg, #1f2937 0%, #111827 100%); padding:2rem; border-radius:14px; margin-bottom:1.5rem; border:1px solid #374151;">
    <span style="background:rgba(239,68,68,0.2); color:#fca5a5; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">PREMIUM FITNESS CLUB</span>
    <h1 style="color:#ffffff; font-size:1.9rem; font-weight:900; margin:0.75rem 0 0.5rem 0;">Transform Body &amp; Mind With Certified Trainers</h1>
    <p style="color:#9ca3af; font-size:0.95rem; margin:0 0 1.25rem 0; max-width:600px; line-height:1.5;">State-of-the-art strength equipment, HIIT cardio zones, personal coaching, and customized nutrition plans.</p>
    <button style="background:#ef4444; color:white; border:none; padding:10px 22px; border-radius:8px; font-weight:bold; font-size:0.85rem; cursor:pointer;">Claim 3-Day Pass</button>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
    <div style="background:#1f2937; padding:1.25rem; border-radius:12px; border-top:3px solid #ef4444;">
      <div style="color:#ef4444; font-weight:800; font-size:1rem;">Strength Training</div>
      <div style="color:#9ca3af; font-size:0.82rem; margin-top:4px;">Powerlifting racks, dumbbells &amp; Olympic weight bars.</div>
    </div>
    <div style="background:#1f2937; padding:1.25rem; border-radius:12px; border-top:3px solid #3b82f6;">
      <div style="color:#60a5fa; font-weight:800; font-size:1rem;">HIIT &amp; Cardio</div>
      <div style="color:#9ca3af; font-size:0.82rem; margin-top:4px;">High-intensity group sessions for maximum calorie burn.</div>
    </div>
    <div style="background:#1f2937; padding:1.25rem; border-radius:12px; border-top:3px solid #10b981;">
      <div style="color:#34d399; font-weight:800; font-size:1rem;">Yoga &amp; Mobility</div>
      <div style="color:#9ca3af; font-size:0.82rem; margin-top:4px;">Flexibility, core balance &amp; stress recovery classes.</div>
    </div>
  </div>
</div>`
    },
    tuition: {
      name: 'BrightSpark Learning Hub',
      tag: 'Education',
      code: `<div style="background:#eff6ff; color:#1e3a8a; border-radius:18px; padding:2rem; font-family:system-ui, sans-serif; border:1px solid #bfdbfe;">
  <header style="display:flex; justify-content:space-between; align-items:center; background:#ffffff; padding:1rem 1.5rem; border-radius:12px; margin-bottom:1.5rem; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    <div style="font-size:1.2rem; font-weight:900; color:#2563eb;">💡 BrightSpark</div>
    <nav style="display:flex; gap:1.2rem; font-size:0.85rem;">
      <a href="#" style="color:#1e40af; text-decoration:none; font-weight:600;">Home</a>
      <a href="#" style="color:#1e40af; text-decoration:none; font-weight:600;">Subjects</a>
      <a href="#" style="color:#1e40af; text-decoration:none; font-weight:600;">Tutors</a>
      <a href="#" style="color:#1e40af; text-decoration:none; font-weight:600;">Fees</a>
    </nav>
    <button style="background:#10b981; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; font-size:0.8rem; cursor:pointer;">Enroll Free</button>
  </header>

  <div style="background:linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding:2rem; border-radius:14px; color:white; margin-bottom:1.5rem;">
    <span style="background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">CLASSES 6 TO 12 ACADEMIC TUITION</span>
    <h1 style="color:#ffffff; font-size:1.9rem; font-weight:900; margin:0.75rem 0 0.5rem 0;">Excellence in Mathematics, Science &amp; Coding</h1>
    <p style="color:#dbeafe; font-size:0.95rem; margin:0 0 1.25rem 0; max-width:600px; line-height:1.5;">Small batch sizes, interactive problem solving, weekly tests, and individual student progress reports.</p>
    <button style="background:#ffffff; color:#1d4ed8; border:none; padding:10px 22px; border-radius:8px; font-weight:bold; font-size:0.85rem; cursor:pointer;">Book Free Demo Class</button>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
    <div style="background:#ffffff; padding:1.25rem; border-radius:12px; border:1px solid #dbeafe;">
      <div style="color:#2563eb; font-weight:800; font-size:1rem;">📐 Mathematics</div>
      <div style="color:#475569; font-size:0.82rem; margin-top:4px;">Algebra, Geometry, Trigonometry &amp; Calculus.</div>
    </div>
    <div style="background:#ffffff; padding:1.25rem; border-radius:12px; border:1px solid #dbeafe;">
      <div style="color:#7c3aed; font-weight:800; font-size:1rem;">🔬 Physics &amp; Chemistry</div>
      <div style="color:#475569; font-size:0.82rem; margin-top:4px;">Practical lab concepts, formulas &amp; exam prep.</div>
    </div>
    <div style="background:#ffffff; padding:1.25rem; border-radius:12px; border:1px solid #dbeafe;">
      <div style="color:#059669; font-weight:800; font-size:1rem;">💻 Computer Science</div>
      <div style="color:#475569; font-size:0.82rem; margin-top:4px;">Python, HTML/CSS Web Basics, &amp; Logic building.</div>
    </div>
  </div>
</div>`
    },
    photography: {
      name: 'FocusArt Photography Studio',
      tag: 'Creative Studio',
      code: `<div style="background:#042f2e; color:#ecfdf5; border-radius:18px; padding:2rem; font-family:system-ui, sans-serif; border:1px solid #0f766e;">
  <header style="display:flex; justify-content:space-between; align-items:center; background:#115e59; padding:1rem 1.5rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#5eead4;">📷 FocusArt Studio</div>
    <nav style="display:flex; gap:1.2rem; font-size:0.85rem;">
      <a href="#" style="color:#ccfbf1; text-decoration:none; font-weight:600;">Home</a>
      <a href="#" style="color:#ccfbf1; text-decoration:none; font-weight:600;">Portfolio</a>
      <a href="#" style="color:#ccfbf1; text-decoration:none; font-weight:600;">Packages</a>
      <a href="#" style="color:#ccfbf1; text-decoration:none; font-weight:600;">Contact</a>
    </nav>
    <button style="background:#14b8a6; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; font-size:0.8rem; cursor:pointer;">Book Session</button>
  </header>

  <div style="background:linear-gradient(135deg, #0f766e 0%, #115e59 100%); padding:2rem; border-radius:14px; margin-bottom:1.5rem;">
    <span style="background:rgba(255,255,255,0.15); color:#99f6e4; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">CREATIVE MEDIA &amp; PORTRAITS</span>
    <h1 style="color:#ffffff; font-size:1.9rem; font-weight:900; margin:0.75rem 0 0.5rem 0;">Capturing Life Moments, Weddings &amp; Brand Portraits</h1>
    <p style="color:#ccfbf1; font-size:0.95rem; margin:0 0 1.25rem 0; max-width:600px; line-height:1.5;">High-definition photography, cinematic videography, 4K drone shots, and studio lighting setups.</p>
    <button style="background:#ffffff; color:#0f766e; border:none; padding:10px 22px; border-radius:8px; font-weight:bold; font-size:0.85rem; cursor:pointer;">View Photo Gallery</button>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
    <div style="background:#115e59; padding:1.25rem; border-radius:12px;">
      <div style="color:#5eead4; font-weight:800; font-size:1rem;">💍 Wedding Cinema</div>
      <div style="color:#ccfbf1; font-size:0.82rem; margin-top:4px;">Pre-wedding shoots, candid albums &amp; wedding films.</div>
    </div>
    <div style="background:#115e59; padding:1.25rem; border-radius:12px;">
      <div style="color:#5eead4; font-weight:800; font-size:1rem;">👤 Executive Portraits</div>
      <div style="color:#ccfbf1; font-size:0.82rem; margin-top:4px;">Professional LinkedIn headshots &amp; studio branding.</div>
    </div>
    <div style="background:#115e59; padding:1.25rem; border-radius:12px;">
      <div style="color:#5eead4; font-weight:800; font-size:1rem;">🛍️ Product Commercials</div>
      <div style="color:#ccfbf1; font-size:0.82rem; margin-top:4px;">E-commerce product cataloging &amp; promotional reels.</div>
    </div>
  </div>
</div>`
    },
    restaurant: {
      name: 'Flavors Bistro & Gourmet Cafe',
      tag: 'Food & Hospitality',
      code: `<div style="background:#2e1005; color:#fef3c7; border-radius:18px; padding:2rem; font-family:system-ui, sans-serif; border:1px solid #78350f;">
  <header style="display:flex; justify-content:space-between; align-items:center; background:#451a03; padding:1rem 1.5rem; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size:1.2rem; font-weight:900; color:#fbbf24;">☕ Flavors Bistro</div>
    <nav style="display:flex; gap:1.2rem; font-size:0.85rem;">
      <a href="#" style="color:#fef3c7; text-decoration:none; font-weight:600;">Menu</a>
      <a href="#" style="color:#fef3c7; text-decoration:none; font-weight:600;">Specials</a>
      <a href="#" style="color:#fef3c7; text-decoration:none; font-weight:600;">About</a>
      <a href="#" style="color:#fef3c7; text-decoration:none; font-weight:600;">Contact</a>
    </nav>
    <button style="background:#d97706; color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:bold; font-size:0.8rem; cursor:pointer;">Reserve Table</button>
  </header>

  <div style="background:linear-gradient(135deg, #78350f 0%, #451a03 100%); padding:2rem; border-radius:14px; margin-bottom:1.5rem;">
    <span style="background:rgba(255,255,255,0.15); color:#fde68a; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">ARTISAN BISTRO &amp; CAFE</span>
    <h1 style="color:#ffffff; font-size:1.9rem; font-weight:900; margin:0.75rem 0 0.5rem 0;">Handcrafted Pastas, Wood-Fired Pizza &amp; Fresh Roasts</h1>
    <p style="color:#fef3c7; font-size:0.95rem; margin:0 0 1.25rem 0; max-width:600px; line-height:1.5;">Made with fresh organic ingredients, traditional recipes, and served in a warm aesthetic ambience.</p>
    <button style="background:#d97706; color:white; border:none; padding:10px 22px; border-radius:8px; font-weight:bold; font-size:0.85rem; cursor:pointer;">Explore Chef Specials</button>
  </div>

  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
    <div style="background:#451a03; padding:1.25rem; border-radius:12px;">
      <div style="color:#fbbf24; font-weight:800; font-size:1rem;">🍝 Italian Pastas</div>
      <div style="color:#fde68a; font-size:0.82rem; margin-top:4px;">Truffle Alfredo, Creamy Pesto &amp; Classic Bolognese.</div>
    </div>
    <div style="background:#451a03; padding:1.25rem; border-radius:12px;">
      <div style="color:#fbbf24; font-weight:800; font-size:1rem;">🍕 Wood-Fired Pizza</div>
      <div style="color:#fde68a; font-size:0.82rem; margin-top:4px;">Margherita, Four-Cheese &amp; Spicy Pepperoni.</div>
    </div>
    <div style="background:#451a03; padding:1.25rem; border-radius:12px;">
      <div style="color:#fbbf24; font-weight:800; font-size:1rem;">☕ Espresso &amp; Desserts</div>
      <div style="color:#fde68a; font-size:0.82rem; margin-top:4px;">Cold Brews, Tiramisu &amp; Fresh Baked Croissants.</div>
    </div>
  </div>
</div>`
    }
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is a website?',
      options: [
        'A physical computer hardware chip.',
        'A collection of connected web pages accessible over the internet via a web browser.',
        'A database query command.',
        'An offline PDF file.'
      ],
      correct: 1,
      explanation: 'A website is a collection of web pages hosted on a server and viewed using browsers like Chrome or Safari.'
    },
    {
      id: 'q2',
      question: 'Which element represents the main content structure of a webpage?',
      options: [
        'HTML (HyperText Markup Language)',
        'SQL (Structured Query Language)',
        'C++ Compiler',
        'Graphics Card Driver'
      ],
      correct: 0,
      explanation: 'HTML provides the structural backbone of every webpage (headings, paragraphs, buttons, images).'
    },
    {
      id: 'q3',
      question: 'What is the primary role of CSS in web development?',
      options: [
        'To write server algorithms.',
        'To style and design the visual presentation (colors, fonts, layout alignment).',
        'To store student marks in tables.',
        'To manage domain name registrations.'
      ],
      correct: 1,
      explanation: 'CSS (Cascading Style Sheets) controls visual appearance, layout alignment, typography, and colors.'
    },
    {
      id: 'q4',
      question: 'What does JavaScript add to a static HTML & CSS webpage?',
      options: [
        'Dynamic interactivity and behavior (button click responses, popups, menus).',
        'Plain unstyled black text.',
        'Database table indexes.',
        'Hard drive formatting rules.'
      ],
      correct: 0,
      explanation: 'JavaScript adds dynamic functionality and interactive user behavior.'
    },
    {
      id: 'q5',
      question: 'Which building block appears at the very top of most business websites?',
      options: [
        'Footer bar',
        'Header Navigation Bar (Navbar) with logo and menu links',
        'Copyright notice',
        'Terms and conditions page'
      ],
      correct: 1,
      explanation: 'The Header Navigation Bar (Navbar) sits at the top of web layout containing logo and navigation links.'
    }
  ];

  const handleQuizSelect = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  // Helper AI structure generator
  const handleRunAiChallenge = () => {
    if (!aiBusinessType.trim()) return;
    setAiResult({
      business: aiBusinessType,
      sections: [
        { name: '1. Sticky Header Navbar', desc: `Brand logo for ${aiBusinessType}, navigation menu, and inquiry button.` },
        { name: '2. Hero Banner', desc: `Impactful tagline for ${aiBusinessType} with background visual and booking action.` },
        { name: '3. Key Offerings / Services', desc: 'Grid of 3 to 4 core services/products with pricing and features.' },
        { name: '4. Why Choose Us / Value Proposition', desc: 'Icons and highlights showing unique benefits over competitors.' },
        { name: '5. Customer Testimonials', desc: 'Authentic reviews and ratings from happy clients.' },
        { name: '6. Inquiry Contact Form & Map Location', desc: 'Simple input form to capture visitor leads and location details.' },
        { name: '7. Footer Bar', desc: 'Operating hours, social media links, address, and copyright text.' }
      ]
    });
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>
      
      {/* 🌟 COURSE HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#ffffff',
        boxShadow: '0 20px 30px rgba(49, 46, 129, 0.25)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '30px', width: 'fit-content', marginBottom: '1.25rem' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            New Course • 20 Days Progressive Practical Track
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 0.75rem 0', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          AI-Powered Web Design &amp; Frontend Development
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#e0e7ff', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Learn to build modern, responsive, real-world business websites step-by-step using HTML, CSS, JavaScript, and AI coding workflows.
        </p>
      </div>

      {/* 📊 COURSE PROGRESS TRACKER WIDGET (REQUIREMENT 17) */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            AI-Powered Web Design • Day 1 / 20
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginTop: 2 }}>
            Overall Course Progress: {overallCourseProgress}%
          </div>
        </div>

        {/* Progress Bar & Indicators */}
        <div style={{ flex: 1, maxWidth: '420px', minWidth: '240px' }}>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ height: '100%', width: `${day1Percent}%`, background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
            <span style={{ color: completedSteps.intro ? '#10b981' : '#64748b' }}>Lesson: {completedSteps.intro ? '✓' : '○'}</span>
            <span style={{ color: completedSteps.practice ? '#10b981' : '#64748b' }}>Practice: {completedSteps.practice ? '✓' : '○'}</span>
            <span style={{ color: completedSteps.assignment ? '#10b981' : '#64748b' }}>Assignment: {completedSteps.assignment ? '✓' : '○'}</span>
            <span style={{ color: quizAttempted ? '#10b981' : '#64748b' }}>Quiz: {quizAttempted ? `${calculateQuizScore()}/5` : '○'}</span>
          </div>
        </div>
      </div>

      {/* 🚀 PEDAGOGY LEARNING FLOW BAR */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Our Practical Learning Philosophy:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.84rem', fontWeight: 800 }}>
          <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '8px' }}>LEARN</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#faf5ff', color: '#7e22ce', padding: '4px 12px', borderRadius: '8px' }}>EXAMPLE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '8px' }}>CODE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fff7ed', color: '#ea580c', padding: '4px 12px', borderRadius: '8px' }}>LIVE OUTPUT</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#fdf2f8', color: '#db2777', padding: '4px 12px', borderRadius: '8px' }}>PRACTICE</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '4px 12px', borderRadius: '8px' }}>TASK</span>
          <ChevronRight size={14} color="#94a3b8" />
          <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#ffffff', padding: '4px 12px', borderRadius: '8px' }}>AI CHALLENGE</span>
        </div>
      </div>



      {/* ==================== TOPIC 1: WHAT IS A WEBSITE? ==================== */}
      {activeTab === 'intro' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              Day 1 — Introduction to Websites &amp; Web Layout
            </h2>
            
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', padding: '1.25rem 1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', margin: '0 0 0.5rem 0' }}>
                💡 What is a Website?
              </h3>
              <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                A <strong>website</strong> is a collection of connected web pages and digital resources stored on a web server that people access over the internet using a web browser (like Chrome, Safari, or Firefox).
              </p>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '1.5rem 0 1rem 0' }}>
              🏫 Real-World Business Example: Visiting a Training Institute Website
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Imagine a student opens a web browser and visits our training institute website: <strong>Alpha Fly IT Training Institute</strong>. When the page loads, they immediately see standard organized building blocks:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'Institute Logo', desc: 'Identifies the business identity immediately at the top left.' },
                { title: 'Navigation Menu', desc: 'Allows students to navigate to Courses, Fees, and About pages.' },
                { title: 'Hero Banner', desc: 'Prominent headline: "Build Job-Ready Digital Skills" with a button.' },
                { title: 'About Section', desc: 'Explains the institute mission, experience, and campus history.' },
                { title: 'Courses Grid', desc: 'Cards displaying Web Design, Data Science, and Python tracks.' },
                { title: 'Testimonials', desc: 'Real reviews and ratings from hired graduates.' },
                { title: 'Contact Form', desc: 'Input fields for prospective students to request course info.' },
                { title: 'Website Footer', desc: 'Bottom bar containing phone numbers, location address, and links.' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#f1f5f9', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e293b', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem 1.25rem', borderRadius: '12px', color: '#065f46', fontSize: '0.9rem', fontWeight: 600 }}>
              ✅ <strong>Key Takeaway:</strong> All of these sections work together to form the complete <strong>visual structure</strong> of a website. During this 20-day course, you will build this entire website step-by-step!
            </div>
          </div>

          <button
            onClick={() => handleTabChange('layout')}
            style={{
              alignSelf: 'flex-end',
              background: '#312e81',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Next: Website Layout <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ==================== TOPIC 2: WEBSITE LAYOUT ==================== */}
      {activeTab === 'layout' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Website Layout &amp; Section Explorer
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
              <strong>Website Layout</strong> refers to how structural elements are ordered and arranged on a webpage. Click through the essential business website sections below:
            </p>

            {/* Grid selector buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {layoutSections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedExplorerSection(sec.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedExplorerSection === sec.id ? '#312e81' : '#f1f5f9',
                    color: selectedExplorerSection === sec.id ? '#ffffff' : '#475569',
                    transition: 'all 0.2s'
                  }}
                >
                  {sec.name}
                </button>
              ))}
            </div>

            {/* Selected Section Details */}
            {(() => {
              const current = layoutSections.find(s => s.id === selectedExplorerSection) || layoutSections[0];
              return (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                      Section: {current.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '20px' }}>
                      Standard Layout Module
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#2563eb', marginBottom: 4 }}>
                        ❓ What is it &amp; Why Businesses Use It?
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                        {current.purpose} It creates clarity and ensures visitors immediately understand what action to take next.
                      </p>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#059669', marginBottom: 4 }}>
                        👀 What Users Expect Here:
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                        {current.expect} Clean spacing, bold headings, and clear typography.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

      {/* ==================== TOPIC 3: WEBSITE SECTIONS (VISUAL) ==================== */}
      {activeTab === 'visual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Interactive Visual Webpage Breakdown
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Click on any section of the wireframe below to highlight it and learn its purpose, real-world usage, and when you will code it in this course.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              
              {/* Interactive Mockup Diagram */}
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.25rem', color: '#ffffff' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  🖥️ Interactive Website Model — Alpha Fly IT Training Institute (Click any section)
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* NAVBAR */}
                  <div
                    onClick={() => setSelectedWireframeSection('navbar')}
                    style={{
                      background: selectedWireframeSection === 'navbar' ? 'rgba(59, 130, 246, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'navbar' ? '2px solid #3b82f6' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#60a5fa' }}>LOGO • Alpha Fly</span>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: '#cbd5e1' }}>
                      <span>HOME</span>
                      <span>ABOUT</span>
                      <span>COURSES</span>
                      <span>TESTIMONIALS</span>
                      <span>CONTACT</span>
                    </div>
                    <span style={{ background: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>GET STARTED</span>
                  </div>

                  {/* HERO */}
                  <div
                    onClick={() => setSelectedWireframeSection('hero')}
                    style={{
                      background: selectedWireframeSection === 'hero' ? 'rgba(139, 92, 246, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'hero' ? '2px solid #8b5cf6' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '2rem 1rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginBottom: 4 }}>HERO SECTION</div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#ffffff' }}>Build Job-Ready Digital Skills</h3>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.82rem', color: '#94a3b8' }}>Master HTML, CSS, JavaScript, and AI tools with 100% practical projects.</p>
                    <span style={{ background: '#7c3aed', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, color: '#ffffff' }}>[ EXPLORE COURSES ]</span>
                  </div>

                  {/* ABOUT */}
                  <div
                    onClick={() => setSelectedWireframeSection('about')}
                    style={{
                      background: selectedWireframeSection === 'about' ? 'rgba(236, 72, 153, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'about' ? '2px solid #ec4899' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '1rem',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ background: '#334155', width: '70px', height: '50px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800 }}>CAMPUS IMG</div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f472b6', textTransform: 'uppercase' }}>ABOUT US SECTION</div>
                      <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Empowering over 2,500+ students with hands-on web engineering education.</div>
                    </div>
                  </div>

                  {/* SERVICES */}
                  <div
                    onClick={() => setSelectedWireframeSection('services')}
                    style={{
                      background: selectedWireframeSection === 'services' ? 'rgba(16, 185, 129, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'services' ? '2px solid #10b981' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', marginBottom: '8px' }}>SERVICES / COURSES GRID</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <div style={{ background: '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '0.72rem', textAlign: 'center', color: '#e2e8f0' }}>Web Design</div>
                      <div style={{ background: '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '0.72rem', textAlign: 'center', color: '#e2e8f0' }}>Python FullStack</div>
                      <div style={{ background: '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '0.72rem', textAlign: 'center', color: '#e2e8f0' }}>AI Engineering</div>
                    </div>
                  </div>

                  {/* TESTIMONIALS */}
                  <div
                    onClick={() => setSelectedWireframeSection('testimonials')}
                    style={{
                      background: selectedWireframeSection === 'testimonials' ? 'rgba(245, 158, 11, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'testimonials' ? '2px solid #f59e0b' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '4px' }}>TESTIMONIALS &amp; REVIEWS</div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontStyle: 'italic' }}>"Alpha Fly transformed my career from zero coding background to frontend engineer!" — Priya M.</div>
                  </div>

                  {/* CONTACT */}
                  <div
                    onClick={() => setSelectedWireframeSection('contact')}
                    style={{
                      background: selectedWireframeSection === 'contact' ? 'rgba(6, 182, 212, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'contact' ? '2px solid #06b6d4' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#22d3ee', textTransform: 'uppercase', marginBottom: '6px' }}>CONTACT FORM</div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ background: '#0f172a', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', flex: 1, color: '#94a3b8' }}>Name input</div>
                      <div style={{ background: '#0f172a', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', flex: 1, color: '#94a3b8' }}>Email input</div>
                      <div style={{ background: '#0891b2', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', color: '#ffffff', fontWeight: 800 }}>[SEND]</div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div
                    onClick={() => setSelectedWireframeSection('footer')}
                    style={{
                      background: selectedWireframeSection === 'footer' ? 'rgba(100, 116, 139, 0.3)' : '#1e293b',
                      border: selectedWireframeSection === 'footer' ? '2px solid #64748b' : '1px solid #334155',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    FOOTER — Copyright © 2026 Alpha Fly IT Training Institute • All Rights Reserved
                  </div>
                </div>
              </div>

              {/* Selected Section Details Panel */}
              {wireframeData[selectedWireframeSection] && (
                <div style={{
                  background: '#f8fafc',
                  border: `2px solid ${wireframeData[selectedWireframeSection].color}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: wireframeData[selectedWireframeSection].color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                    Active Wireframe Inspection:
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: '0 0 1rem 0' }}>
                    {wireframeData[selectedWireframeSection].name}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#475569', marginBottom: 4 }}>🎯 Purpose:</div>
                      <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5 }}>{wireframeData[selectedWireframeSection].purpose}</div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#475569', marginBottom: 4 }}>📅 When Learned:</div>
                      <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5, fontWeight: 700 }}>{wireframeData[selectedWireframeSection].learnedLater}</div>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', gridColumn: 'span 1' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#475569', marginBottom: 4 }}>💡 Real-World Example:</div>
                      <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5 }}>{wireframeData[selectedWireframeSection].example}</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ==================== TOPIC 4: 3-LAYER VISUAL (HTML + CSS + JS) ==================== */}
      {activeTab === 'layers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              The Big Picture: HTML + CSS + JavaScript 3-Layer Visual
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
              Websites are built by combining 3 distinct layers. Click each layer button to see how it transforms the component:
            </p>

            {/* Layer Control Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveLayer('html')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeLayer === 'html' ? '#ea580c' : '#ffedd5',
                  color: activeLayer === 'html' ? '#ffffff' : '#c2410c'
                }}
              >
                HTML (Structure Only)
              </button>

              <button
                onClick={() => setActiveLayer('css')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeLayer === 'css' ? '#2563eb' : '#dbeafe',
                  color: activeLayer === 'css' ? '#ffffff' : '#1e40af'
                }}
              >
                HTML + CSS (Structure + Design)
              </button>

              <button
                onClick={() => setActiveLayer('all')}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeLayer === 'all' ? '#16a34a' : '#dcfce7',
                  color: activeLayer === 'all' ? '#ffffff' : '#15803d'
                }}
              >
                HTML + CSS + JS (Structure + Design + Behavior)
              </button>
            </div>

            {/* Live Interactive Button Component Preview */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Component Preview: Login Button
              </div>

              {/* Rendered State Based on Active Layer */}
              {activeLayer === 'html' && (
                <div>
                  <button style={{ fontFamily: 'Times New Roman, serif', padding: '2px 6px' }}>
                    Log In
                  </button>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '1rem' }}>
                    ⚙️ Plain browser default HTML button. No styles, no click behavior.
                  </p>
                </div>
              )}

              {activeLayer === 'css' && (
                <div>
                  <button style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                    cursor: 'pointer'
                  }}>
                    Log In
                  </button>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '1rem' }}>
                    🎨 CSS added vibrant gradient background, padding, rounded corners, and shadow styling.
                  </p>
                </div>
              )}

              {activeLayer === 'all' && (
                <div>
                  <button
                    onClick={() => setIsDemoLoggedIn(!isDemoLoggedIn)}
                    style={{
                      background: isDemoLoggedIn ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isDemoLoggedIn ? '✓ Welcome Back, Student!' : 'Log In'}
                  </button>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '1rem' }}>
                    ⚡ Click the button! JavaScript responds dynamically by toggling login status text and color state.
                  </p>
                </div>
              )}
            </div>

            {/* Layer Breakdown Table */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#ea580c', fontSize: '0.9rem', marginBottom: 4 }}>HTML (Structure)</div>
                <div style={{ fontSize: '0.85rem', color: '#7c2d12', lineHeight: 1.4 }}>Defines what content exists on the page (headings, text, buttons, images).</div>
              </div>
              <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.9rem', marginBottom: 4 }}>CSS (Design)</div>
                <div style={{ fontSize: '0.85rem', color: '#1e40af', lineHeight: 1.4 }}>Defines how the content looks (colors, fonts, layout alignment, spacing).</div>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.9rem', marginBottom: 4 }}>JavaScript (Behavior)</div>
                <div style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: 1.4 }}>Defines what happens when users interact (clicks, menus, forms, popups).</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TOPIC 5: LIVE EXAMPLE ==================== */}
      {activeTab === 'first_output' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Live Example Webpage Output
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
              Below is a complete live business webpage output for <strong>Alpha Fly IT Training Institute</strong>. Switch between Preview and Source Code tabs to see how HTML structure &amp; CSS styling turn into a rich webpage!
            </p>

            {/* View Mode Toggle Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <button
                onClick={() => setLiveOutputView('preview')}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: liveOutputView === 'preview' ? '#2563eb' : '#f1f5f9',
                  color: liveOutputView === 'preview' ? '#ffffff' : '#475569'
                }}
              >
                👁️ Live Webpage Preview
              </button>

              <button
                onClick={() => setLiveOutputView('code')}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: liveOutputView === 'code' ? '#0f172a' : '#f1f5f9',
                  color: liveOutputView === 'code' ? '#ffffff' : '#475569'
                }}
              >
                💻 View Source Code
              </button>
            </div>

            {/* Live Output Preview */}
            {liveOutputView === 'preview' ? (
              <div style={{ background: '#f8fafc', border: '2px solid #cbd5e1', borderRadius: '16px', padding: '1rem', minHeight: '300px' }}>
                <div dangerouslySetInnerHTML={{ __html: businessOptions.alphafly.code }} />
              </div>
            ) : (
              <div style={{ background: '#0f172a', borderRadius: '16px', padding: '1.5rem', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', maxHeight: '450px', overflowY: 'auto' }}>
                {businessOptions.alphafly.code}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== TOPIC 6: PRACTICE ==================== */}
      {activeTab === 'practice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 1 Interactive Practice — Build Your First Page Elements
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Try editing the HTML code in the input field below to practice creating webpage elements live:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Code Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ea580c' }}>
                  HTML Code Editor:
                </label>
                <textarea
                  rows={8}
                  value={practiceHtml}
                  onChange={e => {
                    setPlaygroundHtml(e.target.value);
                    setCompletedSteps(prev => ({ ...prev, practice: true }));
                  }}
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    color: '#f8fafc',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setShowPracticeHint(!showPracticeHint)}
                    style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Lightbulb size={14} /> {showPracticeHint ? 'Hide Hint' : 'Show Hint'}
                  </button>

                  <button
                    onClick={() => setShowPracticeSolution(!showPracticeSolution)}
                    style={{ background: '#dcfce7', color: '#14532d', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <CheckCircle size={14} /> {showPracticeSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                </div>

                {showPracticeHint && (
                  <div style={{ background: '#fffbe8', borderLeft: '4px solid #f59e0b', padding: '0.85rem 1rem', borderRadius: '0 8px 8px 0', fontSize: '0.84rem', color: '#78350f' }}>
                    💡 <strong>Hint:</strong> Combine <code>&lt;h1&gt;</code> for the heading, <code>&lt;p&gt;</code> for description, and <code>&lt;button&gt;</code> for action button!
                  </div>
                )}

                {showPracticeSolution && (
                  <div style={{ background: '#0f172a', borderRadius: '10px', padding: '1rem', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    &lt;h1&gt;PulseFit Gym &amp; Fitness&lt;/h1&gt;<br />
                    &lt;p&gt;Transform your body with certified personal trainers.&lt;/p&gt;<br />
                    &lt;button&gt;Book Free Pass&lt;/button&gt;
                  </div>
                )}
              </div>

              {/* Live Render Output */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#16a34a', marginBottom: 4 }}>
                  Live Webpage Preview Output:
                </label>
                <div style={{
                  background: '#ffffff',
                  border: '2px solid #22c55e',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  minHeight: '220px',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
                }}>
                  <div dangerouslySetInnerHTML={{ __html: practiceHtml }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TOPIC 7: TASK-BASED PRACTICAL ASSIGNMENT ==================== */}
      {activeTab === 'assignment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Day 1 Practical Assignment
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                  Build Your First Webpage Structure
                </h2>
              </div>

              <div style={{
                background: assignmentSubmitted ? '#dcfce7' : '#fef3c7',
                color: assignmentSubmitted ? '#14532d' : '#92400e',
                border: assignmentSubmitted ? '1px solid #bbf7d0' : '1px solid #fde68a',
                padding: '6px 14px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '0.82rem'
              }}>
                {assignmentSubmitted ? '✅ Assignment Submitted' : '⏳ Pending Submission'}
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
              Your mission today is to create a complete single-page website layout for <strong>Alpha Fly Theni</strong> (or your own fictional business concept).
            </p>

            {/* Assignment Requirements Checklist */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.75rem 0' }}>
                📋 Assignment Requirements Checklist:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>1. <code>&lt;header&gt;</code> with brand title &amp; button</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>2. Main heading <code>&lt;h1&gt;</code> explaining business</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>3. Subtitle paragraph <code>&lt;p&gt;</code> summary</div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>4. List of 3 offerings <code>&lt;ul&gt; &lt;li&gt;</code></div>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>5. Call-to-action <code>&lt;button&gt;</code> link</div>
              </div>
            </div>

            {/* Interactive Code Editor & Live Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ea580c', display: 'block', marginBottom: 4 }}>
                  Assignment HTML Editor:
                </label>
                <textarea
                  rows={14}
                  value={assignmentCode}
                  onChange={e => {
                    setAssignmentCode(e.target.value);
                    setAssignmentSubmitted(false);
                  }}
                  style={{
                    width: '100%',
                    background: '#0f172a',
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    fontSize: '0.84rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: 4 }}>
                  Live Webpage Preview Output:
                </label>
                <div style={{
                  background: '#ffffff',
                  border: '2px solid #22c55e',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  minHeight: '280px',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
                }}>
                  <div dangerouslySetInnerHTML={{ __html: assignmentCode }} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setAssignmentSubmitted(true);
                  setCompletedSteps(prev => ({ ...prev, assignment: true }));
                }}
                style={{
                  background: assignmentSubmitted ? '#16a34a' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle size={18} />
                {assignmentSubmitted ? 'Assignment Submitted & Verified!' : 'Submit Assignment'}
              </button>

              {assignmentSubmitted && (
                <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.65rem 1.25rem', borderRadius: '10px', fontSize: '0.86rem', fontWeight: 800 }}>
                  🎉 Great job! Your Day 1 assignment code has been validated and completed!
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==================== TOPIC 8: AI CHALLENGE ==================== */}
      {activeTab === 'ai_challenge' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed', marginBottom: 4 }}>
              <Sparkles size={20} />
              <span style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>AI-Powered Learning Assistant</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 1 AI Challenge — Business Structure Assistant
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
              Use AI as a smart assistant! Enter any business idea (e.g. <em>Bakery, Drone Academy, Dental Clinic</em>) to generate recommended website layout sections and compare them with what you learned today.
            </p>

            {/* Input Box */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={aiBusinessType}
                onChange={e => setAiBusinessType(e.target.value)}
                placeholder="Enter business type..."
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleRunAiChallenge}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Sparkles size={16} /> Generate Website Structure
              </button>
            </div>

            {/* AI Generated Result */}
            {aiResult && (
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#6b21a8', margin: '0 0 1rem 0' }}>
                  🤖 AI Structural Recommendations for "{aiResult.business}"
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {aiResult.sections.map((s, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#7e22ce', marginBottom: 2 }}>{s.name}</div>
                      <div style={{ fontSize: '0.82rem', color: '#4a044e', lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== TOPIC 9: QUIZ KNOWLEDGE CHECK & PROGRESS ==================== */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Quiz Section */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 1 Knowledge Check (5 Questions)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Test your understanding of today's lesson. Click an option for each question to view instant feedback:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {quizQuestions.map(q => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correct;

                return (
                  <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1rem' }}>
                      {q.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: selected === optIdx ? (optIdx === q.correct ? '2px solid #16a34a' : '2px solid #dc2626') : '1px solid #cbd5e1',
                            background: selected === optIdx ? (optIdx === q.correct ? '#f0fdf4' : '#fef2f2') : '#ffffff',
                            color: selected === optIdx ? (optIdx === q.correct ? '#14532d' : '#991b1b') : '#334155',
                            transition: 'all 0.2s'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {selected !== undefined && (
                      <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', fontWeight: 700, color: isCorrect ? '#15803d' : '#b91c1c' }}>
                        {isCorrect ? '✅ Correct! ' : '❌ Incorrect. '}{q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {quizAttempted && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.25rem', borderRadius: '12px', marginTop: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 4px 0', color: '#065f46', fontSize: '1.1rem', fontWeight: 900 }}>
                  Quiz Score: {calculateQuizScore()} / 5 Correct!
                </h3>
              </div>
            )}
          </div>

          {/* DAY 1 COMPLETION SCREEN WITH EXACT CHECKLIST & DAY 2 PREVIEW */}
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 20px 30px rgba(4, 120, 87, 0.25)'
          }}>
            <Trophy size={64} style={{ marginBottom: '1rem', opacity: 0.9 }} />
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 0.75rem 0' }}>
              🎉 Day 1 Completed
            </h2>

            {/* Exact Requested Checklist */}
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '540px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                You learned:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
                <div>✓ What a website is</div>
                <div>✓ How a website is structured</div>
                <div>✓ Common website sections</div>
                <div>✓ What HTML does</div>
                <div>✓ What CSS does</div>
                <div>✓ What JavaScript does</div>
                <div>✓ How code becomes a webpage</div>
                <div>✓ How to create a simple webpage</div>
              </div>
            </div>

            {/* DAY 2 PREVIEW CARD */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '540px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                🚀 Coming Up in Day 2:
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', marginBottom: 4 }}>
                Day 2 — Build Your First Navbar
              </div>
              <p style={{ fontSize: '0.88rem', color: '#e0e7ff', margin: 0, lineHeight: 1.4 }}>
                Preview: Logo → Menu → Login Button → Responsive Layout
              </p>
            </div>

            <button
              onClick={() => alert('Day 2 unlocked! Moving to Day 2 — Build Your First Navbar.')}
              style={{
                background: '#ffffff',
                color: '#047857',
                border: 'none',
                borderRadius: '12px',
                padding: '0.85rem 2rem',
                fontSize: '0.95rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
              }}
            >
              Continue to Day 2 →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
