import React, { useState } from 'react';

export default function PortfolioBuilder() {
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    title: 'Frontend Engineer',
    bio: 'Passionate about building responsive, high-performance user interfaces.',
    skills: 'React, JavaScript, CSS, HTML, Git',
    email: 'jane@developer.com',
    github: 'https://github.com'
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
      
      {/* Editor Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontWeight: 800 }}>Portfolio Settings</h3>
        
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Full Name</label>
          <input 
            className="form-control"
            value={profile.name} 
            onChange={e => setProfile({...profile, name: e.target.value})} 
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Job Title</label>
          <input 
            className="form-control"
            value={profile.title} 
            onChange={e => setProfile({...profile, title: e.target.value})} 
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Bio Description</label>
          <textarea 
            className="form-control"
            value={profile.bio} 
            onChange={e => setProfile({...profile, bio: e.target.value})} 
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', height: '60px', resize: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Technical Skills</label>
          <input 
            className="form-control"
            value={profile.skills} 
            onChange={e => setProfile({...profile, skills: e.target.value})} 
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
          />
        </div>
      </div>

      {/* Preview Column */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.74rem', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Live Portfolio Preview</span>
          <h2 style={{ margin: '12px 0 4px', fontWeight: 800, color: '#0f172a', fontSize: '1.4rem' }}>{profile.name}</h2>
          <span style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 700, display: 'block', marginBottom: 8 }}>{profile.title}</span>
          <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>{profile.bio}</p>
          
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {profile.skills.split(',').map((s, i) => (
              <span key={i} style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.74rem', color: '#334155' }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
          <span>📧 {profile.email}</span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 700 }}>Github Link →</a>
        </div>
      </div>

    </div>
  );
}
