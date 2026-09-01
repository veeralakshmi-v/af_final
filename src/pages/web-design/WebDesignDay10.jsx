import React, { useState } from 'react';
import {
  BookOpen,
  Code,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  MonitorPlay,
  Smartphone,
  Tablet as TabletIcon,
  Monitor,
  HelpCircle,
  Award,
  ChevronRight,
  Sliders,
  Send,
  AlertCircle,
  FileCode,
  Layout,
  Terminal,
  Trophy,
  CheckSquare,
  Zap,
  Briefcase,
  Star,
  ExternalLink,
  ShieldCheck,
  Eye,
  MessageSquare,
  PenTool,
  Search,
  RefreshCw,
  User,
  Phone,
  Mail,
  MapPin,
  Check,
  X
} from 'lucide-react';

const WebDesignDay10 = ({ activeTab: initialActiveTab, onNavigate, openAITutor }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab || 'intro');

  // --- Sync tab state with props ---
  React.useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    }
  }, [initialActiveTab]);

  const isTabActive = (tabName) => {
    return !activeTab || activeTab === 'intro' ? (tabName === 'intro' || activeTab === tabName) : activeTab === tabName;
  };

  // --- Live Syntax Code Editor with Synced Scroll ---
  const LiveSyntaxCodeEditor = ({ value, onChange, language = 'html', rows = 12, label = '' }) => {
    const preRef = React.useRef(null);

    const handleScroll = (e) => {
      if (preRef.current) {
        preRef.current.scrollTop = e.target.scrollTop;
        preRef.current.scrollLeft = e.target.scrollLeft;
      }
    };

    const escapeHTML = (str) =>
      str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    const highlightCode = (codeStr, lang) => {
      if (!codeStr) return '';
      const escaped = escapeHTML(codeStr);

      if (lang === 'html') {
        const tokenRegex = /(&lt;<!--[\s\S]*?--&gt;)|(&lt;!DOCTYPE html&gt;)|(&lt;\/?[a-zA-Z0-9\-]+)|([a-zA-Z\-]+)(?=\s*=)|("[\s\S]*?"|'[\s\S]*?')/gi;
        return escaped.replace(tokenRegex, (match, comment, doctype, tag, attr, stringVal) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (doctype) return `<span style="color:#c084fc;font-weight:bold;">${doctype}</span>`;
          if (tag) {
            const m = tag.match(/^(&lt;\/?)([a-zA-Z0-9\-]+)$/);
            return m ? `${m[1]}<span style="color:#f43f5e;font-weight:bold;">${m[2]}</span>` : tag;
          }
          if (attr) return `<span style="color:#fbbf24;font-weight:600;">${attr}</span>`;
          if (stringVal) return `<span style="color:#34d399;">${stringVal}</span>`;
          return match;
        });
      }

      if (lang === 'css') {
        const tokenRegex = /(\/\*[\s\S]*?\*\/)|([a-zA-Z0-9\-\.\#\:\s,]+)(?=\{)|([a-zA-Z\-]+)(?=\s*:)|(:\s*[^;\}]+;)/gi;
        return escaped.replace(tokenRegex, (match, comment, selector, prop, val) => {
          if (comment) return `<span style="color:#64748b;font-style:italic;">${comment}</span>`;
          if (selector) return `<span style="color:#61afef;font-weight:bold;">${selector}</span>`;
          if (prop) return `<span style="color:#e5c07b;">${prop}</span>`;
          if (val) return `<span style="color:#98c379;">${val}</span>`;
          return match;
        });
      }

      if (lang === 'js' || lang === 'javascript') {
        const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)|(\bconst\b|\blet\b|\bvar\b|\bfunction\b|\breturn\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\bdocument\b|\bwindow\b|\bevent\b|\be\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*(?=\())|(\b\d+\b)/g;
        return escaped.replace(tokenRegex, (match, comment, str, kw, fn, num) => {
          if (comment) return `<span style="color:#7f848e;font-style:italic;">${comment}</span>`;
          if (str) return `<span style="color:#98c379;">${str}</span>`;
          if (kw) return `<span style="color:#c678dd;font-weight:bold;">${kw}</span>`;
          if (fn) return `<span style="color:#61afef;font-weight:bold;">${fn}</span>`;
          if (num) return `<span style="color:#d19a66;">${num}</span>`;
          return match;
        });
      }

      return escaped;
    };

    return (
      <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #334155', background: '#0f172a' }}>
        {label && (
          <div style={{ background: '#1e293b', padding: '6px 14px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{language.toUpperCase()} Editor</span>
          </div>
        )}
        <div style={{ position: 'relative', width: '100%', height: `${rows * 22}px` }}>
          <pre
            ref={preRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: '12px 14px',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.85rem',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'hidden',
              pointerEvents: 'none',
              color: '#e2e8f0',
              zIndex: 1
            }}
            dangerouslySetInnerHTML={{ __html: highlightCode(value, language) }}
          />
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            spellCheck="false"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: '12px 14px',
              fontFamily: "'Cascadia Code', Consolas, Monaco, monospace",
              fontSize: '0.85rem',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              width: '100%',
              height: '100%',
              background: 'transparent',
              color: 'transparent',
              caretColor: '#60a5fa',
              border: 'none',
              outline: 'none',
              resize: 'none',
              zIndex: 2,
              overflowY: 'auto'
            }}
          />
        </div>
      </div>
    );
  };

  // --- Course Completion State (50% Day 10) ---
  const [completedSteps, setCompletedSteps] = useState({
    planning: true,
    navbar: false,
    hero: false,
    about: false,
    services: false,
    projects: false,
    testimonials: false,
    pricing: false,
    contact: false,
    footer: false,
    responsive: false,
    javascript: false,
    testing: false,
    review: false
  });

  const toggleChecklistStep = (key) => {
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- Selected Business Niche State ---
  const [selectedBusiness, setSelectedBusiness] = useState('it_centre');
  const [customBusinessName, setCustomBusinessName] = useState('');

  const businessOptions = [
    { id: 'it_centre', name: 'IT Training Centre', desc: 'Coding, Data Science & Tech Courses' },
    { id: 'tuition', name: 'Tuition Centre', desc: 'K-12 School Subjects & Exam Coaching' },
    { id: 'restaurant', name: 'Restaurant / Bistro', desc: 'Dining, Takeaway & Catering' },
    { id: 'fitness', name: 'Fitness Centre / Gym', desc: 'Personal Training, Yoga & Workouts' },
    { id: 'salon', name: 'Salon & Spa', desc: 'Hair, Skincare & Grooming Services' },
    { id: 'photography', name: 'Photography Studio', desc: 'Weddings, Events & Portrait Sessions' },
    { id: 'interior', name: 'Interior Design Studio', desc: 'Home & Commercial Interior Design' },
    { id: 'travel', name: 'Travel Agency', desc: 'Tour Packages, Flights & Custom Trips' },
    { id: 'marketing', name: 'Digital Marketing Agency', desc: 'SEO, Social Media & Paid Ads' },
    { id: 'freelancer', name: 'Freelance Web Designer', desc: 'UI/UX Design & Website Development' }
  ];

  // --- AI Planning Assistant State ---
  const [aiTargetAudience, setAiTargetAudience] = useState('Students & Fresh Graduates looking for IT Jobs');
  const [aiBusinessGoal, setAiBusinessGoal] = useState('Get course enquiries and demo class bookings');
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState(null);

  const generateAIPlan = () => {
    const biz = businessOptions.find(b => b.id === selectedBusiness)?.name || customBusinessName || 'Local Business';
    setAiGeneratedPlan({
      palette: {
        primary: '#2563eb',
        secondary: '#0f172a',
        accent: '#f59e0b',
        background: '#f8fafc'
      },
      fontPairing: 'Outfit (Headings) + Inter (Body Text)',
      style: 'Modern & Clean Tech Aesthetic',
      heroHeadline: `Accelerate Your Career with Industry-Leading ${biz} Training`,
      heroSubhead: `Learn from experienced mentors, work on live projects, and get placement guidance in Tamil Nadu.`,
      primaryCTA: 'Explore Courses',
      secondaryCTA: 'Book Free Demo',
      services: ['Full Stack Development', 'Data Analytics & AI', 'UI/UX & Web Design'],
      pricingStarter: '₹4,999 (Basic)',
      pricingPro: '₹14,999 (Job Ready)',
      pricingEnterprise: '₹24,999 (Mastery)'
    });
  };

  // --- Project Workspace Code State ---
  const [activeCodeFile, setActiveCodeFile] = useState('html'); // 'html' | 'css' | 'js'

  const [projectHtml, setProjectHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Tech Academy - Modern IT Training Centre</title>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="logo">Apex Tech Academy</div>
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Courses</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#testimonials">Reviews</a></li>
      <li><a href="#pricing">Fees</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="nav-btn">Apply Now</a>
  </nav>

  <!-- HERO SECTION -->
  <section id="hero" class="hero">
    <div class="hero-content">
      <span class="badge">🔥 100% Placement Support</span>
      <h1>Build Your Dream Tech Career in 90 Days</h1>
      <p>Master Web Development, Data Science, and AI with hands-on live projects and personal mentor support.</p>
      <div class="hero-actions">
        <a href="#services" class="btn btn-primary">Explore Courses</a>
        <a href="#contact" class="btn btn-secondary">Book Free Demo</a>
      </div>
    </div>
  </section>

  <!-- ABOUT SECTION -->
  <section id="about" class="section">
    <h2>Why Choose Apex Tech Academy?</h2>
    <p>We are a leading IT training centre empowering students with real-world coding skills and career opportunities.</p>
    <div class="highlights-grid">
      <div class="highlight-card">✓ 100% Practical Coding Labs</div>
      <div class="highlight-card">✓ Experienced Industry Mentors</div>
      <div class="highlight-card">✓ Real-World Client Projects</div>
      <div class="highlight-card">✓ Dedicated Interview Support</div>
    </div>
  </section>

  <!-- SERVICES / COURSES -->
  <section id="services" class="section bg-light">
    <h2>Our Popular Training Programs</h2>
    <div class="cards-grid">
      <div class="card">
        <h3>Full Stack Web Dev</h3>
        <p>Learn HTML, CSS, JS, React & Node.js with 5 real projects.</p>
        <span class="tag">Duration: 3 Months</span>
      </div>
      <div class="card">
        <h3>Data Science & AI</h3>
        <p>Master Python, SQL, Pandas & Machine Learning models.</p>
        <span class="tag">Duration: 4 Months</span>
      </div>
      <div class="card">
        <h3>UI/UX & Web Design</h3>
        <p>Design modern interfaces with Figma, wireframes & prototypes.</p>
        <span class="tag">Duration: 2 Months</span>
      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects" class="section">
    <h2>Student Project Showcase</h2>
    <div class="cards-grid">
      <div class="card">
        <h3>E-Commerce Web Portal</h3>
        <p>Built by Batch #14 using React & Express.</p>
        <span class="demo-tag">[Demo Project]</span>
      </div>
      <div class="card">
        <h3>AI Image Generator</h3>
        <p>Built by Batch #16 using Python & API integration.</p>
        <span class="demo-tag">[Demo Project]</span>
      </div>
      <div class="card">
        <h3>LMS Student Dashboard</h3>
        <p>Built by Batch #18 using HTML, CSS & JavaScript.</p>
        <span class="demo-tag">[Demo Project]</span>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section id="testimonials" class="section bg-light">
    <h2>What Our Graduates Say</h2>
    <p class="sub-text">Fictional Demo Content for Learning Purpose</p>
    <div class="cards-grid">
      <div class="card testimonial">
        <div class="stars">★★★★★</div>
        <p>"Apex Academy transformed my career! I landed a Software Engineer role in Chennai."</p>
        <h4>- Anitha R.</h4>
        <span>Web Developer</span>
        <span class="demo-tag">Demo Review</span>
      </div>
      <div class="card testimonial">
        <div class="stars">★★★★★</div>
        <p>"Practical mentors who help you debug every single error. Highly recommended!"</p>
        <h4>- Karthik M.</h4>
        <span>Frontend Intern</span>
        <span class="demo-tag">Demo Review</span>
      </div>
      <div class="card testimonial">
        <div class="stars">★★★★★</div>
        <p>"The course structure is super clear. Built 4 live projects for my portfolio."</p>
        <h4>- Priya S.</h4>
        <span>UI Designer</span>
        <span class="demo-tag">Demo Review</span>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section id="pricing" class="section">
    <h2>Flexible Fee Packages</h2>
    <div class="cards-grid">
      <div class="card pricing-card">
        <h3>STARTER</h3>
        <div class="price">₹4,999</div>
        <p>Self-Paced Video Course</p>
        <ul>
          <li>✓ All Recorded Videos</li>
          <li>✓ Source Code Access</li>
          <li>✓ Certificate of Completion</li>
        </ul>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
      <div class="card pricing-card popular">
        <span class="pop-badge">MOST POPULAR</span>
        <h3>PRO JOB READY</h3>
        <div class="price">₹14,999</div>
        <p>Live Interactive Classes</p>
        <ul>
          <li>✓ Everything in Starter</li>
          <li>✓ Live Mentor Support</li>
          <li>✓ 5 Live Capstone Projects</li>
          <li>✓ Placement Guidance</li>
        </ul>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
      <div class="card pricing-card">
        <h3>1-ON-1 MASTERY</h3>
        <div class="price">₹24,999</div>
        <p>Personal Mentorship</p>
        <ul>
          <li>✓ Everything in Pro</li>
          <li>✓ 1-on-1 Daily Guidance</li>
          <li>✓ Resume & LinkedIn Review</li>
        </ul>
        <button class="btn btn-primary">Enroll Now</button>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="section bg-light">
    <h2>Get in Touch / Book Free Demo</h2>
    <div class="contact-layout">
      <div class="contact-info">
        <h3>Contact Info</h3>
        <p><strong>📍 Address:</strong> Main Road, Madurai, Tamil Nadu</p>
        <p><strong>📞 Phone:</strong> +91 98765 43210 (Demo)</p>
        <p><strong>✉️ Email:</strong> demo@apextech.com (Demo)</p>
      </div>
      <form id="leadForm" class="contact-form">
        <div id="formAlert" class="alert hidden"></div>
        <div class="form-group">
          <label for="userName">Full Name *</label>
          <input type="text" id="userName" placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="userEmail">Email Address *</label>
          <input type="email" id="userEmail" placeholder="Your email">
        </div>
        <div class="form-group">
          <label for="userCourse">Select Course *</label>
          <select id="userCourse">
            <option value="">-- Choose Course --</option>
            <option value="fullstack">Full Stack Web Dev</option>
            <option value="datascience">Data Science & AI</option>
            <option value="uiux">UI/UX Design</option>
          </select>
        </div>
        <div class="form-group">
          <label for="userMessage">Your Inquiry *</label>
          <textarea id="userMessage" rows="3" placeholder="Tell us about your background"></textarea>
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="userConsent">
          <label for="userConsent">I agree to be contacted for demo class</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit Inquiry</button>
      </form>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-col">
        <h3>Apex Tech Academy</h3>
        <p>Empowering the next generation of software engineers with practical skills.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#services">Courses</a></li>
          <li><a href="#pricing">Fees</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <p>© 2026 Apex Tech Academy. Demo Learning Project.</p>
      </div>
    </div>
  </footer>

</body>
</html>`);

  const [projectCss, setProjectCss] = useState(`/* GLOBAL RESET & STYLES */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1e293b;
  background-color: #ffffff;
  line-height: 1.6;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #0f172a;
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  font-size: 1.25rem;
  font-weight: 900;
  color: #60a5fa;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 1.25rem;
}
.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: #ffffff;
}
.nav-btn {
  background: #2563eb;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
}

