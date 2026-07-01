
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/components/auth/AuthProvider';
import { UserProgress } from '@/components/student/UserProgress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp,
  Play,
  CheckCircle,
  Star,
  Users,
  Calendar,
  Target,
  Brain,
  Trophy,
  Zap,
  Heart,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const StudentDashboard: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0,
    certificates: 0,
    currentStreak: 0
  });
  const [loading, setLoading] = useState(true);
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      fetchStudentData();
    }
  }, [profile]);

  const fetchStudentData = async () => {
    if (!profile) return;

    try {
      // Fetch enrolled courses
      const { data: enrollmentsData } = await api.get('/enrollments/me');
      setEnrolledCourses(enrollmentsData || []);

      // Fetch available courses (published courses)
      const { data: coursesData } = await api.get('/courses');
      
      // Filter out already enrolled courses
      // Handle populated course_id from backend
      const enrolledCourseIds = new Set(enrollmentsData?.map((e: any) => e.course_id?._id || e.course_id) || []);
      const availableCoursesFiltered = coursesData?.filter((course: any) => !enrolledCourseIds.has(course._id)) || [];
      setAvailableCourses(availableCoursesFiltered);

      // Calculate stats
      const totalCourses = enrollmentsData?.length || 0;
      const completedCourses = enrollmentsData?.filter((e: any) => e.progress >= 100).length || 0;
      const averageProgress = totalCourses > 0 
        ? Math.round(enrollmentsData.reduce((sum: number, e: any) => sum + (e.progress || 0), 0) / totalCourses)
        : 0;

      // Fetch certificates
      const { data: certificatesData } = await api.get('/certificates');

      setStats({
        totalCourses,
        completedCourses,
        totalHours: totalCourses * 10, // Estimate 10 hours per course
        averageProgress,
        certificates: certificatesData?.length || 0,
        currentStreak: Math.floor(Math.random() * 15) + 1 // Mock streak data
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollInCourse = async (courseId: string) => {
    if (!profile) return;

    try {
      // For free courses, directly enroll the student
      await api.post('/enrollments', { course_id: courseId });

      toast({
        title: "🎉 Enrolled Successfully!",
        description: "You have been enrolled in the course. Start learning now!",
      });

      // Refresh data
      fetchStudentData();

    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleContinueCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto py-8 max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="text-center flex-1 space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome back, {profile?.full_name}!
            </h1>
            <p className="text-gray-600 text-lg">Continue your learning journey and achieve your goals</p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Enrolled Courses</p>
                  <p className="text-3xl font-bold">{stats.totalCourses}</p>
                  <p className="text-blue-100 text-xs mt-1">{stats.completedCourses} completed</p>
                </div>
                <BookOpen className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Average Progress</p>
                  <p className="text-3xl font-bold">{stats.averageProgress}%</p>
                  <p className="text-green-100 text-xs mt-1">Keep it up!</p>
                </div>
                <Target className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Certificates</p>
                  <p className="text-3xl font-bold">{stats.certificates}</p>
                  <p className="text-purple-100 text-xs mt-1">Earned so far</p>
                </div>
                <Award className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Learning Streak</p>
                  <p className="text-3xl font-bold">{stats.currentStreak}</p>
                  <p className="text-orange-100 text-xs mt-1">Days strong! 🔥</p>
                </div>
                <Zap className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  My Courses ({enrolledCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                    <p className="text-gray-600 mb-6">Explore our course catalog and start your learning journey!</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Courses
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((enrollment: any) => (
                      <div key={enrollment.id} className="group bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {enrollment.course_id?.title || enrollment.courses?.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Enrolled {new Date(enrollment.enrolled_at || enrollment.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-700">Progress</span>
                                  <span className="text-sm font-semibold text-blue-600">{enrollment.progress || 0}%</span>
                                </div>
                                <Progress value={enrollment.progress || 0} className="h-2" />
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <Badge variant={enrollment.progress >= 100 ? "default" : "secondary"} className="flex items-center gap-1">
                                  {enrollment.progress >= 100 ? (
                                    <>
                                      <CheckCircle className="h-3 w-3" />
                                      Completed
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="h-3 w-3" />
                                      In Progress
                                    </>
                                  )}
                                </Badge>
                                {enrollment.courses?.price > 0 ? (
                                  <Badge variant="outline" className="text-green-600 border-green-200">
                                    <Trophy className="h-3 w-3 mr-1" />
                                    Paid Course
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                                    <Heart className="h-3 w-3 mr-1" />
                                    Free Course
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => handleContinueCourse(enrollment.course_id?._id || enrollment.course_id)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {enrollment.progress >= 100 ? 'Review' : 'Continue'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Available Courses & Quick Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate('/certificates')}
                >
                  <Award className="h-4 w-4 mr-3" />
                  View My Certificates
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => navigate('/student/progress')}
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  Progress Tracking
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Brain className="h-4 w-4 mr-3" />
                  Learning Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Available Courses */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  Available Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {availableCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No new courses available at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {availableCourses.slice(0, 5).map((course: any) => (
                      <div key={course._id || course.id} className="group p-4 border border-gray-100 rounded-lg hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                              {course.title}
                            </h4>
                            {course.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {course.description}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {course.is_free || course.price === 0 ? (
                                <Badge variant="outline" className="text-green-600 border-green-200">
                                  <Heart className="h-3 w-3 mr-1" />
                                  Free
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-blue-600 border-blue-200">
                                  ₹{course.price}
                                </Badge>
                              )}
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => handleEnrollInCourse(course._id || course.id)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            >
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {availableCourses.length > 5 && (
                      <div className="text-center pt-4">
                        <Button variant="outline" size="sm">
                          View All Courses ({availableCourses.length})
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
