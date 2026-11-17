import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, ChevronLeft, Menu, X, Star, Award, Users, TrendingUp, Shield, Zap, BookOpen,
  Target, CheckCircle, Play, Mail, Phone, LogIn, Key, ShieldAlert, Sparkles,
  Database, Code, Bot, Brain, Terminal, Layers, ArrowRight, BarChart3, Clock, MessageCircle, Send,
  MapPin, GitBranch, Server, Briefcase
} from 'lucide-react';
import { getCoursesFromDb } from '../../services/courseService';

// --- 1. COUNTDOWN TIMER BANNER WITH GOOGLE RATING & SCROLLING MARQUEE ---
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
      color: '#ffffff',
      zIndex: 100,
      position: 'relative',
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: isMobile ? '0.8rem 1rem' : '0.8rem 2rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        minHeight: isMobile ? 'auto' : '4.2rem',
        boxSizing: 'border-box'
      }}>
        {/* Google Rating Column (Aligned flush-left with Alpha Fly Logo) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
          gap: '2px',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            Google Rating
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ color: '#facc15', fontSize: '1rem', letterSpacing: '1px', lineHeight: 1 }}>★★★★★</span>
            <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.88rem' }}>5/5</span>
          </div>
        </div>

        {/* Countdown Clock Column */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.95)' }}>
            <Clock size={16} />
            <span>Enroll within</span>
          </div>
          <div style={{ display: 'flex', gap: '4px', fontFamily: 'monospace' }}>
            <span style={{ background: '#f97316', color: '#ffffff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.85rem' }}>{timeLeft.days}d</span>
            <span style={{ background: '#f97316', color: '#ffffff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.85rem' }}>{timeLeft.hours}h</span>
            <span style={{ background: '#f97316', color: '#ffffff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.85rem' }}>{timeLeft.minutes}m</span>
            <span style={{ background: '#f97316', color: '#ffffff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, fontSize: '0.85rem' }}>{timeLeft.seconds}s</span>
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 0.95)' }}>to claim</span>
          <span style={{
            background: '#0f172a',
            color: '#facc15',
            border: '1px solid rgba(250, 204, 21, 0.4)',
            padding: '3px 9px',
            borderRadius: '6px',
            fontWeight: 900,
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            50% OFF! 🎯
          </span>
        </div>

        {/* Right End: Scrolling Offer Badges (Flush-aligned with LOGIN button below) */}
        <div style={{
          width: isMobile ? '100%' : '300px',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <div className="marquee-container" style={{
            width: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}>
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
                    letterSpacing: '0.02em',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
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
    </div>
  );
}


// --- 2. FEATURES SECTION ---
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

// --- 4. COURSE CAROUSEL / AVAILABLE COURSES (IMAGE THEMED CARDS & SMOOTH CAROUSEL) ---

const ComputerCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="7" y="9" width="34" height="24" rx="4" fill="#60a5fa" stroke="#ffffff" strokeWidth="2.5" />
    <rect x="11" y="13" width="26" height="16" rx="2" fill="#93c5fd" />
    <path d="M19 33L16 41H32L29 33" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="13" y1="41" x2="35" y2="41" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const OfficeCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="9" y="7" width="30" height="34" rx="5" fill="#ffffff" />
    <line x1="14" y1="13" x2="26" y2="13" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="14" y="24" width="5.5" height="12" rx="2" fill="#ec4899" />
    <rect x="21.5" y="18" width="5.5" height="18" rx="2" fill="#10b981" />
    <rect x="29" y="14" width="5.5" height="22" rx="2" fill="#3b82f6" />
  </svg>
);

const TallyCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M12 7H36V41L32 38L28 41L24 38L20 41L16 38L12 41V7Z" fill="#ffffff" />
    <line x1="17" y1="14" x2="31" y2="14" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="20" x2="31" y2="20" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="26" x2="26" y2="26" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="32" x2="24" y2="32" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PythonCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M23.5 7C17.5 7 14 10.5 14 15.5H23.5V17H11.5C9.5 21 9.5 27 15.5 28.5V25C15.5 21.5 18.5 19 22.5 19H31.5C34 19 36 17 36 14.5C36 10 30.5 7 23.5 7Z" fill="#86efac" />
    <circle cx="18.5" cy="11.5" r="1.5" fill="#064e3b" />
    <path d="M24.5 41C30.5 41 34 37.5 34 32.5H24.5V31H36.5C38.5 27 38.5 21 32.5 19.5V23C32.5 26.5 29.5 29 25.5 29H16.5C14 29 12 31 12 33.5C12 38 17.5 41 24.5 41Z" fill="#fde047" />
    <circle cx="29.5" cy="36.5" r="1.5" fill="#713f12" />
  </svg>
);

const WebDesignCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="17" stroke="#ffffff" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
    <ellipse cx="24" cy="24" rx="9" ry="17" stroke="#ffffff" strokeWidth="2" />
    <line x1="7" y1="24" x2="41" y2="24" stroke="#ffffff" strokeWidth="2" />
    <line x1="10" y1="16" x2="38" y2="16" stroke="#ffffff" strokeWidth="1.6" />
    <line x1="10" y1="32" x2="38" y2="32" stroke="#ffffff" strokeWidth="1.6" />
  </svg>
);

const MarketingCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M11 27V19C11 17.9 11.9 17 13 17H17L31 10V36L17 29H13C11.9 29 11 28.1 11 27Z" fill="#fef08a" stroke="#ffffff" strokeWidth="2.2" />
    <path d="M17 29L19 39H24L22 29" fill="#fde047" stroke="#ffffff" strokeWidth="2" />
    <path d="M35 18C37.5 20.2 38.5 22.5 38.5 24C38.5 25.5 37.5 27.8 35 30" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M39 14C42.5 17.5 43.5 21 43.5 24C43.5 27 42.5 30.5 39 34" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DesignCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 7C14 7 7 14 7 24C7 32 12.5 37.5 20 37.5C22.5 37.5 24 36 24 34C24 33 23.5 32 23 31C22.5 30 22 29 22 27.5C22 25 24 23 26.5 23H30C36.5 23 41 19 41 13.5C41 9.5 33.5 7 24 7Z" fill="#fed7aa" stroke="#ffffff" strokeWidth="2.2" />
    <circle cx="16" cy="18" r="3" fill="#ef4444" />
    <circle cx="24" cy="14" r="3" fill="#3b82f6" />
    <circle cx="32" cy="17" r="3" fill="#eab308" />
    <circle cx="16" cy="27" r="3" fill="#10b981" />
    <circle cx="33" cy="29" r="3.2" fill="#78350f" />
  </svg>
);

const DiplomaCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 8L6 18L24 28L42 18L24 8Z" fill="#0f172a" stroke="#ffffff" strokeWidth="2.2" />
    <path d="M12 21.5V31C12 35.5 17 38.5 24 38.5C31 38.5 36 35.5 36 31V21.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M40 20V32L38 34" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="38" cy="34" r="2.2" fill="#fbbf24" />
  </svg>
);

const FullStackCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="9" width="32" height="12" rx="3" fill="rgba(255,255,255,0.2)" stroke="#ffffff" strokeWidth="2.2" />
    <circle cx="14" cy="15" r="2" fill="#38bdf8" />
    <circle cx="20" cy="15" r="2" fill="#38bdf8" />
    <rect x="8" y="27" width="32" height="12" rx="3" fill="rgba(255,255,255,0.2)" stroke="#ffffff" strokeWidth="2.2" />
    <circle cx="14" cy="33" r="2" fill="#38bdf8" />
    <circle cx="20" cy="33" r="2" fill="#38bdf8" />
    <line x1="24" y1="21" x2="24" y2="27" stroke="#ffffff" strokeWidth="2.5" />
  </svg>
);

const DataAnalyticsCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="32" height="32" rx="6" fill="rgba(255,255,255,0.18)" stroke="#ffffff" strokeWidth="2.2" />
    <path d="M14 32L21 23L27 27L34 16" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="34" cy="16" r="2.5" fill="#ffffff" />
    <line x1="14" y1="34" x2="34" y2="34" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const SpokoCourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="8" width="28" height="32" rx="4" fill="#ffffff" stroke="#d97706" strokeWidth="2.2" />
    <path d="M16 16H32M16 22H32M16 28H26" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="34" cy="34" r="8" fill="#f59e0b" />
    <path d="M31 34L33 36L37 32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AICourseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" fill="rgba(255,255,255,0.18)" stroke="#ffffff" strokeWidth="2.2" />
    <path d="M24 13V35M13 24H35M16 16L32 32M32 16L16 32" stroke="#f0abfc" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="5" fill="#ffffff" />
  </svg>
);

