import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Code, Globe, CheckCircle, Award, ShieldAlert, Cpu } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

export default function GenAIDay20({ onNavigate, openAITutor }) {
  // Submission Form State
  const [studentName, setStudentName] = useState("Alex");
  const [selectedProject, setSelectedProject] = useState("pdf_bot");
  const [githubUrl, setGithubUrl] = useState("https://github.com/alex-dev/rag-pdf-chatbot");
  const [deployedUrl, setDeployedUrl] = useState("https://rag-pdf-chatbot.vercel.app");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (!githubUrl.trim() || !deployedUrl.trim() || !studentName.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      <AnimatePresence mode="wait">
        
        {!submissionCompleted ? (
          <motion.div key="submission_form" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            
            {/* Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '3rem', color: 'white', marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(16,185,129,0.15)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700, color: '#ecfdf5', marginBottom: '1.2rem' }}>
                <Sparkles size={14} color="#fef08a" /> MODULE 4 • DAY 20
              </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.3 }}>
                Final Capstone Graduation Project
              </h1>
              <p style={{ color: '#ecfdf5', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
                Welcome to Day 20. Review your final project assignment options, build the full integration pipeline, and submit your hosted staging endpoints below to earn your course graduation certificate.
              </p>
            </div>

            {/* Capstone Options list */}
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>🎓 capstone Project Titles for Students:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { title: 'Option 1: PDF Document Q&A Bot', desc: 'Allows users to upload a PDF file. Extracts text on the server, slices it into chunks, index vectors in Pinecone, and answers query prompts grounded strictly to document context.' },
                { title: 'Option 2: Recruiter Resume Chatbot', desc: 'Pre-ingest your developer resume milestones. Write query mappings matching target jobs stack keywords, and design a floating chatbot bubble to chat with recruiters.' },
                { title: 'Option 3: Campus Support FAQ Bot', desc: 'Ingests tuition fees catalogs and registrars dates. Implements database query metadata filters to search by CS department and intercepts out-of-bounds inputs.' }
              ].map((opt, idx) => (
                <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                  <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{opt.title}</strong>
                  <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: 1.5 }}>{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Submission Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'stretch' }}>
              
              {/* Left Column: Form */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2.2rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.8rem' }}>
                  ✏️ Submit Graduation Capstone
                </h3>
                
                <form onSubmit={handleSubmitProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', color: '#475569', fontWeight: 700, marginBottom: '0.4rem' }}>Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', color: '#475569', fontWeight: 700, marginBottom: '0.4rem' }}>Capstone Project Choice</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                    >
                      <option value="pdf_bot">Option 1: PDF Question Answer Bot</option>
                      <option value="resume_bot">Option 2: Personal Recruiter Resume Bot</option>
                      <option value="college_bot">Option 3: College Campus FAQ Bot</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', color: '#475569', fontWeight: 700, marginBottom: '0.4rem' }}>
                      <Code size={15} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }} />
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/..."
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', color: '#475569', fontWeight: 700, marginBottom: '0.4rem' }}>
                      <Globe size={15} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }} />
                      Deployed Staging URL
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://your-app.vercel.app"
                      value={deployedUrl}
                      onChange={(e) => setDeployedUrl(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '1.05rem',
                      marginTop: '0.5rem',
                      boxShadow: '0 4px 10px rgba(16,185,129,0.25)',
                      transition: 'all 0.15s'
                    }}
                  >
                    {isSubmitting ? '⏳ Verifying Repositories URL...' : '🚀 Submit Capstone Project'}
                  </button>
                </form>
              </div>

              {/* Right Column: Requirements Checklist */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 800 }}>⚙️ Mandatory Code Specifications:</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {[
                      { area: '1. PDF parsing', desc: 'Backend route uses pdf-parse to extract clean strings.' },
                      { area: '2. Chunk overlaps', desc: 'Sets chunk splits (e.g. 500 character size / 50 overlap).' },
                      { area: '3. Vector database', desc: 'Pinecone or pgvector indexes with correct coordinate dimensions.' },
                      { area: '4. Grounding prompts', desc: 'Instructions specifying model should say "unknown" when out of context.' },
                      { area: '5. Key Security (.env)', desc: 'Keeps secret credentials hidden inside dotenv files.' },
                      { area: '6. Live Deployment', desc: 'Hosted on staging sites like Vercel or Netlify.' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.6rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', alignItems: 'flex-start' }}>
                        <CheckCircle size={14} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <div>
                          <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>{item.area}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        ) : (
          /* Success Certification View */
          <motion.div key="success_view" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ display: 'inline-flex', background: '#dcfce7', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', border: '2px solid #86efac' }}>
              <Award size={64} style={{ color: '#10b981' }} />
            </div>
            
            <h1 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>
              Graduation Certificate Awarded!
            </h1>
            
            <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', color: '#475569', fontSize: '1.15rem', lineHeight: 1.6 }}>
              Congratulations, <strong>{studentName}</strong>! Your capstone project has been compiled, deployed, and validated successfully. You have successfully completed <strong>Module 4 - AI APIs & Knowledge Retrieval</strong>.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', maxWidth: '500px', margin: '0 auto 2.5rem auto', textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: '#0f172a', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🎓 Certificate Credentials:</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.95rem', color: '#475569' }}>
                <div>📁 <strong>Project Type:</strong> {selectedProject === 'pdf_bot' ? 'Option 1: PDF Question Answer Bot' : selectedProject === 'resume_bot' ? 'Option 2: Personal Recruiter Resume Bot' : 'Option 3: College Campus FAQ Bot'}</div>
                <div>🐙 <strong>GitHub Repository:</strong> <a href={githubUrl} target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>{githubUrl.replace("https://github.com/", "")}</a></div>
                <div>🌐 <strong>Deployment Staging:</strong> <a href={deployedUrl} target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>{deployedUrl.replace("https://", "")}</a></div>
                <div>📅 <strong>Date Issued:</strong> {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              style={{ background: '#0f172a', color: 'white', border: 'none', padding: '0.9rem 2rem', borderRadius: '10px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}
            >
              Return to Course Dashboard
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
