import 'dotenv/config'; // Loads .env for local dev (no-op on Vercel)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Set DNS servers to resolve MongoDB SRV record
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('⚠️ Failed to set custom DNS servers:', e.message);
}


const currentDir = typeof __dirname !== 'undefined'
  ? __dirname
  : (typeof import.meta !== 'undefined' && import.meta && import.meta.url)
    ? path.dirname(fileURLToPath(import.meta.url))
    : process.cwd();

const app = express();
app.use(cors());
app.use(express.json());

// Detect serverless execution environments (Vercel, Netlify Functions, AWS Lambda)
const isServerless = Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.SERVERLESS);

// Fallback JSON DB path (Serverless cloud functions have write permissions only inside '/tmp')
const localDbPath = isServerless
  ? '/tmp/students.json'
  : path.join(currentDir, 'students.json');

// MongoDB Atlas URI — loaded securely from environment variable (configured in Netlify / .env)
const MONGO_URI = process.env.MONGODB_URI;

let connectionPromise = null;

// 1. Establish Database Connection (with local fallback)
if (!MONGO_URI) {
  console.warn('⚠️ MONGODB_URI environment variable is not set!');
  console.warn('🔄 Falling back to local offline JSON storage database (students.json).');
} else {
  connectionPromise = mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 })
    .then(() => {
      console.log('📡 Connected successfully to MongoDB Atlas Cloud Database!');
      connectionPromise = null;
    })
    .catch(err => {
      console.warn('⚠️ MongoDB connection failed:', err.message);
      console.warn('🔄 Falling back to local offline JSON storage database (students.json).');
      connectionPromise = null;
    });
}

// Database Connection Helper for Route Handlers
const checkDbConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  if (!MONGO_URI) {
    return false;
  }
  if (connectionPromise) {
    try {
      await connectionPromise;
    } catch (e) {
      // Handled in catch block of connectionPromise initialization
    }
    return mongoose.connection.readyState === 1;
  }
  
  // Re-attempt connection if it dropped or previously failed
  connectionPromise = mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      connectionPromise = null;
      return true;
    })
    .catch(err => {
      console.warn('⚠️ MongoDB reconnect failed:', err.message);
      connectionPromise = null;
      return false;
    });
  return connectionPromise;
};


// 2. Mongoose Schema
const taskSubmissionSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.Mixed, 
    default: () => new mongoose.Types.ObjectId().toString() 
  },
  moduleId: { type: String, required: true },
  tabId: { type: String, required: true },
  taskUrl: { type: String, default: '' },
  taskText: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  feedback: { type: String, default: '' },
  grade: { type: String, default: '' }
});

const certificateSchema = new mongoose.Schema({
  data: { type: String, default: '' },
  filename: { type: String, default: '' },
  mimeType: { type: String, default: '' },
  uploadedAt: { type: Date, default: null }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrolledCourse: { type: String, required: true },
  accessCode: { type: String, required: true, unique: true },
  deviceId: { type: String, default: null },
  studentId: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  contactNumber: { type: String, default: '' },
  email: { type: String, default: '' },
  gender: { type: String, default: '' },
  dob: { type: String, default: '' },
  doj: { type: String, default: '' },
  course: { type: String, default: '' },
  fatherName: { type: String, default: '' },
  address: { type: String, default: '' },
  educationQualification: { type: String, default: '' },
  idProofType: { type: String, default: '' },
  idProofNumber: { type: String, default: '' },
  admissionFormData: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
  admissionStatus: { type: String, enum: ['Pending', 'Approved', 'Suspended', 'None'], default: 'Approved' },
  isCourseActivated: { type: Boolean, default: true },
  activatedCourses: { type: [String], default: [] },
  joiningDate: { type: String, default: '' },
  idCardNumber: { type: String, default: '' },
  invoiceNo: { type: String, default: '' },
  feeInitiated: { type: Boolean, default: false },
  idCardIssued: { type: Boolean, default: false },
  inductionCompleted: { type: Boolean, default: false },
  completedLessons: { type: [String], default: [] },
  tasks: { type: [taskSubmissionSchema], default: [] },
  certificate: { type: certificateSchema, default: () => ({}) },
  mockInterviews: { type: [mongoose.Schema.Types.Mixed], default: [] },
  logicalThinkingScore: { type: mongoose.Schema.Types.Mixed, default: () => ({ score: 0, total: 100, percentage: 0, grade: '', feedback: '', updatedAt: null }) }
});

const Student = mongoose.model('Student', studentSchema);

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Staff = mongoose.model('Staff', staffSchema);

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, default: '' },
  duration: { type: String, default: '' },
  qty: { type: Number, default: 1 },
  rate: { type: Number, default: 0 }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
  invoiceDate: { type: String, default: '' },
  dueDate: { type: String, default: '' },
  studentName: { type: String, default: '' },
  studentId: { type: String, default: '' },
  enrollment: { type: String, default: '' },
  session: { type: String, default: '' },
  course: { type: String, default: '' },
  batch: { type: String, default: '' },
  mobile: { type: String, default: '' },
  address: { type: String, default: '' },
  items: { type: [invoiceItemSchema], default: [] },
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  gstPercent: { type: Number, default: 0 },
  gstAmount: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
  amountPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 },
  status: { type: String, default: 'UNPAID' },
  paymentModes: { type: Object, default: {} },
  activeModesStr: { type: String, default: '' },
  transactionId: { type: String, default: '' },
  upiId: { type: String, default: 'alphafly@okaxis' },
  qrImage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// ADMISSION VERIFICATION & WORKFLOW SCHEMAS
const auditLogEntrySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  performedBy: { type: String, required: true },
  action: { type: String, required: true },
  field: { type: String, default: '' },
  previousValue: { type: mongoose.Schema.Types.Mixed, default: null },
  newValue: { type: mongoose.Schema.Types.Mixed, default: null },
  notes: { type: String, default: '' }
});

const admissionFormSchema = new mongoose.Schema({
  submittedAt: { type: Date, default: null },
  fullName: { type: String, default: '' },
  gender: { type: String, default: '' },
  dob: { type: String, default: '' },
  doj: { type: String, default: '' },
  joiningDate: { type: String, default: '' },
  course: { type: String, default: '' },
  courseName: { type: String, default: '' },
  fatherName: { type: String, default: '' },
  contactNumber: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  educationQualification: { type: String, default: '' },
  idProofType: { type: String, default: '' },
  idProofNumber: { type: String, default: '' },
  photoUrl: { type: String, default: '' }
});

