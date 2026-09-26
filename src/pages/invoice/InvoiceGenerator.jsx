import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import './InvoiceGenerator.css';

const DEFAULT_QR_SVG = `
<svg class="w-full h-full text-slate-300" viewBox="0 0 100 100" fill="currentColor">
  <path d="M5 5h30v30H5V5zm6 6v18h18V11H11zm6 6h6v6h-6v-6zm48-12h30v30H65V5zm6 6v18h18V11H71zm6 6h6v6h-6v-6zM5 65h30v30H5V65zm6 6v18h18V71H11zm6 6h6v6h-6v-6zm56-8h6v6h-6v-6zm6 6h6v6h-6v-6zm6-6h6v6h-6v-6zm-12 12h6v6h-6v-6zm12 0h6v6h-6v-6zm-6 6h6v6h-6v-6zm-12 6h6v6h-6v-6zm12 0h6v6h-6v-6zm-18 6h6v6h-6v-6zm12 0h6v6h-6v-6zm-6-24h6v6h-6v-6zm12 0h6v6h-6v-6zm-24 12h6v6h-6v-6zm0 12h6v6h-6v-6zm12-6h6v6h-6v-6z" />
</svg>`;

const INITIAL_ITEMS = [
  { description: 'Course Fee', duration: '3 Months', qty: 1, rate: 12000 },
  { description: '', duration: '', qty: '', rate: '' },
  { description: '', duration: '', qty: '', rate: '' },
  { description: '', duration: '', qty: '', rate: '' }
];

