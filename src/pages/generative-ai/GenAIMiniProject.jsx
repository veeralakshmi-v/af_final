import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Download, Plus, Trash2, Check, Sliders, Layout, Layers } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const SUB_TABS = [
  { id: 'library', label: '🗃️ Library Templates' },
  { id: 'builder', label: '🏗️ Custom Prompt Builder' },
  { id: 'submission', label: '🎓 Submit Mini-Project' }
];

const TEMPLATES = [
  {
    title: 'Code Debugging Assistant',
    category: 'Software Development',
    role: 'You are an expert software engineer and debugger.',
    task: 'Analyze the provided code and identify why the bug occurs.',
    context: 'The user will provide a code snippet and an error log or symptom.',
    format: 'Explain the issue in 2 sentences, then provide the corrected code block.',
    rules: 'Do NOT suggest alternative libraries. Stick to the language used by the user.',
    variables: { code: 'paste code here', error: 'paste error here' }
  },
  {
    title: 'LinkedIn Post Generator',
    category: 'Marketing & Content',
    role: 'You are a professional copywriter and brand builder.',
    task: 'Write an engaging LinkedIn post about [TOPIC] using the [TONE] tone.',
    context: 'Targeting professionals, managers, and designers in the tech community.',
    format: 'Start with a hook sentence, write 3 spaced paragraphs, and end with a call to action and 3 hashtags.',
    rules: 'Do NOT use emojis on every line. Keep paragraph length under 3 sentences.',
    variables: { topic: 'AI at work', tone: 'insightful and humble' }
  },
  {
    title: 'Email Professional polisher',
    category: 'Business & Admin',
    role: 'You are a corporate communication specialist.',
    task: 'Rewrite this casual email to sound polite, assertive, and professional.',
    context: 'Sent to a project stakeholder or corporate client.',
    format: 'Subject line + greeting + structured email body + professional closing.',
    rules: 'Avoid passive-aggressive phrases. Ensure the deadline date is stated clearly.',
    variables: { casual_text: 'hey i cannot do this today will do it tomorrow' }
  }
];

