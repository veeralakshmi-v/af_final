import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  CreditCard,
  FileText,
  User,
  UserCheck,
  Phone,
  Mail,
  Award,
  ArrowLeft,
  RefreshCw,
  Eye,
  ChevronRight,
  Check,
  X,
  Lock,
  Unlock,
  AlertCircle,
  FileCheck,
  ExternalLink,
  Plus,
  Trash2,
  History,
  Send,
  Building,
  GraduationCap
} from 'lucide-react';

export default function AdmissionVerificationDashboard({
  session,
  students = [],
  onBack,
  onNavigateToIDCard,
  onNavigateToInvoice
}) {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL'); // ALL, PENDING_VERIFICATION, FORM_INCOMPLETE, PAYMENT_PENDING, JOINING_DATE_MISSING, ID_CARD_PENDING, READY_FOR_APPROVAL, COURSE_ACTIVATED

  // Modal / Drawer states
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [isConfirmApprovalOpen, setIsConfirmApprovalOpen] = useState(false);
  const [activeChecklistTab, setActiveChecklistTab] = useState('checklist'); // 'checklist' | 'audit_log' | 'form_details'

  // Interactive Checklist Inputs (for the selected admission)
  const [joiningDateInput, setJoiningDateInput] = useState('');
  const [idCardNumberInput, setIdCardNumberInput] = useState('');
  const [manualAmountInput, setManualAmountInput] = useState('');
  const [manualUtrInput, setManualUtrInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // New Application Form State
  const [newAppForm, setNewAppForm] = useState({
    studentName: '',
    contactNumber: '',
    email: '',
    courseName: 'Python Full Stack Development',
    courseKey: 'python_fullstack',
    courseFee: 24000,
    educationQualification: 'B.Sc Computer Science',
    idProofType: 'Aadhaar Card',
    idProofNumber: '',
    address: 'Theni, Tamil Nadu'
  });

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  // Fetch all admissions from backend
  const fetchAdmissions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admissions');
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setAdmissions(list);
        try {
          localStorage.setItem('af_admissions_cache', JSON.stringify(list));
        } catch (e) {}
      } else {
        const cached = localStorage.getItem('af_admissions_cache');
        if (cached) {
          try {
            setAdmissions(JSON.parse(cached));
          } catch (e) {
            setError('Failed to load admissions from server.');
          }
        } else {
          const err = await res.json().catch(() => ({}));
          setError(err.error || 'Failed to load admissions from server.');
        }
      }
    } catch (e) {
      const cached = localStorage.getItem('af_admissions_cache');
      if (cached) {
        try {
          setAdmissions(JSON.parse(cached));
        } catch (err) {
          setError('Network connection error while fetching admissions.');
        }
      } else {
        setError('Network connection error while fetching admissions.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Sync inputs when opening a student record
  useEffect(() => {
    if (selectedAdmission) {
      setJoiningDateInput(selectedAdmission.joiningDate || '');
      setIdCardNumberInput(selectedAdmission.idCardNumber || '');
      setManualAmountInput(selectedAdmission.amountPaid || selectedAdmission.courseFee || '');
      setManualUtrInput(selectedAdmission.paymentReference || '');
    }
  }, [selectedAdmission]);

  // Statistics
  const stats = useMemo(() => {
    const total = admissions.length;
    const pendingVerification = admissions.filter(a => a.verificationStatus !== 'Approved' && a.courseActivationStatus !== 'Active').length;
    const readyForApproval = admissions.filter(a => a.verificationStatus === 'Ready for Approval').length;
    const activated = admissions.filter(a => a.courseActivationStatus === 'Active').length;
    const paymentPending = admissions.filter(a => a.paymentStatus !== 'Paid').length;
    return { total, pendingVerification, readyForApproval, activated, paymentPending };
  }, [admissions]);

  // Filtered List
  const filteredAdmissions = useMemo(() => {
    return admissions.filter(item => {
      // Search matching
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (item.studentName || '').toLowerCase().includes(q) ||
        (item.applicationReference || '').toLowerCase().includes(q) ||
        (item.studentId || '').toLowerCase().includes(q) ||
        (item.contactNumber || '').toLowerCase().includes(q) ||
        (item.courseName || '').toLowerCase().includes(q) ||
        (item.invoiceNumber || '').toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Filter category
      switch (activeFilter) {
        case 'PENDING_VERIFICATION':
          return item.verificationStatus !== 'Approved' && item.courseActivationStatus !== 'Active';
        case 'FORM_INCOMPLETE':
          return item.admissionFormStatus !== 'Verified';
        case 'PAYMENT_PENDING':
          return item.paymentStatus !== 'Paid';
        case 'JOINING_DATE_MISSING':
          return !item.joiningDate || !item.joiningDate.trim();
        case 'ID_CARD_PENDING':
          return item.idCardStatus !== 'Issued';
        case 'READY_FOR_APPROVAL':
          return item.verificationStatus === 'Ready for Approval';
        case 'COURSE_ACTIVATED':
          return item.courseActivationStatus === 'Active';
        default:
          return true;
      }
    });
  }, [admissions, searchQuery, activeFilter]);

  // Check condition checklist readiness for the selected record
  const checkReadiness = (adm) => {
    if (!adm) return { form: false, payment: false, joining: false, idcard: false, isReady: false };
    const form = adm.admissionFormStatus === 'Verified';
    const payment = adm.paymentStatus === 'Paid';
    const joining = Boolean(adm.joiningDate && adm.joiningDate.trim());
    const idcard = adm.idCardStatus === 'Issued';
    const isReady = form && payment && joining && idcard;
    return { form, payment, joining, idcard, isReady };
  };

  // 1. Verify Admission Form
  const handleVerifyForm = async (markVerified) => {
    if (!selectedAdmission) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admissions/${selectedAdmission._id || selectedAdmission.applicationReference}/form-verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verifiedBy: session?.name || session?.username || 'Lead Administrator',
          markVerified,
          notes: markVerified ? 'Form verification passed.' : 'Marked incomplete.'
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(markVerified ? 'Admission form marked as Verified!' : 'Form marked as Incomplete.');
        setSelectedAdmission(data.admission);
        fetchAdmissions();
      } else {
        alert(data.error || 'Failed to update form verification.');
      }
    } catch (e) {
      alert('Network error updating form status.');
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Confirm Payment
  const handleConfirmPayment = async () => {
    if (!selectedAdmission) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admissions/${selectedAdmission._id || selectedAdmission.applicationReference}/payment-verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verifiedBy: session?.name || session?.username || 'Lead Administrator',
          paymentStatus: 'Paid',
          amountPaid: Number(manualAmountInput) || selectedAdmission.courseFee,
          paymentReference: manualUtrInput || 'MANUAL-UTR-' + Date.now(),
          notes: 'Fee payment confirmed by administrator with audit note.'
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Payment verified and saved! (Course remains locked pending full checklist)');
        setSelectedAdmission(data.admission);
        fetchAdmissions();
      } else {
        alert(data.error || 'Failed to verify payment.');
      }
    } catch (e) {
      alert('Network error updating payment status.');
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Save Mandatory Joining Date
  const handleSaveJoiningDate = async () => {
    if (!selectedAdmission) return;
    if (!joiningDateInput || !joiningDateInput.trim()) {
      alert('Please select a valid joining date.');
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admissions/${selectedAdmission._id || selectedAdmission.applicationReference}/joining-date`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          joiningDate: joiningDateInput.trim(),
          setBy: session?.name || session?.username || 'Lead Administrator',
          notes: `Batch joining date saved as ${joiningDateInput.trim()}.`
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Joining date confirmed and saved!');
        setSelectedAdmission(data.admission);
        fetchAdmissions();
      } else {
        alert(data.error || 'Failed to save joining date.');
      }
    } catch (e) {
      alert('Network error saving joining date.');
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Issue ID Card
  const handleIssueIDCard = async () => {
    if (!selectedAdmission) return;
    setActionLoading(true);
    try {
      const year = new Date().getFullYear();
      const generatedIdCardNo = idCardNumberInput.trim() || `AF-ID-${year}-${Math.floor(100 + Math.random() * 900)}`;

      const res = await fetch(`/api/admissions/${selectedAdmission._id || selectedAdmission.applicationReference}/id-card`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idCardStatus: 'Issued',
          idCardNumber: generatedIdCardNo,
          issuedBy: session?.name || session?.username || 'Lead Administrator',
          notes: `Smart ID Card ${generatedIdCardNo} printed and officially issued.`
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Student ID Card ${generatedIdCardNo} issued!`);
        setSelectedAdmission(data.admission);
        fetchAdmissions();
      } else {
        alert(data.error || 'Failed to issue ID card.');
      }
    } catch (e) {
      alert('Network error issuing ID card.');
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Final Approval Action (Execute when all 4 conditions are met)
  const handleFinalApproval = async () => {
    if (!selectedAdmission) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admissions/${selectedAdmission._id || selectedAdmission.applicationReference}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approvedBy: session?.name || session?.username || 'Lead Administrator'
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`🎉 Admission Approved! Permanent Student ID ${data.studentId} assigned and Course Access Activated.`);
        setSelectedAdmission(data.admission);
        setIsConfirmApprovalOpen(false);
        fetchAdmissions();
      } else {
        alert(data.error + (data.missingConditions ? '\n\nMissing:\n• ' + data.missingConditions.join('\n• ') : ''));
      }
    } catch (e) {
      alert('Network error approving admission.');
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Suspend Course Access
  const handleSuspendAccess = async () => {
    if (!selectedAdmission) return;
    const reason = prompt('Please enter the reason for suspending this student’s course access (e.g. Refund issued, Disciplinary action):');
    if (!reason) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admissions/${selectedAdmission._id || selectedAdmission.applicationReference}/suspend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          suspendedBy: session?.name || session?.username || 'Lead Administrator'
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Course access suspended and audit log updated.');
        setSelectedAdmission(data.admission);
        fetchAdmissions();
      } else {
        alert(data.error || 'Failed to suspend access.');
      }
    } catch (e) {
      alert('Network error suspending access.');
    } finally {
      setActionLoading(false);
    }
  };

  // 7. Create New Admission Application
  const handleCreateNewApplication = async (e) => {
    e.preventDefault();
    if (!newAppForm.studentName || !newAppForm.courseName) {
      alert('Student Name and Course are required.');
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: newAppForm.studentName,
          contactNumber: newAppForm.contactNumber,
          email: newAppForm.email,
          courseName: newAppForm.courseName,
          courseKey: newAppForm.courseKey,
          courseFee: newAppForm.courseFee,
          admissionFormData: {
            fullName: newAppForm.studentName,
            contactNumber: newAppForm.contactNumber,
            email: newAppForm.email,
            educationQualification: newAppForm.educationQualification,
            idProofType: newAppForm.idProofType,
            idProofNumber: newAppForm.idProofNumber,
            address: newAppForm.address
          }
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`New Application ${data.admission?.applicationReference} successfully registered!`);
        setIsNewAppModalOpen(false);
        fetchAdmissions();
        // Reset form
        setNewAppForm({
          studentName: '',
          contactNumber: '',
          email: '',
          courseName: 'Python Full Stack Development',
          courseKey: 'python_fullstack',
          courseFee: 24000,
          educationQualification: 'B.Sc Computer Science',
          idProofType: 'Aadhaar Card',
          idProofNumber: '',
          address: 'Theni, Tamil Nadu'
        });
      } else {
        alert(data.error || 'Failed to create application.');
      }
    } catch (e) {
      alert('Network error registering application.');
    } finally {
      setActionLoading(false);
    }
  };

  const readiness = checkReadiness(selectedAdmission);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', width: '100%', paddingBottom: '3rem' }}>
      
      {/* Toast Notification */}
      {successToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#065f46',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: 700,
          fontSize: '0.95rem',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <CheckCircle2 size={22} color="#34d399" />
          {successToast}
        </div>
      )}

      {/* Top Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0A3D91 0%, #1e40af 100%)',
        borderRadius: '20px',
        padding: '2rem',
        color: '#ffffff',
        boxShadow: '0 10px 25px rgba(10, 61, 145, 0.25)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={26} color="#38bdf8" />
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#93c5fd', fontWeight: 800 }}>
                Alpha Fly Computer Education • Administrative Portal
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
              Student Admission Verification & Course Activation
            </h1>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.92rem', color: '#e0e7ff', maxWidth: '650px', lineHeight: 1.4 }}>
              Strict 4-point administrative governance workflow. Complete Admission Form check, Fee Payment confirmation, Mandatory Joining Date, and ID Card issuance to unlock student course access.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsNewAppModalOpen(true)}
            style={{
              background: '#38bdf8',
              color: '#0f172a',
              border: 'none',
              padding: '0.75rem 1.4rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)'
            }}
          >
            <Plus size={18} /> New Application
          </button>
          <button
            onClick={fetchAdmissions}
            disabled={loading}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '0.75rem 1.2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
            title="Refresh list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.82rem', fontWeight: 800 }}>
            <span>TOTAL APPLICATIONS</span>
            <FileText size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>{stats.total}</div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>All applicant records</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fed7aa', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#c2410c', fontSize: '0.82rem', fontWeight: 800 }}>
            <span>PENDING VERIFICATION</span>
            <Clock size={18} color="#ea580c" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ea580c', marginTop: '6px' }}>{stats.pendingVerification}</div>
          <div style={{ fontSize: '0.78rem', color: '#9a3412', marginTop: '4px' }}>Action required by staff</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #bbf7d0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#15803d', fontSize: '0.82rem', fontWeight: 800 }}>
            <span>READY FOR APPROVAL</span>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#16a34a', marginTop: '6px' }}>{stats.readyForApproval}</div>
          <div style={{ fontSize: '0.78rem', color: '#166534', marginTop: '4px' }}>All 4 checklist points met</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #bfdbfe', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1d4ed8', fontSize: '0.82rem', fontWeight: 800 }}>
            <span>COURSES ACTIVATED</span>
            <Unlock size={18} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1d4ed8', marginTop: '6px' }}>{stats.activated}</div>
          <div style={{ fontSize: '0.78rem', color: '#1e40af', marginTop: '4px' }}>Active full LMS access</div>
        </div>

        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fecaca', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#b91c1c', fontSize: '0.82rem', fontWeight: 800 }}>
            <span>PAYMENT PENDING</span>
            <CreditCard size={18} color="#dc2626" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#dc2626', marginTop: '6px' }}>{stats.paymentPending}</div>
          <div style={{ fontSize: '0.78rem', color: '#991b1b', marginTop: '4px' }}>Course locked pending fees</div>
        </div>
      </div>

      {/* Search Bar & Filter Tabs */}
      <div style={{ background: '#ffffff', borderRadius: '18px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
        
        {/* Search input */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by student name, application reference (APP-...), Student ID, phone number, invoice number, or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 2.85rem',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              background: '#f8fafc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginRight: '4px' }}>
            Filter By:
          </span>
          {[
            { id: 'ALL', label: 'All Records', count: admissions.length },
            { id: 'PENDING_VERIFICATION', label: 'Pending Verification', count: stats.pendingVerification },
            { id: 'READY_FOR_APPROVAL', label: 'Ready for Approval 🟢', count: stats.readyForApproval, highlight: true },
            { id: 'FORM_INCOMPLETE', label: 'Form Incomplete', count: admissions.filter(a => a.admissionFormStatus !== 'Verified').length },
            { id: 'PAYMENT_PENDING', label: 'Payment Pending', count: stats.paymentPending },
            { id: 'JOINING_DATE_MISSING', label: 'Joining Date Missing', count: admissions.filter(a => !a.joiningDate || !a.joiningDate.trim()).length },
            { id: 'ID_CARD_PENDING', label: 'ID Card Pending', count: admissions.filter(a => a.idCardStatus !== 'Issued').length },
            { id: 'COURSE_ACTIVATED', label: 'Course Activated', count: stats.activated }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '10px',
                border: activeFilter === f.id ? '2px solid #0284c7' : '1px solid #e2e8f0',
                background: activeFilter === f.id ? (f.highlight ? '#dcfce7' : '#e0f2fe') : '#ffffff',
                color: activeFilter === f.id ? (f.highlight ? '#15803d' : '#0369a1') : '#475569',
                fontSize: '0.82rem',
                fontWeight: activeFilter === f.id ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s'
              }}
            >
              <span>{f.label}</span>
              <span style={{
                background: activeFilter === f.id ? (f.highlight ? '#16a34a' : '#0284c7') : '#f1f5f9',
                color: activeFilter === f.id ? '#ffffff' : '#64748b',
                padding: '1px 6px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem auto', color: '#0284c7' }} />
            <p style={{ fontWeight: 700 }}>Loading admission verification records...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#dc2626' }}>
            <AlertCircle size={36} style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ fontWeight: 800 }}>{error}</p>
            <button
              onClick={fetchAdmissions}
              style={{
                marginTop: '1rem',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Retry Loading
            </button>
          </div>
        ) : filteredAdmissions.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#64748b' }}>
            <ShieldCheck size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#334155', margin: '0 0 6px 0' }}>No admission records found</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
              {searchQuery ? 'Try clearing or modifying your search query.' : 'Click "New Application" to register an applicant.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1200px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#475569' }}>
                  <th style={{ padding: '1rem' }}>Student ID / App Ref</th>
                  <th style={{ padding: '1rem' }}>Student Name</th>
                  <th style={{ padding: '1rem' }}>Contact</th>
                  <th style={{ padding: '1rem' }}>Course</th>
                  <th style={{ padding: '1rem' }}>Invoice No</th>
                  <th style={{ padding: '1rem' }}>Payment</th>
                  <th style={{ padding: '1rem' }}>Form</th>
                  <th style={{ padding: '1rem' }}>Joining Date</th>
                  <th style={{ padding: '1rem' }}>ID Card</th>
                  <th style={{ padding: '1rem' }}>Course Access</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Last Updated</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.map((adm, idx) => {
                  const readinessInfo = checkReadiness(adm);
                  const isReady = readinessInfo.isReady;
                  const isActivated = adm.courseActivationStatus === 'Active';

                  return (
                    <tr
                      key={adm._id || adm.applicationReference || idx}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                        fontSize: '0.86rem',
                        transition: 'background 0.15s'
                      }}
                    >
                      {/* 1. Student ID / App Ref */}
                      <td style={{ padding: '1rem', fontWeight: 800, color: '#0f172a' }}>
                        <div>{adm.studentId || <span style={{ color: '#0284c7' }}>{adm.applicationReference}</span>}</div>
                        {adm.studentId && (
                          <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>Ref: {adm.applicationReference}</div>
                        )}
                      </td>

                      {/* 2. Student Name */}
                      <td style={{ padding: '1rem', fontWeight: 800, color: '#1e293b' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.8rem'
                          }}>
                            {(adm.studentName || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div>{adm.studentName}</div>
                            {adm.studentAccountAccessCode && (
                              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>Key: {adm.studentAccountAccessCode}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Contact */}
                      <td style={{ padding: '1rem', color: '#334155' }}>
                        <div>{adm.contactNumber || '—'}</div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{adm.email || ''}</div>
                      </td>

                      {/* 4. Course */}
                      <td style={{ padding: '1rem', fontWeight: 700, color: '#0f172a' }}>
                        <div style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={adm.courseName}>
                          {adm.courseName}
                        </div>
                      </td>

                      {/* 5. Invoice No */}
                      <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 700, color: adm.invoiceNumber ? '#0284c7' : '#94a3b8' }}>
                        {adm.invoiceNumber || 'Not Generated'}
                      </td>

                      {/* 6. Payment Status */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          background: adm.paymentStatus === 'Paid' ? '#dcfce7' : adm.paymentStatus === 'Failed' ? '#fee2e2' : '#fef3c7',
                          color: adm.paymentStatus === 'Paid' ? '#15803d' : adm.paymentStatus === 'Failed' ? '#b91c1c' : '#b45309'
                        }}>
                          {adm.paymentStatus === 'Paid' ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                          {adm.paymentStatus || 'Pending'}
                        </span>
                        {adm.amountPaid > 0 && (
                          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>₹{adm.amountPaid.toLocaleString()}</div>
                        )}
                      </td>

                      {/* 7. Admission Form */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          background: adm.admissionFormStatus === 'Verified' ? '#dcfce7' : adm.admissionFormStatus === 'Incomplete' ? '#fee2e2' : '#e0f2fe',
                          color: adm.admissionFormStatus === 'Verified' ? '#15803d' : adm.admissionFormStatus === 'Incomplete' ? '#b91c1c' : '#0369a1'
                        }}>
                          {adm.admissionFormStatus === 'Verified' ? <CheckCircle2 size={13} /> : adm.admissionFormStatus === 'Incomplete' ? <AlertTriangle size={13} /> : <FileText size={13} />}
                          {adm.admissionFormStatus || 'Submitted'}
                        </span>
                      </td>

                      {/* 8. Joining Date */}
                      <td style={{ padding: '1rem', color: adm.joiningDate ? '#0f172a' : '#ef4444', fontWeight: adm.joiningDate ? 600 : 800 }}>
                        {adm.joiningDate ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={13} color="#0284c7" />
                            {adm.joiningDate}
                          </div>
                        ) : (
                          <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>Missing ⚠️</span>
                        )}
                      </td>

                      {/* 9. ID Card */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          background: adm.idCardStatus === 'Issued' ? '#dcfce7' : adm.idCardStatus === 'Generated' ? '#fef3c7' : '#f1f5f9',
                          color: adm.idCardStatus === 'Issued' ? '#15803d' : adm.idCardStatus === 'Generated' ? '#b45309' : '#64748b'
                        }}>
                          {adm.idCardStatus === 'Issued' ? <CheckCircle2 size={13} /> : <CreditCard size={13} />}
                          {adm.idCardStatus || 'Not Generated'}
                        </span>
                      </td>

                      {/* 10. Course Activation */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          background: isActivated ? '#dcfce7' : adm.courseActivationStatus === 'Suspended' ? '#fee2e2' : '#f1f5f9',
                          color: isActivated ? '#15803d' : adm.courseActivationStatus === 'Suspended' ? '#b91c1c' : '#475569'
                        }}>
                          {isActivated ? <Unlock size={14} /> : <Lock size={14} />}
                          {adm.courseActivationStatus || 'Locked'}
                        </span>
                      </td>

                      {/* 11. Verification Status */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          background: isActivated ? '#dcfce7' : isReady ? '#dcfce7' : '#f1f5f9',
                          color: isActivated ? '#15803d' : isReady ? '#166534' : '#64748b'
                        }}>
                          {adm.verificationStatus || 'Pending'}
                        </span>
                      </td>

                      {/* 12. Last Updated */}
                      <td style={{ padding: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
                        {adm.updatedAt ? new Date(adm.updatedAt).toLocaleDateString() : '—'}
                      </td>

                      {/* 13. Actions */}
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button
                            onClick={() => {
                              setSelectedAdmission(adm);
                              setActiveChecklistTab('checklist');
                              setIsChecklistOpen(true);
                            }}
                            style={{
                              background: '#0284c7',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.45rem 0.85rem',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Open Checklist & Verification Drawer"
                          >
                            <ShieldCheck size={14} /> Checklist
                          </button>

                          {isReady && !isActivated && (
                            <button
                              onClick={() => {
                                setSelectedAdmission(adm);
                                setIsConfirmApprovalOpen(true);
                              }}
                              style={{
                                background: '#16a34a',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.45rem 0.85rem',
                                borderRadius: '8px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                boxShadow: '0 2px 6px rgba(22, 163, 74, 0.3)'
                              }}
                              title="All conditions satisfied! Click to approve admission"
                            >
                              <CheckCircle2 size={14} /> Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 📋 STUDENT VERIFICATION CHECKLIST DRAWER / MODAL                      */}
      {/* ==================================================================== */}
      {isChecklistOpen && selectedAdmission && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '680px',
            background: '#ffffff',
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-8px 0 30px rgba(0,0,0,0.25)'
          }}>
            
            {/* Drawer Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e2e8f0',
              background: '#0A3D91',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Admission Verification Checklist
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '2px 0 0 0' }}>
                  {selectedAdmission.studentName}
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#e0e7ff', marginTop: '2px' }}>
                  Application Ref: <strong>{selectedAdmission.applicationReference}</strong> • {selectedAdmission.courseName}
                </div>
              </div>
              <button
                onClick={() => setIsChecklistOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Checklist Tab Switcher */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '0 1rem' }}>
              <button
                onClick={() => setActiveChecklistTab('checklist')}
                style={{
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  borderBottom: activeChecklistTab === 'checklist' ? '3px solid #0284c7' : '3px solid transparent',
                  background: 'transparent',
                  color: activeChecklistTab === 'checklist' ? '#0284c7' : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Verification Checklist (4 Points)
              </button>
              <button
                onClick={() => setActiveChecklistTab('form_details')}
                style={{
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  borderBottom: activeChecklistTab === 'form_details' ? '3px solid #0284c7' : '3px solid transparent',
                  background: 'transparent',
                  color: activeChecklistTab === 'form_details' ? '#0284c7' : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Submitted Form Details
              </button>
              <button
                onClick={() => setActiveChecklistTab('audit_log')}
                style={{
                  padding: '0.85rem 1.25rem',
                  border: 'none',
                  borderBottom: activeChecklistTab === 'audit_log' ? '3px solid #0284c7' : '3px solid transparent',
                  background: 'transparent',
                  color: activeChecklistTab === 'audit_log' ? '#0284c7' : '#64748b',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Audit Log History ({selectedAdmission.auditLogs?.length || 0})
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '1.5rem', flex: 1 }}>

              {activeChecklistTab === 'checklist' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Progress Milestone Bar */}
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 800, marginBottom: '8px' }}>
                      <span style={{ color: '#475569' }}>VERIFICATION PROGRESS</span>
                      <span style={{ color: readiness.isReady ? '#15803d' : '#0284c7' }}>
                        {[readiness.form, readiness.payment, readiness.joining, readiness.idcard].filter(Boolean).length} of 4 Completed ({([readiness.form, readiness.payment, readiness.joining, readiness.idcard].filter(Boolean).length) * 25}%)
                      </span>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${([readiness.form, readiness.payment, readiness.joining, readiness.idcard].filter(Boolean).length) * 25}%`,
                        background: readiness.isReady ? '#16a34a' : 'linear-gradient(90deg, #0284c7, #38bdf8)',
                        transition: 'width 0.3s'
                      }} />
                    </div>

                    {/* Readiness banner */}
                    {readiness.isReady ? (
                      <div style={{ marginTop: '12px', background: '#dcfce7', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={18} /> All 4 verification conditions are satisfied! Ready for final approval and course unlock.
                      </div>
                    ) : (
                      <div style={{ marginTop: '12px', background: '#fef3c7', color: '#92400e', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} /> Incomplete conditions: course remains locked until all 4 verification steps pass.
                      </div>
                    )}
                  </div>

                  {/* ──────────────────────────────────────────────────────── */}
                  {/* POINT A: ADMISSION FORM                                  */}
                  {/* ──────────────────────────────────────────────────────── */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    border: readiness.form ? '1.5px solid #86efac' : '1.5px solid #fed7aa',
                    background: readiness.form ? '#f0fdf4' : '#fffaf5'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: readiness.form ? '#16a34a' : '#f97316',
                          color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem'
                        }}>
                          A
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                            Admission Form Verification
                          </h4>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                            Verify applicant personal info, education credentials, and government identity document.
                          </p>
                        </div>
                      </div>

                      <span style={{
                        padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800,
                        background: readiness.form ? '#bbf7d0' : '#fee2e2',
                        color: readiness.form ? '#166534' : '#991b1b'
                      }}>
                        {selectedAdmission.admissionFormStatus || 'Submitted'}
                      </span>
                    </div>

                    {/* Missing Fields Warning if incomplete */}
                    {selectedAdmission.formMissingFields && selectedAdmission.formMissingFields.length > 0 && (
                      <div style={{ marginTop: '10px', background: '#fee2e2', color: '#991b1b', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
                        Missing required fields: {selectedAdmission.formMissingFields.join(', ')}
                      </div>
                    )}

                    <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setActiveChecklistTab('form_details')}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={14} /> View Submitted Form
                      </button>

                      {readiness.form ? (
                        <button
                          onClick={() => handleVerifyForm(false)}
                          disabled={actionLoading}
                          style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Mark as Incomplete
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerifyForm(true)}
                          disabled={actionLoading}
                          style={{
                            background: '#16a34a',
                            border: 'none',
                            color: '#ffffff',
                            padding: '0.45rem 0.95rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Check size={14} /> Mark Form Verified
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ──────────────────────────────────────────────────────── */}
                  {/* POINT B: FEE PAYMENT & INVOICE                          */}
                  {/* ──────────────────────────────────────────────────────── */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    border: readiness.payment ? '1.5px solid #86efac' : '1.5px solid #fed7aa',
                    background: readiness.payment ? '#f0fdf4' : '#fffaf5'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: readiness.payment ? '#16a34a' : '#f97316',
                          color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem'
                        }}>
                          B
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                            Fee Payment & Invoice Confirmation
                          </h4>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                            Verify gateway transaction, UTR reference, and invoice storage. Confirmed payment does NOT automatically unlock course.
                          </p>
                        </div>
                      </div>

                      <span style={{
                        padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800,
                        background: readiness.payment ? '#bbf7d0' : '#fee2e2',
                        color: readiness.payment ? '#166534' : '#991b1b'
                      }}>
                        {selectedAdmission.paymentStatus || 'Pending'}
                      </span>
                    </div>

                    {/* Invoice & Payment Details */}
                    <div style={{
                      marginTop: '0.85rem',
                      background: '#ffffff',
                      padding: '0.85rem',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                      fontSize: '0.82rem'
                    }}>
                      <div>
                        <span style={{ color: '#64748b' }}>Invoice Number:</span>{' '}
                        <strong>{selectedAdmission.invoiceNumber || 'INV-PENDING'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Course Fee:</span>{' '}
                        <strong>₹{(selectedAdmission.courseFee || 0).toLocaleString()}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Amount Paid:</span>{' '}
                        <strong style={{ color: readiness.payment ? '#15803d' : '#ea580c' }}>
                          ₹{(selectedAdmission.amountPaid || 0).toLocaleString()}
                        </strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Transaction Ref:</span>{' '}
                        <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                          {selectedAdmission.paymentReference || 'None'}
                        </span>
                      </div>
                    </div>

                    {/* Manual verification controls */}
                    {!readiness.payment && (
                      <div style={{ marginTop: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Bank UTR / Transaction Ref..."
                          value={manualUtrInput}
                          onChange={(e) => setManualUtrInput(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.82rem'
                          }}
                        />
                        <button
                          onClick={handleConfirmPayment}
                          disabled={actionLoading}
                          style={{
                            background: '#0284c7',
                            border: 'none',
                            color: '#ffffff',
                            padding: '0.5rem 0.95rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          Confirm Payment
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ──────────────────────────────────────────────────────── */}
                  {/* POINT C: MANDATORY JOINING DATE                          */}
                  {/* ──────────────────────────────────────────────────────── */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    border: readiness.joining ? '1.5px solid #86efac' : '1.5px solid #fed7aa',
                    background: readiness.joining ? '#f0fdf4' : '#fffaf5'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: readiness.joining ? '#16a34a' : '#f97316',
                          color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem'
                        }}>
                          C
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                            Mandatory Joining Date
                          </h4>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                            Batch commencement schedule must be locked before approving admission.
                          </p>
                        </div>
                      </div>

                      <span style={{
                        padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800,
                        background: readiness.joining ? '#bbf7d0' : '#fee2e2',
                        color: readiness.joining ? '#166534' : '#991b1b'
                      }}>
                        {readiness.joining ? 'Date Confirmed' : 'Date Missing'}
                      </span>
                    </div>

                    <div style={{ marginTop: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="date"
                        value={joiningDateInput}
                        onChange={(e) => setJoiningDateInput(e.target.value)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          outline: 'none',
                          color: '#0f172a',
                          fontWeight: 600
                        }}
                      />
                      <button
                        onClick={handleSaveJoiningDate}
                        disabled={actionLoading}
                        style={{
                          background: '#0284c7',
                          border: 'none',
                          color: '#ffffff',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        Save Joining Date
                      </button>
                    </div>
                  </div>

                  {/* ──────────────────────────────────────────────────────── */}
                  {/* POINT D: STUDENT ID CARD                                 */}
                  {/* ──────────────────────────────────────────────────────── */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    border: readiness.idcard ? '1.5px solid #86efac' : '1.5px solid #fed7aa',
                    background: readiness.idcard ? '#f0fdf4' : '#fffaf5'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: readiness.idcard ? '#16a34a' : '#f97316',
                          color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem'
                        }}>
                          D
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a' }}>
                            Student Smart ID Card Issuance
                          </h4>
                          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                            ID card must be generated and officially issued to the student before course access is unlocked.
                          </p>
                        </div>
                      </div>

                      <span style={{
                        padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800,
                        background: readiness.idcard ? '#bbf7d0' : '#fee2e2',
                        color: readiness.idcard ? '#166534' : '#991b1b'
                      }}>
                        {selectedAdmission.idCardStatus || 'Not Generated'}
                      </span>
                    </div>

                    <div style={{ marginTop: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Smart ID Card Number (e.g. AF-ID-2026-015)"
                        value={idCardNumberInput}
                        onChange={(e) => setIdCardNumberInput(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          fontFamily: 'monospace'
                        }}
                      />
                      <button
                        onClick={handleIssueIDCard}
                        disabled={actionLoading}
                        style={{
                          background: '#0284c7',
                          border: 'none',
                          color: '#ffffff',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        Issue ID Card
                      </button>

                      {onNavigateToIDCard && (
                        <button
                          onClick={() => {
                            setIsChecklistOpen(false);
                            onNavigateToIDCard();
                          }}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#334155',
                            padding: '0.5rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <ExternalLink size={13} /> Open ID Card Studio
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: SUBMITTED FORM DETAILS */}
              {activeChecklistTab === 'form_details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0f172a', fontWeight: 800 }}>
                      Candidate Submitted Application Profile
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.86rem' }}>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Full Name</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.admissionFormData?.fullName || selectedAdmission.studentName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Gender & DOB</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.admissionFormData?.gender || '—'} ({selectedAdmission.admissionFormData?.dob || 'Not specified'})</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Father / Guardian Name</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.admissionFormData?.fatherName || '—'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Contact Phone</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.contactNumber || '—'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.email || '—'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Educational Qualification</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.admissionFormData?.educationQualification || '—'}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Govt ID Proof</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.admissionFormData?.idProofType || 'Aadhaar'} ({selectedAdmission.admissionFormData?.idProofNumber || 'Not submitted'})</strong>
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700 }}>Residential Address</span>
                        <strong style={{ color: '#0f172a' }}>{selectedAdmission.admissionFormData?.address || '—'}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: AUDIT LOG HISTORY */}
              {activeChecklistTab === 'audit_log' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    Immutable Audit Trail & Administrative Log
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Every change of status, payment confirmation, and approval is recorded with user identity and timestamp.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    {(selectedAdmission.auditLogs || []).map((log, lIdx) => (
                      <div
                        key={lIdx}
                        style={{
                          background: '#f8fafc',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.82rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, color: '#0284c7' }}>{log.action}</span>
                          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : '—'}
                          </span>
                        </div>
                        <div style={{ color: '#334155', marginTop: '4px' }}>
                          {log.notes || 'Status changed.'}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                          By: <strong>{log.performedBy || 'System'}</strong> • Field: <code>{log.field}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                {selectedAdmission.courseActivationStatus === 'Active' ? (
                  <button
                    onClick={handleSuspendAccess}
                    disabled={actionLoading}
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      color: '#b91c1c',
                      padding: '0.65rem 1.2rem',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer'
                    }}
                  >
                    Suspend Course Access
                  </button>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Course status: <strong>{selectedAdmission.courseActivationStatus}</strong>
                  </div>
                )}
              </div>

              <div>
                {selectedAdmission.courseActivationStatus !== 'Active' && (
                  <button
                    onClick={() => setIsConfirmApprovalOpen(true)}
                    disabled={!readiness.isReady || actionLoading}
                    style={{
                      background: readiness.isReady ? '#16a34a' : '#cbd5e1',
                      color: readiness.isReady ? '#ffffff' : '#64748b',
                      border: 'none',
                      padding: '0.75rem 1.6rem',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: readiness.isReady ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: readiness.isReady ? '0 4px 14px rgba(22, 163, 74, 0.4)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <CheckCircle2 size={18} /> Verify & Approve Admission
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 🚀 CONFIRM FINAL APPROVAL MODAL                                      */}
      {/* ==================================================================== */}
      {isConfirmApprovalOpen && selectedAdmission && (
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
            borderRadius: '20px',
            maxWidth: '540px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            animation: 'scaleUp 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  Confirm Admission Approval
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Alpha Fly Computer Education • Final Enrollment Action
                </span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.86rem', lineHeight: 1.6 }}>
              <div>• <strong>Student Name:</strong> {selectedAdmission.studentName}</div>
              <div>• <strong>Enrolling Course:</strong> {selectedAdmission.courseName}</div>
              <div>• <strong>Joining Date:</strong> {selectedAdmission.joiningDate}</div>
              <div>• <strong>Smart ID Card:</strong> {selectedAdmission.idCardNumber || 'AF-ID-2026-XXX'}</div>
              <div>• <strong>Fee Status:</strong> ₹{(selectedAdmission.amountPaid || 0).toLocaleString()} (Fully Paid & Verified)</div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Approving this admission will generate a permanent <strong>Student ID</strong> (AF-STU-2026-XXXX), activate the student’s LMS account, unlock all course lessons, and sync the record to Google Sheets.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsConfirmApprovalOpen(false)}
                disabled={actionLoading}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#475569',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleFinalApproval}
                disabled={actionLoading}
                style={{
                  background: '#16a34a',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)'
                }}
              >
                {actionLoading ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                Confirm & Unlock Course Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 📝 NEW APPLICATION REGISTRATION MODAL                                */}
      {/* ==================================================================== */}
      {isNewAppModalOpen && (
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
            borderRadius: '20px',
            maxWidth: '620px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                  Register New Admission Application
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Enter student details to initiate the verification pipeline
                </span>
              </div>
              <button
                onClick={() => setIsNewAppModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateNewApplication} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M. Rajesh Kumar"
                  value={newAppForm.studentName}
                  onChange={(e) => setNewAppForm({ ...newAppForm, studentName: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9840123456"
                    value={newAppForm.contactNumber}
                    onChange={(e) => setNewAppForm({ ...newAppForm, contactNumber: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={newAppForm.email}
                    onChange={(e) => setNewAppForm({ ...newAppForm, email: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Select Course *</label>
                  <select
                    value={newAppForm.courseKey}
                    onChange={(e) => {
                      const key = e.target.value;
                      const courseMap = {
                        python_fullstack: { name: 'Python Full Stack Development', fee: 24000 },
                        powerbi: { name: 'AI & Data Analytics Mastery', fee: 18000 },
                        agentic_ai: { name: 'Agentic AI & LLM Systems', fee: 22000 },
                        tally_prime: { name: 'Tally Prime & GST Certification', fee: 15000 },
                        web_design_20days: { name: 'Web Design & Responsive UI', fee: 12000 },
                        spoko_reasoning: { name: 'Logical Reasoning & Analytical Thinking', fee: 16000 }
                      };
                      const found = courseMap[key] || { name: key, fee: 15000 };
                      setNewAppForm({
                        ...newAppForm,
                        courseKey: key,
                        courseName: found.name,
                        courseFee: found.fee
                      });
                    }}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  >
                    <option value="python_fullstack">Python Full Stack Development</option>
                    <option value="powerbi">AI & Data Analytics Mastery</option>
                    <option value="agentic_ai">Agentic AI & LLM Systems</option>
                    <option value="tally_prime">Tally Prime & GST Certification</option>
                    <option value="web_design_20days">Web Design & Responsive UI</option>
                    <option value="spoko_reasoning">Logical Reasoning & Analytical Thinking</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Course Fee (₹)</label>
                  <input
                    type="number"
                    value={newAppForm.courseFee}
                    onChange={(e) => setNewAppForm({ ...newAppForm, courseFee: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Sc Computer Science"
                    value={newAppForm.educationQualification}
                    onChange={(e) => setNewAppForm({ ...newAppForm, educationQualification: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>ID Proof Number (Aadhaar)</label>
                  <input
                    type="text"
                    placeholder="e.g. 8942-5612-9014"
                    value={newAppForm.idProofNumber}
                    onChange={(e) => setNewAppForm({ ...newAppForm, idProofNumber: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Residential Address</label>
                <textarea
                  rows={2}
                  placeholder="Address..."
                  value={newAppForm.address}
                  onChange={(e) => setNewAppForm({ ...newAppForm, address: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsNewAppModalOpen(false)}
                  style={{ background: '#f1f5f9', border: 'none', color: '#475569', padding: '0.65rem 1.25rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  style={{ background: '#0284c7', border: 'none', color: '#ffffff', padding: '0.65rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