const getTodayDateStr = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getDueDateStr = (days = 30) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const generateRandomInvoiceNo = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AF-${year}-${rand}`;
};

export default function InvoiceGenerator({ session, students = [] }) {
  // Mobile drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);

  // Invoice Canvas State
  const [invoiceNo, setInvoiceNo] = useState(generateRandomInvoiceNo());
  const [invoiceDate, setInvoiceDate] = useState(getTodayDateStr());
  const [dueDate, setDueDate] = useState(getDueDateStr());

  // Student Details
  const [studentName, setStudentName] = useState('');
  const [studentSession, setStudentSession] = useState(new Date().getFullYear().toString());
  const [studentCourse, setStudentCourse] = useState('');
  const [studentBatch, setStudentBatch] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [studentAddress, setStudentAddress] = useState('');

  // Line Items
  const [items, setItems] = useState(INITIAL_ITEMS);

  // Financials
  const [discount, setDiscount] = useState(0);
  const [gstPercent, setGstPercent] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [transactionId, setTransactionId] = useState('');
  const [paymentModes, setPaymentModes] = useState({
    cash: false,
    upi: true,
    bank: false,
    card: false,
    cheque: false
  });

  // QR / UPI
  const [upiId, setUpiId] = useState('alphafly@okaxis');
  const [uploadedQR, setUploadedQR] = useState(null);

  // Ledger & Storage
  const [ledger, setLedger] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('invoiceLedger') || '[]');
    } catch {
      return [];
    }
  });

  // Cloud Settings
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState(() => localStorage.getItem('googleSheetsUrl') || '');
  const [isSyncing, setIsSyncing] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Fetch backend invoices on mount
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/invoices');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setLedger(data);
            localStorage.setItem('invoiceLedger', JSON.stringify(data));
          }
        }
      } catch (e) {
        console.warn('Using local ledger:', e);
      }
    };
    fetchInvoices();
  }, []);

  // Autofill student from registered LMS list
  const handleStudentSelect = (e) => {
    const code = e.target.value;
    if (!code) return;
    const stu = students.find(s => s.accessCode === code || s._id === code || s.id === code);
    if (stu) {
      setStudentName(stu.name || '');
      if (stu.enrolledCourse) {
        setStudentCourse(stu.enrolledCourse.replace(/_/g, ' ').toUpperCase());
      }
      showToast(`Autofilled for ${stu.name}!`);
    }
  };

  // Line items actions
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { description: '', duration: '', qty: '', rate: '' }]);
  };

  const removeItemRow = (index) => {
    if (items.length <= 1) {
      setItems([{ description: '', duration: '', qty: '', rate: '' }]);
      return;
    }
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const q = parseFloat(item.qty) || 0;
    const r = parseFloat(item.rate) || 0;
    return sum + q * r;
  }, 0);

  const numDiscount = parseFloat(discount) || 0;
  const numGstPercent = parseFloat(gstPercent) || 0;
  const numAmountPaid = parseFloat(amountPaid) || 0;

  const subtotalAfterDiscount = Math.max(0, subtotal - numDiscount);
  const gstAmount = subtotalAfterDiscount * (numGstPercent / 100);
  const grandTotal = subtotalAfterDiscount + gstAmount;
  const balanceDue = grandTotal - numAmountPaid;

  let paymentStatus = 'DRAFT';
  if (grandTotal > 0 && balanceDue <= 0) {
    paymentStatus = 'PAID';
  } else if (numAmountPaid > 0 && balanceDue > 0) {
    paymentStatus = 'PARTIAL';
  } else if (grandTotal > 0) {
    paymentStatus = 'UNPAID';
  }

  const activeModesStr = Object.entries(paymentModes)
    .filter(([, v]) => v)
    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
    .join(', ');

  const collectInvoiceData = () => ({
    invoiceNo: invoiceNo.trim() || generateRandomInvoiceNo(),
    invoiceDate,
    dueDate,
    studentName: studentName.trim(),
    session: studentSession.trim(),
    course: studentCourse.trim(),
    batch: studentBatch.trim(),
    mobile: studentMobile.trim(),
    address: studentAddress.trim(),
    items: items.filter(it => it.description || it.rate),
    subtotal,
    discount: numDiscount,
    gstPercent: numGstPercent,
    gstAmount,
    grandTotal,
    amountPaid: numAmountPaid,
    balanceDue,
    status: paymentStatus,
    paymentModes,
    activeModesStr,
    transactionId: transactionId.trim(),
    upiId: upiId.trim(),
    qrImage: uploadedQR,
    createdAt: new Date().toISOString()
  });

  // Save to Ledger (local + backend)
  const saveToLedger = async (silent = false) => {
    const d = collectInvoiceData();
    let updated = [...ledger];
    const existingIdx = updated.findIndex(inv => inv.invoiceNo === d.invoiceNo);
    if (existingIdx >= 0) {
      updated[existingIdx] = d;
    } else {
      updated.unshift(d);
    }
    setLedger(updated);
    localStorage.setItem('invoiceLedger', JSON.stringify(updated));

    // Save to backend API
    try {
      await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d)
      });
    } catch (e) {
      console.warn('Backend save error:', e);
    }

    if (!silent) {
      showToast('Saved to Local Ledger!');
    }
    return d;
  };

  // Submit Invoice (Ledger + Google Sheets Webhook)
  const handleSubmitInvoice = async () => {
    setIsDrawerOpen(false);
    const d = await saveToLedger(true);

    const url = localStorage.getItem('googleSheetsUrl');
    if (url) {
      setIsSyncing(true);
      try {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            invoiceNo: d.invoiceNo,
            date: d.invoiceDate,
            dueDate: d.dueDate,
            studentName: d.studentName,
            mobile: d.mobile || '',
            course: d.course || '',
            subtotal: d.subtotal,
            discount: d.discount,
            gst: d.gstAmount,
            grandTotal: d.grandTotal,
            amountPaid: d.amountPaid,
            balanceDue: d.balanceDue,
            status: d.status,
            paymentModes: d.activeModesStr
          })
        });
        showToast('Invoice Synced to Google Sheets!');
      } catch (err) {
        showToast('Error syncing to Google Sheets');
        console.error(err);
      } finally {
        setIsSyncing(false);
      }
    } else {
      showToast('Saved to Local Ledger!');
    }
  };

  // Reset Canvas
  const resetInvoice = () => {
    setInvoiceNo(generateRandomInvoiceNo());
    setInvoiceDate(getTodayDateStr());
    setDueDate(getDueDateStr());
    setStudentName('');
    setStudentSession(new Date().getFullYear().toString());
    setStudentCourse('');
    setStudentBatch('');
    setStudentMobile('');
    setStudentAddress('');
    setItems(INITIAL_ITEMS);
    setDiscount(0);
    setGstPercent(0);
    setAmountPaid(0);
    setTransactionId('');
    setPaymentModes({ cash: false, upi: true, bank: false, card: false, cheque: false });
    showToast('Invoice reset to blank!');
  };

  // Native Print
  const handlePrint = () => {
    setIsDrawerOpen(false);
    saveToLedger(true);
    window.print();
  };

  // PDF Download
  const handlePDFDownload = async () => {
    setIsDrawerOpen(false);
    saveToLedger(true);
    document.body.classList.add('pdf-rendering');
    
    // Check if html2pdf is available
    if (window.html2pdf) {
      const element = document.getElementById('invoice-canvas');
      const opt = {
        margin: 0,
        filename: `Invoice_${invoiceNo || 'Alphafly'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'b5', orientation: 'portrait' }
      };
      try {
        await window.html2pdf().set(opt).from(element).save();
        showToast('PDF downloaded!');
      } catch (err) {
        console.warn('html2pdf fallback to native print:', err);
        window.print();
      } finally {
        document.body.classList.remove('pdf-rendering');
      }
    } else {
      // Load html2pdf script dynamically if not yet on page
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => {
        const element = document.getElementById('invoice-canvas');
        const opt = {
          margin: 0,
          filename: `Invoice_${invoiceNo || 'Alphafly'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'b5', orientation: 'portrait' }
        };
        window.html2pdf().set(opt).from(element).save().then(() => {
          document.body.classList.remove('pdf-rendering');
          showToast('PDF downloaded!');
        });
      };
      script.onerror = () => {
        document.body.classList.remove('pdf-rendering');
        window.print();
      };
      document.head.appendChild(script);
    }
  };

  // JSON Save / Restore
  const saveAsJSON = () => {
    setIsDrawerOpen(false);
    const d = collectInvoiceData();
    const invoiceData = {
      metadata: { invoiceNo: d.invoiceNo, invoiceDate: d.invoiceDate, dueDate: d.dueDate },
      student: { name: d.studentName, session: d.session, course: d.course, batch: d.batch, mobile: d.mobile, address: d.address },
      items: d.items,
      financials: { discount: d.discount, gstPercent: d.gstPercent, amountPaid: d.amountPaid, transactionId: d.transactionId },
      paymentModes: d.paymentModes,
      qr: { upiId: d.upiId, qrImage: d.qrImage }
    };
    const jsonStr = JSON.stringify(invoiceData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${d.invoiceNo || 'AF-export'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    saveToLedger(true);
    showToast('JSON backup saved!');
  };

  const loadFromJSON = (e) => {
    setIsDrawerOpen(false);
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);
        if (data.metadata) {
          if (data.metadata.invoiceNo) setInvoiceNo(data.metadata.invoiceNo);
          if (data.metadata.invoiceDate) setInvoiceDate(data.metadata.invoiceDate);
          if (data.metadata.dueDate) setDueDate(data.metadata.dueDate);
        }
        if (data.student) {
          if (data.student.name) setStudentName(data.student.name);
          if (data.student.session) setStudentSession(data.student.session);
          if (data.student.course) setStudentCourse(data.student.course);
          if (data.student.batch) setStudentBatch(data.student.batch);
          if (data.student.mobile) setStudentMobile(data.student.mobile);
          if (data.student.address) setStudentAddress(data.student.address);
        }
        if (Array.isArray(data.items)) {
          setItems(data.items);
        }
        if (data.financials) {
          if (data.financials.discount !== undefined) setDiscount(data.financials.discount);
          if (data.financials.gstPercent !== undefined) setGstPercent(data.financials.gstPercent);
          if (data.financials.amountPaid !== undefined) setAmountPaid(data.financials.amountPaid);
          if (data.financials.transactionId) setTransactionId(data.financials.transactionId);
        }
        if (data.paymentModes) setPaymentModes(data.paymentModes);
        if (data.qr) {
          if (data.qr.upiId) setUpiId(data.qr.upiId);
          if (data.qr.qrImage) setUploadedQR(data.qr.qrImage);
        }
        showToast('Invoice loaded successfully!');
      } catch (err) {
        alert('Error parsing JSON file. Please ensure it is a valid Alphafly invoice JSON.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  // Export Ledger to Excel (.xlsx)
  const exportLedgerToExcel = () => {
    saveToLedger(true);
    if (ledger.length === 0) {
      showToast('No saved invoices in ledger yet.');
      return;
    }

    const summaryHeaders = [
      'Invoice No', 'Date', 'Due Date', 'Student Name', 'Session',
      'Course', 'Batch', 'Mobile', 'Address', 'Subtotal (₹)',
      'Discount (₹)', 'GST (%)', 'GST Amount (₹)', 'Grand Total (₹)',
      'Amount Paid (₹)', 'Balance Due (₹)', 'Status', 'Payment Modes', 'Transaction ID'
    ];

    const summaryRows = ledger.map(inv => [
      inv.invoiceNo,
      inv.invoiceDate,
      inv.dueDate,
      inv.studentName,
      inv.session,
      inv.course,
      inv.batch,
      inv.mobile,
      inv.address,
      inv.subtotal || 0,
      inv.discount || 0,
      inv.gstPercent || 0,
      inv.gstAmount || 0,
      inv.grandTotal || 0,
      inv.amountPaid || 0,
      inv.balanceDue || 0,
      inv.status || 'UNPAID',
      inv.activeModesStr || '',
      inv.transactionId || ''
    ]);

    const ws1 = XLSX.utils.aoa_to_sheet([summaryHeaders, ...summaryRows]);
    ws1['!cols'] = [
      { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 12 },
      { wch: 25 }, { wch: 22 }, { wch: 14 }, { wch: 20 }, { wch: 12 },
      { wch: 12 }, { wch: 8 }, { wch: 12 }, { wch: 14 }, { wch: 14 },
      { wch: 14 }, { wch: 12 }, { wch: 18 }, { wch: 20 }
    ];

    const itemHeaders = ['Invoice No', 'Student Name', 'S.No', 'Description', 'Duration', 'Qty', 'Rate (₹)', 'Amount (₹)'];
    const itemRows = [];
    ledger.forEach(inv => {
      (inv.items || []).forEach((it, idx) => {
        const q = parseFloat(it.qty) || 0;
        const r = parseFloat(it.rate) || 0;
        itemRows.push([
          inv.invoiceNo,
          inv.studentName,
          idx + 1,
          it.description || '',
          it.duration || '',
          q,
          r,
          q * r
        ]);
      });
    });

    const ws2 = XLSX.utils.aoa_to_sheet([itemHeaders, ...itemRows]);
    ws2['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 6 }, { wch: 30 }, { wch: 18 }, { wch: 6 }, { wch: 12 }, { wch: 14 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Ledger Summary');
    XLSX.utils.book_append_sheet(wb, ws2, 'All Fee Items');

    const filename = `Alphafly_Invoice_Ledger_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
    showToast('Ledger downloaded!');
  };

  // Clear Ledger
  const clearLedger = () => {
    if (confirm('Are you sure you want to delete all saved invoice history? This cannot be undone.')) {
      setLedger([]);
      localStorage.removeItem('invoiceLedger');
      showToast('Ledger cleared.');
    }
  };

  // Sharing text generator
  const generateShareText = () => {
    const d = collectInvoiceData();
    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A';
      const parts = dateStr.split('-');
      return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateStr;
    };

    let text = `📄 INVOICE: ${d.invoiceNo || 'N/A'}\n`;
    text += `📅 Date: ${formatDate(d.invoiceDate)} | Due: ${formatDate(d.dueDate)}\n`;
    text += `👤 Student: ${d.studentName || 'N/A'}`;
    if (d.course) text += ` | Course: ${d.course}`;
    if (d.session) text += ` | Year: ${d.session}`;
    text += `\n`;

    if (d.items.length > 0) {
      text += `\n── Fee Details ──\n`;
      d.items.forEach((item, i) => {
        if (item.description) {
          const amt = ((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0)).toFixed(2);
          text += `${i + 1}. ${item.description} — ₹${amt}\n`;
        }
      });
    }

    text += `\n💰 Subtotal: ₹${d.subtotal.toFixed(2)}`;
    if (d.discount > 0) text += ` | Discount: ₹${d.discount.toFixed(2)}`;
    text += `\n`;
    if (d.gstPercent > 0) text += `📊 GST (${d.gstPercent}%): ₹${d.gstAmount.toFixed(2)}\n`;
    text += `🏷️ Grand Total: ₹${d.grandTotal.toFixed(2)}\n`;
    text += `💳 Paid: ₹${d.amountPaid.toFixed(2)} | Balance: ₹${d.balanceDue.toFixed(2)}\n`;
    text += `📌 Status: ${d.status}\n`;
    if (d.activeModesStr) text += `💰 Payment: ${d.activeModesStr}\n`;
    text += `\n🏫 Alphafly Computer Education, Theni\n📞 8015 8016 89`;

    return text;
  };

  const shareViaWhatsApp = () => {
    setIsDrawerOpen(false);
    const text = generateShareText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaEmail = () => {
    setIsDrawerOpen(false);
    const d = collectInvoiceData();
    const subject = `Invoice ${d.invoiceNo || 'Alphafly'} — ${d.studentName || 'Student'}`;
    const body = generateShareText();
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const shareViaSMS = () => {
    setIsDrawerOpen(false);
    const text = generateShareText();
    window.open(`sms:?body=${encodeURIComponent(text)}`, '_self');
  };

  const shareViaTelegram = () => {
    setIsDrawerOpen(false);
    const text = generateShareText();
    window.open(`https://t.me/share/url?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyToClipboard = () => {
    setIsDrawerOpen(false);
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Copied to clipboard!');
    });
  };

  // QR Image Upload handler
  const handleQRUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }
      if (file.size > 1024 * 1024) {
        alert('Image must be smaller than 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = function (event) {
        setUploadedQR(event.target.result);
        showToast('QR Code uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Load past invoice into canvas from modal
  const loadInvoiceToCanvas = (inv) => {
    setInvoiceNo(inv.invoiceNo || generateRandomInvoiceNo());
    setInvoiceDate(inv.invoiceDate || getTodayDateStr());
    setDueDate(inv.dueDate || getDueDateStr());
    setStudentName(inv.studentName || '');
    setStudentSession(inv.session || new Date().getFullYear().toString());
    setStudentCourse(inv.course || '');
    setStudentBatch(inv.batch || '');
    setStudentMobile(inv.mobile || '');
    setStudentAddress(inv.address || '');
    setItems(inv.items && inv.items.length > 0 ? inv.items : INITIAL_ITEMS);
    setDiscount(inv.discount || 0);
    setGstPercent(inv.gstPercent || 0);
    setAmountPaid(inv.amountPaid || 0);
    setTransactionId(inv.transactionId || '');
    if (inv.paymentModes) setPaymentModes(inv.paymentModes);
    if (inv.upiId) setUpiId(inv.upiId);
    if (inv.qrImage) setUploadedQR(inv.qrImage);
    setShowLedgerModal(false);
    showToast(`Loaded Invoice #${inv.invoiceNo}!`);
  };

  return (
    <div className="af-invoice-root">
      
      {/* Mobile Responsive Header (Hidden on print and desktop) */}
      <header className="no-print md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-white sticky top-0 w-full z-40 select-none">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gradient-to-tr from-blue-700 to-orange-500 flex items-center justify-center font-black text-sm text-white">
            A
          </div>
          <span className="font-extrabold text-sm tracking-wide">ALPHA FLY INVOICE</span>
        </div>
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="p-1 text-slate-400 hover:text-white transition-colors"
          title="Toggle Sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Backdrop Overlay for Mobile Drawer Sidebar */}
      <div
        className={`drawer-backdrop no-print ${isDrawerOpen ? 'active' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Dashboard Sidebar Control Panel (Collapsible Mobile Drawer) */}
      <aside
        id="dashboard-sidebar"
        className={`no-print mobile-drawer w-72 md:w-72 lg:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between shrink-0 text-white select-none ${isDrawerOpen ? 'open' : ''}`}
      >
        <div>
          {/* Workspace Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-700 to-orange-500 flex items-center justify-center font-black text-lg text-white shadow-lg">
                A
              </div>
              <div>
                <h2 className="font-extrabold text-base tracking-wide">ALPHA FLY</h2>
                <p className="text-[10px] text-slate-400">Invoice Workspace v2.0</p>
              </div>
            </div>
            {/* Mobile Close button */}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Close Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Enrolled Student Dropdown */}
          {students.length > 0 && (
            <div className="mb-4 bg-slate-800/80 p-2.5 rounded-custom border border-slate-700/80">
              <label className="text-[9px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                ⚡ Autofill from Student Directory:
              </label>
              <select
                onChange={handleStudentSelect}
                className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded p-1.5 text-[10px] font-medium outline-none focus:border-blue-500"
              >
                <option value="">-- Select Registered Student --</option>
                {students.map(stu => (
                  <option key={stu._id || stu.accessCode} value={stu.accessCode || stu._id}>
                    {stu.name} ({stu.accessCode})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Panel Buttons */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Document Controls</label>
            
            {/* Print Button */}
            <button
              onClick={handlePrint}
              id="btn-print"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2.5 px-3 rounded-custom font-bold text-xs tracking-wide transition-all shadow-lg active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Invoice
            </button>

            {/* PDF Button */}
            <button
              onClick={handlePDFDownload}
              id="btn-pdf"
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-2.5 px-3 rounded-custom font-bold text-xs tracking-wide transition-all shadow-lg active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>

            {/* Submit / Sync Button */}
            <button
              onClick={handleSubmitInvoice}
              id="btn-submit-invoice"
              disabled={isSyncing}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-3 rounded-custom font-bold text-xs tracking-wide transition-all shadow-lg active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isSyncing ? 'Syncing...' : 'Submit Invoice'}
            </button>

            {/* Two-column row: Ledger Download + Clear Ledger */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowLedgerModal(true)}
                id="btn-download-ledger"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-custom font-bold text-xs tracking-wide transition-all shadow-lg active:scale-[0.98] relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Invoice Ledger
                <span id="ledger-count-badge" className="absolute -top-1.5 -right-1.5 bg-white text-emerald-700 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow border border-emerald-300">
                  {ledger.length}
                </span>
              </button>
              <button
                onClick={clearLedger}
                id="btn-clear-ledger"
                className="bg-slate-800 hover:bg-rose-950 hover:text-rose-200 hover:border-rose-900 border border-slate-700 text-slate-400 py-2.5 px-2.5 rounded-custom transition-all"
                title="Clear Ledger"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <p className="text-[9px] text-slate-500 text-center -mt-1">Invoices auto-save on Print / PDF / Save</p>

            {/* Two-column row: Save JSON + Load JSON */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={saveAsJSON}
                id="btn-save-json"
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-2 px-2 rounded-custom font-semibold text-[11px] transition-all active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save JSON
              </button>

              <label
                htmlFor="json-file-input"
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-2 px-2 rounded-custom font-semibold text-[11px] cursor-pointer transition-all text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Restore
              </label>
              <input type="file" id="json-file-input" accept=".json" onChange={loadFromJSON} className="hidden" />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetInvoice}
              id="btn-reset"
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-200 hover:border-rose-900 border border-slate-700 text-slate-400 py-2 px-3 rounded-custom font-semibold text-xs transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
              </svg>
              Reset Canvas
            </button>
          </div>

          {/* Share Section */}
          <div className="mt-4">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Share Invoice</label>
            <div className="grid grid-cols-5 gap-1.5">
              {/* WhatsApp */}
              <button
                onClick={shareViaWhatsApp}
                id="btn-share-whatsapp"
                className="group flex flex-col items-center gap-1 bg-slate-800 hover:bg-green-900/50 border border-slate-700 hover:border-green-700 text-slate-300 hover:text-green-400 py-2 rounded-lg transition-all"
                title="Share via WhatsApp"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-[9px] font-bold">WhatsApp</span>
              </button>

              {/* Email */}
              <button
                onClick={shareViaEmail}
                id="btn-share-email"
                className="group flex flex-col items-center gap-1 bg-slate-800 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-700 text-slate-300 hover:text-blue-400 py-2 rounded-lg transition-all"
                title="Share via Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[9px] font-bold">Email</span>
              </button>

              {/* SMS */}
              <button
                onClick={shareViaSMS}
                id="btn-share-sms"
                className="group flex flex-col items-center gap-1 bg-slate-800 hover:bg-cyan-900/50 border border-slate-700 hover:border-cyan-700 text-slate-300 hover:text-cyan-400 py-2 rounded-lg transition-all"
                title="Share via SMS"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-[9px] font-bold">SMS</span>
              </button>

              {/* Telegram */}
              <button
                onClick={shareViaTelegram}
                id="btn-share-telegram"
                className="group flex flex-col items-center gap-1 bg-slate-800 hover:bg-sky-900/50 border border-slate-700 hover:border-sky-700 text-slate-300 hover:text-sky-400 py-2 rounded-lg transition-all"
                title="Share via Telegram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span className="text-[9px] font-bold">Telegram</span>
              </button>

              {/* Copy */}
              <button
                onClick={copyToClipboard}
                id="btn-share-copy"
                className="group flex flex-col items-center gap-1 bg-slate-800 hover:bg-purple-900/50 border border-slate-700 hover:border-purple-700 text-slate-300 hover:text-purple-400 py-2 rounded-lg transition-all"
                title="Copy to Clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span className="text-[9px] font-bold">Copy</span>
              </button>
            </div>
          </div>

          {/* Cloud Settings */}
          <div className="mt-4">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 flex justify-between items-center">
              <span>Google Sheets Sync</span>
              <span
                id="sync-status-indicator"
                className={`w-2 h-2 rounded-full ${googleSheetsUrl ? 'bg-emerald-500' : 'bg-slate-600'}`}
                title={googleSheetsUrl ? 'Connected' : 'Not connected'}
              ></span>
            </label>
            <div className="flex flex-col gap-1.5">
              <input
                type="password"
                id="google-sheets-url"
                value={googleSheetsUrl}
                onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded p-2 focus:outline-none focus:border-indigo-500 w-full"
                placeholder="Paste Apps Script Web App URL here"
              />
              <button
                onClick={() => {
                  const url = googleSheetsUrl.trim();
                  if (url) {
                    localStorage.setItem('googleSheetsUrl', url);
                    showToast('Google Sheets URL saved!');
                  } else {
                    localStorage.removeItem('googleSheetsUrl');
                    showToast('Google Sheets sync disabled');
                  }
                }}
                id="btn-save-settings"
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] font-semibold rounded py-1.5 transition-colors"
              >
                Save URL
              </button>
            </div>
          </div>

          {/* Quick Guidelines */}
          <div className="mt-4 bg-slate-800/50 rounded-custom p-3 border border-slate-800/80 text-[10px] leading-relaxed text-slate-400">
            <span className="font-bold text-slate-300 block mb-1">💡 Tips:</span>
            <ul className="list-disc pl-3.5 space-y-1">
              <li>Click any field on the invoice to edit.</li>
              <li>Qty × Rate auto-calculates amounts.</li>
              <li>Share generates a text summary instantly.</li>
            </ul>
          </div>
        </div>

        {/* Attribution Footer */}
        <div className="text-center text-[10px] text-slate-600 mt-3 pt-3 border-t border-slate-800/50">
          Developed for Alpha Fly Theni
        </div>
      </aside>

      {/* Toast Notification */}
      <div id="toast" className={`toast-notification ${toastMsg ? 'show' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span id="toast-message">{toastMsg || 'Copied to clipboard!'}</span>
      </div>

      {/* Page Viewer Canvas */}
      <main className="flex-1 overflow-y-auto p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start justify-center print:p-0 print:overflow-visible print:block">
        
        {/* Responsive Wrapper for B5 Invoice Canvas */}
        <div className="invoice-canvas-wrapper">
          {/* Invoice B5 Sheet Layout Container (Compact) */}
          <div id="invoice-canvas" className="invoice-canvas border border-slate-200 rounded-lg print:border-none print:shadow-none print:rounded-none">
            
            {/* Background Watermark (Monitor + Mouse Vector) */}
            <div className="invoice-watermark">
              <svg className="w-64 h-64 text-primary" width="256" height="256" viewBox="0 0 100 100" fill="#0A3D91" style={{ color: '#0A3D91' }}>
                <path d="M10 15h80v45H10z" fill="none" stroke="#0A3D91" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M42 60l-5 16h26l-5-16z" fill="none" stroke="#0A3D91" strokeWidth="3" strokeLinejoin="round" />
                <path d="M30 76h40" stroke="#0A3D91" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M10 52h80" stroke="#0A3D91" strokeWidth="1.5" fill="none" />
                <rect x="74" y="68" width="12" height="18" rx="6" fill="none" stroke="#0A3D91" strokeWidth="2.5" />
                <path d="M80 68v6 M74 74h12" stroke="#0A3D91" strokeWidth="1.5" fill="none" />
                <path d="M80 68c0-8-12-3-12-11" fill="none" stroke="#0A3D91" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Top Invoice Branding Header Area */}
            <header className="text-center mb-1.5 border-b border-slate-100 pb-1 relative">
              <h1 className="brand-title text-[19px] font-extrabold tracking-tight text-primary leading-tight">
                ALPHA FLY THENI<br />
              </h1>
              <h3 className="brand-title text-[12px] font-extrabold tracking-tight text-primary leading-tight">Computer Education</h3>
              <p className="text-accent font-bold tracking-widest text-[8px] uppercase mt-0.5">
                Empowering Skills for the Future
              </p>

              {/* Brand Details with Icons */}
              <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-0.5 mt-1 text-[8px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  No. 10, K S Complex, Old Bus Stand, Subban Chetty Street, Theni, Tamil Nadu 625531
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  8015 8016 89
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  alphafly.edu@gmail.com
                </span>
              </div>
              
              {/* Registration and GSTIN Info */}
              <div className="text-[7.5px] text-slate-500 font-bold mt-1 tracking-wider uppercase select-none">
                Reg No: AF/EDU/2026/9841 &nbsp;|&nbsp; GSTIN: 33AAFCA8841M1ZS &nbsp;|&nbsp; ISO 9001:2015 Certified
              </div>
            </header>

            {/* Invoice Info block */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-3 mb-2">
              {/* Invoice Large Identifier */}
              <div className="flex-1 flex flex-col justify-end">
                <h2 className="text-[20px] font-extrabold tracking-tight text-primary uppercase select-none leading-none mb-0.5">
                  INVOICE
                </h2>
                <div className="border-b-4 border-accent w-16 mt-0.5 rounded-full"></div>
              </div>

              {/* Invoice Meta Details Card */}
              <div className="w-full md:w-[240px] bg-slate-50 border border-slate-200 rounded-custom p-1.5 flex flex-col gap-0.5 relative">
                {/* Live Payment Status Badge */}
                <div className="absolute -top-3 right-3 print:right-0">
                  <span
                    id="payment-status-badge"
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border status-${paymentStatus.toLowerCase()}`}
                  >
                    {paymentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Invoice No:</label>
                  <div className="col-span-2 flex items-center gap-1">
                    <input
                      type="text"
                      id="invoice-no"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                      className="canvas-input font-bold text-slate-800 text-[10px] w-full py-0"
                      placeholder="AF-2026-XXXX"
                    />
                    <button
                      onClick={() => setInvoiceNo(generateRandomInvoiceNo())}
                      id="btn-generate-id"
                      className="no-print p-0.5 text-slate-400 hover:text-primary transition-colors hover:bg-slate-200/50 rounded"
                      title="Generate New ID"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Invoice Date:</label>
                  <input
                    type="date"
                    id="invoice-date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-700 py-0"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Due Date:</label>
                  <input
                    type="date"
                    id="due-date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-700 py-0"
                  />
                </div>
              </div>
            </section>

            {/* Bill To Student Section Card */}
            <section className="border border-slate-200 rounded-custom p-1.5 mb-2 bg-white shadow-sm">
              <h3 className="text-[8px] font-bold tracking-wider text-primary uppercase mb-1 pb-0.5 border-b border-slate-100 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                BILL TO (STUDENT INFORMATION)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                {/* Student Name */}
                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Student Name:</label>
                  <input
                    type="text"
                    id="student-name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] font-semibold text-slate-800"
                    placeholder="Enter Full Name"
                  />
                </div>
                
                {/* Academic Year */}
                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Academic Year:</label>
                  <input
                    type="text"
                    id="student-session"
                    value={studentSession}
                    onChange={(e) => setStudentSession(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-800"
                    placeholder="e.g. 2026 - 2027"
                  />
                </div>

                {/* Course */}
                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Course Name:</label>
                  <input
                    type="text"
                    id="student-course"
                    value={studentCourse}
                    onChange={(e) => setStudentCourse(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-800"
                    placeholder="e.g. Diploma in Computer Application"
                  />
                </div>

                {/* Batch */}
                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Batch Timing:</label>
                  <input
                    type="text"
                    id="student-batch"
                    value={studentBatch}
                    onChange={(e) => setStudentBatch(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-800"
                    placeholder="e.g. Morning 10 AM - 12 PM"
                  />
                </div>

                {/* Mobile */}
                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Mobile No:</label>
                  <input
                    type="text"
                    id="student-mobile"
                    value={studentMobile}
                    onChange={(e) => setStudentMobile(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-800"
                    placeholder="98765 43210"
                  />
                </div>

                {/* Address */}
                <div className="grid grid-cols-3 items-center gap-1">
                  <label className="text-[9.5px] font-semibold text-slate-500">Student Address:</label>
                  <input
                    type="text"
                    id="student-address"
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                    className="canvas-input col-span-2 text-[10px] text-slate-800"
                    placeholder="City, State, Zip"
                  />
                </div>
              </div>
            </section>

            {/* Fee Details Table */}
            <section className="mb-1.5">
              <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[8px] font-bold uppercase tracking-wider">
                      <th className="px-2 py-0.5 text-center w-10 bg-primary text-white border-b border-slate-200">S.No</th>
                      <th className="px-2 py-0.5 w-5/12 bg-primary text-white border-b border-slate-200">Description</th>
                      <th className="px-2 py-0.5 w-2/12 text-center bg-primary text-white border-b border-slate-200">Duration</th>
                      <th className="px-2 py-0.5 w-1/12 text-center bg-primary text-white border-b border-slate-200">Qty</th>
                      <th className="px-2 py-0.5 w-2/12 text-right bg-primary text-white border-b border-slate-200">Rate (₹)</th>
                      <th className="px-2 py-0.5 w-2/12 text-right bg-primary text-white border-b border-slate-200 px-3">Amount (₹)</th>
                      <th className="px-2 py-0.5 text-center w-10 bg-primary text-white border-b border-slate-200 no-print">Act</th>
                    </tr>
                  </thead>
                  <tbody id="invoice-items-body" className="divide-y divide-slate-200">
                    {items.map((item, index) => {
                      const q = parseFloat(item.qty) || 0;
                      const r = parseFloat(item.rate) || 0;
                      const rowAmount = q * r;

                      return (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="px-2 py-0.5 text-center text-[10px] font-semibold text-slate-500 row-sno">
                            {index + 1}
                          </td>
                          <td className="px-2 py-0.5">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                              className="canvas-input w-full font-medium text-slate-800 text-[10px]"
                              placeholder="Course Fee"
                            />
                          </td>
                          <td className="px-2 py-0.5">
                            <input
                              type="text"
                              value={item.duration}
                              onChange={(e) => handleItemChange(index, 'duration', e.target.value)}
                              className="canvas-input w-full text-center text-[10px] text-slate-600"
                              placeholder="3 Months"
                            />
                          </td>
                          <td className="px-2 py-0.5">
                            <input
                              type="number"
                              value={item.qty}
                              onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                              className="canvas-input w-full text-center no-spinner item-qty text-[10px]"
                              min="0"
                            />
                          </td>
                          <td className="px-2 py-0.5">
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                              className="canvas-input w-full text-right no-spinner item-rate text-[10px]"
                              min="0"
                            />
                          </td>
                          <td className="px-2 py-0.5 text-right text-slate-900 font-semibold px-3 item-amount text-[10px]">
                            ₹{rowAmount.toFixed(2)}
                          </td>
                          <td className="px-2 py-1 text-center no-print">
                            <button
                              onClick={() => removeItemRow(index)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg p-1 transition-all duration-200 delete-row-btn"
                              title="Delete Row"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Add Row trigger Button */}
              <button
                onClick={addItemRow}
                id="add-row-btn"
                className="no-print mt-0.5 flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary-hover hover:underline transition-all select-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Row
              </button>
            </section>

            {/* Payment Details & Settlement Summary 2-Column Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1.5 items-stretch">
              
              {/* Column 1: Payment Modes & Details */}
              <div className="border border-slate-200 rounded-custom p-1.5 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-[8px] font-bold tracking-wider text-primary uppercase mb-1 pb-0.5 border-b border-slate-100 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    PAYMENT PARTICULARS
                  </h3>
                  
                  {/* Payment Mode Checkboxes */}
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-slate-700 font-medium mb-1.5">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentModes.cash}
                        onChange={(e) => setPaymentModes({ ...paymentModes, cash: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-0 text-[10px]"
                      /> Cash
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentModes.upi}
                        onChange={(e) => setPaymentModes({ ...paymentModes, upi: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-0 text-[10px]"
                      /> UPI
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentModes.bank}
                        onChange={(e) => setPaymentModes({ ...paymentModes, bank: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-0 text-[10px]"
                      /> Bank Transfer
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentModes.card}
                        onChange={(e) => setPaymentModes({ ...paymentModes, card: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-0 text-[10px]"
                      /> Card
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentModes.cheque}
                        onChange={(e) => setPaymentModes({ ...paymentModes, cheque: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-0 text-[10px]"
                      /> Cheque
                    </label>
                  </div>

                  {/* Transaction ID */}
                  <div className="flex items-center gap-1 text-[9.5px]">
                    <span className="font-semibold text-slate-500 whitespace-nowrap">Txn ID / Ref No:</span>
                    <input
                      type="text"
                      id="transaction-id"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="canvas-input flex-1 text-[10px] text-slate-800"
                      placeholder="UPI/Bank reference number"
                    />
                  </div>
                </div>

                {/* Amount Paid & Balance Due */}
                <div className="border-t border-slate-100 pt-1 mt-1 space-y-0.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-slate-700">Amount Paid (₹):</span>
                    <input
                      type="number"
                      id="amount-paid"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      className="canvas-input font-bold text-right text-emerald-600 w-24 no-spinner text-[10px]"
                      min="0"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-slate-700">Balance Due:</span>
                    <span id="lbl-balance-due" className={`font-bold ${balanceDue > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      ₹{Math.max(0, balanceDue).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Fee Settlement Summary Card */}
              <div className="border border-slate-200 rounded-custom p-1.5 bg-slate-50 shadow-sm flex flex-col justify-between">
                <h3 className="text-[8px] font-bold tracking-wider text-primary uppercase pb-0.5 border-b border-slate-200 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  FEE SETTLEMENT SUMMARY
                </h3>

                {/* Subtotal */}
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-medium text-slate-600">Subtotal:</span>
                  <span id="lbl-subtotal" className="font-semibold text-slate-800">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Discount Input */}
                <div className="flex justify-between items-center text-[10px] gap-2">
                  <span className="font-medium text-slate-600">Discount (₹):</span>
                  <input
                    type="number"
                    id="discount-input"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="canvas-input font-semibold text-right text-slate-800 w-16 no-spinner border-b border-slate-200 text-[10px]"
                    min="0"
                  />
                </div>

                {/* GST Input */}
                <div className="flex justify-between items-center text-[10px] gap-2">
                  <span className="font-medium text-slate-600">GST (%):</span>
                  <input
                    type="number"
                    id="gst-input"
                    value={gstPercent}
                    onChange={(e) => setGstPercent(e.target.value)}
                    className="canvas-input font-semibold text-right text-slate-800 w-16 no-spinner border-b border-slate-200 text-[10px]"
                    min="0"
                  />
                </div>

                {/* Calculated GST Amount */}
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-medium text-slate-600">GST Amount:</span>
                  <span id="lbl-gst-amount" className="font-semibold text-slate-800">
                    ₹{gstAmount.toFixed(2)}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-0.5"></div>

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-primary uppercase">Grand Total:</span>
                  <span id="lbl-grand-total" className="text-xs font-extrabold text-primary">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </section>

            {/* Terms & Scan-to-pay QR Panel Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1.5 items-stretch">
              
              {/* Column 1: Terms & Conditions Card (Expands on Print) */}
              <div className="border border-slate-200 rounded-custom p-1.5 bg-white shadow-sm flex flex-col justify-between print:col-span-2">
                <div>
                  <h3 className="text-[8px] font-bold tracking-wider text-primary uppercase pb-0.5 border-b border-slate-100 mb-0.5 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    TERMS & CONDITIONS
                  </h3>
                  <ul className="text-[7.5px] text-slate-600 space-y-0.5 leading-relaxed">
                    <li className="flex items-start gap-1">
                      <span className="text-accent text-xs leading-none mt-0.5">•</span>
                      <span>Course fees once paid are non-refundable unless approved by management.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-accent text-xs leading-none mt-0.5">•</span>
                      <span>Receipt should be preserved until course completion.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-accent text-xs leading-none mt-0.5">•</span>
                      <span>Certificates will be issued only after successful completion and fee clearance.</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-accent text-xs leading-none mt-0.5">•</span>
                      <span>Late fee may apply.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 2: SCAN & PAY UPI Box Card (Hidden on Print) */}
              <div className="border border-slate-200 rounded-custom p-1.5 bg-white shadow-sm flex flex-col md:flex-row gap-2 items-center justify-between print:hidden">
                {/* Left side of card: Title & Inputs */}
                <div className="flex-1 flex flex-col justify-between w-full h-full gap-1.5">
                  <div>
                    <h4 className="text-[8px] font-bold tracking-wider text-primary uppercase pb-0.5 border-b border-slate-100 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h2M4 4h4v4H4V4zm0 12h4v4H4v-4zm12 0h4v4h-4v-4zM16 4h4v4h-4V4z" />
                      </svg>
                      SCAN & PAY (UPI)
                    </h4>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase">UPI ID:</label>
                      <input
                        type="text"
                        id="upi-id"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="canvas-input text-[9px] font-bold text-slate-700 w-full"
                        placeholder="institute@upi"
                      />
                    </div>
                  </div>
                  
                  {/* Uploader button */}
                  <div className="no-print">
                    <label htmlFor="qr-upload" className="inline-flex items-center gap-1 text-[10px] font-bold text-accent hover:text-accent-hover hover:underline cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload QR Image
                    </label>
                    <input type="file" id="qr-upload" accept="image/*" onChange={handleQRUpload} className="hidden" />
                  </div>
                </div>

                {/* Right side of card: QR Visual block */}
                <div className="w-12 h-12 border border-slate-200 rounded-lg p-1 bg-slate-50 flex items-center justify-center shrink-0 shadow-inner">
                  <div id="qr-placeholder-container" className="w-full h-full flex items-center justify-center">
                    {uploadedQR ? (
                      <img src={uploadedQR} alt="UPI QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: DEFAULT_QR_SVG }} className="w-full h-full" />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Signature block & Institute stamp area */}
            <section className="flex justify-end mt-1 mb-0.5 select-none">
              <div className="text-center w-48">
                <div className="border-b border-dashed border-slate-400 h-6 relative">
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-slate-300 font-medium no-print">
                    Authorized Signature Box
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-[9px] font-bold text-primary uppercase">Authorized Signature</p>
                  <p className="text-[8px] font-medium text-slate-500 mt-0.5">Alpha Fly Theni</p>
                </div>
              </div>
            </section>

            {/* Document Footer */}
            <footer className="text-center pt-1 border-t border-slate-100 select-none">
              <p className="brand-title text-accent font-extrabold text-[11px] tracking-wider">
                Thank You!
              </p>
              <p className="text-[7.5px] text-slate-500 font-medium mt-0">
                Thank you for choosing Alphafly Computer Education.<br />
                We appreciate your trust and wish you success in your learning journey.
              </p>
            </footer>
            
          </div>{/* end invoice-canvas */}
        </div>{/* end invoice-canvas-wrapper */}
      </main>

      {/* ========================================================================= */}
      {/* 📊 LEDGER MODAL VIEWER */}
      {/* ========================================================================= */}
      {showLedgerModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl text-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                  📊
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Alphafly Invoice Ledger</h3>
                  <p className="text-xs text-slate-400">Total {ledger.length} Invoices Recorded</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportLedgerToExcel}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export to Excel
                </button>
                <button
                  onClick={() => setShowLedgerModal(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Table Body */}
            <div className="p-4 overflow-y-auto flex-1">
              {ledger.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-medium">
                  No invoices saved in ledger yet.
                </div>
              ) : (
                <div className="border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Invoice No</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Course</th>
                        <th className="p-3 text-right">Grand Total</th>
                        <th className="p-3 text-right">Paid</th>
                        <th className="p-3 text-right">Balance</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {ledger.map((inv) => (
                        <tr key={inv.invoiceNo} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 font-bold text-blue-400">{inv.invoiceNo}</td>
                          <td className="p-3 text-slate-400">{inv.invoiceDate}</td>
                          <td className="p-3 font-semibold text-white">{inv.studentName || '—'}</td>
                          <td className="p-3 text-slate-300">{inv.course || '—'}</td>
                          <td className="p-3 text-right font-bold text-white">₹{(inv.grandTotal || 0).toFixed(2)}</td>
                          <td className="p-3 text-right font-bold text-emerald-400">₹{(inv.amountPaid || 0).toFixed(2)}</td>
                          <td className={`p-3 text-right font-bold ${(inv.balanceDue || 0) > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                            ₹{(inv.balanceDue || 0).toFixed(2)}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 text-[9px] font-black rounded-full border status-${(inv.status || 'UNPAID').toLowerCase()}`}>
                              {inv.status || 'UNPAID'}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => loadInvoiceToCanvas(inv)}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-all"
                            >
                              Load in Canvas
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
