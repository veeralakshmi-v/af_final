import React from 'react';
import { motion } from 'framer-motion';
import { Server, Globe, Database, Monitor, Laptop, ShoppingCart, PenTool, LayoutTemplate, Zap, RefreshCw } from 'lucide-react';

export default function Introduction({ onComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* 1. What is a Website? */}
      <div className="panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)' }}>
          <Globe size={24} /> What is a Website?
        </h3>
        <p>
          A <strong>website</strong> is a collection of publicly accessible, interlinked Web pages that share a single domain name. 
          Websites can be created and maintained by an individual, group, business, or organization to serve a variety of purposes.
        </p>
        <p>
          At its core, a website is just a bunch of files (HTML, CSS, JavaScript) stored on a computer (called a Server) connected to the internet.
        </p>
      </div>

      {/* 2. How it works (Animated) */}
      <div className="panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)' }}>
          <Zap size={24} /> How it Works
        </h3>
        <p>When you type a URL into your browser, here is what happens behind the scenes:</p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem 1rem',
          background: 'rgba(0,0,0,0.03)',
          borderRadius: 'var(--radius-md)',
          marginTop: '1.5rem',
          position: 'relative'
        }}>
          {/* Client */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}
          >
            <div style={{ background: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <Laptop size={40} color="var(--accent-secondary)" />
            </div>
            <strong>Client (Browser)</strong>
          </motion.div>

          {/* Animated Arrows */}
          <div style={{ flex: 1, position: 'relative', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Request Arrow */}
            <div style={{ position: 'relative', height: '2px', background: 'rgba(0,0,0,0.1)', marginBottom: '20px' }}>
              <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>1. Request (URL)</div>
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                style={{ position: 'absolute', top: '-4px', width: '10px', height: '10px', background: 'var(--accent-secondary)', borderRadius: '50%' }}
              />
            </div>
            
            {/* Response Arrow */}
            <div style={{ position: 'relative', height: '2px', background: 'rgba(0,0,0,0.1)' }}>
              <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--success)' }}>2. Response (HTML/CSS)</div>
              <motion.div
                initial={{ right: '0%' }}
                animate={{ right: '100%' }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
                style={{ position: 'absolute', top: '-4px', width: '10px', height: '10px', background: 'var(--success)', borderRadius: '50%' }}
              />
            </div>
          </div>

          {/* Server */}
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}
          >
            <div style={{ background: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <Server size={40} color="var(--success)" />
            </div>
            <strong>Server</strong>
          </motion.div>
        </div>
      </div>

      {/* 3. Types of Websites */}
      <div className="panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)' }}>
          <LayoutTemplate size={24} /> Types of Websites
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { icon: <Monitor />, title: 'Static Website', desc: 'Fixed content, same for every visitor. Fast and cheap.' },
            { icon: <RefreshCw />, title: 'Dynamic Website', desc: 'Content changes based on user, time, or database.' },
            { icon: <ShoppingCart />, title: 'E-Commerce', desc: 'Allows users to buy and sell products online.' },
            { icon: <PenTool />, title: 'Blog / Portfolio', desc: 'Regularly updated content or personal showcase.' }
          ].map((type, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
              style={{ padding: '1.5rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', transition: 'var(--transition)' }}
            >
              <div style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}>{type.icon}</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{type.title}</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>{type.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Website vs Web App */}
      <div className="panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)' }}>
          <Globe size={24} /> Website vs. Web Application
        </h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
            <h4 style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--accent-secondary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Website</h4>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <li>Primarily <strong>informational</strong> and read-only.</li>
              <li>Users consume content (read articles, view images).</li>
              <li>Simple architecture (HTML/CSS/JS).</li>
              <li><em>Examples:</em> Wikipedia, BBC News, a restaurant's landing page.</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '300px', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
            <h4 style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--success)', paddingBottom: '0.5rem', display: 'inline-block' }}>Web Application</h4>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <li>Primarily <strong>interactive</strong> and read-write.</li>
              <li>Users manipulate data (create posts, edit docs, buy items).</li>
              <li>Complex architecture (Authentication, Databases, APIs).</li>
              <li><em>Examples:</em> Gmail, Netflix, Facebook, Google Docs.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. 3-Tier Architecture (Animated) */}
      <div className="panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)' }}>
          <Server size={24} /> 3-Tier Architecture
        </h3>
        <p>Modern Web Applications are typically split into three main layers (tiers) to keep things organized and secure.</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', position: 'relative', padding: '0 1rem' }}>
          
          {/* Presentation Tier */}
          <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1, maxWidth: '180px', background: 'white', border: '1px solid var(--accent-secondary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 15px rgba(0,119,255,0.1)' }}>
            <Monitor size={32} color="var(--accent-secondary)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ margin: 0, fontSize: '1rem' }}>Presentation Tier</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HTML, CSS, React</span>
          </motion.div>

          {/* Animated line 1 */}
          <div style={{ flex: 1, height: '2px', background: 'rgba(0,0,0,0.1)', position: 'relative' }}>
            <motion.div initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} style={{ position: 'absolute', top: '-3px', width: '8px', height: '8px', background: 'var(--accent-secondary)', borderRadius: '50%' }} />
          </div>

          {/* Application Tier */}
          <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1, maxWidth: '180px', background: 'white', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 15px rgba(16,185,129,0.1)' }}>
            <Server size={32} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ margin: 0, fontSize: '1rem' }}>Application Tier</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Node.js, Python, APIs</span>
          </motion.div>

          {/* Animated line 2 */}
          <div style={{ flex: 1, height: '2px', background: 'rgba(0,0,0,0.1)', position: 'relative' }}>
            <motion.div initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }} style={{ position: 'absolute', top: '-3px', width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }} />
          </div>

          {/* Data Tier */}
          <motion.div whileHover={{ scale: 1.05 }} style={{ flex: 1, maxWidth: '180px', background: 'white', border: '1px solid var(--warning)', borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center', zIndex: 2, boxShadow: '0 4px 15px rgba(245,158,11,0.1)' }}>
            <Database size={32} color="var(--warning)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ margin: 0, fontSize: '1rem' }}>Data Tier</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>MySQL, MongoDB</span>
          </motion.div>

        </div>
        
        <div className="card-actions" style={{ marginTop: '3rem' }}>
          <button className="btn btn-primary" onClick={onComplete}>Complete Introduction (+25 XP)</button>
        </div>
      </div>
      
    </div>
  );
}
