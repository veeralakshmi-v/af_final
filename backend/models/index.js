const mongoose = require('mongoose');
const { Schema } = mongoose;

// Profile Schema
const profileSchema = new Schema({
  supabase_id: { type: String, required: false }, // Store old ID if needed, or use MongoDB _id
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String },
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'student', enum: ['student', 'staff', 'admin'] },
  phone: { type: String },
  address: { type: String },
  profession: { type: String },
  fees: { type: Number },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  emailVerificationExpire: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  googleId: { type: String },
}, { timestamps: true });

// Course Schema
const courseSchema = new Schema({
  supabase_id: { type: String },
  title: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  instructor_id: { type: Schema.Types.ObjectId, ref: 'Profile' },
  is_free: { type: Boolean, default: false },
  is_published: { type: Boolean, default: false },
  price: { type: Number },
  status: { type: String, default: 'draft' },
  thumbnail_url: { type: String },
}, { timestamps: true });

// Enrollment Schema
const enrollmentSchema = new Schema({
  supabase_id: { type: String },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  progress: { type: Number, default: 0 },
  enrolled_at: { type: Date, default: Date.now },
});

// Payment Schema
const paymentSchema = new Schema({
  supabase_id: { type: String },
  amount: { type: Number, required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  student_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  method: { type: String },
  paid_on: { type: Date },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  stripe_payment_id: { type: String },
}, { timestamps: true });

// Course Section Schema
const courseSectionSchema = new Schema({
  supabase_id: { type: String },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  order_index: { type: Number, required: true },
}, { timestamps: true });

// Course Content Schema
const courseContentSchema = new Schema({
  supabase_id: { type: String },
  section_id: { type: Schema.Types.ObjectId, ref: 'CourseSection', required: true },
  title: { type: String, required: true },
  type: { type: String, default: 'text' },
  content_type: { type: String },
  content: { type: String },
  order_index: { type: Number, required: true },
}, { timestamps: true });

// Quiz Schema
const quizSchema = new Schema({
  supabase_id: { type: String },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String },
  max_attempts: { type: Number },
  time_limit: { type: Number },
  questions: { type: Schema.Types.Mixed }, // JSON array if stored as json
}, { timestamps: true });

// Quiz Question Schema
const quizQuestionSchema = new Schema({
  supabase_id: { type: String },
  quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  question_text: { type: String, required: true },
  question_type: { type: String, required: true, enum: ['multiple_choice', 'true_false', 'short_answer'] },
  options: { type: Schema.Types.Mixed }, // JSON
  correct_answer: { type: String, required: true },
  points: { type: Number },
  order_index: { type: Number, required: true },
});

// Quiz Attempt Schema
const quizAttemptSchema = new Schema({
  supabase_id: { type: String },
  quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  score: { type: Number, required: true },
  total_points: { type: Number, required: true },
  answers: { type: Schema.Types.Mixed, required: true }, // JSON
  started_at: { type: Date },
  completed_at: { type: Date },
});

// Assignment Schema
const assignmentSchema = new Schema({
  supabase_id: { type: String },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String },
  instructions: { type: String },
  max_points: { type: Number },
  due_date: { type: Date },
}, { timestamps: true });

// Assignment Submission Schema
const assignmentSubmissionSchema = new Schema({
  supabase_id: { type: String },
  assignment_id: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  file_url: { type: String },
  submission_text: { type: String },
  points_earned: { type: Number },
  submitted_at: { type: Date, default: Date.now },
  graded_at: { type: Date },
});

// User Progress Schema
const userProgressSchema = new Schema({
  supabase_id: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  content_id: { type: Schema.Types.ObjectId, ref: 'CourseContent', required: true },
  progress: { type: Number, required: true, default: 0 },
  completed: { type: Boolean, required: true, default: false },
}, { timestamps: true });

// Student Certificate Schema
const studentCertificateSchema = new Schema({
  supabase_id: { type: String },
  student_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  file_url: { type: String, required: true },
  issued_at: { type: Date, required: true },
}, { timestamps: true });

// Course Inquiry Schema
const courseInquirySchema = new Schema({
  supabase_id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  course_interest: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

// Course Discussion Schema
const courseDiscussionSchema = new Schema({
  supabase_id: { type: String },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = {
  Profile: mongoose.model('Profile', profileSchema),
  Course: mongoose.model('Course', courseSchema),
  Enrollment: mongoose.model('Enrollment', enrollmentSchema),
  Payment: mongoose.model('Payment', paymentSchema),
  CourseSection: mongoose.model('CourseSection', courseSectionSchema),
  CourseContent: mongoose.model('CourseContent', courseContentSchema),
  Quiz: mongoose.model('Quiz', quizSchema),
  QuizQuestion: mongoose.model('QuizQuestion', quizQuestionSchema),
  QuizAttempt: mongoose.model('QuizAttempt', quizAttemptSchema),
  Assignment: mongoose.model('Assignment', assignmentSchema),
  AssignmentSubmission: mongoose.model('AssignmentSubmission', assignmentSubmissionSchema),
  UserProgress: mongoose.model('UserProgress', userProgressSchema),
  StudentCertificate: mongoose.model('StudentCertificate', studentCertificateSchema),
  CourseInquiry: mongoose.model('CourseInquiry', courseInquirySchema),
  CourseDiscussion: mongoose.model('CourseDiscussion', courseDiscussionSchema)
};
