const express = require('express');
const router = express.Router();
const { Profile, Course, Enrollment, Payment } = require('../models');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

// @route   GET /api/stats/admin
// @desc    Get dashboard stats for admin
router.get('/admin', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
      return res.status(403).json({ error: 'Access denied.' });
    }

    const totalUsers = await Profile.countDocuments();
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ is_published: true });
    const totalEnrollments = await Enrollment.countDocuments();
    
    const activeStudentsData = await Enrollment.distinct('student_id');
    const activeStudents = activeStudentsData.length;

    const completedPayments = await Payment.find({ status: 'completed' }).select('amount');
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);

    const pendingPayments = await Payment.countDocuments({ status: 'pending' });

    const enrollments = await Enrollment.find().select('progress');
    const completedEnrollments = enrollments.filter(e => e.progress === 100).length;
    const completionRate = enrollments.length ? Math.round((completedEnrollments / enrollments.length) * 100) : 0;

    res.json({
      totalUsers,
      totalCourses,
      publishedCourses,
      totalRevenue,
      totalEnrollments,
      activeStudents,
      pendingPayments,
      completionRate
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

// @route   GET /api/stats/staff
// @desc    Get dashboard stats for staff
router.get('/staff', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied.' });
    }

    const instructorId = req.user.id;

    // Courses by this instructor
    const courses = await Course.find({ instructor_id: instructorId });
    const courseIds = courses.map(c => c._id);
    
    const myCourses = courses.length;
    const publishedCourses = courses.filter(c => c.is_published).length;
    const draftCourses = myCourses - publishedCourses;

    // Enrollments in these courses
    const enrollments = await Enrollment.find({ course_id: { $in: courseIds } });
    const uniqueStudentsData = await Enrollment.distinct('student_id', { course_id: { $in: courseIds } });
    const totalStudents = uniqueStudentsData.length;

    const avgCompletionRate = enrollments.length ? 
      Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length) : 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentEnrollments = await Enrollment.countDocuments({
      course_id: { $in: courseIds },
      enrolled_at: { $gte: thirtyDaysAgo }
    });

    // Assignments & Quizzes (Need models imported)
    const { Assignment, Quiz } = require('../models');
    const totalAssignments = await Assignment.countDocuments({ course_id: { $in: courseIds } });
    const totalQuizzes = await Quiz.countDocuments({ course_id: { $in: courseIds } });

    res.json({
      myCourses,
      publishedCourses,
      draftCourses,
      totalStudents,
      totalAssignments,
      totalQuizzes,
      avgCompletionRate,
      recentEnrollments
    });
  } catch (err) {
    console.error('Error fetching staff stats:', err);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

// @route   GET /api/stats/charts
// @desc    Get chart data for admin
router.get('/charts', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    // Mock chart data for now
    const enrollmentTrend = [
      { month: 'Jan', enrollments: 45, revenue: 12500 },
      { month: 'Feb', enrollments: 52, revenue: 15200 },
      { month: 'Mar', enrollments: 48, revenue: 14100 },
      { month: 'Apr', enrollments: 61, revenue: 18300 },
      { month: 'May', enrollments: 55, revenue: 16800 },
      { month: 'Jun', enrollments: 67, revenue: 21200 }
    ];

    const courses = await Course.find().select('_id title');
    const courseStats = await Promise.all(courses.slice(0, 5).map(async (c) => {
      const enrollments = await Enrollment.countDocuments({ course_id: c._id });
      return {
        name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
        enrollments
      };
    }));

    const studentCount = await Profile.countDocuments({ role: 'student' });
    const staffCount = await Profile.countDocuments({ role: 'staff' });
    const adminCount = await Profile.countDocuments({ role: 'admin' });
    
    const userDistribution = [
      { name: 'Students', value: studentCount, color: '#10b981' },
      { name: 'Staff', value: staffCount, color: '#3b82f6' },
      { name: 'Admins', value: adminCount, color: '#f59e0b' }
    ];

    res.json({
      enrollmentTrend,
      courseStats,
      paymentTrend: enrollmentTrend,
      userDistribution
    });
  } catch (err) {
    console.error('Error fetching chart stats:', err);
    res.status(500).json({ error: 'Server error fetching chart stats' });
  }
});

module.exports = router;