/* HERO SECTION */
.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  padding: 4rem 2rem;
  text-align: center;
}
.hero-content {
  max-width: 750px;
  margin: 0 auto;
}
.badge {
  display: inline-block;
  background: rgba(96, 165, 250, 0.2);
  color: #93c5fd;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.hero h1 {
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 1rem;
}
.hero p {
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 1.75rem;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* BUTTONS */
.btn {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
}
.btn-primary {
  background: #2563eb;
  color: #ffffff;
}
.btn-secondary {
  background: #334155;
  color: #ffffff;
}

/* SECTIONS */
.section {
  padding: 3.5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}
.section h2 {
  font-size: 1.75rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
  text-align: center;
}
.bg-light {
  background-color: #f8fafc;
}
.sub-text {
  text-align: center;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 2rem;
}

/* CARDS GRID */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.card h3 {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.card p {
  font-size: 0.88rem;
  color: #475569;
  margin-bottom: 1rem;
}
.tag, .demo-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  padding: 4px 8px;
  border-radius: 4px;
}
.demo-tag {
  color: #dc2626;
  background: #fef2f2;
}

/* PRICING */
.pricing-card {
  text-align: center;
  position: relative;
}
.pricing-card.popular {
  border: 2px solid #2563eb;
}
.pop-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #2563eb;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 900;
  padding: 2px 10px;
  border-radius: 12px;
}
.price {
  font-size: 2rem;
  font-weight: 900;
  color: #0f172a;
  margin: 0.5rem 0;
}
.pricing-card ul {
  list-style: none;
  margin: 1.25rem 0;
  text-align: left;
  font-size: 0.85rem;
}
.pricing-card li {
  margin-bottom: 6px;
}

