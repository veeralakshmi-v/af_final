import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Download, Save, RefreshCw, CheckCircle, HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const STEPS = [
  { id: 'config', label: '⚙️ Configure Agent' },
  { id: 'chaining', label: '🔗 Chaining Setup' },
  { id: 'sandbox', label: '💻 Sandbox Test' },
  { id: 'submit', label: '🚀 Submit Work' }
];

export default function GenAIModule2Project() {
  const [activeStep, setActiveStep] = useState('config');
  const [agentName, setAgentName] = useState('RetailHelper Agent');
  const [persona, setPersona] = useState('You are an empathetic, concise retail assistant.');
  const [grounding, setGrounding] = useState('Our return policy is 30 days. Shipping fee is $5. Discount codes do not stack.');
  const [constraints, setConstraints] = useState('If answer cannot be found in reference text, reply "Please contact human support".');
  const [step1Prompt, setStep1Prompt] = useState('Extract item name and sentiment from support ticket: "{{ticket_body}}"');
  const [step2Prompt, setStep2Prompt] = useState('Draft support reply using details: "{{step1_output}}"');
  const [enableSearch, setEnableSearch] = useState(true);
  const [temperature, setTemperature] = useState(0.2);
  const [testInput, setTestInput] = useState('I bought a watch 10 days ago but it is not working. Can I return it?');
  const [simRunning, setSimRunning] = useState(false);
  const [step1Output, setStep1Output] = useState('');
  const [step2Output, setStep2Output] = useState('');
  const [jsonPayload, setJsonPayload] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const handleRunTest = () => {
    setSimRunning(true);
    setStep1Output('');
    setStep2Output('');
    setJsonPayload('');

    setTimeout(() => {
      // Step 1 Output
      setStep1Output("💡 Extracted Details:\nItem: Watch\nSentiment: Negative (Not working)\nReturn eligible: Yes (10 days is within 30-day limit)");

      setTimeout(() => {
        // Step 2 Output
        setStep2Output("✉️ Draft Reply:\n\"Hello! I am sorry to hear your watch isn't working. Since your purchase was 10 days ago, you are within our 30-day return window. Please send it back for a full refund. Let us know if you need help!\"");
        
        // JSON Payload
        setJsonPayload(JSON.stringify({
          agent_name: agentName,
          temperature: temperature,
          search_enabled: enableSearch,
          extracted_entities: {
            item: "Watch",
            sentiment: "negative",
            days_since_purchase: 10
          },
          action_taken: "refund_authorized",
          reply_message: "Hello! I am sorry to hear your watch isn't working..."
        }, null, 2));

        setSimRunning(false);
      }, 1500);
    }, 1200);
  };

  const handleDownloadConfig = () => {
    const configData = {
      agentName,
      persona,
      grounding,
      constraints,
      step1Prompt,
      step2Prompt,
      enableSearch,
      temperature
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${agentName.toLowerCase().replace(/\s+/g, '_')}_config.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', paddingBottom: '5rem' }}>
      
      {/* Module Final Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '2.5rem', color: 'white', marginBottom: '2.5rem', border: '1px solid #1e293b' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', marginBottom: '1.2rem' }}>
          <Sparkles size={14} /> MODULE 2 FINAL PROJECT
        </div>
        <h1 style={{ fontSize: '2.2rem', color: 'white', fontWeight: 800, margin: '0 0 1rem 0' }}>
          AI Agent Workspace & Pipeline Builder
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
          Design, configure, and test a fully customized support AI Agent pipeline. Structure its logic, feed grounding rules, link prompt steps sequentially, and output a validated JSON schema payload.
        </p>
      </div>

      {/* Progress navigation tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              style={{
                background: isActive ? '#38bdf8' : 'transparent',
                color: isActive ? '#0f172a' : '#64748b',
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
              {step.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">

        {/* ── STEP 1: CONFIGURE AGENT ────────────────────────────────────── */}
        {activeStep === 'config' && (
          <motion.div key="config" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>⚙️ Setup Core Agent Instructions</h3>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>Agent Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>System Persona (Role & Voice)</label>
                <textarea
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  style={{ width: '100%', height: '70px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>Factual Grounding context</label>
                  <textarea
                    value={grounding}
                    onChange={(e) => setGrounding(e.target.value)}
                    placeholder="Enter reference manual rules..."
                    style={{ width: '100%', height: '100px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>Negative Constraints (Anti-hallucination)</label>
                  <textarea
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="E.g., Do not suggest refunding shipping..."
                    style={{ width: '100%', height: '100px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#475569', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={enableSearch}
                      onChange={(e) => setEnableSearch(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    Enable Search Tools
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '0.88rem', color: '#475569' }}>Temp: {temperature}</span>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      style={{ cursor: 'pointer', width: '100px' }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setActiveStep('chaining')}
                  style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Configure Pipeline Chaining ➜
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: PIPELINE CHAINING ─────────────────────────────────── */}
        {activeStep === 'chaining' && (
          <motion.div key="chaining" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>🔗 Configure Pipeline Chaining Prompts</h3>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Step 1 Prompt (Classification & Entity Extraction)
                </label>
                <textarea
                  value={step1Prompt}
                  onChange={(e) => setStep1Prompt(e.target.value)}
                  style={{ width: '100%', height: '80px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Step 2 Prompt (Response Generation - Input = Step 1 Output)
                </label>
                <textarea
                  value={step2Prompt}
                  onChange={(e) => setStep2Prompt(e.target.value)}
                  style={{ width: '100%', height: '80px', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setActiveStep('config')}
                  style={{ background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  ⬅ Back to Core
                </button>
                <button
                  onClick={() => setActiveStep('sandbox')}
                  style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Open Sandbox Tester ➜
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: SANDBOX TEST ──────────────────────────────────────── */}
        {activeStep === 'sandbox' && (
          <motion.div key="sandbox" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>💻 Interactive Sandbox & Parser Test</h3>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#334155', fontWeight: 700, marginBottom: '0.4rem' }}>Test Support Ticket Input</label>
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={handleRunTest}
                  disabled={simRunning}
                  style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Play size={15} /> {simRunning ? 'Executing Agent Pipeline...' : 'Run Pipeline'}
                </button>
                <button
                  onClick={handleDownloadConfig}
                  style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Download size={15} /> Download Config JSON
                </button>
              </div>

              {/* Running Output Logs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #3b82f6', minHeight: '80px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e3a8a', display: 'block', marginBottom: '0.4rem' }}>Step 1: Entity Output</span>
                    {step1Output ? (
                      <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#334155' }}>{step1Output}</pre>
                    ) : (
                      <span style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#94a3b8' }}>Waiting for runner...</span>
                    )}
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #10b981', minHeight: '80px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#064e3b', display: 'block', marginBottom: '0.4rem' }}>Step 2: Response output</span>
                    {step2Output ? (
                      <pre style={{ margin: 0, fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#334155' }}>{step2Output}</pre>
                    ) : (
                      <span style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#94a3b8' }}>Waiting for runner...</span>
                    )}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', display: 'block', marginBottom: '0.4rem' }}>🤖 Validated JSON Output Schema</span>
                  <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '10px', minHeight: '180px', border: '1px solid #1e293b' }}>
                    {jsonPayload ? (
                      <pre style={{ margin: 0, color: '#a7f3d0', fontSize: '0.78rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{jsonPayload}</pre>
                    ) : (
                      <span style={{ color: '#475569', fontSize: '0.82rem', fontStyle: 'italic' }}>Raw JSON stream parser results...</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.5rem', paddingTop: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setActiveStep('chaining')}
                  style={{ background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  ⬅ Back to Chaining
                </button>
                <button
                  onClick={() => setActiveStep('submit')}
                  disabled={!jsonPayload}
                  style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Proceed to Submission ➜
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 4: SUBMIT WORK ────────────────────────────────────────── */}
        {activeStep === 'submit' && (
          <motion.div key="submit" variants={containerVariants} initial="hidden" animate="show" exit="exit" style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '1rem' }}>🚀 Submit Agent Workspace Configuration</h3>
            
            <div style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.8rem 0', color: '#0f172a', fontWeight: 800 }}>Project Submission checklist:</h4>
              <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 1.5rem 1.2rem', padding: 0 }}>
                <li>✅ Core system persona and grounding parameters saved correctly.</li>
                <li>✅ 2-step dynamic chaining pipeline configured.</li>
                <li>✅ Temperature limits and search tool permissions locked.</li>
                <li>✅ Sandbox parsing execution validated.</li>
              </ul>

              <button
                onClick={() => setProjectSubmitted(true)}
                disabled={projectSubmitted}
                style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1.8rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {projectSubmitted ? '✓ Workspace Submitted!' : 'Submit Project Portfolio'}
              </button>

              {projectSubmitted && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', padding: '1rem 1.5rem', marginTop: '1.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span>🏆</span>
                  <div style={{ color: '#14532d', fontSize: '0.85rem' }}>
                    <strong>Congratulations!</strong> Your AI Agent configuration portfolio has been registered in the student ledger. You have completed the Prompt Engineering Module final project!
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
