import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';

export default function StatsDayPlaceholder({ dayTitle, onNavigate }) {
  const displayTitle = dayTitle ? dayTitle.replace('_', ' ') : 'Next Day';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="learning-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
      }}
    >
      <div style={{
        background: '#fdf2f8',
        color: '#db2777',
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <Lock size={32} />
      </div>
      <h2 style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'capitalize' }}>
        {displayTitle} - Coming Soon
      </h2>
      <p style={{ color: '#64748b', maxWidth: '440px', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
        We are crafting high-fidelity content, math applications, and python sandboxes for this session. It will be unlocked shortly!
      </p>
      <button
        className="btn btn-primary"
        onClick={() => onNavigate('dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#db2777', borderColor: '#db2777' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>
    </motion.div>
  );
}