/* CONTACT */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
}
.form-group input, .form-group select, .form-group textarea {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.88rem;
}
.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.alert {
  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
}
.alert.success { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
.alert.error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
.hidden { display: none; }

/* FOOTER */
.footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 2.5rem 2rem;
}
.footer-content {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
}
.footer-col h3, .footer-col h4 {
  color: #ffffff;
  margin-bottom: 0.75rem;
}
.footer-col ul {
  list-style: none;
}
.footer-col a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.85rem;
}

/* RESPONSIVE STACKING */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .contact-layout { grid-template-columns: 1fr; }
  .footer-content { grid-template-columns: 1fr; }
}`);

  const [projectJs, setProjectJs] = useState(`// DAY 10 CLIENT-SIDE FORM VALIDATION
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const alertBox = document.getElementById('formAlert');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent automatic page reload

      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const course = document.getElementById('userCourse').value;
      const consent = document.getElementById('userConsent').checked;

      // Validation Rules
      if (!name || !email || !course) {
        showAlert('Please fill out all required fields (*)', 'error');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        showAlert('Please enter a valid email address with @ and .', 'error');
        return;
      }

      if (!consent) {
        showAlert('Please check the consent box to proceed.', 'error');
        return;
      }

      // Success State
      showAlert('✓ Inquiry Submitted Successfully! Our team will contact you shortly.', 'success');
      form.reset();
    });
  }

  function showAlert(msg, type) {
    alertBox.textContent = msg;
    alertBox.className = \`alert \${type}\`;
    alertBox.classList.remove('hidden');
  }
});`);

  // Combine HTML, CSS, and JS for live preview iframe
  const renderCombinedPreview = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${projectCss}</style>
        </head>
        <body>
          ${projectHtml.replace(/<!DOCTYPE html>|<html[^>]*>|<\/html>|<head>[\s\S]*?<\/head>|<body[^>]*>|<\/body>/gi, '')}
          <script>${projectJs}</script>
        </body>
      </html>
    `;
  };

  // --- Progressive Hint System ---
  const [hintLevel, setHintLevel] = useState(0); // 0 to 4

  // --- Target Viewport Device State ---
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // --- Debugging Challenge State ---
  const [debugSolved, setDebugSolved] = useState({});

  const debugBugs = [
    { id: 1, title: 'Broken Nav Link Anchor', desc: 'Navbar link for Services points to `#coursess` instead of `#services`', fix: 'Change href="#coursess" to href="#services"' },
    { id: 2, title: 'Missing Section ID', desc: 'About section is missing `id="about"` preventing smooth scrolling', fix: 'Add id="about" to the About <section>' },
    { id: 3, title: 'Unmatched Form Label', desc: 'label for="userEmail" paired with input id="email" mismatch', fix: 'Change input id to "userEmail" to match label for' },
    { id: 4, title: 'Form Submitting & Reloading Page', desc: 'Submit event listener missing `e.preventDefault()`', fix: 'Add e.preventDefault() at start of form handler' },
    { id: 5, title: 'Mobile Overflow Bug', desc: 'Contact layout grid has fixed 600px width on mobile viewports', fix: 'Use grid-template-columns: 1fr on max-width 768px media query' },
    { id: 6, title: 'Missing Image Alt Text', desc: 'Project showcase card images missing descriptive alt attributes', fix: 'Add alt="Student E-Commerce Project Screenshot"' },
    { id: 7, title: 'CSS Selector Typo', desc: `.pricingcard instead of .pricing-card preventing button alignment`, fix: 'Fix selector class to .pricing-card' },
    { id: 8, title: 'Missing Checkbox Consent Rule', desc: 'Form allows submission even when agreement checkbox is unchecked', fix: 'Add if (!consent) validation rule check' }
  ];

  const toggleDebugFix = (id) => {
    setDebugSolved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --- AI Code Reviewer State ---
  const [aiReviewScore, setAiReviewScore] = useState(null);

  const runAICodeReview = () => {
    setAiReviewScore({
      htmlStructure: 9,
      cssQuality: 9,
      responsiveDesign: 8,
      uiConsistency: 9,
      accessibility: 8,
      jsValidation: 9,
      userExperience: 9,
      contentClarity: 8,
      ctaEffectiveness: 9,
      totalScore: 88,
      level: 'LEVEL 3 — PROFESSIONAL (88 / 100)',
      goodPoints: [
        'Clean semantic HTML section structure (NAVBAR → HERO → ABOUT → SERVICES → PROJECTS → TESTIMONIALS → PRICING → CONTACT → FOOTER).',
        'All 3 required testimonial cards clearly labeled as Demo/Fictional Content.',
        'Proper form validation checking required fields, email format, and consent checkbox.',
        'Responsive layout using CSS Grid and Flexbox with stacked mobile viewports.'
      ],
      improvementPoints: [
        'Add smooth scrolling behavior in CSS: html { scroll-behavior: smooth; }',
        'Consider adding focus indicator outlines for accessible keyboard navigation.'
      ]
    });
  };

  // --- Knowledge Check State ---
  const [knowledgeCheckAnswers, setKnowledgeCheckAnswers] = useState({});
  const [knowledgeCheckSubmitted, setKnowledgeCheckSubmitted] = useState(false);

  const knowledgeCheckQuestions = [
    {
      id: 1,
      question: 'What is the correct structural section sequence for a complete business landing page?',
      options: [
        'FOOTER → CONTACT → HERO → PRICING → NAVBAR',
        'NAVBAR → HERO → ABOUT → SERVICES → PROJECTS → TESTIMONIALS → PRICING → CONTACT → FOOTER',
        'HERO → CONTACT → SERVICES → FOOTER',
        'ABOUT → NAVBAR → PRICING → CONTACT'
      ],
      correct: 1,
      explanation: 'The standard conversion sequence guides visitors logically from introductory branding (NAVBAR/HERO/ABOUT) to value (SERVICES/PROJECTS), social proof (TESTIMONIALS), investment (PRICING), action (CONTACT), and navigation anchor (FOOTER).'
    },
    {
      id: 2,
      question: 'Why must student testimonial and project sections include clear "Demo Content" disclaimers?',
      options: [
        'To prevent fake reviews from misleading real web visitors',
        'Because HTML code does not support real text',
        'To make the website load faster',
        'It is required by CSS syntax rules'
      ],
      correct: 0,
      explanation: 'Ethical web design requires clearly labeling fictional project samples and customer reviews to avoid misleading visitors or creating false claims.'
    },
    {
      id: 3,
      question: 'What JavaScript method must be invoked first inside a form submit event listener?',
      options: [
        'window.location.reload()',
        'e.preventDefault()',
        'document.write()',
        'alert("Submitted")'
      ],
      correct: 1,
      explanation: '`e.preventDefault()` stops the browser\'s default form submission behavior (which reloads the page and clears input fields), allowing custom JavaScript validation to execute.'
    },
    {
      id: 4,
      question: 'Which CSS property enables responsive cards to automatically wrap across lines on small screens?',
      options: [
        'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
        'float: left;',
        'position: absolute;',
        'display: inline;'
      ],
      correct: 0,
      explanation: 'CSS Grid with `repeat(auto-fit, minmax(280px, 1fr))` dynamically calculates available space and wraps cards into fewer columns as the viewport shrinks.'
    },
    {
      id: 5,
      question: 'Why should a complete business website maintain a single unified design system?',
      options: [
        'To make every section look completely different',
        'To create a cohesive, professional user experience using consistent colors, fonts, spacing, and buttons',
        'Because CSS only allows one color per file',
        'To reduce HTML file size'
      ],
      correct: 1,
      explanation: 'Consistency in typography, color palette, button padding, and card styles creates a polished, trustworthy brand identity.'
    },
    {
      id: 6,
      question: 'What is the purpose of `<label for="userName">` paired with `<input id="userName">`?',
      options: [
        'It aligns the button to the right',
        'It binds the text label to the input for accessibility, screen readers, and click focusing',
        'It automatically sends an email',
        'It colors the input box blue'
      ],
      correct: 1,
      explanation: 'Matching `for` and `id` ensures accessibility compliance by linking label text directly to the control for assistive technologies.'
    },
    {
      id: 7,
      question: 'In client-side JavaScript form validation, what does `inputElement.value.trim()` do?',
      options: [
        'Converts text to uppercase',
        'Removes leading and trailing whitespace characters to prevent empty space submissions',
        'Deletes the input field',
        'Validates password strength'
      ],
      correct: 1,
      explanation: '`trim()` strips unnecessary spaces around input text, ensuring users cannot bypass validation by typing spaces.'
    },
    {
      id: 8,
      question: 'How should mobile viewports handle a 2-column contact layout on small screens (375px)?',
      options: [
        'Keep 2 columns side-by-side causing horizontal scroll',
        'Hide the contact form completely',
        'Stack into a single 1-column vertical layout using media queries',
        'Rotate the screen 90 degrees'
      ],
      correct: 2,
      explanation: 'Media queries target screen widths (e.g. `max-width: 768px`) to stack multi-column grids into single full-width vertical columns.'
    },
    {
      id: 9,
      question: 'Which HTML attribute connects a Navbar link (`<a href="#pricing">`) to the Pricing section?',
      options: [
        '<section id="pricing">',
        '<section class="pricing">',
        '<section name="pricing">',
        '<section value="pricing">'
      ],
      correct: 0,
      explanation: 'Anchor links with `#id` target elements with matching `id="..."` attributes on the page for smooth in-page navigation.'
    },
    {
      id: 10,
      question: 'What is the recommended approach when using AI to plan website content and design?',
      options: [
        'Copy AI outputs blindly without editing',
        'Use AI suggestions as creative recommendations, then personalize and verify the code manually',
        'Never use AI for web design',
        'Let AI publish the website directly'
      ],
      correct: 1,
      explanation: 'AI tools accelerate brainstorming and code review, but web developers must make final design decisions, customize text, and verify code quality.'
    },
    {
      id: 11,
      question: 'Which feature is essential for a pricing section card component?',
      options: [
        'Plan name, clear price value, feature list with checkmarks, and a Call-to-Action button',
        'Only a price number with no text',
        'A video background with no text',
        'A contact phone number'
      ],
      correct: 0,
      explanation: 'Effective pricing cards communicate value quickly through plan titles, distinct pricing, feature highlights, and explicit CTA buttons.'
    },
    {
      id: 12,
      question: 'What does a sticky navigation bar (`position: sticky; top: 0;`) achieve?',
      options: [
        'Hides navigation when scrolling',
        'Keeps the Navbar visible at the top of the browser window as the user scrolls down',
        'Fixes the footer to the bottom of the screen',
        'Makes buttons glow green'
      ],
      correct: 1,
      explanation: 'Sticky navigation ensures visitors can access page links from any section without scrolling back to the top.'
    },
    {
      id: 13,
      question: 'In the 60-Minute Mini Project plan, what should be completed during minutes 40–50?',
      options: [
        'Planning business goals',
        'JavaScript client-side form validation and interactive state handling',
        'Writing HTML section titles',
        'Choosing color palettes'
      ],
      correct: 1,
      explanation: 'The 60-minute breakdown assigns minutes 40–50 for JavaScript logic, form validation, error banners, and success alerts.'
    },
    {
      id: 14,
      question: 'What score range represents "LEVEL 4 — PORTFOLIO READY" in the AI Project Evaluation?',
      options: [
        '0 to 50',
        '60 to 69',
        '70 to 79',
        '90 to 100'
      ],
      correct: 3,
      explanation: 'Scores from 90 to 100 represent Portfolio Ready projects demonstrating strong UI design, responsive behavior, clean code, and accessibility.'
    },
    {
      id: 15,
      question: 'What milestone is unlocked upon completing Day 10 of the Web Design course?',
      options: [
        '10% Course Progress',
        '50% Course Progress (Day 10 / 20) & Mini Project 1 Completion',
        'Course Graduation Certificate',
        'Full React Certification'
      ],
      correct: 1,
      explanation: 'Day 10 completes Mini Project 1 and marks 50% progress in the 20-Day Web Design & Frontend Development course.'
    }
  ];

  const calculateQuizScore = () => {
    let score = 0;
    knowledgeCheckQuestions.forEach(q => {
      if (knowledgeCheckAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>

      {/* ==================== HEADER & DASHBOARD ==================== */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '24px', padding: '2.5rem 2rem', color: '#ffffff', marginBottom: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
          <span style={{ background: '#4f46e5', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Day 10 — 50% Progress Milestone
          </span>
          <span style={{ background: 'rgba(255,255,255,0.15)', color: '#e0e7ff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
            ⏱️ 60-Minute Mini Project
          </span>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 900, margin: '0 0 1rem 0', letterSpacing: '-0.5px' }}>
          🚀 MINI PROJECT 1 — Complete One-Page Business Website
        </h1>

        <p style={{ fontSize: '1rem', color: '#c7d2fe', maxWidth: '850px', margin: '0 0 1.75rem 0', lineHeight: 1.6 }}>
          Apply everything learned from Days 1–9! Build a complete, responsive one-page business website featuring a unified design system, interactive JavaScript form validation, and real-time live preview.
        </p>

        {/* PROJECT STARTER DASHBOARD CHECKLIST */}
        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.25rem 1.5rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📋 Mini Project 1 Dashboard Checklist:</span>
            <span>Completed: {Object.values(completedSteps).filter(Boolean).length} / 14</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {[
              { id: 'planning', label: 'Planning & Business' },
              { id: 'navbar', label: 'Navbar Section' },
              { id: 'hero', label: 'Hero Section' },
              { id: 'about', label: 'About Section' },
              { id: 'services', label: 'Services Cards' },
              { id: 'projects', label: 'Projects Showcase' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'pricing', label: 'Pricing Cards' },
              { id: 'contact', label: 'Contact & Form' },
              { id: 'footer', label: 'Footer Section' },
              { id: 'responsive', label: 'Responsive Layout' },
              { id: 'javascript', label: 'JS Form Validation' },
              { id: 'testing', label: 'Device Testing' },
              { id: 'review', label: 'AI Code Review' }
            ].map(step => (
              <button
                key={step.id}
                onClick={() => toggleChecklistStep(step.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: completedSteps[step.id] ? '#22c55e' : 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <CheckSquare size={14} style={{ opacity: completedSteps[step.id] ? 1 : 0.5 }} />
                <span>{step.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== TAB NAVIGATION (STREAMLINED TO 8 CLEAN TABS) ==================== */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
        {[
          { id: 'intro', label: 'Project Brief & Business Goals', icon: <BookOpen size={16} /> },
          { id: 'builder', label: 'Independent Project Workspace', icon: <Code size={16} /> },
          { id: 'sections_guide', label: '9-Section Explorer & Checklist', icon: <Layout size={16} /> },
          { id: 'js_lab', label: 'JS Validation & Form Logic', icon: <Terminal size={16} /> },
          { id: 'responsive_tester', label: 'Responsive Viewport Tester', icon: <Smartphone size={16} /> },
          { id: 'challenges', label: 'Debugging & AI Code Audit', icon: <Sparkles size={16} /> },
          { id: 'submission', label: 'Presentation & Project Submission', icon: <Send size={16} /> },
          { id: 'quiz', label: 'Knowledge Check', icon: <CheckCircle size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (onNavigate) onNavigate(tab.id);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: activeTab === tab.id ? 800 : 600,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              border: activeTab === tab.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
              background: activeTab === tab.id ? '#eff6ff' : '#ffffff',
              color: activeTab === tab.id ? '#1d4ed8' : '#475569',
              cursor: 'pointer',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(37,99,235,0.15)' : 'none'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ==================== TAB CONTENT ==================== */}

      {/* TAB 1: PROJECT BRIEF & BUSINESS GOALS (WITH BUILT-IN AI PLANNER) */}
      {isTabActive('intro') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              Project Brief &amp; Business Niche Selection
            </h2>
            <blockquote style={{ background: '#eff6ff', borderLeft: '4px solid #2563eb', padding: '1.25rem', borderRadius: '8px', margin: '0 0 1.5rem 0', fontSize: '0.95rem', color: '#1e3a8a', lineHeight: 1.6 }}>
              <strong>The Freelance Challenge:</strong> "You are a freelance web designer. A local business has asked you to create a professional one-page website that explains their services, builds trust, shows pricing, and allows customers to send an enquiry."
            </blockquote>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Select Your Business Niche:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
              {businessOptions.map(biz => (
                <div
                  key={biz.id}
                  onClick={() => setSelectedBusiness(biz.id)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: selectedBusiness === biz.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: selectedBusiness === biz.id ? '#f0f6ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: selectedBusiness === biz.id ? '#1d4ed8' : '#0f172a', marginBottom: 4 }}>
                    {selectedBusiness === biz.id ? '✓ ' : ''}{biz.name}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{biz.desc}</div>
                </div>
              ))}
            </div>

            {/* AI DESIGN PLANNER SECTION INTEGRATED DIRECTLY */}
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <Sparkles size={20} style={{ color: '#2563eb' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
                  AI Design &amp; Content Assistant
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Target Customer Audience:</label>
                  <input
                    type="text"
                    value={aiTargetAudience}
                    onChange={(e) => setAiTargetAudience(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Primary Business Goal:</label>
                  <input
                    type="text"
                    value={aiBusinessGoal}
                    onChange={(e) => setAiBusinessGoal(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <button
                onClick={generateAIPlan}
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={16} />
                <span>Generate AI Design Recommendation</span>
              </button>

              {aiGeneratedPlan && (
                <div style={{ marginTop: '1rem', background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #93c5fd' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#2563eb', marginBottom: 4 }}>RECOMMENDED HERO HEADLINE:</div>
                  <div style={{ fontWeight: 900, fontSize: '1rem', color: '#0f172a' }}>"{aiGeneratedPlan.heroHeadline}"</div>
                </div>
              )}
            </div>

            {/* 60-MINUTE CLASS TIMELINE BREAKDOWN */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              ⏱️ 60-Minute Execution Schedule:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
              {[
                { time: '0–5 MIN', title: 'Briefing', desc: 'Review goals & business brief' },
                { time: '5–10 MIN', title: 'AI Planning', desc: 'Choose niche & design palette' },
                { time: '10–25 MIN', title: 'HTML Build', desc: 'Assemble 9 semantic sections' },
                { time: '25–40 MIN', title: 'CSS Styling', desc: 'Apply unified design system' },
                { time: '40–50 MIN', title: 'JS Validation', desc: 'Add client-side form logic' },
                { time: '50–55 MIN', title: 'Testing', desc: 'Test mobile & tablet responsive' },
                { time: '55–60 MIN', title: 'Final Review', desc: 'Run AI Audit & submit code' }
              ].map((slot, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ background: '#312e81', color: '#ffffff', fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginBottom: 6 }}>
                    {slot.time}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginBottom: 2 }}>{slot.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{slot.desc}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: INDEPENDENT PROJECT WORKSPACE */}
      {isTabActive('builder') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                  Independent Workspace &amp; Live Preview
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                  Edit your HTML, CSS, and JavaScript below. The live preview updates in real time.
                </p>
              </div>

              {/* FILE SELECTOR BUTTONS */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setActiveCodeFile('html')}
                  style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, background: activeCodeFile === 'html' ? '#f43f5e' : '#f1f5f9', color: activeCodeFile === 'html' ? '#ffffff' : '#475569', border: 'none', cursor: 'pointer' }}
                >
                  index.html
                </button>
                <button
                  onClick={() => setActiveCodeFile('css')}
                  style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, background: activeCodeFile === 'css' ? '#2563eb' : '#f1f5f9', color: activeCodeFile === 'css' ? '#ffffff' : '#475569', border: 'none', cursor: 'pointer' }}
                >
                  styles.css
                </button>
                <button
                  onClick={() => setActiveCodeFile('js')}
                  style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, background: activeCodeFile === 'js' ? '#f59e0b' : '#f1f5f9', color: activeCodeFile === 'js' ? '#ffffff' : '#475569', border: 'none', cursor: 'pointer' }}
                >
                  script.js
                </button>
              </div>
            </div>

            {/* EDITOR & PREVIEW SPLIT VIEW */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

              {/* CODE EDITOR */}
              <div>
                {activeCodeFile === 'html' && (
                  <LiveSyntaxCodeEditor value={projectHtml} onChange={setProjectHtml} language="html" rows={24} label="HTML (9 Sections)" />
                )}
                {activeCodeFile === 'css' && (
                  <LiveSyntaxCodeEditor value={projectCss} onChange={setProjectCss} language="css" rows={24} label="CSS (Unified Design System)" />
                )}
                {activeCodeFile === 'js' && (
                  <LiveSyntaxCodeEditor value={projectJs} onChange={setProjectJs} language="js" rows={24} label="JavaScript (Form Validation)" />
                )}
              </div>

              {/* LIVE OUTPUT PREVIEW IFRAME */}
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc' }}>
                <div style={{ background: '#0f172a', color: '#94a3b8', padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🌐 Live Browser Preview</span>
                  <span style={{ color: '#22c55e' }}>● Live Updating</span>
                </div>
                <iframe
                  title="Live Output Preview"
                  srcDoc={renderCombinedPreview()}
                  style={{ width: '100%', height: '520px', border: 'none', background: '#ffffff' }}
                />
              </div>

            </div>

            {/* PROGRESSIVE HINT SYSTEM */}
            <div style={{ marginTop: '1.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HelpCircle size={18} />
                  <span>Progressive Hint System (Level {hintLevel} / 4)</span>
                </div>
                <button
                  onClick={() => setHintLevel(prev => (prev < 4 ? prev + 1 : 0))}
                  style={{ background: '#166534', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {hintLevel < 4 ? 'Need Next Hint?' : 'Reset Hints'}
                </button>
              </div>

              {hintLevel >= 1 && <div style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: 4 }}>💡 <strong>Hint 1 (Conceptual):</strong> Start by creating your outer <code style={{ background: '#dcfce7', padding: '2px 4px' }}>&lt;nav&gt;</code> and <code style={{ background: '#dcfce7', padding: '2px 4px' }}>&lt;section id="..."&gt;</code> containers first before adding styles.</div>}
              {hintLevel >= 2 && <div style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: 4 }}>💡 <strong>Hint 2 (HTML Structure):</strong> Ensure every section has a unique ID (<code style={{ background: '#dcfce7', padding: '2px 4px' }}>id="hero"</code>, <code style={{ background: '#dcfce7', padding: '2px 4px' }}>id="services"</code>) matching your Navbar anchor links (<code style={{ background: '#dcfce7', padding: '2px 4px' }}>href="#services"</code>).</div>}
              {hintLevel >= 3 && <div style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: 4 }}>💡 <strong>Hint 3 (CSS Grid):</strong> Use <code style={{ background: '#dcfce7', padding: '2px 4px' }}>display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));</code> for card grids so they wrap automatically on small screens.</div>}
              {hintLevel >= 4 && <div style={{ fontSize: '0.85rem', color: '#14532d' }}>💡 <strong>Hint 4 (JS Validation):</strong> Remember to call <code style={{ background: '#dcfce7', padding: '2px 4px' }}>e.preventDefault()</code> inside your form submit listener to prevent page refresh!</div>}
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: 9-SECTION EXPLORER & CHECKLIST */}
      {isTabActive('sections_guide') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              The 9 Required Website Sections &amp; Checklist
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Review the detailed technical requirements for each of the 9 sections required for your complete business landing page:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {[
                { title: '1. NAVBAR', items: ['Business logo or brand title', '7 anchor links (#hero, #about, #services, #projects, #testimonials, #pricing, #contact)', 'Call-to-Action button', 'Sticky header positioning (position: sticky)'] },
                { title: '2. HERO SECTION', items: ['Strong headline statement', 'Supporting intro paragraph', 'Primary CTA button (e.g. Enroll / Get Started)', 'Secondary CTA button (e.g. View Demo)', 'Background gradient or visual accent'] },
                { title: '3. ABOUT SECTION', items: ['Section title & introduction', '2 to 4 highlight badge cards', 'Value proposition breakdown', 'Clean spacing & typography'] },
                { title: '4. SERVICES / COURSES', items: ['At least 3 distinct service cards', 'Service title, short description, & tag', 'Consistent CSS Grid 3-column layout', 'Hover lift animation effect'] },
                { title: '5. PROJECTS SHOWCASE', items: ['At least 3 showcase cards', 'Project name & description', 'Clear [Demo Project] indicator tag', 'View Details trigger button'] },
                { title: '6. TESTIMONIALS', items: ['At least 3 review cards', '5-star rating graphic', 'Customer quote, name, & role subtitle', 'Mandatory "Fictional Demo Content" disclaimer badge'] },
                { title: '7. PRICING & PLANS', items: ['3 fee cards (Starter, Pro, Mastery)', 'Plan title, clear pricing figure, & feature checklist', '1 highlighted popular card with badge', 'Call-to-Action purchase button on each card'] },
                { title: '8. CONTACT & FORM', items: ['Contact details cards (Location, Phone, Email)', 'Form with Name, Email, Dropdown, Inquiry, & Consent Checkbox', 'Client-side JS submit handler (e.preventDefault())', 'Dynamic Error & Success alert banners'] },
                { title: '9. FOOTER SECTION', items: ['Brand title & brief summary', 'Quick navigation links list', 'Legal copyright bar (© 2026 Demo Business)', 'Clean dark theme footer styling'] }
              ].map((sec, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 900, fontSize: '1rem', color: '#1e3a8a', marginBottom: '0.75rem' }}>
                    {sec.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    {sec.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#22c55e', fontWeight: 900 }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: JS VALIDATION & FORM LOGIC */}
      {isTabActive('js_lab') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 1rem 0' }}>
              JavaScript Client-Side Form Validation Deep-Dive
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Understand the core DOM manipulation and validation functions required for your project form:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', color: '#e2e8f0', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                <div style={{ color: '#64748b', marginBottom: 8 }}>// Core Form Submit Handler Pattern</div>
                <div><span style={{ color: '#c678dd' }}>document</span>.getElementById(<span style={{ color: '#98c379' }}>'leadForm'</span>)</div>
                <div style={{ paddingLeft: '1rem' }}>.addEventListener(<span style={{ color: '#98c379' }}>'submit'</span>, (e) =&gt; &#123;</div>
                <div style={{ paddingLeft: '2rem', color: '#61afef' }}>e.preventDefault(); <span style={{ color: '#7f848e' }}>// 1. Stop page refresh</span></div>
                <div style={{ paddingLeft: '2rem' }}><span style={{ color: '#c678dd' }}>const</span> name = document.getElementById(<span style={{ color: '#98c379' }}>'name'</span>).value.trim();</div>
                <div style={{ paddingLeft: '2rem' }}><span style={{ color: '#c678dd' }}>const</span> email = document.getElementById(<span style={{ color: '#98c379' }}>'email'</span>).value.trim();</div>
                <div style={{ paddingLeft: '2rem', color: '#7f848e' }}>// 2. Validate empty fields</div>
                <div style={{ paddingLeft: '2rem' }}><span style={{ color: '#c678dd' }}>if</span> (!name || !email) &#123;</div>
                <div style={{ paddingLeft: '3rem', color: '#e5c07b' }}>showError('Please fill all fields');</div>
                <div style={{ paddingLeft: '3rem' }}><span style={{ color: '#c678dd' }}>return</span>;</div>
                <div style={{ paddingLeft: '2rem' }}>&#125;</div>
                <div style={{ paddingLeft: '2rem', color: '#7f848e' }}>// 3. Show success state</div>
                <div style={{ paddingLeft: '2rem', color: '#98c379' }}>showSuccess('Inquiry submitted!');</div>
                <div style={{ paddingLeft: '1rem' }}>&#125;);</div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>Validation Checklist Rules:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#334155' }}>
                  <div>✓ <strong>e.preventDefault():</strong> Essential to block automatic page reloads.</div>
                  <div>✓ <strong>.trim():</strong> Prevents users from bypassing checks using blank spaces.</div>
                  <div>✓ <strong>Email Format Check:</strong> Verify string contains `@` and `.`.</div>
                  <div>✓ <strong>Checkbox Consent Check:</strong> Verify `checkboxElement.checked === true`.</div>
                  <div>✓ <strong>User Feedback Banners:</strong> Display error alert in red and success alert in green.</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 5: RESPONSIVE VIEWPORT TESTER */}
      {isTabActive('responsive_tester') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                  Live Responsive Viewport Tester
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                  Test how your project renders across Desktop, Tablet, and Mobile viewports:
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: previewDevice === 'desktop' ? '2px solid #2563eb' : '1px solid #cbd5e1', background: previewDevice === 'desktop' ? '#eff6ff' : '#ffffff', color: previewDevice === 'desktop' ? '#1d4ed8' : '#475569', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  <Monitor size={16} />
                  <span>Desktop (1200px)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: previewDevice === 'tablet' ? '2px solid #2563eb' : '1px solid #cbd5e1', background: previewDevice === 'tablet' ? '#eff6ff' : '#ffffff', color: previewDevice === 'tablet' ? '#1d4ed8' : '#475569', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  <TabletIcon size={16} />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', border: previewDevice === 'mobile' ? '2px solid #2563eb' : '1px solid #cbd5e1', background: previewDevice === 'mobile' ? '#eff6ff' : '#ffffff', color: previewDevice === 'mobile' ? '#1d4ed8' : '#475569', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  <Smartphone size={16} />
                  <span>Mobile (375px)</span>
                </button>
              </div>
            </div>

            {/* DEVICE CONTAINER */}
            <div style={{ display: 'flex', justifyContent: 'center', background: '#0f172a', padding: '2rem 1rem', borderRadius: '16px', overflowX: 'auto' }}>
              <div style={{
                width: previewDevice === 'desktop' ? '100%' : previewDevice === 'tablet' ? '768px' : '375px',
                height: '600px',
                background: '#ffffff',
                borderRadius: previewDevice === 'desktop' ? '8px' : '24px',
                border: previewDevice === 'desktop' ? 'none' : '12px solid #334155',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}>
                <iframe
                  title="Device Viewport Render"
                  srcDoc={renderCombinedPreview()}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 6: DEBUGGING & AI CODE AUDIT (COMBINED FOR EFFICIENCY) */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          {/* DEBUGGING CHALLENGE */}
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <AlertCircle size={22} style={{ color: '#ef4444' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                Debugging Challenge — "You are the Developer. Find &amp; Fix the 8 Bugs"
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Inspect each bug below and verify the solution:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {debugBugs.map(bug => (
                <div
                  key={bug.id}
                  onClick={() => toggleDebugFix(bug.id)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: debugSolved[bug.id] ? '2px solid #22c55e' : '1px solid #fee2e2',
                    background: debugSolved[bug.id] ? '#f0fdf4' : '#fef2f2',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: debugSolved[bug.id] ? '#15803d' : '#991b1b' }}>
                      {debugSolved[bug.id] ? '✓ RESOLVED: ' : '🐞 BUG #' + bug.id + ': '} {bug.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: 8 }}>{bug.desc}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: debugSolved[bug.id] ? '#166534' : '#b91c1c' }}>
                    💡 Fix: {bug.fix}
                  </div>
                </div>
              ))}
            </div>

            {/* AI AUDIT & CODE REVIEW SECTION */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Award size={22} style={{ color: '#10b981' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1e1b4b', margin: 0 }}>
                  AI Website Audit &amp; Automated Code Review
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Evaluate HTML, CSS, JavaScript, Accessibility, and UI consistency:
              </p>

              <button
                onClick={runAICodeReview}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1.5rem'
                }}
              >
                <Award size={18} />
                <span>Run AI Code Audit &amp; Score Project</span>
              </button>

              {aiReviewScore && (
                <div style={{ background: '#f8fafc', border: '2px solid #22c55e', borderRadius: '16px', padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#15803d', margin: '0 0 1rem 0' }}>
                    🎉 Audit Score: {aiReviewScore.totalScore} / 100 ({aiReviewScore.level})
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                    {Object.entries({
                      'HTML Structure': aiReviewScore.htmlStructure,
                      'CSS Quality': aiReviewScore.cssQuality,
                      'Responsive Design': aiReviewScore.responsiveDesign,
                      'UI Consistency': aiReviewScore.uiConsistency,
                      'Accessibility': aiReviewScore.accessibility,
                      'JS Validation': aiReviewScore.jsValidation
                    }).map(([k, v]) => (
                      <div key={k} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}>
                        {k}: <span style={{ color: '#2563eb' }}>{v} / 10</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 7: PRESENTATION & PROJECT SUBMISSION (COMBINED FOR EFFICIENCY) */}
      {activeTab === 'submission' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              2-Minute Presentation &amp; Submission
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Prepare to present your project to clients using this structured outline:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { q: '1. Business Chosen', a: 'Apex Tech Academy (IT Training Centre)' },
                { q: '2. Target Customer', a: 'Students & fresh graduates seeking tech careers' },
                { q: '3. Problem Solved', a: 'Explains courses, shows fees, & collects demo leads' },
                { q: '4. Design Palette', a: 'Modern navy blue & electric blue palette' },
                { q: '5. Main Sections', a: 'Navbar, Hero, About, Courses, Projects, Fees, Contact, Footer' },
                { q: '6. JS Features', a: 'Form validation with error & success alert banners' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e3a8a', marginBottom: 4 }}>{item.q}</div>
                  <div style={{ fontSize: '0.85rem', color: '#334155' }}>{item.a}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
                Submit Mini Project 1
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Project Title:</label>
                  <input type="text" defaultValue="Apex Tech Academy One-Page Website" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Live URL (Optional):</label>
                  <input type="text" placeholder="https://my-demo-website.vercel.app" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <button
                onClick={() => alert('Mini Project 1 Submitted Successfully!')}
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Submit Mini Project 1
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 8: KNOWLEDGE CHECK */}
      {activeTab === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
              Day 10 Knowledge Check &amp; 50% Milestone
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Answer the 15 questions below to complete Day 10 and advance your course progress to <strong>50%</strong>:
            </p>

            {/* Quiz Questions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {knowledgeCheckQuestions.map((q, idx) => (
                <div key={q.id} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                    Q{idx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = knowledgeCheckAnswers[q.id] === optIdx;
                      const isCorrect = q.correct === optIdx;
                      let btnBg = '#ffffff';
                      let btnBorder = '1px solid #cbd5e1';
                      let btnColor = '#334155';

                      if (knowledgeCheckSubmitted) {
                        if (isCorrect) {
                          btnBg = '#dcfce7';
                          btnBorder = '2px solid #22c55e';
                          btnColor = '#15803d';
                        } else if (isSelected) {
                          btnBg = '#fee2e2';
                          btnBorder = '2px solid #ef4444';
                          btnColor = '#b91c1c';
                        }
                      } else if (isSelected) {
                        btnBg = '#eff6ff';
                        btnBorder = '2px solid #2563eb';
                        btnColor = '#1d4ed8';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={knowledgeCheckSubmitted}
                          onClick={() => setKnowledgeCheckAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                          style={{
                            textAlign: 'left',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: btnBorder,
                            background: btnBg,
                            color: btnColor,
                            fontSize: '0.88rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: knowledgeCheckSubmitted ? 'default' : 'pointer'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {knowledgeCheckSubmitted && (
                    <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#475569', background: '#ffffff', padding: '8px 12px', borderRadius: '6px', borderLeft: '4px solid #2563eb' }}>
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Submit Action */}
            {!knowledgeCheckSubmitted ? (
              <button
                onClick={() => setKnowledgeCheckSubmitted(true)}
                style={{
                  width: '100%',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem 2rem',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                  marginBottom: '2rem'
                }}
              >
                Submit Knowledge Check
              </button>
            ) : (
              <div style={{ background: '#dcfce7', border: '2px solid #22c55e', color: '#15803d', padding: '1rem', borderRadius: '14px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', marginBottom: '2rem' }}>
                ✓ Quiz Submitted! Score: {calculateQuizScore()} / 15 | Progress: 50% (Day 10 / 20)
              </div>
            )}

            {/* STANDARDIZED GREEN TROPHY COMPLETION SCREEN — ALWAYS VISIBLE */}
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
                🎉 Day 10 &amp; Mini Project 1 Completed!
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#e0e7ff', margin: '0 0 1.5rem 0' }}>
                Score: <strong>{calculateQuizScore()} / 15</strong> | Progress: <strong>50% (Day 10 / 20)</strong>
              </p>

              {/* YOU LEARNED Checklist */}
              <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.75rem', maxWidth: '560px', margin: '1.5rem auto 2rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  YOU LEARNED &amp; BUILT:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                  <div>✓ Complete 9-section landing page</div>
                  <div>✓ Sticky navigation bar</div>
                  <div>✓ Hero section with CTAs</div>
                  <div>✓ About section highlights</div>
                  <div>✓ Services grid cards</div>
                  <div>✓ Student project showcase</div>
                  <div>✓ Testimonials &amp; demo badges</div>
                  <div>✓ 3-Tier pricing cards</div>
                  <div>✓ Contact form &amp; info layout</div>
                  <div>✓ Dark theme footer</div>
                  <div>✓ JS client-side validation</div>
                  <div>✓ e.preventDefault() handling</div>
                  <div>✓ Error &amp; success alerts</div>
                  <div>✓ 1-column responsive layout</div>
                  <div>✓ AI design &amp; code auditing</div>
                </div>
              </div>

              {/* Progress Summary Cards */}
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '16px', padding: '1.25rem 1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                  Your Continuous Course Progress (50% Milestone):
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                  <div>Day 1: Website layout ✓</div>
                  <div>Day 2: Professional Navbar ✓</div>
                  <div>Day 3: Hero Section ✓</div>
                  <div>Day 4: About Section ✓</div>
                  <div>Day 5: Services Section ✓</div>
                  <div>Day 6: Portfolio / Projects Section ✓</div>
                  <div>Day 7: Testimonials &amp; Trust Section ✓</div>
                  <div>Day 8: Pricing / Plans Section ✓</div>
                  <div>Day 9: Contact &amp; Lead Generation Section ✓</div>
                  <div>Day 10: MINI PROJECT 1 — Complete Business Website ✓</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default WebDesignDay10;
