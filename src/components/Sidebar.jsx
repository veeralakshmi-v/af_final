import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ExternalLink, ChevronRight, ChevronDown, CheckCircle, ArrowLeft, Lock } from 'lucide-react';
import { isModuleLocked, getAssignmentValidations } from '../utils/htmlCssLocking';

export default function Sidebar({ courseStructure, activeNode, onNavClick, onBackToDashboard, isMobileMenuOpen, completedLessons = [], activeCourse, session, taskSubmissions = [] }) {
  const [validations, setValidations] = useState(getAssignmentValidations());

  useEffect(() => {
    const handleSync = () => setValidations(getAssignmentValidations());
    window.addEventListener('html_css_validation_changed', handleSync);
    return () => window.removeEventListener('html_css_validation_changed', handleSync);
  }, []);

  const [expandedModules, setExpandedModules] = useState({
    [activeNode?.moduleId]: true
  });

  useEffect(() => {
    if (activeNode?.moduleId) {
      setExpandedModules(prev => ({
        ...prev,
        [activeNode.moduleId]: true
      }));
    }
  }, [activeNode?.moduleId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const allItems = courseStructure ? courseStructure.flatMap(m => m.items || []) : [];
  const activeIndex = allItems.findIndex(item => item.id === activeNode?.tabId);
  const totalItems = allItems.length || 1;
  
  // Calculate completed count for the current course
  const completedInThisCourse = allItems.filter(item => {
    const key = `${activeCourse}:${activeNode?.moduleId || ''}:${item.id}`;
    // Support multiple matches (with course prepended or legacy module:tab format)
    return completedLessons.includes(key) || 
           completedLessons.includes(`${activeNode?.moduleId || ''}:${item.id}`);
  }).length;

  const progressPercent = totalItems > 0 ? Math.min(100, Math.round((completedInThisCourse / totalItems) * 100)) : 0;

  const getCourseDuration = () => {
    const firstId = courseStructure?.[0]?.id || '';
    if (courseStructure?.some(m => m.id?.includes('sql_da'))) return 540; // 9h
    if (firstId.includes('summer_sql')) return 420; // 7h
    if (firstId.includes('sql')) return 630; // 10h 30m
    if (firstId.includes('powerbi')) return 495; // 8h 15m
    if (firstId.includes('python') && courseStructure?.length === 10) return 480; // 8h
    if (firstId.includes('python')) return 720; // 12h
    if (firstId.includes('agentic')) return 900; // 15h
    if (firstId.includes('genai')) return 600; // 10h
    if (firstId.includes('js')) return 390; // 6h 30m
    if (firstId.includes('react')) return 480; // 8h
    if (firstId.includes('git')) return 210; // 3h 30m
    if (firstId.includes('json')) return 135; // 2h 15m
    if (firstId.includes('django')) return 345; // 5h 45m
    if (firstId.includes('devops')) return 240; // 4h
    if (firstId.includes('pandas')) return 360; // 6h
    if (firstId.includes('matplotlib')) return 300; // 5h
    if (firstId.includes('seaborn')) return 240; // 4h
    return 765; // HTML, CSS & Bootstrap default
  };

  const totalMins = getCourseDuration();
  const completedMinsTotal = Math.round((progressPercent / 100) * totalMins);
  
  const totalHours = Math.floor(totalMins / 60);
  const totalRemainingMins = totalMins % 60;
  
  const completedHours = Math.floor(completedMinsTotal / 60);
  const completedRemainingMins = completedMinsTotal % 60;

  return (
    <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ backgroundColor: '#f8fafc', borderRight: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', paddingTop: 0 }}>
      
      {/* Back to Dashboard */}
      <div 
        onClick={onBackToDashboard}
        style={{ padding: '1.5rem 1.5rem 0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
      >
        <ArrowLeft size={16} /> Dashboard
      </div>

      {/* Institute Info */}
      <div style={{ padding: '1rem 1.5rem 0' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1877F2', margin: 0, letterSpacing: '-0.5px' }}>Alpha Fly Theni</h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Computer Education</p>
      </div>

      {/* Course Title (Dynamic) */}
      <div style={{ padding: '1rem 1.5rem 0' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
          {courseStructure?.[0]?.id?.includes('web_design') ? 'AI-Powered Web Design' :
           courseStructure?.some(m => m.id?.includes('sql_da')) ? 'SQL for Data Analytics' :
           courseStructure?.[0]?.id?.includes('sql') ? 'Databases & SQL' : 
           courseStructure?.[0]?.id?.includes('powerbi') ? 'Data Analytics (Power BI)' : 
           (courseStructure?.[0]?.id?.includes('python') && courseStructure?.length === 10) ? 'Python for Data Analytics' :
           courseStructure?.[0]?.id?.includes('python') ? 'Core Python & OOPs' : 
           courseStructure?.[0]?.id?.includes('agentic') ? 'Agentic AI Development' : 
           courseStructure?.[0]?.id?.includes('genai') ? 'Generative AI' : 
           courseStructure?.[0]?.id?.includes('core_js') ? 'Vanilla JS' : 
           courseStructure?.[0]?.id?.includes('react') ? 'AI powered React JS' :
           courseStructure?.[0]?.id?.includes('js') ? 'AI-Powered JavaScript' : 
           courseStructure?.[0]?.id?.includes('git') ? 'Git & GitHub' :
           courseStructure?.[0]?.id?.includes('json') ? 'JSON Essentials' :
           courseStructure?.[0]?.id?.includes('django') ? 'Django Framework' :
           courseStructure?.[0]?.id?.includes('devops') ? 'DevOps Framework' :
           courseStructure?.[0]?.id?.includes('pandas') ? 'Pandas for Data Science' :
           courseStructure?.[0]?.id?.includes('matplotlib') ? 'Matplotlib for Data Science' :
           courseStructure?.[0]?.id?.includes('seaborn') ? 'Seaborn for Data Science' :
           courseStructure?.[0]?.id?.includes('tally') ? 'AI powered Tally' :
           'HTML, CSS & Bootstrap'}
        </h2>
      </div>

      {/* Progress Section */}
      <div style={{ padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
          <div style={{ background: 'var(--accent-primary)', width: `${progressPercent}%`, height: '100%' }}></div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#334155', fontWeight: '600' }}>
          {progressPercent}% completed ({completedInThisCourse}/{totalItems} items)
        </div>
      </div>

      {/* Accordion Modules */}
      <div className="sidebar-links-container" style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
        {courseStructure?.map((module) => {
          const isExpanded = expandedModules[module.id];
          const isLocked = isModuleLocked(activeCourse, module.id, validations, session, completedLessons, taskSubmissions);

          return (
            <div key={module.id} style={{ marginBottom: '0.5rem' }}>
              {/* Accordion Header */}
              <div 
                onClick={() => toggleModule(module.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontWeight: '700',
                  color: isLocked ? '#94a3b8' : '#1e293b',
                  fontSize: '1.05rem',
                  userSelect: 'none'
                }}
              >
                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                <span style={{ flex: 1 }}>{module.title}</span>
                {isLocked && <Lock size={15} color="#ea580c" title="Previous Day Assignment/Completion Required" />}
              </div>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0.5rem 0' }}>
                      {module.items.map((item) => {
                        const isActive = activeNode?.moduleId === module.id && activeNode?.tabId === item.id;
                        const itemKey = `${activeCourse}:${module.id}:${item.id}`;
                        const isCompleted = completedLessons.includes(itemKey) || 
                                            completedLessons.includes(`${module.id}:${item.id}`);

                        return (
                          <div
                            key={item.id}
                            onClick={() => onNavClick(module.id, item.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.6rem 1.5rem 0.6rem 3rem',
                              cursor: 'pointer',
                              backgroundColor: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                              borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                              transition: 'all 0.2s ease',
                              color: isLocked ? '#94a3b8' : isActive ? '#1d4ed8' : '#475569',
                              opacity: isLocked ? 0.7 : 1
                            }}
                          >
                            <div style={{ 
                              color: isLocked ? '#94a3b8' : isActive ? '#2563eb' : '#64748b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {isLocked ? <Lock size={16} color="#ea580c" /> : item.icon}
                            </div>
                            <span style={{ 
                              fontWeight: isActive ? '600' : '500',
                              fontSize: '0.95rem',
                              flex: 1
                            }}>
                              {item.label}
                            </span>
                            {isCompleted && !isLocked && (
                              <CheckCircle size={15} color="#10b981" fill="#d1fae5" style={{ flexShrink: 0 }} />
                            )}
                            {isLocked && (
                              <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, background: '#ffedd5', padding: '2px 6px', borderRadius: 4 }}>Locked</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