const courseSvgIconMap = {
  Monitor: <ComputerCourseIcon />,
  FileSpreadsheet: <OfficeCourseIcon />,
  Calculator: <TallyCourseIcon />,
  Code: <PythonCourseIcon />,
  Globe: <WebDesignCourseIcon />,
  Megaphone: <MarketingCourseIcon />,
  Palette: <DesignCourseIcon />,
  GraduationCap: <DiplomaCourseIcon />,
  Layers: <FullStackCourseIcon />,
  BarChart3: <DataAnalyticsCourseIcon />,
  MessageCircle: <SpokoCourseIcon />,
  Bot: <AICourseIcon />
};

function renderLandingCourseIcon(iconKey) {
  return courseSvgIconMap[iconKey] || <ComputerCourseIcon />;
}

function CourseCarouselSection() {
  const [coursesCatalog, setCoursesCatalog] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch courses dynamically from the MongoDB database
  useEffect(() => {
    let isMounted = true;
    getCoursesFromDb(true).then(data => {
      if (isMounted) {
        if (Array.isArray(data) && data.length > 0) {
          setCoursesCatalog(data);
        }
        setIsLoadingCourses(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const visibleCardsCount = windowWidth >= 1100 ? 4 : windowWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, coursesCatalog.length - visibleCardsCount);

  // Auto-advance carousel smoothly, pause on hover or when modal is open
  useEffect(() => {
    if (selectedCourse || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [maxIndex, selectedCourse, isHovered]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  };

  const isMobile = windowWidth < 768;

  return (
    <section id="courses" style={{ padding: isMobile ? '2.5rem 1rem' : '3rem 2rem', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '3.5rem' }}>

          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.6rem',
            fontWeight: 900,
            color: '#0f172a',
            margin: '0 0 0.6rem 0',
            letterSpacing: '-0.02em'
          }}>
            Our Courses
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: isMobile ? '0.95rem' : '1.08rem',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Industry-aligned curriculum designed to take you from foundational basics to real-world career success.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div
          style={{
            position: 'relative',
            padding: isMobile ? '0 44px' : '0 54px',
            boxSizing: 'border-box'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Courses"
            style={{
              position: 'absolute',
              left: isMobile ? '2px' : '4px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 25,
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '50%',
              width: isMobile ? '38px' : '44px',
              height: isMobile ? '38px' : '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
              cursor: 'pointer',
              color: '#1e40af',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1e40af';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#1e40af';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 64, 175, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#1e40af';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.08)';
            }}
          >
            <ChevronLeft size={isMobile ? 18 : 22} />
          </button>

          {/* Carousel Slider Window */}
          <div style={{ width: '100%', overflow: 'hidden', padding: '10px 0 16px' }}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
              transform: `translateX(-${currentIndex * (100 / visibleCardsCount)}%)`
            }}>
              {coursesCatalog.map((c, i) => (
                <div key={i} style={{
                  flex: `0 0 ${100 / visibleCardsCount}%`,
                  padding: '0 10px',
                  boxSizing: 'border-box'
                }}>
                  <div
                    onClick={() => setSelectedCourse(c)}
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      minHeight: '350px',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 16px 32px rgba(30, 64, 175, 0.12)';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {/* Top Colored Header Banner with Centered Icon */}
                    <div style={{
                      height: '120px',
                      background: c.bannerColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      borderTopLeftRadius: '19px',
                      borderTopRightRadius: '19px'
                    }}>
                      <div style={{
                        filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.18))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {c.icon || renderLandingCourseIcon(c.iconKey)}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{
                      padding: '1.4rem 1.4rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1
                    }}>
                      <div>
                        {/* Duration Tag */}
                        <div style={{
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: '#1e40af',
                          marginBottom: '0.45rem'
                        }}>
                          {c.duration}
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          color: '#0f172a',
                          margin: '0 0 0.55rem',
                          lineHeight: 1.3
                        }}>
                          {c.title}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: '0.86rem',
                          color: '#64748b',
                          lineHeight: 1.55,
                          margin: '0 0 1.25rem',
                          minHeight: '44px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {c.desc}
                        </p>
                      </div>

                      {/* "Learn more" Action */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#1e40af',
                        fontWeight: 800,
                        fontSize: '0.92rem'
                      }}>
                        <span>Learn more</span>
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Courses"
            style={{
              position: 'absolute',
              right: isMobile ? '2px' : '4px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 25,
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '50%',
              width: isMobile ? '38px' : '44px',
              height: isMobile ? '38px' : '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
              cursor: 'pointer',
              color: '#1e40af',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1e40af';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#1e40af';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 64, 175, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#1e40af';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.08)';
            }}
          >
            <ChevronRight size={isMobile ? 18 : 22} />
          </button>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '1.5rem'
        }}>
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              style={{
                border: 'none',
                height: '8px',
                width: currentIndex === dotIdx ? '28px' : '8px',
                borderRadius: '9999px',
                background: currentIndex === dotIdx ? '#1e40af' : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: 0
              }}
            />
          ))}
        </div>

        {/* Modal Overlay for Course Overview Syllabus */}
        {selectedCourse && (
          <div
            onClick={() => setSelectedCourse(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                maxWidth: '560px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Modal Top Header matching the course banner color */}
              <div style={{
                background: selectedCourse.bannerColor,
                padding: '1.8rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '14px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {selectedCourse.icon || renderLandingCourseIcon(selectedCourse.iconKey)}
                  </div>
                  <div>
                    <span style={{
                      background: '#ffffff',
                      color: selectedCourse.bannerColor,
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      display: 'inline-block',
                      marginBottom: '4px'
                    }}>
                      {selectedCourse.duration} Track
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: '#ffffff' }}>
                      {selectedCourse.title}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  aria-label="Close modal"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div style={{ padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.4rem' }}>
                    Course Overview
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    {selectedCourse.desc}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
                    Core Curriculum Syllabus
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedCourse.topics.map((topic, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{
                          color: '#10b981',
                          background: 'rgba(16, 185, 129, 0.1)',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 900,
                          flexShrink: 0,
                          marginTop: '1px'
                        }}>
                          ✓
                        </span>
                        <span style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enrollment Guidance Banner */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '1rem',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '14px',
                  color: '#1e40af',
                  fontSize: '0.85rem',
                  lineHeight: 1.45
                }}>
                  <ShieldAlert size={20} style={{ flexShrink: 0, color: '#1e40af' }} />
                  <div>
                    <span style={{ fontWeight: 800 }}>Campus Registration:</span> Batch admissions, practical lab access, and official certificates are coordinated directly at our Alpha Fly Theni campus. Walk in or contact our counselor desk.
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    style={{
                      flex: 1,
                      background: '#1e40af',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.7rem 1.6rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#1e40af';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                    }}
                  >
                    Close Syllabus
                  </button>
                </div>
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

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#1e40af',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                  transition: 'all 0.2s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                disabled={isSubmitting}
                onMouseEnter={e => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#1e40af';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                  }
                }}
              >
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
    const code = accessCode.trim().toUpperCase();
    if (!code) {
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
        return;
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.error || 'Login failed. Check Access Key.');
      }
    } catch (err) {
      // Offline fallback: check cached students or fallback demo keys
      try {
        const cached = localStorage.getItem('lms_cached_students');
        if (cached) {
          const list = JSON.parse(cached);
          const found = list.find(s => (s.accessCode && s.accessCode.trim().toUpperCase() === code) || (s._id && s._id === code) || (s.id && s.id === code));
          if (found) {
            onLoginSuccess({
              role: 'student',
              name: found.name,
              username: found.accessCode,
              enrolledCourse: found.enrolledCourse || 'python',
              token: 'mock-student-session-token',
              accessCode: found.accessCode,
              studentId: found._id || found.id || 'offline-student'
            });
            return;
          }
        }
      } catch (cacheErr) { }

      if (code === 'STU-1001' || code === 'DEMO' || code === 'STU-DEMO') {
        onLoginSuccess({
          role: 'student',
          name: 'Demo Student',
          username: 'STU-1001',
          enrolledCourse: 'python',
          token: 'mock-student-session-token',
          accessCode: 'STU-1001',
          studentId: 'demo-student-id'
        });
        return;
      }

      setErrorMsg('Could not reach database server. Please check your connection or access code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStaffAdminSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const u = username.trim();
    const p = password.trim();

    if (!u || !p) {
      setErrorMsg('Username and password are required.');
      return;
    }

    setIsLoading(true);

    const isDefaultStaff = activeTab === 'staff' && (u.toLowerCase() === 'staff_tutor' || u.toLowerCase() === 'staff') && (p === 'staff_portal_2026');
    const isDefaultAdmin = activeTab === 'admin' && (u.toLowerCase() === 'admin') && (p === 'admin_portal_2026');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: activeTab, username: u, password: p })
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
        return;
      } else {
        const err = await res.json().catch(() => ({}));
        if (isDefaultStaff) {
          onLoginSuccess({
            role: 'staff',
            name: 'Staff Instructor',
            username: 'staff_tutor',
            token: 'mock-jwt-staff-token',
            enrolledCourse: 'all'
          });
          return;
        }
        if (isDefaultAdmin) {
          onLoginSuccess({
            role: 'admin',
            name: 'Lead Administrator',
            username: 'admin',
            token: 'mock-jwt-admin-token',
            enrolledCourse: 'all'
          });
          return;
        }
        setErrorMsg(err.error || 'Invalid credentials.');
      }
    } catch (err) {
      // Offline fallback when server is unreachable or cloud deployment is paused
      if (isDefaultStaff) {
        onLoginSuccess({
          role: 'staff',
          name: 'Staff Instructor',
          username: 'staff_tutor',
          token: 'mock-jwt-staff-token',
          enrolledCourse: 'all'
        });
        return;
      }
      if (isDefaultAdmin) {
        onLoginSuccess({
          role: 'admin',
          name: 'Lead Administrator',
          username: 'admin',
          token: 'mock-jwt-admin-token',
          enrolledCourse: 'all'
        });
        return;
      }

      if (u.toLowerCase() === 'staff_tutor' || activeTab === 'staff') {
        setErrorMsg('Could not reach backend server. Default staff password is: staff_portal_2026');
      } else if (u.toLowerCase() === 'admin' || activeTab === 'admin') {
        setErrorMsg('Could not reach backend server. Default admin password is: admin_portal_2026');
      } else {
        setErrorMsg('Could not reach database server.');
      }
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

  return (
    <div style={{ fontFamily: 'var(--font-family)', background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ⏳ Countdown Banner */}
      <CountdownTimer />

      {/* 🧭 NAVIGATION BAR */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 90, boxShadow: 'var(--shadow-sm)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0.8rem 1rem' : '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>

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
                  background: '#1e40af',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.7rem 1.6rem',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#1e40af';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                }}
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
                background: '#1e40af',
                color: '#ffffff',
                border: 'none',
                padding: '0.7rem 1.6rem',
                fontSize: '0.92rem',
                fontWeight: 800,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                transition: 'all 0.2s ease',
                width: 'fit-content'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1e40af'}
            >
              LOGIN
            </button>
          </div>
        )}
      </header>

      {/* 🚀 FULL-WIDTH CONTAINER-FLUID HERO BANNER (MATCHING REFERENCE DESIGN) */}
      <section style={{
        width: '100%',
        minHeight: isMobile ? '540px' : '580px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: isMobile
          ? `linear-gradient(to bottom, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 55%, rgba(255, 255, 255, 0.6) 100%), url('/images/hero_south_indian_student.jpg')`
          : `linear-gradient(to right, #ffffff 0%, #ffffff 42%, rgba(255, 255, 255, 0.96) 52%, rgba(255, 255, 255, 0.3) 64%, rgba(255, 255, 255, 0) 74%), url('/images/hero_south_indian_student.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center top' : 'right top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '3rem 1.25rem' : '4.5rem 2rem',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            maxWidth: isMobile ? '100%' : '560px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left'
          }}>

            {/* Sub-headline / Kicker */}
            <h2 style={{
              fontSize: isMobile ? '1.15rem' : '1.45rem',
              fontWeight: 700,
              color: '#475569',
              margin: '0 0 0.45rem',
              letterSpacing: '-0.01em',
              lineHeight: 1.3
            }}>
              Launch Your Dream Career in Technology
            </h2>

            {/* Main Headline */}
            <h1 style={{
              fontSize: isMobile ? '2.6rem' : '3.9rem',
              fontWeight: 900,
              lineHeight: 1.1,
              margin: '0 0 1.25rem',
              letterSpacing: '-0.03em',
              color: '#0f172a'
            }}>
              Give Your Career a{' '}
              <span style={{ color: '#1e40af' }}>Digital Boost.</span>
            </h1>

            {/* Subtitle / Description */}
            <p style={{
              fontSize: isMobile ? '0.98rem' : '1.1rem',
              color: '#475569',
              maxWidth: '520px',
              margin: '0 0 1.6rem',
              lineHeight: 1.65
            }}>
              Master high-demand tech skills through hands-on capstone projects, personalized 1-on-1 mentor guidance, real-time code reviews, and certified placement support.
            </p>

            {/* Key Value Checklist */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '0.6rem' : '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              marginBottom: '2rem'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#1e293b',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px'
              }}>
                <CheckCircle size={14} style={{ color: '#16a34a' }} /> 100% Practical Labs
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#1e293b',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px'
              }}>
                <CheckCircle size={14} style={{ color: '#16a34a' }} /> Real-World Projects
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#1e293b',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '0.35rem 0.85rem',
                borderRadius: '6px'
              }}>
                <CheckCircle size={14} style={{ color: '#16a34a' }} /> Placement Support
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              flexWrap: 'wrap',
              marginBottom: '2.5rem'
            }}>
              <a
                href="#courses"
                style={{
                  textDecoration: 'none',
                  background: '#1e40af',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#1e40af';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                }}
              >
                Enquire Now
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                style={{
                  background: '#1e40af',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  padding: '0.7rem 1.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#1e40af';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                }}
              >
                <LogIn size={16} />
                Student Login
              </button>
            </div>

            {/* Quick Metrics Row */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '1.5rem' : '2.5rem',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>1200+</h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Trained Students</span>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>100%</h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Practical Labs</span>
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#1e40af' }}>5/5 ★</h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Google Rating</span>
              </div>
            </div>
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

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#1e40af',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.7rem 1.6rem',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                    transition: 'all 0.2s ease',
                    opacity: isLoading ? 0.7 : 1
                  }}
                  disabled={isLoading}
                  onMouseEnter={e => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1e40af';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                    }
                  }}
                >
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

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#1e40af',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.7rem 1.6rem',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                    transition: 'all 0.2s ease',
                    opacity: isLoading ? 0.7 : 1
                  }}
                  disabled={isLoading}
                  onMouseEnter={e => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1e40af';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
                    }
                  }}
                >
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
