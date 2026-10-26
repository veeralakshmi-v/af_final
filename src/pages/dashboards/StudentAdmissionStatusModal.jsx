import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lock,
  Unlock,
  Calendar,
  CreditCard,
  FileText,
  Phone,
  RefreshCw,
  X,
  Sparkles
} from 'lucide-react';

export default function StudentAdmissionStatusModal({
  isOpen,
  onClose,
  session,
  requestedCourseName = 'Course'
}) {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admissions');
      if (res.ok) {
        const list = await res.json();
        // Match by student name or access code
        const myApp = list.find(a =>
          (session?.username && a.studentAccountAccessCode === session.username) ||
          (session?.accessCode && a.studentAccountAccessCode === session.accessCode) ||
          (session?.studentId && a.studentId === session.studentId) ||
          (session?.name && (a.studentName || '').toLowerCase() === session.name.toLowerCase())
        );
        setAdmission(myApp || null);
      }
    } catch (e) {
      console.warn('Status fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen, session]);

  if (!isOpen) return null;

  const isFormDone = admission?.admissionFormStatus === 'Verified';
  const isPaymentDone = admission?.paymentStatus === 'Paid';
  const isJoiningDone = Boolean(admission?.joiningDate && admission?.joiningDate.trim());
  const isIDCardDone = admission?.idCardStatus === 'Issued';
  const isCourseActive = admission?.courseActivationStatus === 'Active';

  const completedSteps = [isFormDone, isPaymentDone, isJoiningDone, isIDCardDone].filter(Boolean).length;
  const progressPercent = completedSteps * 25;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        maxWidth: '560px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        animation: 'scaleUp 0.25s ease-out',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0A3D91 0%, #1e40af 100%)',
          padding: '1.75rem',
          color: '#ffffff',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#93c5fd', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <ShieldCheck size={18} /> Alpha Fly Computer Education
          </div>
          <h2 style={{ margin: '6px 0 0 0', fontSize: '1.4rem', fontWeight: 900 }}>
            {isCourseActive ? 'Admission Approved & Active' : 'Course Activation Pending'}
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: '#e0e7ff' }}>
            {isCourseActive
              ? 'Your admission has been verified. All course modules are unlocked!'
              : `Access to ${requestedCourseName} is locked pending administrator checklist verification.`}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 0.5rem auto', color: '#0284c7' }} />
              <p style={{ margin: 0, fontWeight: 700 }}>Checking admission status...</p>
            </div>
          ) : (
            <>
              {/* Progress Summary Card */}
              <div style={{
                background: '#f8fafc',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                    Verification Checklist Progress
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 900, color: isCourseActive ? '#16a34a' : '#0284c7' }}>
                    {progressPercent}% Complete
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    background: isCourseActive ? '#16a34a' : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>

              {/* 4 Checklist Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                {/* 1. Form */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '12px',
                  background: isFormDone ? '#f0fdf4' : '#fffaf5',
                  border: isFormDone ? '1px solid #86efac' : '1px solid #fed7aa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: isFormDone ? '#16a34a' : '#ea580c',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <FileText size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>1. Admission Form</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {isFormDone ? 'Submitted & verified by admissions' : 'Under document review by front desk'}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px',
                    background: isFormDone ? '#bbf7d0' : '#fef3c7',
                    color: isFormDone ? '#166534' : '#b45309'
                  }}>
                    {admission?.admissionFormStatus || 'Submitted'}
                  </span>
                </div>

                {/* 2. Fee Payment */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '12px',
                  background: isPaymentDone ? '#f0fdf4' : '#fffaf5',
                  border: isPaymentDone ? '1px solid #86efac' : '1px solid #fed7aa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: isPaymentDone ? '#16a34a' : '#ea580c',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>2. Course Fee Payment</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {isPaymentDone ? `Fee paid ₹${(admission?.amountPaid || 0).toLocaleString()} (Verified)` : 'Pending gateway / office receipt confirmation'}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px',
                    background: isPaymentDone ? '#bbf7d0' : '#fee2e2',
                    color: isPaymentDone ? '#166534' : '#991b1b'
                  }}>
                    {admission?.paymentStatus || 'Pending'}
                  </span>
                </div>

                {/* 3. Joining Date */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '12px',
                  background: isJoiningDone ? '#f0fdf4' : '#fffaf5',
                  border: isJoiningDone ? '1px solid #86efac' : '1px solid #fed7aa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: isJoiningDone ? '#16a34a' : '#ea580c',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Calendar size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>3. Mandatory Joining Date</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {isJoiningDone ? `Commencing: ${admission?.joiningDate}` : 'Batch commencement date to be assigned by staff'}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px',
                    background: isJoiningDone ? '#bbf7d0' : '#fee2e2',
                    color: isJoiningDone ? '#166534' : '#991b1b'
                  }}>
                    {isJoiningDone ? 'Set' : 'Pending'}
                  </span>
                </div>

                {/* 4. ID Card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '12px',
                  background: isIDCardDone ? '#f0fdf4' : '#fffaf5',
                  border: isIDCardDone ? '1px solid #86efac' : '1px solid #fed7aa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px',
                      background: isIDCardDone ? '#16a34a' : '#ea580c',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>4. Student Smart ID Card</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {isIDCardDone ? `ID Card: ${admission?.idCardNumber} (Issued)` : 'Smart student ID card issuance in progress'}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px',
                    background: isIDCardDone ? '#bbf7d0' : '#f1f5f9',
                    color: isIDCardDone ? '#166534' : '#64748b'
                  }}>
                    {admission?.idCardStatus || 'Not Generated'}
                  </span>
                </div>

              </div>

              {/* Status Note */}
              <div style={{
                background: '#eff6ff',
                color: '#1e40af',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                border: '1px solid #bfdbfe'
              }}>
                <strong>📌 Institutional Policy Note:</strong> In accordance with Alpha Fly Computer Education admission regulations, course activation requires all 4 criteria above to be verified by administrative staff. You will receive an SMS/Email notification upon activation.
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={fetchStatus}
            disabled={loading}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Check Status
          </button>

          <button
            onClick={onClose}
            style={{
              background: '#0A3D91',
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1.5rem',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