const admissionSchema = new mongoose.Schema({
  applicationReference: { type: String, required: true, unique: true },
  studentId: { type: String, default: '' },
  studentAccountAccessCode: { type: String, default: '' },
  studentName: { type: String, required: true },
  contactNumber: { type: String, default: '' },
  email: { type: String, default: '' },
  dob: { type: String, default: '' },
  doj: { type: String, default: '' },
  course: { type: String, default: '' },
  courseName: { type: String, required: true },
  courseKey: { type: String, default: 'python_fullstack' },
  admissionFormStatus: {
    type: String,
    enum: ['Not Submitted', 'Submitted', 'Verified', 'Incomplete'],
    default: 'Submitted'
  },
  admissionFormData: { type: admissionFormSchema, default: () => ({}) },
  formVerifiedBy: { type: String, default: '' },
  formVerifiedAt: { type: Date, default: null },
  formMissingFields: { type: [String], default: [] },
  invoiceNumber: { type: String, default: '' },
  courseFee: { type: Number, default: 0 },
  amountPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 },
  paymentReference: { type: String, default: '' },
  paymentGateway: { type: String, default: 'Razorpay / Bank Transfer' },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded', 'Partial'],
    default: 'Pending'
  },
  paymentVerifiedBy: { type: String, default: '' },
  paymentVerifiedAt: { type: Date, default: null },
  joiningDate: { type: String, default: '' },
  joiningDateSetBy: { type: String, default: '' },
  joiningDateSetAt: { type: Date, default: null },
  idCardStatus: {
    type: String,
    enum: ['Not Generated', 'Generated', 'Issued'],
    default: 'Not Generated'
  },
  idCardNumber: { type: String, default: '' },
  idCardIssuedBy: { type: String, default: '' },
  idCardIssuedAt: { type: Date, default: null },
  verificationStatus: {
    type: String,
    enum: ['Pending Verification', 'Form Incomplete', 'Payment Pending', 'Joining Date Missing', 'ID Card Pending', 'Ready for Approval', 'Approved', 'Rejected', 'Suspended'],
    default: 'Pending Verification'
  },
  courseActivationStatus: {
    type: String,
    enum: ['Locked', 'Active', 'Suspended'],
    default: 'Locked'
  },
  approvedBy: { type: String, default: '' },
  approvedAt: { type: Date, default: null },
  rejectionReason: { type: String, default: '' },
  auditLogs: { type: [auditLogEntrySchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Admission = mongoose.model('Admission', admissionSchema);

// --- COURSE CONTENT SCHEMA & MODEL ---
const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  duration: { type: String, default: '3 months' },
  desc: { type: String, default: '' },
  bannerColor: { type: String, default: '#1e40af' },
  iconKey: { type: String, default: 'BookOpen' },
  badge: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  isFeaturedLanding: { type: Boolean, default: true },
  topics: { type: [String], default: [] },
  modules: { type: [mongoose.Schema.Types.Mixed], default: [] },
  fee: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

// Course Page Schema for storing all 288 lesson pages across all 22 subjects directly in MongoDB
const coursePageSchema = new mongoose.Schema({
  pageId: { type: String, required: true, unique: true },
  subject: { type: String, required: true, index: true },
  courseKey: { type: String, default: '', index: true },
  moduleId: { type: String, default: '', index: true },
  componentName: { type: String, required: true, index: true },
  fileName: { type: String, required: true },
  title: { type: String, default: '' },
  rawContent: { type: String, default: '' },
  fileSizeBytes: { type: Number, default: 0 },
  isInteractive: { type: Boolean, default: false },
  location: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const CoursePage = mongoose.models.CoursePage || mongoose.model('CoursePage', coursePageSchema);

const coursePagesCatalogPath = isServerless
  ? '/tmp/course_pages_catalog.json'
  : path.join(currentDir, 'course_pages_catalog.json');

const getLocalCoursePagesCatalog = () => {
  if (fs.existsSync(coursePagesCatalogPath)) {
    try {
      return JSON.parse(fs.readFileSync(coursePagesCatalogPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Error parsing local course_pages_catalog.json:', e.message);
    }
  }
  const fallbackPath = path.join(currentDir, 'course_pages_catalog.json');
  if (fs.existsSync(fallbackPath)) {
    try {
      return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Error parsing fallback course_pages_catalog.json:', e.message);
    }
  }
  return [];
};

const coursesJsonPath = isServerless
  ? '/tmp/courses.json'
  : path.join(currentDir, 'courses.json');

const getLocalCourses = () => {
  if (fs.existsSync(coursesJsonPath)) {
    try {
      return JSON.parse(fs.readFileSync(coursesJsonPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Error parsing local courses.json:', e.message);
    }
  }
  const fallbackPath = path.join(currentDir, 'courses.json');
  if (fs.existsSync(fallbackPath)) {
    try {
      return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Error parsing fallback courses.json:', e.message);
    }
  }
  return [];
};

// Helper to manage local JSON files
const getLocalStudents = () => {
  if (!fs.existsSync(localDbPath)) {
    fs.writeFileSync(localDbPath, JSON.stringify([]));
  }
  try {
    const data = JSON.parse(fs.readFileSync(localDbPath, 'utf8'));
    return data.map(s => ({
      completedLessons: [],
      tasks: [],
      certificate: null,
      isCourseActivated: s.isCourseActivated !== undefined ? s.isCourseActivated : (s.admissionStatus === 'Approved'),
      admissionStatus: s.admissionStatus || 'Pending',
      studentId: s.studentId || '',
      logicalThinkingScore: s.logicalThinkingScore || { score: 0, total: 100, percentage: 0, grade: '', feedback: '', updatedAt: null },
      ...s
    }));
  } catch (e) {
    return [];
  }
};

const saveLocalStudents = (data) => {
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2));
};

const localStaffDbPath = isServerless
  ? '/tmp/staff.json'
  : path.join(currentDir, 'staff.json');

const getLocalStaff = () => {
  if (!fs.existsSync(localStaffDbPath)) {
    fs.writeFileSync(localStaffDbPath, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(localStaffDbPath, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalStaff = (data) => {
  fs.writeFileSync(localStaffDbPath, JSON.stringify(data, null, 2));
};

const localInvoiceDbPath = isServerless
  ? '/tmp/invoices.json'
  : path.join(currentDir, 'invoices.json');

const getLocalInvoices = () => {
  if (!fs.existsSync(localInvoiceDbPath)) {
    fs.writeFileSync(localInvoiceDbPath, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(localInvoiceDbPath, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalInvoices = (data) => {
  fs.writeFileSync(localInvoiceDbPath, JSON.stringify(data, null, 2));
};

const localAdmissionsDbPath = isServerless
  ? '/tmp/admissions.json'
  : path.join(currentDir, 'admissions.json');

const getLocalAdmissions = () => {
  if (!fs.existsSync(localAdmissionsDbPath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(localAdmissionsDbPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const saveLocalAdmissions = (data) => {
  fs.writeFileSync(localAdmissionsDbPath, JSON.stringify(data, null, 2));
};

// Dynamic calculate verification status
const calculateVerificationStatus = (adm) => {
  if (adm.courseActivationStatus === 'Suspended') {
    return 'Suspended';
  }
  if (adm.verificationStatus === 'Approved' || adm.courseActivationStatus === 'Active') {
    return 'Approved';
  }
  if (adm.admissionFormStatus !== 'Verified') {
    return 'Form Incomplete';
  }
  if (adm.paymentStatus !== 'Paid') {
    return 'Payment Pending';
  }
  if (!adm.joiningDate || !adm.joiningDate.trim()) {
    return 'Joining Date Missing';
  }
  if (adm.idCardStatus !== 'Issued') {
    return 'ID Card Pending';
  }
  return 'Ready for Approval';
};

// Google Sheets Webhook Sync for Admission Verification
const syncAdmissionToGoogleSheets = async (admission) => {
  const sheetUrl = process.env.VITE_FEE_INVOICE_SHEET_URL || 'https://script.google.com/macros/s/AKfycbww1I-fIJJV6PLQpORFJlOrByh-vhEOQK9Zkl2wJl4iHmd_jj0NSPNbGxvajn7K1bUSmw/exec';
  if (!sheetUrl) return;
  try {
    const payload = {
      type: 'ADMISSION_VERIFICATION',
      application_reference: admission.applicationReference,
      student_id: admission.studentId || 'PENDING',
      student_name: admission.studentName,
      contact_number: admission.contactNumber,
      course_name: admission.courseName,
      invoice_number: admission.invoiceNumber || 'N/A',
      payment_status: admission.paymentStatus,
      admission_form_status: admission.admissionFormStatus,
      joining_date: admission.joiningDate || 'N/A',
      id_card_status: admission.idCardStatus,
      verification_status: admission.verificationStatus,
      course_activation_status: admission.courseActivationStatus,
      approved_by: admission.approvedBy || 'N/A',
      approved_at: admission.approvedAt ? new Date(admission.approvedAt).toISOString() : 'N/A',
      updated_at: new Date().toISOString()
    };
    await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Google Sheets non-blocking sync note:', err.message));
  } catch (err) {
    console.warn('Google Sheets sync err:', err.message);
  }
};

const seedAtlasAdmissionsIfEmpty = async () => {
  try {
    const count = await Admission.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial sample admissions in MongoDB Atlas...');
      const localSamples = getLocalAdmissions();
      if (localSamples.length > 0) {
        const mongoDocs = localSamples.map(({ _id, id, ...rest }) => rest);
        await Admission.insertMany(mongoDocs);
        console.log(`✅ Seeded ${mongoDocs.length} sample admissions into MongoDB Atlas!`);
      }
    }
  } catch (err) {
    console.warn('Atlas seed notice:', err.message);
  }
};

// 3. API ROUTES

// 0. Health & Live Database Connection Status Check
app.get('/api/health', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    return res.json({
      status: 'ok',
      database: isDbConnected ? 'connected' : 'offline_fallback',
      cluster: isDbConnected ? 'MongoDB Atlas (lmsdb)' : 'Local JSON Fallback',
      readyState: mongoose.connection.readyState,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- COURSES API (DATABASE-POWERED) ---
// 0.1. Get all published courses (MongoDB with offline JSON fallback)
app.get('/api/courses', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = { isPublished: { $ne: false } };
    if (featured === 'true') {
      filter.isFeaturedLanding = true;
    }

    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const courses = await Course.find(filter).sort({ order: 1, createdAt: 1 }).lean();
      if (courses && courses.length > 0) {
        return res.json(courses);
      }
    }

    // Fallback to local JSON storage
    let localCourses = getLocalCourses();
    if (featured === 'true') {
      localCourses = localCourses.filter(c => c.isFeaturedLanding);
    }
    localCourses.sort((a, b) => (a.order || 0) - (b.order || 0));
    return res.json(localCourses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    const localCourses = getLocalCourses();
    return res.json(localCourses);
  }
});

// 0.2. Get specific course by courseId or _id with modules and syllabus
app.get('/api/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      let course = await Course.findOne({ courseId: id }).lean();
      if (!course && mongoose.Types.ObjectId.isValid(id)) {
        course = await Course.findById(id).lean();
      }
      if (course) {
        return res.json(course);
      }
    }

    // Fallback
    const localCourses = getLocalCourses();
    const found = localCourses.find(c => c.courseId === id || c._id === id);
    if (found) {
      return res.json(found);
    }
    return res.status(404).json({ error: `Course not found for ID: ${id}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 0.3. Create or update course content
app.post('/api/courses', async (req, res) => {
  try {
    const courseData = req.body;
    if (!courseData.courseId || !courseData.title) {
      return res.status(400).json({ error: 'courseId and title are required.' });
    }

    const isDbConnected = await checkDbConnection();
    let savedCourse = null;
    if (isDbConnected) {
      savedCourse = await Course.findOneAndUpdate(
        { courseId: courseData.courseId },
        { $set: { ...courseData, updatedAt: new Date() } },
        { new: true, upsert: true }
      );
    }

    // Update local JSON mirror
    const localCourses = getLocalCourses();
    const idx = localCourses.findIndex(c => c.courseId === courseData.courseId);
    if (idx >= 0) {
      localCourses[idx] = { ...localCourses[idx], ...courseData, updatedAt: new Date().toISOString() };
    } else {
      localCourses.push({ ...courseData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    fs.writeFileSync(coursesJsonPath, JSON.stringify(localCourses, null, 2), 'utf8');

    return res.json({ success: true, course: savedCourse || courseData });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 0.4. Database Seed Endpoint
app.post('/api/courses/seed', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    if (!isDbConnected) {
      return res.status(503).json({ error: 'Database is not connected.' });
    }

    const localCourses = getLocalCourses();
    let inserted = 0;
    let updated = 0;

    for (const c of localCourses) {
      const existing = await Course.findOne({ courseId: c.courseId });
      if (existing) {
        await Course.updateOne({ courseId: c.courseId }, { $set: { ...c, updatedAt: new Date() } });
        updated++;
      } else {
        await Course.create({ ...c, createdAt: new Date(), updatedAt: new Date() });
        inserted++;
      }
    }

    const total = await Course.countDocuments();
    return res.json({ success: true, message: 'Courses seeded into MongoDB Atlas!', inserted, updated, total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// --- COURSE PAGES API (FULL LESSON CONTENT DIRECTLY FROM MONGODB ATLAS) ---
// 0.5. Get all course pages (with filters: subject, courseKey, moduleId, summary)
app.get('/api/course-pages', async (req, res) => {
  try {
    const { subject, courseKey, moduleId, summary } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (courseKey) filter.courseKey = courseKey;
    if (moduleId) filter.moduleId = moduleId;

    const projection = summary === 'true'
      ? { pageId: 1, subject: 1, courseKey: 1, moduleId: 1, componentName: 1, fileName: 1, title: 1, fileSizeBytes: 1, updatedAt: 1 }
      : {};

    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const pages = await CoursePage.find(filter, projection).sort({ subject: 1, componentName: 1 }).lean();
      if (pages && pages.length > 0) {
        return res.json(pages);
      }
    }

    // Fallback to local catalog
    let localCatalog = getLocalCoursePagesCatalog();
    if (subject) localCatalog = localCatalog.filter(p => p.subject === subject);
    if (courseKey) localCatalog = localCatalog.filter(p => p.courseKey === courseKey);
    if (moduleId) localCatalog = localCatalog.filter(p => p.moduleId === moduleId);
    return res.json(localCatalog);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 0.6. Get specific course page by pageId, moduleId, or componentName
app.get('/api/course-pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      let page = await CoursePage.findOne({
        $or: [
          { pageId: id },
          { moduleId: id },
          { componentName: id }
        ]
      }).lean();
      if (!page && mongoose.Types.ObjectId.isValid(id)) {
        page = await CoursePage.findById(id).lean();
      }
      if (page) {
        return res.json(page);
      }
    }

    // Fallback: check catalog or read file directly
    const localCatalog = getLocalCoursePagesCatalog();
    const meta = localCatalog.find(p => p.pageId === id || p.moduleId === id || p.componentName === id);
    if (meta) {
      const filePath = path.join(currentDir, '..', 'src', 'pages', meta.subject, meta.fileName);
      let rawContent = '';
      if (fs.existsSync(filePath)) {
        rawContent = fs.readFileSync(filePath, 'utf8');
      }
      return res.json({ ...meta, rawContent });
    }

    return res.status(404).json({ error: `Course page not found for identifier: ${id}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 0.7. Seed / Sync all 288 course pages from filesystem directly into MongoDB Atlas
app.post('/api/course-pages/seed', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    if (!isDbConnected) {
      return res.status(503).json({ error: 'Database is not connected.' });
    }
    const { seedCoursePages } = await import('./seedCoursePages.js');
    const result = await seedCoursePages();
    return res.json({ success: true, message: 'All course pages seeded directly into MongoDB Atlas!', ...result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 0.8. Update or create course page content directly in MongoDB
app.put('/api/course-pages/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const updateData = req.body;
    const isDbConnected = await checkDbConnection();
    if (!isDbConnected) {
      return res.status(503).json({ error: 'Database is not connected.' });
    }

    const updated = await CoursePage.findOneAndUpdate(
      { pageId },
      { $set: { ...updateData, updatedAt: new Date() } },
      { new: true, upsert: true }
    );
    return res.json({ success: true, page: updated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// A. Get all students
app.get('/api/students', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const students = await Student.find({});
      students.forEach(s => {
        let dirty = false;
        (s.tasks || []).forEach(t => {
          if (!t._id) {
            t._id = new mongoose.Types.ObjectId().toString();
            dirty = true;
          }
        });
        if (dirty) {
          s.markModified('tasks');
          s.save().catch(err => console.warn('Auto-save task _id note:', err.message));
        }
      });
      return res.json(students);
    } else {
      const students = getLocalStudents();
      return res.json(students);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// B. Register/Create a new student
app.post('/api/students', async (req, res) => {
  const {
    name,
    enrolledCourse,
    course,
    courseName,
    admissionConfirmed,
    admissionStatus,
    isCourseActivated,
    idCardIssued,
    feeInitiated,
    inductionCompleted,
    photoUrl = '',
    contactNumber = '',
    phone = '',
    email = '',
    gender = '',
    dob = '',
    doj = '',
    fatherName = '',
    address = '',
    educationQualification = '',
    idProofType = '',
    idProofNumber = '',
    joiningDate = '',
    admissionFormData = {}
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Student Name is required!' });
  }

  // All 3 validations: idcard, fee initiated, induction session
  const hasAllValidations = Boolean(idCardIssued && feeInitiated && inductionCompleted);
  const isVerified = admissionConfirmed === true || hasAllValidations || (admissionConfirmed === undefined && admissionStatus === 'Approved');
  const resolvedAdmissionStatus = isVerified ? 'Approved' : 'Pending';
  const resolvedCourseActivated = isVerified;
  const courseAssigned = (enrolledCourse || course || '').trim() || 'html_css';
  const resolvedContact = (contactNumber || phone || '').trim();
  const resolvedJoiningDate = (joiningDate || doj || '').trim();
  const resolvedDob = (dob || '').trim();

  // Generate a random numeric access code
  const accessCode = 'STU-' + Math.floor(1000 + Math.random() * 9000);

  const studentPayload = {
    name: name.trim(),
    enrolledCourse: courseAssigned,
    course: courseAssigned,
    accessCode,
    deviceId: null,
    photoUrl: photoUrl || '',
    contactNumber: resolvedContact,
    email: (email || '').trim(),
    gender: gender || '',
    dob: resolvedDob,
    doj: resolvedJoiningDate,
    fatherName: (fatherName || '').trim(),
    address: (address || '').trim(),
    educationQualification: educationQualification || '',
    idProofType: idProofType || '',
    idProofNumber: (idProofNumber || '').trim(),
    joiningDate: resolvedJoiningDate,
    admissionFormData: admissionFormData && Object.keys(admissionFormData).length > 0 ? {
      ...admissionFormData,
      fullName: admissionFormData.fullName || name.trim(),
      course: courseAssigned,
      courseName: courseName || admissionFormData.courseName || '',
      enrolledCourse: courseAssigned,
      dob: resolvedDob || admissionFormData.dob || '',
      doj: resolvedJoiningDate || admissionFormData.doj || admissionFormData.joiningDate || '',
      joiningDate: resolvedJoiningDate || admissionFormData.joiningDate || admissionFormData.doj || ''
    } : {
      fullName: name.trim(),
      course: courseAssigned,
      courseName: courseName || '',
      enrolledCourse: courseAssigned,
      photoUrl: photoUrl || '',
      contactNumber: resolvedContact,
      email: (email || '').trim(),
      gender: gender || '',
      dob: resolvedDob,
      doj: resolvedJoiningDate,
      joiningDate: resolvedJoiningDate,
      fatherName: (fatherName || '').trim(),
      address: (address || '').trim(),
      educationQualification: educationQualification || '',
      idProofType: idProofType || '',
      idProofNumber: (idProofNumber || '').trim(),
      submittedAt: new Date()
    },
    admissionStatus: resolvedAdmissionStatus,
    isCourseActivated: resolvedCourseActivated,
    idCardIssued: Boolean(idCardIssued),
    feeInitiated: Boolean(feeInitiated),
    inductionCompleted: Boolean(inductionCompleted)
  };

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const newStudent = new Student(studentPayload);
      await newStudent.save();
      return res.json(newStudent);
    } else {
      const students = getLocalStudents();
      const newStudent = {
        id: Date.now().toString(),
        ...studentPayload,
        completedLessons: [],
        tasks: []
      };
      students.push(newStudent);
      saveLocalStudents(students);
      return res.json(newStudent);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// B-2. Authenticate/Sign In Staff and Admin Roles
app.post('/api/auth/login', async (req, res) => {
  const { role, username, password } = req.body;
  if (!role || !username || !password) {
    return res.status(400).json({ error: 'Role, username and password are required!' });
  }

  if (role === 'admin') {
    if (username.trim() === 'admin' && password.trim() === 'admin_portal_2026') {
      return res.json({
        success: true,
        role: 'admin',
        name: 'Lead Administrator',
        username: 'admin',
        token: 'mock-jwt-admin-token'
      });
    } else {
      return res.status(401).json({ error: 'Invalid admin username or password!' });
    }
  } else if (role === 'staff') {
    // 1. Check superuser hardcoded login
    if (username.trim() === 'staff_tutor' && password.trim() === 'staff_portal_2026') {
      return res.json({
        success: true,
        role: 'staff',
        name: 'Staff Instructor',
        username: 'staff_tutor',
        token: 'mock-jwt-staff-token'
      });
    }

    // 2. Check dynamic database/local staff
    try {
      const isDbConnected = await checkDbConnection();
      if (isDbConnected) {
        const staffMem = await Staff.findOne({ username: username.trim() });
        if (staffMem && staffMem.password === password.trim()) {
          return res.json({
            success: true,
            role: 'staff',
            name: staffMem.name,
            username: staffMem.username,
            token: 'mock-jwt-staff-token-' + staffMem._id
          });
        }
      } else {
        const staffList = getLocalStaff();
        const staffMem = staffList.find(s => s.username === username.trim());
        if (staffMem && staffMem.password === password.trim()) {
          return res.json({
            success: true,
            role: 'staff',
            name: staffMem.name,
            username: staffMem.username,
            token: 'mock-jwt-staff-token-' + staffMem.id
          });
        }
      }
    } catch (err) {
      console.warn('Error validating dynamic staff login:', err);
    }

    return res.status(401).json({ error: 'Invalid staff username or password!' });
  }

  return res.status(400).json({ error: 'Invalid role specified!' });
});

// C. Authenticate/Sign In Student with Device Lock Check
app.post('/api/students/login', async (req, res) => {
  const { accessCode, deviceId } = req.body;
  if (!accessCode) {
    return res.status(400).json({ error: 'Access Code is required!' });
  }
  if (!deviceId) {
    return res.status(400).json({ error: 'Device ID is required to secure your account!' });
  }

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const student = await Student.findOne({ accessCode: accessCode.trim() });
      if (!student) {
        return res.status(404).json({ error: 'Invalid Access Code. Please try again!' });
      }
      
      // Device verification checks
      if (student.deviceId && student.deviceId !== deviceId) {
        return res.status(403).json({ error: 'This access key is locked to another device! Please request an administrator to reset your device access.' });
      }
      
      // Lock student account to this device if it's the first login
      if (!student.deviceId) {
        student.deviceId = deviceId;
        await student.save();
      }
      
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.accessCode === accessCode.trim());
      if (idx === -1) {
        return res.status(404).json({ error: 'Invalid Access Code. Please try again!' });
      }
      
      const student = students[idx];
      if (student.deviceId && student.deviceId !== deviceId) {
        return res.status(403).json({ error: 'This access key is locked to another device! Please request an administrator to reset your device access.' });
      }
      
      if (!student.deviceId) {
        students[idx].deviceId = deviceId;
        saveLocalStudents(students);
      }
      
      return res.json(students[idx]);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-2. Reset Student Device Lock
app.post('/api/students/:id/reset-device', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const student = await Student.findByIdAndUpdate(id, { deviceId: null }, { new: true });
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s.accessCode === id);
      if (idx !== -1) {
        students[idx].deviceId = null;
        saveLocalStudents(students);
        return res.json(students[idx]);
      }
      return res.status(404).json({ error: 'Student not found!' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-3. Verify Student Device Lock
app.post('/api/students/verify-device', async (req, res) => {
  const { accessCode, deviceId } = req.body;
  if (!accessCode || !deviceId) {
    return res.status(400).json({ error: 'Access Code and Device ID are required!' });
  }
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const student = await Student.findOne({ accessCode: accessCode.trim() });
      if (!student) {
        return res.status(404).json({ error: 'Student not found!' });
      }
      if (student.deviceId && student.deviceId !== deviceId) {
        return res.json({ valid: false });
      }
      return res.json({ valid: true });
    } else {
      const students = getLocalStudents();
      const student = students.find(s => s.accessCode === accessCode.trim());
      if (!student) {
        return res.status(404).json({ error: 'Student not found!' });
      }
      if (student.deviceId && student.deviceId !== deviceId) {
        return res.json({ valid: false });
      }
      return res.json({ valid: true });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-4. Toggle Student Lesson Completion (Progress Tracking)
app.post('/api/students/:id/progress', async (req, res) => {
  const { id } = req.params;
  const { lessonKey, completed } = req.body;
  if (!lessonKey) {
    return res.status(400).json({ error: 'lessonKey is required!' });
  }
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      // Find by id (checking if valid ObjectId) or accessCode
      const query = mongoose.Types.ObjectId.isValid(id) 
        ? { _id: id } 
        : { accessCode: id.trim() };
        
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      
      const index = student.completedLessons.indexOf(lessonKey);
      if (completed) {
        if (index === -1) student.completedLessons.push(lessonKey);
      } else {
        if (index !== -1) student.completedLessons.splice(index, 1);
      }
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      const student = students[idx];
      if (!student.completedLessons) student.completedLessons = [];
      
      const index = student.completedLessons.indexOf(lessonKey);
      if (completed) {
        if (index === -1) student.completedLessons.push(lessonKey);
      } else {
        if (index !== -1) student.completedLessons.splice(index, 1);
      }
      saveLocalStudents(students);
      return res.json(student);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-5. Submit Homework/Project Task Assignment
app.post('/api/students/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const { moduleId, tabId, taskUrl, taskText } = req.body;
  if (!moduleId || !tabId) {
    return res.status(400).json({ error: 'moduleId and tabId are required!' });
  }

  const urlTrimmed = taskUrl ? taskUrl.trim() : '';
  const textTrimmed = taskText ? taskText.trim() : '';

  if (!urlTrimmed && !textTrimmed) {
    return res.status(400).json({ error: 'Please provide either a submission URL or notes/code details for your assignment.' });
  }

  if (urlTrimmed) {
    const urlPattern = /^https?:\/\/\S+$/i;
    if (!urlPattern.test(urlTrimmed)) {
      return res.status(400).json({ error: 'Please enter a valid submission URL starting with http:// or https://' });
    }
  }

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const idTrimmed = id ? String(id).trim() : '';
      let student = null;
      if (mongoose.Types.ObjectId.isValid(idTrimmed)) {
        student = await Student.findById(idTrimmed);
      }
      if (!student) {
        student = await Student.findOne({
          $or: [
            { accessCode: idTrimmed },
            { studentId: idTrimmed }
          ]
        });
      }
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      
      // Check if already submitted
      let existingTask = student.tasks.find(t => t.moduleId === moduleId && t.tabId === tabId);
      if (existingTask) {
        if (!existingTask._id) {
          existingTask._id = new mongoose.Types.ObjectId().toString();
        }
        existingTask.taskUrl = urlTrimmed;
        existingTask.taskText = textTrimmed;
        existingTask.submittedAt = new Date();
        existingTask.status = 'Pending';
        existingTask.feedback = '';
        existingTask.grade = '';
      } else {
        student.tasks.push({
          _id: new mongoose.Types.ObjectId().toString(),
          moduleId,
          tabId,
          taskUrl: urlTrimmed,
          taskText: textTrimmed,
          submittedAt: new Date(),
          status: 'Pending',
          feedback: '',
          grade: ''
        });
      }
      student.markModified('tasks');
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idTrimmed = id ? String(id).trim() : '';
      const idx = students.findIndex(s => s.id === idTrimmed || s._id === idTrimmed || s.accessCode === idTrimmed || s.studentId === idTrimmed);
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      const student = students[idx];
      if (!student.tasks) student.tasks = [];
      
      let existingTask = student.tasks.find(t => t.moduleId === moduleId && t.tabId === tabId);
      if (existingTask) {
        if (!existingTask._id) {
          existingTask._id = 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        }
        existingTask.taskUrl = urlTrimmed;
        existingTask.taskText = textTrimmed;
        existingTask.submittedAt = new Date();
        existingTask.status = 'Pending';
        existingTask.feedback = '';
        existingTask.grade = '';
      } else {
        const newTask = {
          _id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          moduleId,
          tabId,
          taskUrl: urlTrimmed,
          taskText: textTrimmed,
          submittedAt: new Date(),
          status: 'Pending',
          feedback: '',
          grade: ''
        };
        student.tasks.push(newTask);
      }
      saveLocalStudents(students);
      return res.json(student);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-5B. Record AI Mock Interview Marks & Evaluation Report
app.post('/api/students/:id/mock-interview', async (req, res) => {
  const { id } = req.params;
  const {
    day,
    topic,
    totalScore,
    percentage,
    grade,
    clarityScore,
    contentScore,
    confidenceScore,
    structureScore,
    overallFeedback,
    strengths,
    improvements,
    questions,
    attemptedAt
  } = req.body;

  if (!day) {
    return res.status(400).json({ error: 'day is required for mock interview record!' });
  }

  const interviewRecord = {
    id: `mock_${Date.now()}_day${day}`,
    day: Number(day),
    topic: topic || `Day ${day} HR Mock Interview`,
    totalScore: Number(totalScore) || 0,
    percentage: Number(percentage) || Math.round((Number(totalScore) || 0)),
    grade: grade || 'B',
    clarityScore: Number(clarityScore) || 0,
    contentScore: Number(contentScore) || 0,
    confidenceScore: Number(confidenceScore) || 0,
    structureScore: Number(structureScore) || 0,
    overallFeedback: overallFeedback || '',
    strengths: Array.isArray(strengths) ? strengths : [],
    improvements: Array.isArray(improvements) ? improvements : [],
    questions: Array.isArray(questions) ? questions : [],
    attemptedAt: attemptedAt || new Date().toISOString()
  };

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { accessCode: String(id).trim() };

      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });

      if (!student.mockInterviews) student.mockInterviews = [];
      student.mockInterviews.push(interviewRecord);
      await student.save();
      return res.json({ success: true, student, interviewRecord });
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s.accessCode === String(id).trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

      const student = students[idx];
      if (!student.mockInterviews) student.mockInterviews = [];
      student.mockInterviews.push(interviewRecord);
      saveLocalStudents(students);
      return res.json({ success: true, student, interviewRecord });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-5C. Get Student AI Mock Interviews
app.get('/api/students/:id/mock-interviews', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { accessCode: String(id).trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      return res.json(student.mockInterviews || []);
    } else {
      const students = getLocalStudents();
      const student = students.find(s => s.id === id || s.accessCode === String(id).trim());
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      return res.json(student.mockInterviews || []);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-6. Grade Student Task Assignment (Admin/Staff only)
app.post('/api/students/tasks/:taskId/grade', async (req, res) => {
  const { taskId } = req.params;
  const { studentId, accessCode, status, feedback, grade, moduleId, tabId } = req.body;
  if ((!studentId && !accessCode) || !status) {
    return res.status(400).json({ error: 'studentId and status are required!' });
  }

  const statusTrimmed = status ? status.trim() : '';
  const feedbackTrimmed = feedback ? feedback.trim() : '';
  const gradeTrimmed = grade ? grade.trim() : '';

  const lowerStatus = statusTrimmed.toLowerCase();
  if (!['approved', 'rejected', 'pending'].includes(lowerStatus)) {
    return res.status(400).json({ error: 'Invalid review status. Status must be Approved, Rejected, or Pending.' });
  }

  const normalizedStatus = lowerStatus === 'approved' 
    ? 'Approved' 
    : lowerStatus === 'rejected' 
      ? 'Rejected' 
      : 'Pending';

  if (normalizedStatus === 'Rejected' && feedbackTrimmed.length < 5) {
    return res.status(400).json({ error: 'Evaluation feedback is required when requesting a revision.' });
  }

  const finalGrade = gradeTrimmed || (normalizedStatus === 'Approved' ? 'A+' : normalizedStatus === 'Rejected' ? 'Needs Revision' : '');

  try {
    const isDbConnected = await checkDbConnection();
    const sIdStr = studentId ? String(studentId).trim() : '';
    const accStr = accessCode ? String(accessCode).trim() : '';

    if (isDbConnected) {
      let student = null;
      if (sIdStr && mongoose.Types.ObjectId.isValid(sIdStr)) {
        student = await Student.findById(sIdStr);
      }
      if (!student && sIdStr) {
        student = await Student.findOne({
          $or: [
            { accessCode: sIdStr },
            { studentId: sIdStr }
          ]
        });
      }
      if (!student && accStr) {
        student = await Student.findOne({
          $or: [
            { accessCode: accStr },
            { studentId: accStr }
          ]
        });
      }
      if (!student && taskId && taskId !== 'undefined' && taskId !== 'null') {
        student = await Student.findOne({
          $or: [
            { 'tasks._id': taskId },
            { 'tasks.id': taskId }
          ]
        });
      }
      if (!student) return res.status(404).json({ error: 'Student not found!' });

      if (!Array.isArray(student.tasks)) student.tasks = [];

      let task = null;
      if (taskId && taskId !== 'undefined' && taskId !== 'null') {
        if (typeof student.tasks.id === 'function') {
          try {
            task = student.tasks.id(taskId);
          } catch (e) {}
        }
        if (!task) {
          task = student.tasks.find(t => String(t._id || t.id) === String(taskId));
        }
      }
      if (!task && moduleId) {
        task = student.tasks.find(t => (t.moduleId === moduleId || t.moduleId === moduleId.replace(/:/g, '_')) && (!tabId || t.tabId === tabId));
      }
      if (!task && moduleId) {
        task = student.tasks.find(t => t.moduleId === moduleId || t.moduleId.endsWith(moduleId) || moduleId.endsWith(t.moduleId));
      }
      if (!task && taskId && taskId.includes('_')) {
        const parts = taskId.split('_');
        const candidateMod = parts.slice(2).join('_');
        if (candidateMod) {
          task = student.tasks.find(t => t.moduleId === candidateMod);
        }
      }

      const effectiveMod = (task && task.moduleId) || moduleId || taskId || 'module_review';
      const effectiveTab = (task && task.tabId) || tabId || 'assignment';

      if (!task) {
        task = {
          _id: new mongoose.Types.ObjectId().toString(),
          moduleId: effectiveMod,
          tabId: effectiveTab,
          taskUrl: '',
          taskText: 'Submission evaluated by instructor',
          submittedAt: new Date(),
          status: normalizedStatus,
          feedback: feedbackTrimmed,
          grade: finalGrade
        };
        student.tasks.push(task);
      } else {
        task.status = normalizedStatus;
        task.feedback = feedbackTrimmed;
        task.grade = finalGrade;
        if (!task._id) {
          task._id = new mongoose.Types.ObjectId().toString();
        }
      }

      // Consolidate & synchronize any duplicate task entries for the same moduleId on this student
      if (effectiveMod && Array.isArray(student.tasks)) {
        student.tasks.forEach(t => {
          if (t && t !== task && (t.moduleId === effectiveMod || (effectiveMod && t.moduleId && (t.moduleId.endsWith(effectiveMod) || effectiveMod.endsWith(t.moduleId))))) {
            t.status = normalizedStatus;
            t.feedback = feedbackTrimmed;
            t.grade = finalGrade;
          }
        });
      }

      // When approved, ensure student.completedLessons includes moduleId so next day is unlocked!
      if (normalizedStatus === 'Approved' && effectiveMod) {
        if (!Array.isArray(student.completedLessons)) {
          student.completedLessons = [];
        }
        if (!student.completedLessons.includes(effectiveMod)) {
          student.completedLessons.push(effectiveMod);
        }
      } else if (normalizedStatus === 'Rejected' && effectiveMod) {
        if (Array.isArray(student.completedLessons)) {
          student.completedLessons = student.completedLessons.filter(m => m !== effectiveMod);
        }
      }

      // If evaluating logical thinking or reasoning
      if (effectiveMod === 'logical_evaluator_score' || effectiveMod.includes('reasoning')) {
        if (!student.logicalThinkingScore) {
          student.logicalThinkingScore = { score: 85, total: 100, percentage: 85, grade: finalGrade || 'A', feedback: feedbackTrimmed, updatedAt: new Date().toISOString() };
        } else {
          student.logicalThinkingScore.grade = finalGrade || student.logicalThinkingScore.grade || 'A';
          student.logicalThinkingScore.feedback = feedbackTrimmed || student.logicalThinkingScore.feedback;
          student.logicalThinkingScore.updatedAt = new Date().toISOString();
        }
      }

      student.markModified('tasks');
      student.markModified('completedLessons');
      if (student.logicalThinkingScore) student.markModified('logicalThinkingScore');
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      let student = students.find(s => 
        (sIdStr && (s.id === sIdStr || s._id === sIdStr || s.accessCode === sIdStr || s.studentId === sIdStr)) ||
        (accStr && (s.accessCode === accStr || s.studentId === accStr || s.id === accStr || s._id === accStr)) ||
        (s.tasks && s.tasks.some(t => String(t._id || t.id) === String(taskId)))
      );
      if (!student) return res.status(404).json({ error: 'Student not found!' });

      if (!Array.isArray(student.tasks)) student.tasks = [];
      let task = student.tasks.find(t => String(t._id || t.id) === String(taskId));
      if (!task && moduleId) {
        task = student.tasks.find(t => (t.moduleId === moduleId || t.moduleId === moduleId.replace(/:/g, '_')) && (!tabId || t.tabId === tabId));
      }
      if (!task && moduleId) {
        task = student.tasks.find(t => t.moduleId === moduleId || t.moduleId.endsWith(moduleId) || moduleId.endsWith(t.moduleId));
      }
      if (!task && taskId && taskId.includes('_')) {
        const parts = taskId.split('_');
        const candidateMod = parts.slice(2).join('_');
        if (candidateMod) {
          task = student.tasks.find(t => t.moduleId === candidateMod);
        }
      }

      const effectiveMod = (task && task.moduleId) || moduleId || taskId || 'module_review';
      const effectiveTab = (task && task.tabId) || tabId || 'assignment';

      if (!task) {
        task = {
          _id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          moduleId: effectiveMod,
          tabId: effectiveTab,
          taskUrl: '',
          taskText: 'Submission evaluated by instructor',
          submittedAt: new Date(),
          status: normalizedStatus,
          feedback: feedbackTrimmed,
          grade: finalGrade
        };
        student.tasks.push(task);
      } else {
        task.status = normalizedStatus;
        task.feedback = feedbackTrimmed;
        task.grade = finalGrade;
        if (!task._id) {
          task._id = 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        }
      }

      // Consolidate & synchronize any duplicate task entries for the same moduleId on this student
      if (effectiveMod && Array.isArray(student.tasks)) {
        student.tasks.forEach(t => {
          if (t && t !== task && (t.moduleId === effectiveMod || (effectiveMod && t.moduleId && (t.moduleId.endsWith(effectiveMod) || effectiveMod.endsWith(t.moduleId))))) {
            t.status = normalizedStatus;
            t.feedback = feedbackTrimmed;
            t.grade = finalGrade;
          }
        });
      }

      if (normalizedStatus === 'Approved' && effectiveMod) {
        if (!Array.isArray(student.completedLessons)) {
          student.completedLessons = [];
        }
        if (!student.completedLessons.includes(effectiveMod)) {
          student.completedLessons.push(effectiveMod);
        }
      } else if (normalizedStatus === 'Rejected' && effectiveMod) {
        if (Array.isArray(student.completedLessons)) {
          student.completedLessons = student.completedLessons.filter(m => m !== effectiveMod);
        }
      }

      if (effectiveMod === 'logical_evaluator_score' || effectiveMod.includes('reasoning')) {
        if (!student.logicalThinkingScore) {
          student.logicalThinkingScore = { score: 85, total: 100, percentage: 85, grade: finalGrade || 'A', feedback: feedbackTrimmed, updatedAt: new Date().toISOString() };
        } else {
          student.logicalThinkingScore.grade = finalGrade || student.logicalThinkingScore.grade || 'A';
          student.logicalThinkingScore.feedback = feedbackTrimmed || student.logicalThinkingScore.feedback;
          student.logicalThinkingScore.updatedAt = new Date().toISOString();
        }
      }

      saveLocalStudents(students);
      return res.json(student);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D. Delete student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { accessCode: id.trim() };
      await Student.findOneAndDelete(query);
      return res.json({ success: true });
    } else {
      let students = getLocalStudents();
      students = students.filter(s => s.id !== id && s._id !== id && s.accessCode !== id && s.accessCode !== id.trim());
      saveLocalStudents(students);
      return res.json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-2. Update student details (Name, Access Code, Enrolled Courses, Admission Status, Validation Flags)
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    accessCode,
    enrolledCourse,
    admissionConfirmed,
    admissionStatus,
    isCourseActivated,
    idCardIssued,
    feeInitiated,
    inductionCompleted,
    photoUrl,
    contactNumber,
    phone,
    email,
    gender,
    dob,
    fatherName,
    address,
    educationQualification,
    idProofType,
    idProofNumber,
    joiningDate,
    admissionFormData,
    logicalThinkingScore,
    logicalThinkingFeedback,
    logicalThinkingGrade
  } = req.body;

  const updateFields = {};
  if (name && name.trim()) updateFields.name = name.trim();
  if (accessCode && accessCode.trim()) updateFields.accessCode = accessCode.trim();
  if (enrolledCourse && enrolledCourse.trim()) updateFields.enrolledCourse = enrolledCourse.trim();
  if (photoUrl !== undefined) updateFields.photoUrl = photoUrl;
  if (contactNumber !== undefined) updateFields.contactNumber = contactNumber;
  if (phone !== undefined && contactNumber === undefined) updateFields.contactNumber = phone;
  if (email !== undefined) updateFields.email = email;
  if (gender !== undefined) updateFields.gender = gender;
  if (dob !== undefined) updateFields.dob = dob;
  if (fatherName !== undefined) updateFields.fatherName = fatherName;
  if (address !== undefined) updateFields.address = address;
  if (educationQualification !== undefined) updateFields.educationQualification = educationQualification;
  if (idProofType !== undefined) updateFields.idProofType = idProofType;
  if (idProofNumber !== undefined) updateFields.idProofNumber = idProofNumber;
  if (joiningDate !== undefined) updateFields.joiningDate = joiningDate;
  if (admissionFormData !== undefined) updateFields.admissionFormData = admissionFormData;
  if (idCardIssued !== undefined) updateFields.idCardIssued = Boolean(idCardIssued);
  if (feeInitiated !== undefined) updateFields.feeInitiated = Boolean(feeInitiated);
  if (inductionCompleted !== undefined) updateFields.inductionCompleted = Boolean(inductionCompleted);

  if (logicalThinkingScore !== undefined) {
    if (logicalThinkingScore === null || logicalThinkingScore === '' || (Number(logicalThinkingScore) === 0 && !logicalThinkingFeedback)) {
      updateFields.logicalThinkingScore = null;
    } else {
      let scoreVal = 0;
      let totalVal = 100;
      let feedbackVal = logicalThinkingFeedback || '';
      let gradeVal = logicalThinkingGrade || '';

      if (typeof logicalThinkingScore === 'number' || typeof logicalThinkingScore === 'string') {
        const parsed = parseFloat(logicalThinkingScore);
        scoreVal = isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed));
      } else if (typeof logicalThinkingScore === 'object' && logicalThinkingScore !== null) {
        scoreVal = Number(logicalThinkingScore.score) || 0;
        totalVal = Number(logicalThinkingScore.total) || 100;
        feedbackVal = logicalThinkingScore.feedback || feedbackVal;
        gradeVal = logicalThinkingScore.grade || gradeVal;
      }

      if (scoreVal <= 0 && !feedbackVal) {
        updateFields.logicalThinkingScore = null;
      } else {
        const pct = totalVal > 0 ? Math.round((scoreVal / totalVal) * 100) : 0;
        if (!gradeVal) {
          if (pct >= 90) gradeVal = 'A+';
          else if (pct >= 80) gradeVal = 'A';
          else if (pct >= 70) gradeVal = 'B';
          else if (pct >= 60) gradeVal = 'C';
          else gradeVal = 'Needs Practice';
        }

        updateFields.logicalThinkingScore = {
          score: scoreVal,
          total: totalVal,
          percentage: pct,
          grade: gradeVal,
          feedback: feedbackVal,
          updatedAt: new Date()
        };
      }
    }
  }

  if (admissionStatus !== undefined) {
    updateFields.admissionStatus = admissionStatus;
    const isApp = admissionStatus === 'Approved';
    updateFields.isCourseActivated = isApp;
    if (idCardIssued === undefined) updateFields.idCardIssued = isApp;
    if (feeInitiated === undefined) updateFields.feeInitiated = isApp;
    if (inductionCompleted === undefined) updateFields.inductionCompleted = isApp;
  } else if (admissionConfirmed !== undefined) {
    const isApp = Boolean(admissionConfirmed);
    updateFields.admissionStatus = isApp ? 'Approved' : 'Pending';
    updateFields.isCourseActivated = isApp;
    if (idCardIssued === undefined) updateFields.idCardIssued = isApp;
    if (feeInitiated === undefined) updateFields.feeInitiated = isApp;
    if (inductionCompleted === undefined) updateFields.inductionCompleted = isApp;
  } else if (idCardIssued !== undefined && feeInitiated !== undefined && inductionCompleted !== undefined) {
    const isApp = Boolean(idCardIssued && feeInitiated && inductionCompleted);
    updateFields.admissionStatus = isApp ? 'Approved' : 'Pending';
    updateFields.isCourseActivated = isApp;
  } else {
    if (isCourseActivated !== undefined) updateFields.isCourseActivated = Boolean(isCourseActivated);
  }

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'At least one field to update is required!' });
  }

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) 
        ? { _id: id } 
        : { accessCode: id.trim() };
        
      const student = await Student.findOneAndUpdate(query, updateFields, { new: true });
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      students[idx] = { ...students[idx], ...updateFields };
      saveLocalStudents(students);
      return res.json(students[idx]);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-2b. Update student logical thinking score directly
app.post('/api/students/:id/logical-thinking-score', async (req, res) => {
  const { id } = req.params;
  const { score, total, grade, feedback } = req.body;

  const scoreVal = Math.max(0, Math.min(100, Number(score) || 0));
  const totalVal = Number(total) || 100;
  const percentage = totalVal > 0 ? Math.round((scoreVal / totalVal) * 100) : 0;
  let gradeVal = grade;
  if (!gradeVal) {
    if (percentage >= 90) gradeVal = 'A+';
    else if (percentage >= 80) gradeVal = 'A';
    else if (percentage >= 70) gradeVal = 'B';
    else if (percentage >= 60) gradeVal = 'C';
    else gradeVal = 'Needs Practice';
  }

  const scoreObj = (scoreVal > 0 || feedback) ? {
    score: scoreVal,
    total: totalVal,
    percentage,
    grade: gradeVal,
    feedback: feedback || '',
    updatedAt: new Date()
  } : null;

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) 
        ? { _id: id } 
        : { accessCode: id.trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });

      student.logicalThinkingScore = scoreObj;
      if (student.tasks && student.tasks.length > 0) {
        student.tasks = student.tasks.filter(t => t.moduleId !== 'spoko_reasoning_benchmark');
      }
      student.markModified('tasks');
      student.markModified('logicalThinkingScore');
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      const student = students[idx];
      student.logicalThinkingScore = scoreObj;
      if (student.tasks && student.tasks.length > 0) {
        student.tasks = student.tasks.filter(t => t.moduleId !== 'spoko_reasoning_benchmark');
      }
      saveLocalStudents(students);
      return res.json(student);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-2c. Update or save student logical reasoning daily assessment report
app.post('/api/students/:id/logical-reasoning-assessment', async (req, res) => {
  const { id } = req.params;
  const { day = 1, score = 0, total = 20, percentage, correct, incorrect, feedbackBand = '', level = 'Level 1 Beginner' } = req.body;

  const scoreNum = Number(score) || 0;
  const totalNum = Number(total) || 20;
  const correctNum = correct !== undefined ? Number(correct) : scoreNum;
  const incorrectNum = incorrect !== undefined ? Number(incorrect) : Math.max(0, totalNum - correctNum);
  const pct = percentage !== undefined ? Number(percentage) : (totalNum > 0 ? Math.round((scoreNum / totalNum) * 100) : 0);
  let gradeVal = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'Needs Practice';
  const band = feedbackBand || (pct >= 90 ? '🌟 90–100%: Excellent Understanding!' :
                                pct >= 70 ? '🎉 70–89%: Good Progress!' :
                                pct >= 50 ? '📚 50–69%: Keep Practising!' :
                                '⚠️ Below 50%: Review the Learning Material & Try Again.');

  const modId = `spoko_reasoning_day${day}`;
  const modTitle = `Day ${day} Assessment Report: Logical Reasoning & Analytical Thinking (${level})`;
  const taskText = `[Day ${day} Assessment Report]\nLogical Reasoning & Analytical Thinking • ${level}\nTotal Questions: ${totalNum} • Correct Answers: ${correctNum} • Incorrect Answers: ${incorrectNum} • Final Percentage: ${pct}%\nPerformance: ${band}`;

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { accessCode: id.trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });

      if (!student.tasks) student.tasks = [];
      let existingTask = student.tasks.find(t => t.moduleId === modId);
      if (existingTask) {
        existingTask.score = scoreNum;
        existingTask.total = totalNum;
        existingTask.percentage = pct;
        existingTask.correct = correctNum;
        existingTask.incorrect = incorrectNum;
        existingTask.grade = gradeVal;
        existingTask.status = pct >= 70 ? 'Approved' : 'Pending';
        existingTask.feedback = band;
        existingTask.taskText = taskText;
        existingTask.submittedAt = new Date();
      } else {
        student.tasks.push({
          _id: new mongoose.Types.ObjectId().toString(),
          moduleId: modId,
          moduleTitle: modTitle,
          tabId: 'assessment',
          score: scoreNum,
          total: totalNum,
          percentage: pct,
          correct: correctNum,
          incorrect: incorrectNum,
          grade: gradeVal,
          status: pct >= 70 ? 'Approved' : 'Pending',
          feedback: band,
          taskText,
          submittedAt: new Date()
        });
      }

      if (!student.logicalThinkingScore || pct >= (student.logicalThinkingScore.percentage || 0)) {
        student.logicalThinkingScore = {
          score: pct,
          total: 100,
          percentage: pct,
          grade: gradeVal,
          feedback: band,
          updatedAt: new Date()
        };
      }

      student.markModified('tasks');
      student.markModified('logicalThinkingScore');
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

      const student = students[idx];
      if (!student.tasks) student.tasks = [];
      let existingTask = student.tasks.find(t => t.moduleId === modId);
      if (existingTask) {
        existingTask.score = scoreNum;
        existingTask.total = totalNum;
        existingTask.percentage = pct;
        existingTask.correct = correctNum;
        existingTask.incorrect = incorrectNum;
        existingTask.grade = gradeVal;
        existingTask.status = pct >= 70 ? 'Approved' : 'Pending';
        existingTask.feedback = band;
        existingTask.taskText = taskText;
        existingTask.submittedAt = new Date();
      } else {
        student.tasks.push({
          _id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          moduleId: modId,
          moduleTitle: modTitle,
          tabId: 'assessment',
          score: scoreNum,
          total: totalNum,
          percentage: pct,
          correct: correctNum,
          incorrect: incorrectNum,
          grade: gradeVal,
          status: pct >= 70 ? 'Approved' : 'Pending',
          feedback: band,
          taskText,
          submittedAt: new Date()
        });
      }

      if (!student.logicalThinkingScore || pct >= (student.logicalThinkingScore.percentage || 0)) {
        student.logicalThinkingScore = {
          score: pct,
          total: 100,
          percentage: pct,
          grade: gradeVal,
          feedback: band,
          updatedAt: new Date()
        };
      }

      saveLocalStudents(students);
      return res.json(student);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-2d. Update student lesson completion & score
app.post('/api/students/:id/lessons', async (req, res) => {
  const { id } = req.params;
  const { lessonId, course, score, total } = req.body;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { accessCode: id.trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      if (!student.completedLessons) student.completedLessons = [];
      if (!student.completedLessons.includes(lessonId)) {
        student.completedLessons.push(lessonId);
      }
      student.markModified('completedLessons');
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      const student = students[idx];
      if (!student.completedLessons) student.completedLessons = [];
      if (!student.completedLessons.includes(lessonId)) {
        student.completedLessons.push(lessonId);
      }
      saveLocalStudents(students);
      return res.json(student);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-3. Quick Toggle student admission confirmation
app.post('/api/students/:id/toggle-admission', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { accessCode: id.trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });

      const isCurrentApproved = student.admissionStatus === 'Approved' || (student.isCourseActivated !== false && student.admissionStatus !== 'Pending');
      const nextApproved = !isCurrentApproved;
      student.admissionStatus = nextApproved ? 'Approved' : 'Pending';
      student.isCourseActivated = nextApproved;
      student.idCardIssued = nextApproved;
      student.feeInitiated = nextApproved;
      student.inductionCompleted = nextApproved;
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

      const isCurrentApproved = students[idx].admissionStatus === 'Approved' || (students[idx].isCourseActivated !== false && students[idx].admissionStatus !== 'Pending');
      const nextApproved = !isCurrentApproved;
      students[idx].admissionStatus = nextApproved ? 'Approved' : 'Pending';
      students[idx].isCourseActivated = nextApproved;
      students[idx].idCardIssued = nextApproved;
      students[idx].feeInitiated = nextApproved;
      students[idx].inductionCompleted = nextApproved;
      saveLocalStudents(students);
      return res.json(students[idx]);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// E. Dynamic Staff Management API Routes
app.get('/api/staff', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const staffList = await Staff.find({});
      return res.json(staffList);
    } else {
      return res.json(getLocalStaff());
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post('/api/staff', async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Name, username and password are required!' });
  }

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const existing = await Staff.findOne({ username: username.trim() });
      if (existing || username.trim() === 'staff_tutor' || username.trim() === 'admin') {
        return res.status(400).json({ error: 'Username is already taken!' });
      }
      const newStaff = new Staff({ name: name.trim(), username: username.trim(), password: password.trim() });
      await newStaff.save();
      return res.json(newStaff);
    } else {
      const staffList = getLocalStaff();
      const existing = staffList.find(s => s.username === username.trim());
      if (existing || username.trim() === 'staff_tutor' || username.trim() === 'admin') {
        return res.status(400).json({ error: 'Username is already taken!' });
      }
      const newStaff = { id: Date.now().toString(), name: name.trim(), username: username.trim(), password: password.trim() };
      staffList.push(newStaff);
      saveLocalStaff(staffList);
      return res.json(newStaff);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.delete('/api/staff/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      await Staff.findByIdAndDelete(id);
      return res.json({ success: true });
    } else {
      let staffList = getLocalStaff();
      staffList = staffList.filter(s => s.id !== id);
      saveLocalStaff(staffList);
      return res.json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// F. Certificate Routes

// F-1. Upload / update certificate for a student (staff/admin only)
app.post('/api/students/:id/certificate', async (req, res) => {
  const { id } = req.params;
  const { certificateData, filename, mimeType } = req.body;

  if (!certificateData || !certificateData.trim()) {
    return res.status(400).json({ error: 'Certificate data (Base64) is required.' });
  }
  if (!filename || !filename.trim()) {
    return res.status(400).json({ error: 'Certificate filename is required.' });
  }

  const certPayload = {
    data: certificateData.trim(),
    filename: filename.trim(),
    mimeType: mimeType ? mimeType.trim() : 'application/pdf',
    uploadedAt: new Date()
  };

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { accessCode: id.trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      student.certificate = certPayload;
      await student.save();
      return res.json({ success: true, student: { _id: student._id, name: student.name, certificate: student.certificate } });
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      students[idx].certificate = certPayload;
      saveLocalStudents(students);
      return res.json({ success: true, student: students[idx] });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// F-2. Get certificate for a student (student fetches their own)
app.get('/api/students/:id/certificate', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { accessCode: id.trim() };
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      return res.json(student.certificate || null);
    } else {
      const students = getLocalStudents();
      const student = students.find(s => s.id === id || s.accessCode === id.trim());
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      return res.json(student.certificate || null);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// G. INVOICE ROUTES (Staff & Admin Only)

// G-1. Get all invoices (sorted newest first)
app.get('/api/invoices', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const invoices = await Invoice.find({}).sort({ createdAt: -1, _id: -1 });
      return res.json(invoices);
    } else {
      const invoices = getLocalInvoices();
      invoices.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      return res.json(invoices);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// G-2. Create or Update an Invoice (Upsert by invoiceNo)
app.post('/api/invoices', async (req, res) => {
  const invoiceData = req.body;
  if (!invoiceData || !invoiceData.invoiceNo || !invoiceData.invoiceNo.trim()) {
    return res.status(400).json({ error: 'Invoice number is required.' });
  }

  const invoiceNo = invoiceData.invoiceNo.trim();
  const payload = {
    ...invoiceData,
    invoiceNo,
    updatedAt: new Date()
  };

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const updated = await Invoice.findOneAndUpdate(
        { invoiceNo },
        { $set: payload },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, invoice: updated });
    } else {
      const invoices = getLocalInvoices();
      const idx = invoices.findIndex(inv => inv.invoiceNo === invoiceNo);
      if (idx >= 0) {
        invoices[idx] = { ...invoices[idx], ...payload };
      } else {
        invoices.unshift({
          _id: 'inv_' + Math.random().toString(36).substring(2, 11),
          createdAt: new Date(),
          ...payload
        });
      }
      saveLocalInvoices(invoices);
      return res.json({ success: true, invoice: idx >= 0 ? invoices[idx] : invoices[0] });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// G-3. Delete an invoice by ID or invoiceNo
app.delete('/api/invoices/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { invoiceNo: id };
      const deleted = await Invoice.findOneAndDelete(query);
      if (!deleted) return res.status(404).json({ error: 'Invoice not found!' });
      return res.json({ success: true, message: 'Invoice deleted successfully.' });
    } else {
      const invoices = getLocalInvoices();
      const filtered = invoices.filter(inv => inv._id !== id && inv.id !== id && inv.invoiceNo !== id);
      if (filtered.length === invoices.length) {
        return res.status(404).json({ error: 'Invoice not found!' });
      }
      saveLocalInvoices(filtered);
      return res.json({ success: true, message: 'Invoice deleted successfully.' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ============================================================
// H. ADMISSION VERIFICATION & WORKFLOW ROUTES (Staff & Admin)
// ============================================================

// H-1. Get all admission records (sorted newest first)
app.get('/api/admissions', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    let admissions = [];
    if (isDbConnected) {
      await seedAtlasAdmissionsIfEmpty();
      admissions = await Admission.find({}).sort({ createdAt: -1, _id: -1 });
    } else {
      admissions = getLocalAdmissions();
      admissions.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    return res.json(admissions);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-2. Create a new admission application
app.post('/api/admissions', async (req, res) => {
  const {
    studentName,
    contactNumber,
    email,
    courseName,
    courseKey,
    course,
    courseFee,
    dob,
    doj,
    joiningDate,
    admissionFormData = {}
  } = req.body;

  if (!studentName || (!courseName && !courseKey && !course)) {
    return res.status(400).json({ error: 'Student Name and Course are required!' });
  }

  const resolvedDob = (dob || (admissionFormData && admissionFormData.dob) || '').trim();
  const resolvedJoiningDate = (joiningDate || doj || (admissionFormData && (admissionFormData.joiningDate || admissionFormData.doj)) || '').trim();
  const resolvedCourseKey = (courseKey || course || (admissionFormData && (admissionFormData.courseKey || admissionFormData.course)) || 'python_fullstack').trim();
  const resolvedCourseName = (courseName || (admissionFormData && admissionFormData.courseName) || resolvedCourseKey).trim();

  try {
    const isDbConnected = await checkDbConnection();
    const allAdmissions = isDbConnected ? await Admission.find({}) : getLocalAdmissions();
    const year = new Date().getFullYear();
    let maxRef = 0;
    allAdmissions.forEach(a => {
      const match = (a.applicationReference || '').match(/APP-\d+-(\d+)/);
      if (match) maxRef = Math.max(maxRef, parseInt(match[1], 10));
    });
    const appRef = `APP-${year}-${String(maxRef + 1).padStart(3, '0')}`;

    const newAdmission = {
      applicationReference: appRef,
      studentId: '',
      studentAccountAccessCode: 'STU-' + Math.floor(1000 + Math.random() * 9000),
      studentName: studentName.trim(),
      contactNumber: contactNumber ? contactNumber.trim() : '',
      email: email ? email.trim() : '',
      dob: resolvedDob,
      doj: resolvedJoiningDate,
      course: resolvedCourseKey,
      courseName: resolvedCourseName,
      courseKey: resolvedCourseKey,
      admissionFormStatus: req.body.admissionFormStatus || 'Submitted',
      admissionFormData: {
        submittedAt: new Date(),
        fullName: studentName.trim(),
        contactNumber: contactNumber || '',
        email: email || '',
        dob: resolvedDob,
        doj: resolvedJoiningDate,
        joiningDate: resolvedJoiningDate,
        course: resolvedCourseKey,
        courseName: resolvedCourseName,
        ...admissionFormData
      },
      invoiceNumber: req.body.invoiceNumber || '',
      courseFee: Number(courseFee) || 15000,
      amountPaid: Number(req.body.amountPaid) || 0,
      balanceDue: Number(courseFee || 15000) - (Number(req.body.amountPaid) || 0),
      paymentStatus: req.body.paymentStatus || 'Pending',
      paymentReference: req.body.paymentReference || '',
      joiningDate: resolvedJoiningDate,
      idCardStatus: req.body.idCardStatus || 'Not Generated',
      idCardNumber: req.body.idCardNumber || '',
      verificationStatus: calculateVerificationStatus({
        admissionFormStatus: req.body.admissionFormStatus || 'Submitted',
        paymentStatus: req.body.paymentStatus || 'Pending',
        joiningDate: resolvedJoiningDate,
        idCardStatus: req.body.idCardStatus || 'Not Generated'
      }),
      courseActivationStatus: 'Locked',
      auditLogs: [{
        timestamp: new Date(),
        performedBy: 'System / Admissions Office',
        action: 'APPLICATION_CREATED',
        field: 'verificationStatus',
        previousValue: 'None',
        newValue: 'Pending Verification',
        notes: `New admission application ${appRef} registered for ${studentName.trim()}.`
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isDbConnected) {
      const created = new Admission(newAdmission);
      await created.save();
      syncAdmissionToGoogleSheets(created);
      return res.json({ success: true, admission: created });
    } else {
      const list = getLocalAdmissions();
      list.unshift({ _id: 'adm_' + Date.now(), ...newAdmission });
      saveLocalAdmissions(list);
      syncAdmissionToGoogleSheets(newAdmission);
      return res.json({ success: true, admission: list[0] });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-3. Get single admission record by ID or applicationReference
app.get('/api/admissions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      const admissions = getLocalAdmissions();
      admission = admissions.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }
    if (!admission) return res.status(404).json({ error: 'Admission application record not found!' });
    return res.json(admission);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-4. Verify Admission Form (Checks required fields, marks Verified / Incomplete)
app.put('/api/admissions/:id/form-verify', async (req, res) => {
  const { id } = req.params;
  const { verifiedBy = 'admin', markVerified = true, notes = '' } = req.body;

  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    let admissionsList = [];

    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      admissionsList = getLocalAdmissions();
      admission = admissionsList.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }

    if (!admission) return res.status(404).json({ error: 'Admission record not found!' });

    // Validate required fields
    const formData = admission.admissionFormData || {};
    const missing = [];
    if (!formData.fullName && !admission.studentName) missing.push('Full Name');
    if (!formData.contactNumber && !admission.contactNumber) missing.push('Contact Number');
    if (!formData.educationQualification) missing.push('Educational Qualification');
    if (!formData.idProofNumber && !formData.idProofType) missing.push('Government ID Proof');

    if (markVerified && missing.length > 0) {
      return res.status(400).json({
        error: 'Cannot mark form as Verified. Required fields are missing.',
        missingFields: missing
      });
    }

    const prevStatus = admission.admissionFormStatus;
    const newStatus = markVerified ? 'Verified' : 'Incomplete';
    admission.admissionFormStatus = newStatus;
    admission.formVerifiedBy = verifiedBy;
    admission.formVerifiedAt = markVerified ? new Date() : null;
    admission.formMissingFields = missing;
    admission.verificationStatus = calculateVerificationStatus(admission);
    admission.updatedAt = new Date();

    if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
    admission.auditLogs.push({
      timestamp: new Date(),
      performedBy: verifiedBy,
      action: markVerified ? 'VERIFY_FORM' : 'MARK_FORM_INCOMPLETE',
      field: 'admissionFormStatus',
      previousValue: prevStatus,
      newValue: newStatus,
      notes: notes || (markVerified ? 'Admission form details reviewed and approved by staff.' : 'Marked incomplete by staff.')
    });

    if (isDbConnected) {
      await admission.save();
    } else {
      saveLocalAdmissions(admissionsList);
    }

    syncAdmissionToGoogleSheets(admission);
    return res.json({ success: true, admission });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-5. Verify / Confirm Payment Record
app.put('/api/admissions/:id/payment-verify', async (req, res) => {
  const { id } = req.params;
  const {
    verifiedBy = 'admin',
    paymentStatus = 'Paid',
    amountPaid,
    paymentReference,
    invoiceNumber,
    notes = ''
  } = req.body;

  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    let admissionsList = [];

    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      admissionsList = getLocalAdmissions();
      admission = admissionsList.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }

    if (!admission) return res.status(404).json({ error: 'Admission record not found!' });

    const prevStatus = admission.paymentStatus;
    const prevAmount = admission.amountPaid;

    if (amountPaid !== undefined) {
      admission.amountPaid = Number(amountPaid);
      admission.balanceDue = Math.max(0, (admission.courseFee || 0) - Number(amountPaid));
    }
    if (paymentReference) admission.paymentReference = paymentReference.trim();
    if (invoiceNumber) admission.invoiceNumber = invoiceNumber.trim();
    if (paymentStatus) admission.paymentStatus = paymentStatus;

    admission.paymentVerifiedBy = verifiedBy;
    admission.paymentVerifiedAt = new Date();
    admission.verificationStatus = calculateVerificationStatus(admission);
    admission.updatedAt = new Date();

    // CRITICAL: Confirmed payment does NOT automatically activate the course!
    if (admission.verificationStatus !== 'Approved') {
      admission.courseActivationStatus = 'Locked';
    }

    if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
    admission.auditLogs.push({
      timestamp: new Date(),
      performedBy: verifiedBy,
      action: 'PAYMENT_STATUS_UPDATE',
      field: 'paymentStatus',
      previousValue: `${prevStatus} (₹${prevAmount})`,
      newValue: `${admission.paymentStatus} (₹${admission.amountPaid})`,
      notes: notes || `Manual payment verification recorded by ${verifiedBy}. Ref: ${admission.paymentReference || 'N/A'}.`
    });

    if (isDbConnected) {
      await admission.save();
    } else {
      saveLocalAdmissions(admissionsList);
    }

    syncAdmissionToGoogleSheets(admission);
    return res.json({ success: true, admission });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-6. Set Mandatory Joining Date
app.put('/api/admissions/:id/joining-date', async (req, res) => {
  const { id } = req.params;
  const { joiningDate, setBy = 'admin', notes = '' } = req.body;

  if (!joiningDate || !joiningDate.trim()) {
    return res.status(400).json({ error: 'Joining date is mandatory and cannot be empty.' });
  }

  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    let admissionsList = [];

    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      admissionsList = getLocalAdmissions();
      admission = admissionsList.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }

    if (!admission) return res.status(404).json({ error: 'Admission record not found!' });

    const prevDate = admission.joiningDate;
    admission.joiningDate = joiningDate.trim();
    admission.joiningDateSetBy = setBy;
    admission.joiningDateSetAt = new Date();
    admission.verificationStatus = calculateVerificationStatus(admission);
    admission.updatedAt = new Date();

    if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
    admission.auditLogs.push({
      timestamp: new Date(),
      performedBy: setBy,
      action: 'SET_JOINING_DATE',
      field: 'joiningDate',
      previousValue: prevDate || 'None',
      newValue: joiningDate.trim(),
      notes: notes || `Batch joining date set to ${joiningDate.trim()} by ${setBy}.`
    });

    if (isDbConnected) {
      await admission.save();
    } else {
      saveLocalAdmissions(admissionsList);
    }

    syncAdmissionToGoogleSheets(admission);
    return res.json({ success: true, admission });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-7. Issue / Generate Student ID Card
app.put('/api/admissions/:id/id-card', async (req, res) => {
  const { id } = req.params;
  const { idCardStatus = 'Issued', idCardNumber, issuedBy = 'admin', notes = '' } = req.body;

  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    let admissionsList = [];

    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      admissionsList = getLocalAdmissions();
      admission = admissionsList.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }

    if (!admission) return res.status(404).json({ error: 'Admission record not found!' });

    const year = new Date().getFullYear();
    const finalIdCardNo = idCardNumber ? idCardNumber.trim() : (admission.idCardNumber || `AF-ID-${year}-${Math.floor(100 + Math.random() * 900)}`);
    const prevStatus = admission.idCardStatus;

    admission.idCardStatus = idCardStatus;
    admission.idCardNumber = finalIdCardNo;
    admission.idCardIssuedBy = issuedBy;
    admission.idCardIssuedAt = new Date();
    admission.verificationStatus = calculateVerificationStatus(admission);
    admission.updatedAt = new Date();

    if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
    admission.auditLogs.push({
      timestamp: new Date(),
      performedBy: issuedBy,
      action: 'ISSUE_ID_CARD',
      field: 'idCardStatus',
      previousValue: prevStatus,
      newValue: idCardStatus,
      notes: notes || `Student ID Card ${finalIdCardNo} marked as ${idCardStatus} by ${issuedBy}.`
    });

    if (isDbConnected) {
      await admission.save();
    } else {
      saveLocalAdmissions(admissionsList);
    }

    syncAdmissionToGoogleSheets(admission);
    return res.json({ success: true, admission });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-8. Final "Verify & Approve Admission" Action (Enforces all 4 criteria)
app.post('/api/admissions/:id/approve', async (req, res) => {
  const { id } = req.params;
  const { approvedBy = 'Lead Administrator' } = req.body;

  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    let admissionsList = [];

    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      admissionsList = getLocalAdmissions();
      admission = admissionsList.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }

    if (!admission) return res.status(404).json({ error: 'Admission application record not found!' });

    // Evaluate 4 Mandatory Pre-conditions:
    const missingConditions = [];
    if (admission.admissionFormStatus !== 'Verified') {
      missingConditions.push('Admission Form is not verified.');
    }
    if (admission.paymentStatus !== 'Paid') {
      missingConditions.push('Fee Payment is unverified or incomplete.');
    }
    if (!admission.joiningDate || !admission.joiningDate.trim()) {
      missingConditions.push('Joining Date has not been entered.');
    }
    if (admission.idCardStatus !== 'Issued') {
      missingConditions.push('Student ID Card has not been issued.');
    }

    if (missingConditions.length > 0) {
      return res.status(400).json({
        error: 'Approval blocked: All four verification conditions must be satisfied before activating course.',
        missingConditions
      });
    }

    // Generate unique permanent Student ID if not already assigned
    const year = new Date().getFullYear();
    let permanentStudentId = admission.studentId;
    if (!permanentStudentId || !permanentStudentId.startsWith('AF-STU-')) {
      const allAdmissions = isDbConnected ? await Admission.find({}) : admissionsList;
      const existingIds = allAdmissions.map(a => a.studentId).filter(Boolean);
      let maxNum = 0;
      existingIds.forEach(sid => {
        const match = sid.match(/AF-STU-\d+-(\d+)/);
        if (match) maxNum = Math.max(maxNum, parseInt(match[1], 10));
      });
      const nextNum = String(maxNum + 1).padStart(4, '0');
      permanentStudentId = `AF-STU-${year}-${nextNum}`;
    }

    // Link or create Student account
    let accessCode = admission.studentAccountAccessCode;
    if (!accessCode) {
      accessCode = 'STU-' + Math.floor(1000 + Math.random() * 9000);
    }

    const courseToActivate = admission.courseKey || 'python_fullstack';

    if (isDbConnected) {
      let studentAccount = await Student.findOne({ accessCode });
      if (!studentAccount) {
        studentAccount = new Student({
          name: admission.studentName,
          enrolledCourse: courseToActivate,
          accessCode,
          studentId: permanentStudentId,
          admissionStatus: 'Approved',
          isCourseActivated: true,
          activatedCourses: [courseToActivate],
          joiningDate: admission.joiningDate,
          idCardNumber: admission.idCardNumber,
          invoiceNo: admission.invoiceNumber
        });
      } else {
        studentAccount.studentId = permanentStudentId;
        studentAccount.admissionStatus = 'Approved';
        studentAccount.isCourseActivated = true;
        const currentCourses = (studentAccount.enrolledCourse || '').split(',').filter(Boolean);
        if (!currentCourses.includes(courseToActivate)) {
          currentCourses.push(courseToActivate);
        }
        studentAccount.enrolledCourse = currentCourses.join(',');
        studentAccount.joiningDate = admission.joiningDate;
        studentAccount.idCardNumber = admission.idCardNumber;
        studentAccount.invoiceNo = admission.invoiceNumber;
      }
      await studentAccount.save();

      admission.studentId = permanentStudentId;
      admission.studentAccountAccessCode = accessCode;
      admission.verificationStatus = 'Approved';
      admission.courseActivationStatus = 'Active';
      admission.approvedBy = approvedBy;
      admission.approvedAt = new Date();
      admission.updatedAt = new Date();
      if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
      admission.auditLogs.push({
        timestamp: new Date(),
        performedBy: approvedBy,
        action: 'APPROVE_ADMISSION',
        field: 'courseActivationStatus',
        previousValue: 'Locked',
        newValue: 'Active',
        notes: `Admission formally verified and approved. Permanent Student ID: ${permanentStudentId}. Course activated: ${admission.courseName}.`
      });
      await admission.save();
    } else {
      let students = getLocalStudents();
      let sIdx = students.findIndex(s => s.accessCode === accessCode);
      if (sIdx === -1) {
        students.push({
          id: Date.now().toString(),
          name: admission.studentName,
          enrolledCourse: courseToActivate,
          accessCode,
          studentId: permanentStudentId,
          admissionStatus: 'Approved',
          isCourseActivated: true,
          activatedCourses: [courseToActivate],
          joiningDate: admission.joiningDate,
          idCardNumber: admission.idCardNumber,
          invoiceNo: admission.invoiceNumber,
          completedLessons: [],
          tasks: []
        });
      } else {
        students[sIdx].studentId = permanentStudentId;
        students[sIdx].admissionStatus = 'Approved';
        students[sIdx].isCourseActivated = true;
        const currentCourses = (students[sIdx].enrolledCourse || '').split(',').filter(Boolean);
        if (!currentCourses.includes(courseToActivate)) {
          currentCourses.push(courseToActivate);
        }
        students[sIdx].enrolledCourse = currentCourses.join(',');
        students[sIdx].joiningDate = admission.joiningDate;
        students[sIdx].idCardNumber = admission.idCardNumber;
        students[sIdx].invoiceNo = admission.invoiceNumber;
      }
      saveLocalStudents(students);

      admission.studentId = permanentStudentId;
      admission.studentAccountAccessCode = accessCode;
      admission.verificationStatus = 'Approved';
      admission.courseActivationStatus = 'Active';
      admission.approvedBy = approvedBy;
      admission.approvedAt = new Date();
      admission.updatedAt = new Date();
      if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
      admission.auditLogs.push({
        timestamp: new Date(),
        performedBy: approvedBy,
        action: 'APPROVE_ADMISSION',
        field: 'courseActivationStatus',
        previousValue: 'Locked',
        newValue: 'Active',
        notes: `Admission formally verified and approved. Permanent Student ID: ${permanentStudentId}. Course activated: ${admission.courseName}.`
      });
      saveLocalAdmissions(admissionsList);
    }

    syncAdmissionToGoogleSheets(admission);

    return res.json({
      success: true,
      message: 'Admission successfully verified and course activated!',
      admission,
      studentId: permanentStudentId,
      accessCode,
      courseActivated: admission.courseName
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-9. Suspend Course Access (on refund or cancellation)
app.post('/api/admissions/:id/suspend', async (req, res) => {
  const { id } = req.params;
  const { reason = 'Refund issued or administrative suspension', suspendedBy = 'admin' } = req.body;

  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    let admissionsList = [];

    if (isDbConnected) {
      admission = await Admission.findById(id) || await Admission.findOne({ applicationReference: id });
    } else {
      admissionsList = getLocalAdmissions();
      admission = admissionsList.find(a => a._id === id || a.id === id || a.applicationReference === id);
    }

    if (!admission) return res.status(404).json({ error: 'Admission record not found!' });

    const prevActivation = admission.courseActivationStatus;
    admission.courseActivationStatus = 'Suspended';
    admission.verificationStatus = 'Suspended';
    admission.rejectionReason = reason;
    admission.updatedAt = new Date();

    if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
    admission.auditLogs.push({
      timestamp: new Date(),
      performedBy: suspendedBy,
      action: 'SUSPEND_ACCESS',
      field: 'courseActivationStatus',
      previousValue: prevActivation,
      newValue: 'Suspended',
      notes: `Course access suspended by ${suspendedBy}. Reason: ${reason}`
    });

    if (isDbConnected) {
      await Student.findOneAndUpdate(
        { $or: [{ accessCode: admission.studentAccountAccessCode }, { studentId: admission.studentId }] },
        { $set: { isCourseActivated: false, admissionStatus: 'Suspended' } }
      );
      await admission.save();
    } else {
      let students = getLocalStudents();
      const sIdx = students.findIndex(s => s.accessCode === admission.studentAccountAccessCode || s.studentId === admission.studentId);
      if (sIdx >= 0) {
        students[sIdx].isCourseActivated = false;
        students[sIdx].admissionStatus = 'Suspended';
        saveLocalStudents(students);
      }
      saveLocalAdmissions(admissionsList);
    }

    syncAdmissionToGoogleSheets(admission);
    return res.json({ success: true, message: 'Course access suspended.', admission });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// H-10. Delete Admission Application
app.delete('/api/admissions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { applicationReference: id };
      await Admission.findOneAndDelete(query);
      return res.json({ success: true, message: 'Admission application deleted.' });
    } else {
      let list = getLocalAdmissions();
      list = list.filter(a => a._id !== id && a.id !== id && a.applicationReference !== id);
      saveLocalAdmissions(list);
      return res.json({ success: true, message: 'Admission application deleted.' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ============================================================
// I. PAYMENT CONFIRMATION & WEBHOOK ROUTES
// ============================================================

// I-1. Payment Gateway Webhook (Server-Side Verified & Idempotent)
app.post('/api/payments/webhook', async (req, res) => {
  const {
    transactionId,
    paymentReference,
    paymentId,
    razorpay_payment_id,
    orderId,
    amount,
    invoiceNo,
    applicationReference,
    studentName,
    contactNumber,
    courseName
  } = req.body;

  const txnId = transactionId || paymentReference || paymentId || razorpay_payment_id || orderId;
  if (!txnId) {
    return res.status(400).json({ error: 'Missing transaction/payment reference identifier.' });
  }

  try {
    const isDbConnected = await checkDbConnection();

    // Idempotency: skip duplicates on webhook retries
    if (isDbConnected) {
      const existingInvoice = await Invoice.findOne({
        $or: [
          { transactionId: txnId },
          { invoiceNo: invoiceNo ? invoiceNo.trim() : '___' }
        ]
      });
      if (existingInvoice && existingInvoice.status === 'PAID') {
        return res.json({
          success: true,
          isDuplicate: true,
          message: 'Payment already processed and recorded (idempotent duplicate skipped).',
          invoiceNo: existingInvoice.invoiceNo,
          invoiceNumber: existingInvoice.invoiceNo,
          paymentStatus: 'Paid',
          courseActivationStatus: 'Locked'
        });
      }
    } else {
      const invoices = getLocalInvoices();
      const existingInvoice = invoices.find(inv => inv.transactionId === txnId || (invoiceNo && inv.invoiceNo === invoiceNo.trim()));
      if (existingInvoice && existingInvoice.status === 'PAID') {
        return res.json({
          success: true,
          isDuplicate: true,
          message: 'Payment already processed and recorded (idempotent duplicate skipped).',
          invoiceNo: existingInvoice.invoiceNo,
          invoiceNumber: existingInvoice.invoiceNo,
          paymentStatus: 'Paid',
          courseActivationStatus: 'Locked'
        });
      }
    }

    const invNumber = invoiceNo || ('INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000));
    const paidAmount = Number(amount) || 0;
    const invPayload = {
      invoiceNo: invNumber,
      invoiceDate: new Date().toISOString().split('T')[0],
      studentName: studentName || 'Enrolled Student',
      mobile: contactNumber || '',
      course: courseName || 'Selected Course',
      grandTotal: paidAmount,
      amountPaid: paidAmount,
      balanceDue: 0,
      status: 'PAID',
      transactionId: txnId,
      activeModesStr: 'Gateway Webhook / Online',
      updatedAt: new Date()
    };

    if (isDbConnected) {
      await Invoice.findOneAndUpdate(
        { invoiceNo: invNumber },
        { $set: invPayload },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } else {
      const invoices = getLocalInvoices();
      const idx = invoices.findIndex(i => i.invoiceNo === invNumber);
      if (idx >= 0) invoices[idx] = { ...invoices[idx], ...invPayload };
      else invoices.unshift({ _id: 'inv_' + Date.now(), createdAt: new Date(), ...invPayload });
      saveLocalInvoices(invoices);
    }

    // Link/update Admission Record
    if (isDbConnected) {
      let admission = null;
      if (applicationReference) admission = await Admission.findOne({ applicationReference });
      if (!admission && studentName) admission = await Admission.findOne({ studentName: new RegExp(`^${studentName.trim()}$`, 'i') });
      if (admission) {
        admission.paymentStatus = 'Paid';
        admission.invoiceNumber = invNumber;
        admission.amountPaid = paidAmount;
        admission.paymentReference = txnId;
        admission.paymentVerifiedAt = new Date();
        admission.paymentVerifiedBy = 'Payment Gateway Webhook';
        admission.verificationStatus = calculateVerificationStatus(admission);
        // Confirmed payment MUST NOT automatically activate the course!
        admission.courseActivationStatus = 'Locked';
        if (!Array.isArray(admission.auditLogs)) admission.auditLogs = [];
        admission.auditLogs.push({
          timestamp: new Date(),
          performedBy: 'Payment Gateway Webhook',
          action: 'PAYMENT_CONFIRMED_WEBHOOK',
          field: 'paymentStatus',
          previousValue: 'Pending',
          newValue: 'Paid',
          notes: `Server-verified payment of ₹${paidAmount} received (Ref: ${txnId}). Course remains locked until staff checklist approval.`
        });
        await admission.save();
        syncAdmissionToGoogleSheets(admission);
      }
    } else {
      let admissions = getLocalAdmissions();
      let admIdx = -1;
      if (applicationReference) admIdx = admissions.findIndex(a => a.applicationReference === applicationReference);
      if (admIdx === -1 && studentName) admIdx = admissions.findIndex(a => (a.studentName || '').toLowerCase() === studentName.trim().toLowerCase());
      if (admIdx >= 0) {
        admissions[admIdx].paymentStatus = 'Paid';
        admissions[admIdx].invoiceNumber = invNumber;
        admissions[admIdx].amountPaid = paidAmount;
        admissions[admIdx].paymentReference = txnId;
        admissions[admIdx].paymentVerifiedAt = new Date();
        admissions[admIdx].paymentVerifiedBy = 'Payment Gateway Webhook';
        admissions[admIdx].verificationStatus = calculateVerificationStatus(admissions[admIdx]);
        admissions[admIdx].courseActivationStatus = 'Locked';
        if (!Array.isArray(admissions[admIdx].auditLogs)) admissions[admIdx].auditLogs = [];
        admissions[admIdx].auditLogs.push({
          timestamp: new Date(),
          performedBy: 'Payment Gateway Webhook',
          action: 'PAYMENT_CONFIRMED_WEBHOOK',
          field: 'paymentStatus',
          previousValue: 'Pending',
          newValue: 'Paid',
          notes: `Server-verified payment of ₹${paidAmount} received (Ref: ${txnId}). Course remains locked until staff checklist approval.`
        });
        saveLocalAdmissions(admissions);
        syncAdmissionToGoogleSheets(admissions[admIdx]);
      }
    }

    return res.json({
      success: true,
      isDuplicate: false,
      message: 'Payment confirmed and invoice stored. Course remains locked pending administrator checklist verification.',
      invoiceNo: invNumber,
      invoiceNumber: invNumber,
      paymentStatus: 'Paid',
      courseActivationStatus: 'Locked'
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// I-2. Server-side payment verification check
app.post('/api/payments/verify', async (req, res) => {
  const { applicationReference, transactionId } = req.body;
  if (!applicationReference || !transactionId) {
    return res.status(400).json({ error: 'applicationReference and transactionId are required.' });
  }
  try {
    const isDbConnected = await checkDbConnection();
    let admission = null;
    if (isDbConnected) {
      admission = await Admission.findOne({ applicationReference });
    } else {
      const list = getLocalAdmissions();
      admission = list.find(a => a.applicationReference === applicationReference);
    }
    if (!admission) return res.status(404).json({ error: 'Admission application not found.' });

    return res.json({
      verified: admission.paymentStatus === 'Paid',
      paymentStatus: admission.paymentStatus,
      amountPaid: admission.amountPaid,
      courseActivationStatus: admission.courseActivationStatus
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ============================================================
// J. SERVER-SIDE COURSE ACCESS CONTROL
// ============================================================
app.get('/api/students/:id/course-access', async (req, res) => {
  const { id } = req.params;
  const { course } = req.query;

  try {
    const isDbConnected = await checkDbConnection();
    let student = null;
    let admission = null;

    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { $or: [{ accessCode: id.trim() }, { studentId: id.trim() }] };
      student = await Student.findOne(query);
      if (student) {
        admission = await Admission.findOne({
          $or: [
            { studentAccountAccessCode: student.accessCode },
            { studentId: student.studentId },
            { studentName: student.name }
          ]
        });
      }
    } else {
      const students = getLocalStudents();
      student = students.find(s => s.id === id || s._id === id || s.accessCode === id.trim() || (s.studentId && s.studentId === id.trim()));
      if (student) {
        const admissions = getLocalAdmissions();
        admission = admissions.find(a => 
          a.studentAccountAccessCode === student.accessCode || 
          (student.studentId && a.studentId === student.studentId) ||
          a.studentName === student.name
        );
      }
    }

    if (!student) {
      return res.status(404).json({ error: 'Student record not found.' });
    }

    if (course === 'induction' || !course) {
      return res.json({ allowed: true, reason: 'Free access' });
    }

    const isActivated = student.isCourseActivated !== false && (student.admissionStatus === 'Approved' || student.admissionStatus === 'None');

    if (admission && admission.courseActivationStatus !== 'Active') {
      return res.status(403).json({
        allowed: false,
        error: 'Course Access Locked: Admission verification is incomplete.',
        verificationStatus: admission.verificationStatus,
        admissionFormStatus: admission.admissionFormStatus,
        paymentStatus: admission.paymentStatus,
        joiningDate: admission.joiningDate,
        idCardStatus: admission.idCardStatus,
        courseActivationStatus: admission.courseActivationStatus
      });
    }

    return res.json({
      allowed: isActivated,
      studentId: student.studentId || 'PENDING',
      admissionStatus: student.admissionStatus || 'Approved',
      courseActivationStatus: admission ? admission.courseActivationStatus : 'Active'
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Start Server locally (if not running in serverless cloud environments or test mode)
if (!isServerless && !process.env.TEST_MODE) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 LMS Backend listening live on http://localhost:${PORT}`);
  });
}

export default app;
