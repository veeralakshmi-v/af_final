import React, { useState, useEffect } from 'react';
import { 
  FileText, Send, CheckCircle, ShieldAlert, Lock, Unlock, 
  ArrowRight, Clock, AlertTriangle, MessageSquare, Award, Check, RefreshCw
} from 'lucide-react';
import { 
  HTML_CSS_ASSIGNMENTS_CONFIG, 
  getAssignmentValidations, 
  saveAssignmentValidation 
} from '../utils/htmlCssLocking';

export default function AssignmentSubmissionPage({ moduleId, onNavigate, session }) {
  const config = HTML_CSS_ASSIGNMENTS_CONFIG[moduleId] || {
    dayTitle: 'Day Assignment',
    assignmentTitle: 'Practical Assignment & Staff Validation',
    tasks: ['Complete all practical exercises for this day module.', 'Submit your code and reflection below.'],
    nextModuleId: null,
    nextModuleTitle: 'Next Day'
  };

  const [validations, setValidations] = useState(getAssignmentValidations());
  const currentRecord = validations[moduleId] || {};

  // Form State
  const [submissionUrl, setSubmissionUrl] = useState(currentRecord.submissionUrl || '');
  const [submissionNotes, setSubmissionNotes] = useState(currentRecord.submissionNotes || '');
  const [studentFeedback, setStudentFeedback] = useState(currentRecord.studentFeedback || '');
  const [showError, setShowError] = useState(false);
  const [isSubmittedNotice, setIsSubmittedNotice] = useState(false);

  // Check if logged-in account has staff or admin role
  const isStaffUser = (() => {
    if (session && (session.role === 'staff' || session.role === 'admin' || session.role === 'instructor')) {
      return true;
    }
    try {
      const raw = localStorage.getItem('lms_user_session');
      if (raw) {
        const u = JSON.parse(raw);
        return u && (u.role === 'staff' || u.role === 'admin' || u.role === 'instructor');
      }
    } catch (e) {}
    return false;
  })();

  const [staffFeedbackInput, setStaffFeedbackInput] = useState(currentRecord.staffFeedback || 'Great work! Code meets semantic standards and feedback is thoughtful. Approved.');

  useEffect(() => {
    const handleSync = () => {
      const updated = getAssignmentValidations();
      setValidations(updated);
    };
    window.addEventListener('html_css_validation_changed', handleSync);
    return () => window.removeEventListener('html_css_validation_changed', handleSync);
  }, []);

  useEffect(() => {
    if (currentRecord) {
      if (currentRecord.submissionUrl) setSubmissionUrl(currentRecord.submissionUrl);
      if (currentRecord.submissionNotes) setSubmissionNotes(currentRecord.submissionNotes);
      if (currentRecord.studentFeedback) setStudentFeedback(currentRecord.studentFeedback);
      if (currentRecord.staffFeedback) setStaffFeedbackInput(currentRecord.staffFeedback);
    }
  }, [moduleId]);

  const MIN_CHARS = 100;
  const feedbackLength = Math.max(studentFeedback.trim().length, studentFeedback.length);
  const isFeedbackValid = feedbackLength >= MIN_CHARS;

  const handleStudentSubmit = (e) => {
    if (e) e.preventDefault();
    if (!isFeedbackValid) {
      setShowError(true);
      return;
    }

    const newRecord = {
      ...currentRecord,
      studentName: session?.name || currentRecord.studentName || 'Student Learner',
      studentAccessCode: session?.accessCode || session?.username || currentRecord.studentAccessCode || 'STUDENT',
      submissionUrl: submissionUrl.trim(),
      submissionNotes: submissionNotes.trim(),
      studentFeedback: studentFeedback.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: isStaffUser || currentRecord.status === 'approved' ? 'approved' : 'pending'
    };

    const updated = saveAssignmentValidation(moduleId, newRecord);
    if (updated && Object.keys(updated).length > 0) {
      setValidations(updated);
    }
    setIsSubmittedNotice(true);
    setShowError(false);
    setTimeout(() => setIsSubmittedNotice(false), 5000);
  };

  const handleStaffApproval = (newStatus) => {
    const updatedRecord = {
      ...currentRecord,
      submissionUrl: submissionUrl.trim() || currentRecord.submissionUrl || 'https://github.com/student/assignment',
      submissionNotes: submissionNotes.trim() || currentRecord.submissionNotes || 'Completed practical tasks.',
      studentFeedback: studentFeedback.trim() || currentRecord.studentFeedback || 'Self-reflection: Understanding semantic structure, CSS box-sizing, and responsive flexbox alignment helped build a clean application.',
      staffFeedback: staffFeedbackInput.trim(),
      status: newStatus,
      validatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      validatedBy: 'Staff Instructor'
    };

    const updated = saveAssignmentValidation(moduleId, updatedRecord);
    if (updated && Object.keys(updated).length > 0) {
      setValidations(updated);
    }
  };

  const currentStatus = currentRecord.status || 'not_submitted';

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: 1000, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Top Breadcrumb Header */}
      <div style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: 16, padding: '2rem', color: 'white', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 800, fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {config.dayTitle}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>HTML &amp; CSS Learning Track</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#f8fafc' }}>
              {config.assignmentTitle}
            </h2>
          </div>

          {/* Staff Badge (ONLY shown for verified Staff / Admin accounts) */}
          {isStaffUser && (
            <div
              style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)',
                border: '1px solid #c084fc',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 30,
                fontSize: '0.82rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4)'
              }}
            >
              <Award size={16} /> 🛡️ Instructor Review Mode
            </div>
          )}
        </div>

        <p style={{ color: '#cbd5e1', margin: '8px 0 0 0', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Complete your assignment, submit your <strong>student feedback (minimum 100 characters)</strong>, and receive <strong>Staff Validation</strong> to unlock the next day's course content.
        </p>
      </div>

      {/* Lock Status Alert Banner */}
      <div style={{ 
        background: currentStatus === 'approved' ? '#f0fdf4' : currentStatus === 'pending' ? '#eff6ff' : currentStatus === 'rejected' ? '#fef2f2' : '#fff7ed',
        border: `1px solid ${currentStatus === 'approved' ? '#bbf7d0' : currentStatus === 'pending' ? '#bfdbfe' : currentStatus === 'rejected' ? '#fecaca' : '#fed7aa'}`,
        borderRadius: 12,
        padding: '1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ 
            width: 44, 
            height: 44, 
            borderRadius: '50%', 
            background: currentStatus === 'approved' ? '#16a34a' : currentStatus === 'pending' ? '#2563eb' : currentStatus === 'rejected' ? '#dc2626' : '#ea580c',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            {currentStatus === 'approved' ? <Unlock size={22} /> : currentStatus === 'pending' ? <Clock size={22} /> : currentStatus === 'rejected' ? <AlertTriangle size={22} /> : <Lock size={22} />}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: currentStatus === 'approved' ? '#14532d' : currentStatus === 'pending' ? '#1e40af' : currentStatus === 'rejected' ? '#991b1b' : '#9a3412' }}>
              {currentStatus === 'approved' && '✅ Staff Approved — Next Day Unlocked!'}
              {currentStatus === 'pending' && '⏳ Submission Received — Pending Staff Validation'}
              {currentStatus === 'rejected' && '⚠️ Revision Requested by Staff'}
              {currentStatus === 'not_submitted' && '🔒 Staff Validation Required to Unlock Next Day'}
            </div>
            <div style={{ fontSize: '0.85rem', color: currentStatus === 'approved' ? '#15803d' : currentStatus === 'pending' ? '#1d4ed8' : currentStatus === 'rejected' ? '#b91c1c' : '#c2410c', marginTop: 3 }}>
              {currentStatus === 'approved' && `Validated by ${currentRecord.validatedBy || 'Staff'} on ${currentRecord.validatedAt || 'Today'}. You can freely access ${config.nextModuleTitle || 'Next Day'}.`}
              {currentStatus === 'pending' && `Submitted on ${currentRecord.submittedAt || 'Today'}. Staff is reviewing your feedback and code to unlock ${config.nextModuleTitle || 'Next Day'}.`}
              {currentStatus === 'rejected' && 'Please review the staff feedback comments below and resubmit your assignment.'}
              {currentStatus === 'not_submitted' && `Students must submit feedback (>= 100 chars) and get staff validation to proceed to ${config.nextModuleTitle || 'Next Day'}.`}
            </div>
          </div>
        </div>

        {currentStatus === 'approved' && config.nextModuleId && (
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate(config.nextModuleId)}
            style={{ background: '#16a34a', borderColor: '#16a34a', color: 'white', padding: '0.6rem 1.25rem', fontWeight: 700, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            Go to {config.nextModuleTitle} <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Grid: Instructions & Requirements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={18} style={{ color: '#0284c7' }} /> Assignment Checklist &amp; Criteria
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.88rem', lineHeight: 1.7 }}>
            {config.tasks.map((task, idx) => (
              <li key={idx} style={{ marginBottom: 6 }}>{task}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldAlert size={18} style={{ color: '#ea580c' }} /> Mandatory Submission Rules
          </h4>
          <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ background: '#ea580c', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>1</span>
              <span><strong>Student Feedback:</strong> Must contain at least <strong>100 characters</strong> detailing key takeaways, challenges, and code logic.</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ background: '#ea580c', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>2</span>
              <span><strong>Staff Evaluation:</strong> Staff must evaluate student feedback &amp; code before <strong>{config.nextModuleTitle || 'Next Day'}</strong> is unlocked.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Form: Student Submission */}
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 14, padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileText size={20} style={{ color: '#2563eb' }} /> Student Assignment Submission Form
        </h3>

        {isSubmittedNotice && (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '12px 16px', borderRadius: 8, marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle size={18} /> Assignment submitted successfully! Awaiting Staff Validation to unlock next day content.
          </div>
        )}

        <form onSubmit={handleStudentSubmit}>
          
          {/* Submission Link */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', marginBottom: 6 }}>
              Project Deployment or GitHub Repository URL (Optional)
            </label>
            <input 
              type="url"
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              placeholder="https://github.com/username/html-day1-portfolio or https://myproject.vercel.app"
              style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          {/* Submission Code / Notes */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', marginBottom: 6 }}>
              Submission Code Snippet or Notes (Optional)
            </label>
            <textarea 
              rows={4}
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="Paste HTML/CSS code snippet or summarize implemented structure..."
              style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.88rem', fontFamily: 'monospace', outline: 'none' }}
            />
          </div>

          {/* REQUIRED Student Feedback (Minimum 100 Characters) */}
          <div style={{ marginBottom: '1.5rem', background: '#f8fafc', border: `2px solid ${showError && !isFeedbackValid ? '#ef4444' : isFeedbackValid ? '#22c55e' : '#cbd5e1'}`, borderRadius: 12, padding: '1.25rem', transition: 'all 0.2s' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
              <label style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                Student Feedback &amp; Reflection <span style={{ color: '#ef4444' }}>* (Minimum 100 characters required)</span>
              </label>
              
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isFeedbackValid ? '#15803d' : '#dc2626', background: isFeedbackValid ? '#dcfce7' : '#fee2e2', padding: '3px 10px', borderRadius: 12 }}>
                {feedbackLength} / {MIN_CHARS} min characters
              </div>
            </div>

            {/* Character Progress Bar */}
            <div style={{ background: '#e2e8f0', height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.min(100, (feedbackLength / MIN_CHARS) * 100)}%`, 
                background: isFeedbackValid ? '#22c55e' : feedbackLength > 50 ? '#eab308' : '#ef4444',
                transition: 'width 0.2s ease-in-out' 
              }}></div>
            </div>

            <textarea 
              rows={5}
              value={studentFeedback}
              onChange={(e) => {
                setStudentFeedback(e.target.value);
                if (showError && e.target.value.trim().length >= MIN_CHARS) setShowError(false);
              }}
              placeholder="Describe your learning experience, what HTML/CSS concepts you implemented, challenges faced during coding, and how you solved them (at least 100 characters)..."
              style={{ 
                width: '100%', 
                padding: '0.75rem 0.9rem', 
                borderRadius: 8, 
                border: '1px solid #cbd5e1', 
                fontSize: '0.9rem', 
                lineHeight: 1.6,
                outline: 'none',
                background: 'white'
              }}
            />

            {/* Feedback Validation Message */}
            {!isFeedbackValid ? (
              <div style={{ marginTop: 10, color: '#dc2626', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={15} /> Student feedback is too short! Need at least <strong>{MIN_CHARS - feedbackLength}</strong> more characters before submitting.
              </div>
            ) : (
              <div style={{ marginTop: 10, color: '#15803d', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={15} /> Student feedback character length requirement satisfied ({feedbackLength} characters).
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={!isFeedbackValid}
            onClick={handleStudentSubmit}
            style={{ 
              background: isFeedbackValid ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#94a3b8', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.75rem', 
              borderRadius: 8, 
              fontWeight: 800, 
              fontSize: '0.95rem', 
              cursor: isFeedbackValid ? 'pointer' : 'not-allowed', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              boxShadow: isFeedbackValid ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
            }}
          >
            <Send size={18} /> {currentStatus === 'approved' ? 'Update Submission' : 'Submit Assignment for Staff Review'}
          </button>
        </form>
      </div>

      {/* Staff Feedback Display Section */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 10 }}>
          <MessageSquare size={20} style={{ color: '#16a34a' }} /> Staff Feedback &amp; Review Remarks
        </h3>

        {currentRecord.staffFeedback ? (
          <div style={{ background: '#f8fafc', borderLeft: '4px solid #16a34a', borderRadius: '0 8px 8px 0', padding: '1.25rem', color: '#1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                Feedback from {currentRecord.validatedBy || 'Staff Instructor'}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {currentRecord.validatedAt || 'Recently Reviewed'}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: '#334155', fontStyle: 'italic' }}>
              "{currentRecord.staffFeedback}"
            </p>
          </div>
        ) : (
          <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 8, padding: '1.25rem', color: '#64748b', fontSize: '0.88rem', textAlign: 'center' }}>
            No staff feedback recorded yet. Once staff evaluates your assignment and feedback, detailed comments will appear here.
          </div>
        )}
      </div>

      {/* Interactive Staff Evaluation Panel (ONLY rendered for logged in Staff / Admin users) */}
      {isStaffUser && (
        <div style={{ background: '#faf5ff', border: '2px solid #c084fc', borderRadius: 14, padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 14px rgba(147, 51, 234, 0.12)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#6b21a8', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={20} /> Staff Evaluation &amp; Validation Panel (Instructor Mode)
            </h4>
            <span style={{ fontSize: '0.82rem', color: '#7e22ce' }}>Staff members validate student assignments and feedback to unlock next day content.</span>
          </div>

          <div style={{ background: 'white', border: '1px solid #d8b4fe', borderRadius: 10, padding: 16 }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#581c87', marginBottom: 6 }}>
              Staff Feedback Remarks to Student:
            </label>
            <textarea 
              rows={3}
              value={staffFeedbackInput}
              onChange={(e) => setStaffFeedbackInput(e.target.value)}
              placeholder="Enter instructor evaluation comments..."
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 8, border: '1px solid #c084fc', fontSize: '0.88rem', outline: 'none', marginBottom: 12 }}
            />

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button 
                type="button"
                onClick={() => handleStaffApproval('approved')}
                style={{ background: '#16a34a', color: 'white', border: 'none', padding: '0.65rem 1.35rem', borderRadius: 8, fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Check size={16} /> ✅ Approve &amp; Unlock {config.nextModuleTitle || 'Next Day'}
              </button>

              <button 
                type="button"
                onClick={() => handleStaffApproval('rejected')}
                style={{ background: '#dc2626', color: 'white', border: 'none', padding: '0.65rem 1.35rem', borderRadius: 8, fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <AlertTriangle size={16} /> ❌ Request Revision
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