export default function GenAIMiniProject() {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [templateInputs, setTemplateInputs] = useState(TEMPLATES[0].variables);
  const [copied, setCopied] = useState(false);

  // Builder States
  const [builderRole, setBuilderRole] = useState('');
  const [builderTask, setBuilderTask] = useState('');
  const [builderContext, setBuilderContext] = useState('');
  const [builderFormat, setBuilderFormat] = useState('');
  const [builderRules, setBuilderRules] = useState('');
  const [builderTitle, setBuilderTitle] = useState('');
  const [customPrompts, setCustomPrompts] = useState([]);

  // Submission States
  const [submissionCode, setSubmissionCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleTemplateSelect = (temp) => {
    setSelectedTemplate(temp);
    setTemplateInputs(temp.variables);
  };

  const getCombinedTemplatePrompt = () => {
    let base = `[ROLE]\n${selectedTemplate.role}\n\n[TASK]\n${selectedTemplate.task}\n\n[CONTEXT]\n${selectedTemplate.context}\n\n[FORMAT]\n${selectedTemplate.format}\n\n[CONSTRAINTS]\n${selectedTemplate.rules}`;
    Object.entries(templateInputs).forEach(([key, val]) => {
      base = base.replace(`[${key.toUpperCase()}]`, val);
    });
    return base;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCombinedTemplatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCustomPrompt = () => {
    if (!builderTitle || !builderTask) return;
    const newPrompt = {
      title: builderTitle,
      role: builderRole,
      task: builderTask,
      context: builderContext,
      format: builderFormat,
      rules: builderRules
    };
    setCustomPrompts([...customPrompts, newPrompt]);
    // Clear form
    setBuilderTitle('');
    setBuilderRole('');
    setBuilderTask('');
    setBuilderContext('');
    setBuilderFormat('');
    setBuilderRules('');
  };

  const handleDeleteCustom = (idx) => {
    setCustomPrompts(customPrompts.filter((_, i) => i !== idx));
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customPrompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "custom_prompt_library.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Overview Intro Banner */}
      <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', padding: '2.5rem', color: 'white', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(16,185,129,0.15)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#d1fae5', marginBottom: '1rem' }}>
          <Sparkles size={14} color="#fef08a" /> MODULE 1 MINI PROJECT
        </div>
        <h1 style={{ fontSize: '2.2rem', color: 'white', fontWeight: 800, margin: '0 0 0.8rem 0' }}>AI Prompt Library Builder</h1>
        <p style={{ color: '#d1fae5', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
          Welcome to your first mini-project! Here you will put your Day 1–5 knowledge to the test. Browse industry prompt templates, customize variables, and use our Structured Prompt Builder to construct your personal prompt workspace.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {SUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? '#10b981' : 'transparent',
                color: isActive ? 'white' : '#64748b',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">

        {/* ── 1. TEMPLATE LIBRARY ──────────────────────────────────────── */}
        {activeTab === 'library' && (
          <motion.div key="library" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🗃️ Interactive Template Customizer</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Select a template, fill in your context variables, and copy the compiled engineered prompt.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
              {/* Left List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {TEMPLATES.map((temp) => {
                  const isSelected = selectedTemplate.title === temp.title;
                  return (
                    <button
                      key={temp.title}
                      onClick={() => handleTemplateSelect(temp)}
                      style={{
                        background: isSelected ? '#ecfdf5' : 'white',
                        border: `1.5px solid ${isSelected ? '#10b981' : '#e2e8f0'}`,
                        padding: '1rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem', marginBottom: '0.2rem' }}>{temp.title}</div>
                      <span style={{ fontSize: '0.72rem', background: '#e2e8f0', padding: '0.15rem 0.5rem', borderRadius: '10px', color: '#475569' }}>{temp.category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Panel */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '2rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontWeight: 800, color: '#0f172a' }}>⚙️ Set Variable Variables</h4>
                
                {/* Dynamically render variables */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {Object.entries(templateInputs).map(([key, val]) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        [{key.toUpperCase()}]
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setTemplateInputs({ ...templateInputs, [key]: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Compiled Prompt */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>Compiled Output Prompt</span>
                    <button onClick={handleCopy} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#475569' }}>
                      {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      {copied ? 'Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                  <pre style={{ background: '#0f172a', padding: '1.2rem', borderRadius: '10px', color: '#a7f3d0', fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
                    {getCombinedTemplatePrompt()}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── 2. STRUCTURED BUILDER ────────────────────────────────────── */}
        {activeTab === 'builder' && (
          <motion.div key="builder" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🏗️ Structured Prompt Builder</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Use the 5 parts of Prompt Anatomy to structure your own customizable prompt template:</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              {/* Form */}
              <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#334155', fontWeight: 700, marginBottom: '0.3rem' }}>Template Title</label>
                  <input type="text" placeholder="e.g. Email Helper" value={builderTitle} onChange={(e) => setBuilderTitle(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                
                {[
                  { label: '🎭 Role / Persona', value: builderRole, set: setBuilderRole, placeholder: 'You are a...' },
                  { label: '🚀 Task / Instruction', value: builderTask, set: setBuilderTask, placeholder: 'Write a...' },
                  { label: '📌 Context / Background', value: builderContext, set: setBuilderContext, placeholder: 'The audience is...' },
                  { label: '📋 Format', value: builderFormat, set: setBuilderFormat, placeholder: 'Reply in bullet points...' },
                  { label: '🚫 Constraints / Rules', value: builderRules, set: setBuilderRules, placeholder: 'Do NOT use jargon...' },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#334155', fontWeight: 700, marginBottom: '0.3rem' }}>{f.label}</label>
                    <textarea value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} style={{ width: '100%', height: '54px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box', resize: 'none', fontSize: '0.85rem' }} />
                  </div>
                ))}

                <button onClick={handleAddCustomPrompt} disabled={!builderTitle || !builderTask} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                  <Plus size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Add to Library
                </button>
              </div>

              {/* Local library output */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>📋 Your Custom Prompts ({customPrompts.length})</h4>
                  {customPrompts.length > 0 && (
                    <button onClick={downloadJSON} style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#475569' }}>
                      <Download size={12} /> Save .JSON
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px', background: '#f8fafc', padding: '1rem', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                  {customPrompts.length === 0 ? (
                    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.88rem', fontStyle: 'italic', textAlign: 'center', padding: '2rem' }}>
                      Fill in the prompt anatomy form on the left to build your first prompt template!
                    </div>
                  ) : (
                    customPrompts.map((cp, idx) => (
                      <div key={idx} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0f172a' }}>{cp.title}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Role: {cp.role || 'None'}</span>
                        </div>
                        <button onClick={() => handleDeleteCustom(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#ef4444' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── 3. SUBMISSION ────────────────────────────────────────────── */}
        {activeTab === 'submission' && (
          <motion.div key="submission" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>🎓 Submit Your Mini-Project</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Paste one of the compiled prompts you generated or submit your custom library export:</p>

            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Your Completed Prompt Library / Template Code:
                </label>
                <textarea
                  value={submissionCode}
                  onChange={(e) => setSubmissionCode(e.target.value)}
                  placeholder={`[ROLE]\nYou are a professional coder...\n\n[TASK]...`}
                  style={{ width: '100%', height: '180px', padding: '0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
              </div>

              <button
                onClick={() => setSubmitted(true)}
                disabled={!submissionCode || submissionCode.trim().length < 40 || submitted}
                style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {submitted ? '✓ Project Submitted' : 'Submit My Project'}
              </button>

              {submitted && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span>🎉</span>
                  <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                    <strong>Congratulations!</strong> You have successfully completed **Module 1 (AI Foundations)** and built your AI Prompt Library. Excellent job!
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
