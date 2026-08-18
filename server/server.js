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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Fallback JSON DB path (Vercel serverless has write permissions only inside '/tmp')
const localDbPath = process.env.VERCEL
  ? '/tmp/students.json'
  : path.join(__dirname, 'students.json');

// MongoDB Atlas URI — loaded from environment variable (never hardcode credentials!)
const MONGO_URI = process.env.MONGODB_URI;

let connectionPromise = null;

// 1. Establish Database Connection (with local fallback)
if (!MONGO_URI) {
  console.warn('⚠️ MONGODB_URI environment variable is not set!');
  console.warn('🔄 Falling back to local offline JSON storage database (students.json).');
} else {
  connectionPromise = mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
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
  completedLessons: { type: [String], default: [] },
  tasks: { type: [taskSubmissionSchema], default: [] },
  certificate: { type: certificateSchema, default: () => ({}) }
});

const Student = mongoose.model('Student', studentSchema);

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Staff = mongoose.model('Staff', staffSchema);

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
      ...s
    }));
  } catch (e) {
    return [];
  }
};

const saveLocalStudents = (data) => {
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2));
};

const localStaffDbPath = process.env.VERCEL
  ? '/tmp/staff.json'
  : path.join(__dirname, 'staff.json');

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

// 3. API ROUTES

// A. Get all students
app.get('/api/students', async (req, res) => {
  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const students = await Student.find({});
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
  const { name, enrolledCourse } = req.body;
  if (!name || !enrolledCourse) {
    return res.status(400).json({ error: 'Name and course enrollment are required!' });
  }

  // Generate a random numeric access code
  const accessCode = 'STU-' + Math.floor(1000 + Math.random() * 9000);

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const newStudent = new Student({ name, enrolledCourse, accessCode, deviceId: null });
      await newStudent.save();
      return res.json(newStudent);
    } else {
      const students = getLocalStudents();
      const newStudent = { id: Date.now().toString(), name, enrolledCourse, accessCode, deviceId: null, completedLessons: [], tasks: [] };
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
      const query = mongoose.Types.ObjectId.isValid(id) 
        ? { _id: id } 
        : { accessCode: id.trim() };
        
      const student = await Student.findOne(query);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      
      // Check if already submitted
      const existingTask = student.tasks.find(t => t.moduleId === moduleId && t.tabId === tabId);
      if (existingTask) {
        existingTask.taskUrl = urlTrimmed;
        existingTask.taskText = textTrimmed;
        existingTask.submittedAt = new Date();
        existingTask.status = 'Pending';
        existingTask.feedback = '';
        existingTask.grade = '';
      } else {
        student.tasks.push({
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
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      const student = students[idx];
      if (!student.tasks) student.tasks = [];
      
      const existingTask = student.tasks.find(t => t.moduleId === moduleId && t.tabId === tabId);
      if (existingTask) {
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

// C-6. Grade Student Task Assignment (Admin/Staff only)
app.post('/api/students/tasks/:taskId/grade', async (req, res) => {
  const { taskId } = req.params;
  const { studentId, status, feedback, grade } = req.body;
  if (!studentId || !status) {
    return res.status(400).json({ error: 'studentId and status are required!' });
  }

  const statusTrimmed = status ? status.trim() : '';
  const feedbackTrimmed = feedback ? feedback.trim() : '';
  const gradeTrimmed = grade ? grade.trim() : '';

  if (!['Approved', 'Rejected', 'Pending'].includes(statusTrimmed)) {
    return res.status(400).json({ error: 'Invalid review status. Status must be Approved, Rejected, or Pending.' });
  }

  if (statusTrimmed === 'Rejected' && feedbackTrimmed.length < 10) {
    return res.status(400).json({ error: 'Evaluation feedback is required and must be at least 10 characters when rejecting an assignment.' });
  }

  if (statusTrimmed === 'Approved' && !gradeTrimmed) {
    return res.status(400).json({ error: 'A grade or score is required when approving an assignment.' });
  }

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      
      const task = student.tasks.id(taskId);
      if (!task) return res.status(404).json({ error: 'Task submission not found!' });
      
      task.status = statusTrimmed;
      task.feedback = feedbackTrimmed;
      task.grade = gradeTrimmed;
      
      await student.save();
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === studentId || s.accessCode === studentId.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      const student = students[idx];
      if (!student.tasks) student.tasks = [];
      
      const task = student.tasks.find(t => t._id === taskId || t.id === taskId);
      if (!task) return res.status(404).json({ error: 'Task submission not found!' });
      
      task.status = statusTrimmed;
      task.feedback = feedbackTrimmed;
      task.grade = gradeTrimmed;
      
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
      await Student.findByIdAndDelete(id);
      return res.json({ success: true });
    } else {
      let students = getLocalStudents();
      students = students.filter(s => s.id !== id && s.accessCode !== id);
      saveLocalStudents(students);
      return res.json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-2. Update student courses
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { enrolledCourse } = req.body;
  if (!enrolledCourse) {
    return res.status(400).json({ error: 'enrolledCourse is required!' });
  }

  try {
    const isDbConnected = await checkDbConnection();
    if (isDbConnected) {
      const query = mongoose.Types.ObjectId.isValid(id) 
        ? { _id: id } 
        : { accessCode: id.trim() };
        
      const student = await Student.findOneAndUpdate(query, { enrolledCourse }, { new: true });
      if (!student) return res.status(404).json({ error: 'Student not found!' });
      return res.json(student);
    } else {
      const students = getLocalStudents();
      const idx = students.findIndex(s => s.id === id || s.accessCode === id.trim());
      if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
      
      students[idx].enrolledCourse = enrolledCourse;
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

// Start Server locally (if not running in serverless cloud environments)
if (!process.env.VERCEL) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 LMS Backend listening live on http://localhost:${PORT}`);
  });
}

export default app;
