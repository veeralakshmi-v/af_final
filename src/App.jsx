import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Menu, CheckCircle, Send, Clock } from 'lucide-react';
import Sidebar from './components/Sidebar';
const Dashboard = lazy(() => import('./pages/dashboards/Dashboard'));
const Day1 = lazy(() => import('./pages/html-css/Day1'));
const Day2 = lazy(() => import('./pages/html-css/Day2'));
const HTMLProject = lazy(() => import('./pages/html-css/HTMLProject'));
const CSSDay1 = lazy(() => import('./pages/html-css/CSSDay1'));
const CSSDay2 = lazy(() => import('./pages/html-css/CSSDay2'));
const CSSDay3 = lazy(() => import('./pages/html-css/CSSDay3'));
const CSSDay4 = lazy(() => import('./pages/html-css/CSSDay4'));
const CSSDay5 = lazy(() => import('./pages/html-css/CSSDay5'));
const CSSDay6 = lazy(() => import('./pages/html-css/CSSDay6'));
const CSSFinalProject = lazy(() => import('./pages/html-css/CSSFinalProject'));
const BootstrapDay1 = lazy(() => import('./pages/html-css/BootstrapDay1'));
const BootstrapDay2 = lazy(() => import('./pages/html-css/BootstrapDay2'));
const SQLDay1 = lazy(() => import('./pages/sql/SQLDay1'));
const SQLDay2 = lazy(() => import('./pages/sql/SQLDay2'));
const SQLDay3 = lazy(() => import('./pages/sql/SQLDay3'));
const SQLDay4 = lazy(() => import('./pages/sql/SQLDay4'));
const SQLDay5 = lazy(() => import('./pages/sql/SQLDay5'));
const SQLDay6 = lazy(() => import('./pages/sql/SQLDay6'));
const SQLDay7 = lazy(() => import('./pages/sql/SQLDay7'));
const SQLDay8 = lazy(() => import('./pages/sql/SQLDay8'));
const SQLDay9 = lazy(() => import('./pages/sql/SQLDay9'));
const SQLFinalProject = lazy(() => import('./pages/sql/SQLFinalProject'));
const SQLDADay8 = lazy(() => import('./pages/sql/SQLDADay8'));
const SQLDAFinalProject = lazy(() => import('./pages/sql/SQLDAFinalProject'));
const PowerBIDemo = lazy(() => import('./pages/powerbi/PowerBIDemo'));
const PowerBIDay1 = lazy(() => import('./pages/powerbi/PowerBIDay1'));
const PowerBIDay2 = lazy(() => import('./pages/powerbi/PowerBIDay2'));
const PowerBIDay3 = lazy(() => import('./pages/powerbi/PowerBIDay3'));
const PowerBIDay4 = lazy(() => import('./pages/powerbi/PowerBIDay4'));
const PowerBIDay5 = lazy(() => import('./pages/powerbi/PowerBIDay5'));
const PowerBIDay6 = lazy(() => import('./pages/powerbi/PowerBIDay6'));
const PowerBIDay7 = lazy(() => import('./pages/powerbi/PowerBIDay7'));
const PowerBIDay8 = lazy(() => import('./pages/powerbi/PowerBIDay8'));
const PowerBIProjects = lazy(() => import('./pages/powerbi/PowerBIProjects'));
const AgenticAIDemo = lazy(() => import('./pages/agentic-ai/AgenticAIDemo'));
const AgenticAIDay2 = lazy(() => import('./pages/agentic-ai/AgenticAIDay2'));
const AgenticAIDay3 = lazy(() => import('./pages/agentic-ai/AgenticAIDay3'));
const AgenticAIDay4 = lazy(() => import('./pages/agentic-ai/AgenticAIDay4'));
const AgenticAIDay5 = lazy(() => import('./pages/agentic-ai/AgenticAIDay5'));
const AgenticAIDay6 = lazy(() => import('./pages/agentic-ai/AgenticAIDay6'));
const AgenticAIDay7 = lazy(() => import('./pages/agentic-ai/AgenticAIDay7'));
const AgenticAIDay8 = lazy(() => import('./pages/agentic-ai/AgenticAIDay8'));
const AgenticAIDay9 = lazy(() => import('./pages/agentic-ai/AgenticAIDay9'));
const AgenticAIDay10 = lazy(() => import('./pages/agentic-ai/AgenticAIDay10'));
const AgenticAIDay11 = lazy(() => import('./pages/agentic-ai/AgenticAIDay11'));
const AgenticAIDay12 = lazy(() => import('./pages/agentic-ai/AgenticAIDay12'));
const AgenticAIDay13 = lazy(() => import('./pages/agentic-ai/AgenticAIDay13'));
const AgenticAIDay14 = lazy(() => import('./pages/agentic-ai/AgenticAIDay14'));
const AgenticAIDay15 = lazy(() => import('./pages/agentic-ai/AgenticAIDay15'));
const AgenticAIDay16 = lazy(() => import('./pages/agentic-ai/AgenticAIDay16'));
const AgenticAIDay17 = lazy(() => import('./pages/agentic-ai/AgenticAIDay17'));
const AgenticAIDay18 = lazy(() => import('./pages/agentic-ai/AgenticAIDay18'));
const AgenticAIDay19 = lazy(() => import('./pages/agentic-ai/AgenticAIDay19'));
const AgenticAIDay20 = lazy(() => import('./pages/agentic-ai/AgenticAIDay20'));
const AgenticAIDay21 = lazy(() => import('./pages/agentic-ai/AgenticAIDay21'));
const AgenticAIDay22 = lazy(() => import('./pages/agentic-ai/AgenticAIDay22'));
const AgenticAIDay23 = lazy(() => import('./pages/agentic-ai/AgenticAIDay23'));
const AgenticAIDay24 = lazy(() => import('./pages/agentic-ai/AgenticAIDay24'));
const AgenticAIDay25 = lazy(() => import('./pages/agentic-ai/AgenticAIDay25'));
const AgenticAIDay26 = lazy(() => import('./pages/agentic-ai/AgenticAIDay26'));
const AgenticAIDay27 = lazy(() => import('./pages/agentic-ai/AgenticAIDay27'));
const AgenticAIDay28 = lazy(() => import('./pages/agentic-ai/AgenticAIDay28'));
const AgenticAIDay29 = lazy(() => import('./pages/agentic-ai/AgenticAIDay29'));
const AgenticAIDay30 = lazy(() => import('./pages/agentic-ai/AgenticAIDay30'));
const AgenticAIDay31 = lazy(() => import('./pages/agentic-ai/AgenticAIDay31'));
const AgenticAIDay32 = lazy(() => import('./pages/agentic-ai/AgenticAIDay32'));
const AgenticAIDay33 = lazy(() => import('./pages/agentic-ai/AgenticAIDay33'));
const AgenticAIDay34 = lazy(() => import('./pages/agentic-ai/AgenticAIDay34'));
const AgenticAIDay35 = lazy(() => import('./pages/agentic-ai/AgenticAIDay35'));
const AgenticAIModule3Project = lazy(() => import('./pages/agentic-ai/AgenticAIModule3Project'));
const AgenticAIModule4Project = lazy(() => import('./pages/agentic-ai/AgenticAIModule4Project'));
const AgenticAIModule5Project = lazy(() => import('./pages/agentic-ai/AgenticAIModule5Project'));
const AgenticAIModule6Project = lazy(() => import('./pages/agentic-ai/AgenticAIModule6Project'));
const AgenticAIModule7Project = lazy(() => import('./pages/agentic-ai/AgenticAIModule7Project'));
const AgenticAIDay36 = lazy(() => import('./pages/agentic-ai/AgenticAIDay36'));
const AgenticAIDay37 = lazy(() => import('./pages/agentic-ai/AgenticAIDay37'));
const AgenticAIDay38 = lazy(() => import('./pages/agentic-ai/AgenticAIDay38'));
const AgenticAIDay39 = lazy(() => import('./pages/agentic-ai/AgenticAIDay39'));
const AgenticAIDay40 = lazy(() => import('./pages/agentic-ai/AgenticAIDay40'));
const AgenticAIModule8Project = lazy(() => import('./pages/agentic-ai/AgenticAIModule8Project'));
const GenerativeAIDemo = lazy(() => import('./pages/generative-ai/GenerativeAIDemo'));
const PythonFullStackDemo = lazy(() => import('./pages/python/PythonFullStackDemo'));
const PythonDay1 = lazy(() => import('./pages/python/PythonDay1'));
const PythonDay2 = lazy(() => import('./pages/python/PythonDay2'));
const PythonDay3 = lazy(() => import('./pages/python/PythonDay3'));
const PythonDay4 = lazy(() => import('./pages/python/PythonDay4'));
const PythonGameProjects = lazy(() => import('./pages/python/PythonGameProjects'));
const PythonDay5 = lazy(() => import('./pages/python/PythonDay5'));
const PythonDay6 = lazy(() => import('./pages/python/PythonDay6'));
const PythonDay7 = lazy(() => import('./pages/python/PythonDay7'));
const PythonApplicationProjects = lazy(() => import('./pages/python/PythonApplicationProjects'));
const PythonDay8 = lazy(() => import('./pages/python/PythonDay8'));
const PythonDay9 = lazy(() => import('./pages/python/PythonDay9'));
const PythonDay10 = lazy(() => import('./pages/python/PythonDay10'));
const PythonDay11 = lazy(() => import('./pages/python/PythonDay11'));
const PythonDay12 = lazy(() => import('./pages/python/PythonDay12'));
const PythonDay13 = lazy(() => import('./pages/python/PythonDay13'));
const PythonFinalProjects = lazy(() => import('./pages/python/PythonFinalProjects'));
const GenAIDay1 = lazy(() => import('./pages/generative-ai/GenAIDay1'));
const GenAIDay2 = lazy(() => import('./pages/generative-ai/GenAIDay2'));
const GenAIDay3 = lazy(() => import('./pages/generative-ai/GenAIDay3'));
const GenAIDay4 = lazy(() => import('./pages/generative-ai/GenAIDay4'));
const GenAIDay5 = lazy(() => import('./pages/generative-ai/GenAIDay5'));
const GenAIDay6 = lazy(() => import('./pages/generative-ai/GenAIDay6'));
const GenAIDay7 = lazy(() => import('./pages/generative-ai/GenAIDay7'));
const GenAIDay8 = lazy(() => import('./pages/generative-ai/GenAIDay8'));
const GenAIDay9 = lazy(() => import('./pages/generative-ai/GenAIDay9'));
const GenAIDay10 = lazy(() => import('./pages/generative-ai/GenAIDay10'));
const GenAIDay11 = lazy(() => import('./pages/generative-ai/GenAIDay11'));
const GenAIDay12 = lazy(() => import('./pages/generative-ai/GenAIDay12'));
const GenAIDay13 = lazy(() => import('./pages/generative-ai/GenAIDay13'));
const GenAIDay14 = lazy(() => import('./pages/generative-ai/GenAIDay14'));
const GenAIDay15 = lazy(() => import('./pages/generative-ai/GenAIDay15'));
const GenAIDay16 = lazy(() => import('./pages/generative-ai/GenAIDay16'));
const GenAIDay17 = lazy(() => import('./pages/generative-ai/GenAIDay17'));
const GenAIDay18 = lazy(() => import('./pages/generative-ai/GenAIDay18'));
const GenAIDay19 = lazy(() => import('./pages/generative-ai/GenAIDay19'));
const GenAIDay20 = lazy(() => import('./pages/generative-ai/GenAIDay20'));
const GenAIModule2Project = lazy(() => import('./pages/generative-ai/GenAIModule2Project'));
const GenAIMiniProject = lazy(() => import('./pages/generative-ai/GenAIMiniProject'));
const JSDay1 = lazy(() => import('./pages/javascript/JSDay1'));
const JSDay2 = lazy(() => import('./pages/javascript/JSDay2'));
const JSDay3 = lazy(() => import('./pages/javascript/JSDay3'));
const JSDay4 = lazy(() => import('./pages/javascript/JSDay4'));
const JSDay5 = lazy(() => import('./pages/javascript/JSDay5'));
const JSDay6 = lazy(() => import('./pages/javascript/JSDay6'));
const JSDay7 = lazy(() => import('./pages/javascript/JSDay7'));
const JSDay8 = lazy(() => import('./pages/javascript/JSDay8'));
const JSDay9 = lazy(() => import('./pages/javascript/JSDay9'));
const JSDay10 = lazy(() => import('./pages/javascript/JSDay10'));
const JSFinalProjects = lazy(() => import('./pages/javascript/JSFinalProjects'));
const AIPowerTools = lazy(() => import('./pages/ai/AIPowerTools'));
const FloatingAITutor = lazy(() => import('./components/FloatingAITutor'));
const AILearningStudio = lazy(() => import('./components/AILearningStudio'));
const LandingPage = lazy(() => import('./pages/dashboards/LandingPage'));
const ReactJSEssentials = lazy(() => import('./pages/react/ReactJSEssentials'));
const ReactDay1 = lazy(() => import('./pages/react/ReactDay1'));
const ReactDay2 = lazy(() => import('./pages/react/ReactDay2'));
const ReactDay3 = lazy(() => import('./pages/react/ReactDay3'));
const ReactDay4 = lazy(() => import('./pages/react/ReactDay4'));
const ReactDay5 = lazy(() => import('./pages/react/ReactDay5'));
const ReactDay6 = lazy(() => import('./pages/react/ReactDay6'));
const ReactDay7 = lazy(() => import('./pages/react/ReactDay7'));
const ReactDay8 = lazy(() => import('./pages/react/ReactDay8'));
const ReactDay9 = lazy(() => import('./pages/react/ReactDay9'));
const ReactDay10 = lazy(() => import('./pages/react/ReactDay10'));
const ReactDay11 = lazy(() => import('./pages/react/ReactDay11'));
const ReactDay12 = lazy(() => import('./pages/react/ReactDay12'));
const ReactDay13 = lazy(() => import('./pages/react/ReactDay13'));
const ReactDay14 = lazy(() => import('./pages/react/ReactDay14'));
const ReactDay15 = lazy(() => import('./pages/react/ReactDay15'));
const GitDay1 = lazy(() => import('./pages/git/GitDay1'));
const GitDay2 = lazy(() => import('./pages/git/GitDay2'));
const JSONDay1 = lazy(() => import('./pages/json/JSONDay1'));
const DjangoDay1 = lazy(() => import('./pages/django/DjangoDay1'));
const DjangoDay2 = lazy(() => import('./pages/django/DjangoDay2'));
const DjangoDay3 = lazy(() => import('./pages/django/DjangoDay3'));
const DjangoDay4 = lazy(() => import('./pages/django/DjangoDay4'));
const DjangoDay5 = lazy(() => import('./pages/django/DjangoDay5'));
const DjangoDay6 = lazy(() => import('./pages/django/DjangoDay6'));
const DjangoDay7 = lazy(() => import('./pages/django/DjangoDay7'));
const DjangoDay8 = lazy(() => import('./pages/django/DjangoDay8'));
const DjangoDay9 = lazy(() => import('./pages/django/DjangoDay9'));
const DjangoDay10 = lazy(() => import('./pages/django/DjangoDay10'));
const DjangoDay11 = lazy(() => import('./pages/django/DjangoDay11'));
const DjangoDay12 = lazy(() => import('./pages/django/DjangoDay12'));
const DjangoDay13 = lazy(() => import('./pages/django/DjangoDay13'));
const DjangoDay14 = lazy(() => import('./pages/django/DjangoDay14'));
const DjangoDay15 = lazy(() => import('./pages/django/DjangoDay15'));
const DevOpsDay1 = lazy(() => import('./pages/devops/DevOpsDay1'));
const DevOpsDay2 = lazy(() => import('./pages/devops/DevOpsDay2'));
const DevOpsDay3 = lazy(() => import('./pages/devops/DevOpsDay3'));
const StatsDay1 = lazy(() => import('./pages/statistics/StatsDay1'));
const StatsDay2 = lazy(() => import('./pages/statistics/StatsDay2'));
const StatsDay3 = lazy(() => import('./pages/statistics/StatsDay3'));
const StatsDay4 = lazy(() => import('./pages/statistics/StatsDay4'));
const StatsDay5 = lazy(() => import('./pages/statistics/StatsDay5'));
const StatsDay6 = lazy(() => import('./pages/statistics/StatsDay6'));
const StatsDay7 = lazy(() => import('./pages/statistics/StatsDay7'));
const StatsDay8 = lazy(() => import('./pages/statistics/StatsDay8'));
const StatsDay9 = lazy(() => import('./pages/statistics/StatsDay9'));
const StatsDay10 = lazy(() => import('./pages/statistics/StatsDay10'));
const StatsDay11 = lazy(() => import('./pages/statistics/StatsDay11'));
const StatsDay12 = lazy(() => import('./pages/statistics/StatsDay12'));
const StatsDay13 = lazy(() => import('./pages/statistics/StatsDay13'));
const StatsDay14 = lazy(() => import('./pages/statistics/StatsDay14'));
const StatsDay15 = lazy(() => import('./pages/statistics/StatsDay15'));
const StatsDay16 = lazy(() => import('./pages/statistics/StatsDay16'));
const StatsDay17 = lazy(() => import('./pages/statistics/StatsDay17'));
const StatsMiniProjects = lazy(() => import('./pages/statistics/StatsMiniProjects'));
const StatsFinalProject = lazy(() => import('./pages/statistics/StatsFinalProject'));
const StatsDayPlaceholder = lazy(() => import('./pages/statistics/StatsDayPlaceholder'));
const NumpyDay1 = lazy(() => import('./pages/numpy/NumpyDay1'));
const NumpyDay2 = lazy(() => import('./pages/numpy/NumpyDay2'));
const NumpyDay3 = lazy(() => import('./pages/numpy/NumpyDay3'));
const NumpyDay4 = lazy(() => import('./pages/numpy/NumpyDay4'));
const NumpyDay5 = lazy(() => import('./pages/numpy/NumpyDay5'));
const NumpyDay6 = lazy(() => import('./pages/numpy/NumpyDay6'));
const PandasDay1 = lazy(() => import('./pages/pandas/PandasDay1'));
const PandasDay2 = lazy(() => import('./pages/pandas/PandasDay2'));
const PandasDay3 = lazy(() => import('./pages/pandas/PandasDay3'));
const PandasDay4 = lazy(() => import('./pages/pandas/PandasDay4'));
const PandasDay5 = lazy(() => import('./pages/pandas/PandasDay5'));
const PandasDay6 = lazy(() => import('./pages/pandas/PandasDay6'));
const MatplotlibDay1 = lazy(() => import('./pages/matplotlib/MatplotlibDay1'));
const MatplotlibDay2 = lazy(() => import('./pages/matplotlib/MatplotlibDay2'));
const MatplotlibDay3 = lazy(() => import('./pages/matplotlib/MatplotlibDay3'));
const MatplotlibDay4 = lazy(() => import('./pages/matplotlib/MatplotlibDay4'));
const MatplotlibDay5 = lazy(() => import('./pages/matplotlib/MatplotlibDay5'));
const SeabornDay1 = lazy(() => import('./pages/seaborn/SeabornDay1'));
const SeabornDay2 = lazy(() => import('./pages/seaborn/SeabornDay2'));
const SeabornDay3 = lazy(() => import('./pages/seaborn/SeabornDay3'));
const SeabornDay4 = lazy(() => import('./pages/seaborn/SeabornDay4'));
const CoreJSDay1 = lazy(() => import('./pages/javascript/CoreJSDay1'));
const CoreJSDay2 = lazy(() => import('./pages/javascript/CoreJSDay2'));
const CoreJSDay3 = lazy(() => import('./pages/javascript/CoreJSDay3'));
const CoreJSDay4 = lazy(() => import('./pages/javascript/CoreJSDay4'));
const CoreJSDay5 = lazy(() => import('./pages/javascript/CoreJSDay5'));
const CoreJSDay6 = lazy(() => import('./pages/javascript/CoreJSDay6'));
const CoreJSDay7 = lazy(() => import('./pages/javascript/CoreJSDay7'));
const CoreJSDay8 = lazy(() => import('./pages/javascript/CoreJSDay8'));
const CoreJSDay9 = lazy(() => import('./pages/javascript/CoreJSDay9'));
const CoreJSDay10 = lazy(() => import('./pages/javascript/CoreJSDay10'));
const WebDesignDay1 = lazy(() => import('./pages/web-design/WebDesignDay1'));
const WebDesignDay2 = lazy(() => import('./pages/web-design/WebDesignDay2'));
const WebDesignDay3 = lazy(() => import('./pages/web-design/WebDesignDay3'));
const WebDesignDay4 = lazy(() => import('./pages/web-design/WebDesignDay4'));
const WebDesignDay5 = lazy(() => import('./pages/web-design/WebDesignDay5'));
const WebDesignDay6 = lazy(() => import('./pages/web-design/WebDesignDay6'));
const WebDesignDay7 = lazy(() => import('./pages/web-design/WebDesignDay7'));
const WebDesignDay8 = lazy(() => import('./pages/web-design/WebDesignDay8'));
const WebDesignDay9 = lazy(() => import('./pages/web-design/WebDesignDay9'));
const WebDesignDay10 = lazy(() => import('./pages/web-design/WebDesignDay10'));
const WebDesignDay11 = lazy(() => import('./pages/web-design/WebDesignDay11'));
const WebDesignDay12 = lazy(() => import('./pages/web-design/WebDesignDay12'));
const SpokoStoryDay1 = lazy(() => import('./pages/spoko/SpokoStoryDay1'));
const SpokoStoryDay2 = lazy(() => import('./pages/spoko/SpokoStoryDay2'));
const SpokoStoryDay3 = lazy(() => import('./pages/spoko/SpokoStoryDay3'));
const SpokoStoryDay4 = lazy(() => import('./pages/spoko/SpokoStoryDay4'));
const SpokoStoryDay5 = lazy(() => import('./pages/spoko/SpokoStoryDay5'));
const SpokoStoryDay6 = lazy(() => import('./pages/spoko/SpokoStoryDay6'));
const SpokoProTopic = lazy(() => import('./pages/spoko/SpokoProTopic'));
const SpokoHrCourse = lazy(() => import('./pages/spoko/SpokoHrCourse'));
const SpokoReasoningDay1 = lazy(() => import('./pages/spoko/SpokoReasoningDay1'));
const SpokoReasoningDay2 = lazy(() => import('./pages/spoko/SpokoReasoningDay2'));
const SpokoReasoningDay3 = lazy(() => import('./pages/spoko/SpokoReasoningDay3'));
const SpokoReasoningDay4 = lazy(() => import('./pages/spoko/SpokoReasoningDay4'));
const SpokoReasoningDay5 = lazy(() => import('./pages/spoko/SpokoReasoningDay5'));
const SpokoReasoningDay6 = lazy(() => import('./pages/spoko/SpokoReasoningDay6'));
const SpokoReasoningDay7 = lazy(() => import('./pages/spoko/SpokoReasoningDay7'));
const SpokoReasoningDay8 = lazy(() => import('./pages/spoko/SpokoReasoningDay8'));
const SpokoReasoningDay9 = lazy(() => import('./pages/spoko/SpokoReasoningDay9'));
const SpokoReasoningDay10 = lazy(() => import('./pages/spoko/SpokoReasoningDay10'));
const SpokoReasoningDay11 = lazy(() => import('./pages/spoko/SpokoReasoningDay11'));
const SpokoReasoningLevel3Day12 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day12'));
const SpokoReasoningLevel3Day13 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day13'));
const SpokoReasoningLevel3Day14 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day14'));
const SpokoReasoningLevel3Day15 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day15'));
const SpokoReasoningLevel3Day16 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day16'));
const SpokoReasoningLevel3Day17 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day17'));
const SpokoReasoningLevel3Day18 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day18'));
const SpokoReasoningLevel3Day19 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day19'));
const SpokoReasoningLevel3Day20 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day20'));
const SpokoReasoningLevel3Day21 = lazy(() => import('./pages/spoko/SpokoReasoningLevel3Day21'));
import { htmlCourseData, sqlCourseData, summerSqlCourseData, daSqlCourseData, powerBiCourseData, agenticAiCourseData, inductionCourseData, pythonFullStackCourseData, pythonCourseData, pythonDaCourseData, generativeAiCourseData, reactCourseData, gitCourseData, jsonCourseData, djangoCourseData, devopsCourseData, statsCourseData, numpyCourseData, coreJsCourseData, pandasCourseData, matplotlibCourseData, seabornCourseData, tallyCourseData, webDesignCourseData, spokoStoryCourseData, spokoProCourseData, spokoHrCourseData, spokoReasoningCourseData } from './courseData';
const TallyCourseDay = lazy(() => import('./pages/tally/TallyCourseDay'));
const AssignmentSubmissionPage = lazy(() => import('./components/AssignmentSubmissionPage'));
import { isModuleLocked, getLockReason } from './utils/htmlCssLocking';
const StudentAdmissionStatusModal = lazy(() => import('./pages/dashboards/StudentAdmissionStatusModal'));
import './index.css';


function App() {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('lms_user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeCourse, setActiveCourse] = useState('dashboard');
  const [enrolledCourse, setEnrolledCourse] = useState(() => {
    const savedSession = localStorage.getItem('lms_user_session');
    if (savedSession) {
      return JSON.parse(savedSession).enrolledCourse;
    }
    return 'all';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNode, setActiveNode] = useState({
    moduleId: 'module1',
    tabId: 'intro'
  });
  const [tutorOpen, setTutorOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState('');

  // Student Progress & Submission States
  const [completedLessons, setCompletedLessons] = useState([]);
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [admissionBlockedCourse, setAdmissionBlockedCourse] = useState('');
  const [taskSubmitLoading, setTaskSubmitLoading] = useState(false);
  const [taskSubmitUrl, setTaskSubmitUrl] = useState('');
  const [taskSubmitNotes, setTaskSubmitNotes] = useState('');

  // Fetch student progress/tasks when session changes
  useEffect(() => {
    if (session && session.role === 'student') {
      const fetchStudentData = async () => {
        try {
          const resStudents = await fetch('/api/students');
          if (resStudents.ok) {
            const list = await resStudents.json();
            const me = list.find(s => s.accessCode === session.accessCode || (s.studentId && s.studentId === session.studentId));
            if (me) {
              setCompletedLessons(me.completedLessons || []);
              setTaskSubmissions(me.tasks || []);
              if (me.isCourseActivated !== undefined || me.admissionStatus !== undefined) {
                setSession(prev => {
                  const updated = {
                    ...prev,
                    isCourseActivated: me.isCourseActivated,
                    admissionStatus: me.admissionStatus,
                    studentId: me.studentId || prev.studentId,
                    joiningDate: me.joiningDate || prev.joiningDate,
                    idCardNumber: me.idCardNumber || prev.idCardNumber,
                    invoiceNo: me.invoiceNo || prev.invoiceNo
                  };
                  localStorage.setItem('lms_user_session', JSON.stringify(updated));
                  return updated;
                });
              }
            }
          }
        } catch (e) {
          console.warn('Failed to load student progress:', e);
        }
      };
      fetchStudentData();

      const handleFocus = () => fetchStudentData();
      window.addEventListener('focus', handleFocus);
      window.addEventListener('storage', handleFocus);
      return () => {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('storage', handleFocus);
      };
    } else {
      setCompletedLessons([]);
      setTaskSubmissions([]);
    }
  }, [session]);

  const toggleLessonCompletion = async (lessonKey, completed) => {
    if (!session || session.role !== 'student') return;
    try {
      const res = await fetch(`/api/students/${session.studentId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonKey, completed })
      });
      if (res.ok) {
        const updatedStudent = await res.json();
        setCompletedLessons(updatedStudent.completedLessons || []);
      }
    } catch (e) {
      console.warn('Failed to toggle completion:', e);
    }
  };


  const submitTask = async (moduleId, tabId, url, notes) => {
    if (!session || session.role !== 'student') return;

    const urlTrimmed = url ? url.trim() : '';
    const notesTrimmed = notes ? notes.trim() : '';

    if (!urlTrimmed && !notesTrimmed) {
      alert('Please provide either a submission URL or notes/code details for your assignment.');
      return;
    }

    if (urlTrimmed) {
      const urlPattern = /^https?:\/\/\S+$/i;
      if (!urlPattern.test(urlTrimmed)) {
        alert('Please enter a valid submission URL starting with http:// or https://');
        return;
      }
    }

    setTaskSubmitLoading(true);
    try {
      const res = await fetch(`/api/students/${session.studentId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, tabId, taskUrl: urlTrimmed, taskText: notesTrimmed })
      });
      if (res.ok) {
        const updatedStudent = await res.json();
        setTaskSubmissions(updatedStudent.tasks || []);
        setShowTaskModal(false);
        setTaskSubmitUrl('');
        setTaskSubmitNotes('');
        alert('Task submitted successfully! Your instructor will review it.');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to submit task.');
      }
    } catch (e) {
      console.warn('Failed to submit task:', e);
      alert('Could not submit task. Please check your connection.');
    } finally {
      setTaskSubmitLoading(false);
    }
  };

  const openAITutor = (question) => {
    setInitialQuestion(question);
    setTutorOpen(true);
  };

  const handleNavClick = (moduleId, tabId) => {
    if (moduleId === 'dashboard') {
      setActiveCourse('dashboard');
      return;
    }

    // 🛡️ Verification Gate: Block unactivated students from paid course content
    if (session?.role === 'student' && activeCourse !== 'induction') {
      const isPendingActivation = session?.isCourseActivated === false || session?.admissionStatus === 'Pending';
      if (isPendingActivation) {
        setAdmissionBlockedCourse(activeCourse);
        setAdmissionModalOpen(true);
        return;
      }
    }

    if (isModuleLocked(activeCourse, moduleId, undefined, session, completedLessons, taskSubmissions)) {
      const lockInfo = getLockReason(activeCourse, moduleId, undefined, session, completedLessons, taskSubmissions);
      alert(`🔒 Day Content Locked!\n\n${lockInfo ? lockInfo.detail : 'You must complete the previous day assignment/topics to unlock this content.'}`);
      if (lockInfo && lockInfo.prevModuleId) {
        setActiveNode({ moduleId: lockInfo.prevModuleId, tabId: 'assignment' });
      }
      setIsMobileMenuOpen(false);
      return;
    }

    setActiveNode({ moduleId, tabId });
    setIsMobileMenuOpen(false); // Close menu on navigation
  };

  const handleLoginSuccess = (sessionPayload) => {
    setSession(sessionPayload);
    localStorage.setItem('lms_user_session', JSON.stringify(sessionPayload));
    setEnrolledCourse(sessionPayload.enrolledCourse);
    localStorage.setItem('student_enrollment', sessionPayload.enrolledCourse);
    setActiveCourse('dashboard');
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem('lms_user_session');
    setEnrolledCourse('all');
    localStorage.setItem('student_enrollment', 'all');
    setActiveCourse('dashboard');
  };

  const getFirstIncompleteLesson = (courseKey) => {
    const map = {
      html_css: htmlCourseData,
      sql: sqlCourseData,
      summer_sql: summerSqlCourseData,
      sql_da: daSqlCourseData,
      powerbi: powerBiCourseData,
      agentic_ai: agenticAiCourseData,
      python_fullstack: pythonFullStackCourseData,
      python_course: pythonCourseData,
      python_da: pythonDaCourseData,
      generative_ai_course: generativeAiCourseData,
      react_course: reactCourseData,
      git_github: gitCourseData,
      json_course: jsonCourseData,
      django_course: djangoCourseData,
      devops: devopsCourseData,
      stats_course: statsCourseData,
      numpy_course: numpyCourseData,
      pandas_course: pandasCourseData,
      matplotlib_course: matplotlibCourseData,
      seaborn_course: seabornCourseData,
      core_js: coreJsCourseData,
      induction: inductionCourseData,
      tally_prime: tallyCourseData,
      web_design_20days: webDesignCourseData,
      spoko_story: spokoStoryCourseData,
      spoko_pro: spokoProCourseData,
      softskills: spokoProCourseData,
      spoko_hr: spokoHrCourseData,
      hr_interview_mastery: spokoHrCourseData,
      spoko_reasoning: spokoReasoningCourseData
    };
    const modules = map[courseKey] || [];
    for (const m of modules) {
      if (m.items) {
        for (const item of m.items) {
          const key = `${courseKey}:${m.id}:${item.id}`;
          const isDone = completedLessons.includes(key) ||
            completedLessons.includes(`${m.id}:${item.id}`) ||
            completedLessons.some(c => c.endsWith(`:${item.id}`));
          if (!isDone) {
            return { moduleId: m.id, tabId: item.id };
          }
        }
      }
    }
    if (modules.length > 0 && modules[0].items && modules[0].items.length > 0) {
      return { moduleId: modules[0].id, tabId: modules[0].items[0].id };
    }
    return null;
  };

  const handleSelectCourse = (course, startModuleId = null) => {
    // 🛡️ Verification Gate: Block unactivated students from entering paid courses
    if (session?.role === 'student' && course !== 'induction') {
      const isPendingActivation = session?.isCourseActivated === false || session?.admissionStatus === 'Pending';
      if (isPendingActivation) {
        setAdmissionBlockedCourse(course);
        setAdmissionModalOpen(true);
        return;
      }
    }

    const enrolledCoursesList = session?.enrolledCourse ? session.enrolledCourse.split(',') : [];
    const isEnrolled = session?.enrolledCourse === 'all' ||
      enrolledCoursesList.includes(course) ||
      ((course === 'spoko_hr' || course === 'hr_interview_mastery' || course === 'spoko_reasoning') && (
        enrolledCoursesList.includes('spoko_english') ||
        enrolledCoursesList.includes('spoko_story') ||
        enrolledCoursesList.includes('spoko_pro') ||
        enrolledCoursesList.includes('softskills') ||
        enrolledCoursesList.includes('spoko_reasoning')
      ));
    if (session?.role === 'student' && !isEnrolled && course !== 'induction') {
      return; // Block student access to non-enrolled courses
    }
    setActiveCourse(course);
    if (startModuleId) {
      setActiveNode({ moduleId: startModuleId, tabId: 'intro' });
    } else {
      if (session?.role === 'student' && isEnrolled) {
        const nextIncomplete = getFirstIncompleteLesson(course);
        if (nextIncomplete) {
          setActiveNode(nextIncomplete);
          return;
        }
      }

      if (course === 'spoko_reasoning') {
        setActiveNode({ moduleId: 'spoko_reasoning_l1_d1', tabId: 'overview' });
      } else if (course === 'spoko_hr' || course === 'hr_interview_mastery') {
        setActiveNode({ moduleId: 'spoko_hr_overview', tabId: 'dashboard' });
      } else if (course === 'spoko_pro' || course === 'softskills') {
        setActiveNode({ moduleId: 'spoko_pro_topic1', tabId: 'pro_overview' });
      } else if (course === 'spoko_story') {
        setActiveNode({ moduleId: 'spoko_story_day1', tabId: 'story_reading' });
      } else if (course === 'tally_prime') {
        setActiveNode({ moduleId: 'tally_prime_module1', tabId: 'day1' });
      } else if (course === 'web_design_20days') {
        setActiveNode({ moduleId: 'web_design_day1', tabId: 'intro' });
      } else if (course === 'html_css') {
        setActiveNode({ moduleId: 'module1', tabId: 'intro' });
      } else if (course === 'sql' || course === 'summer_sql' || course === 'sql_da') {
        setActiveNode({ moduleId: 'sql_module1', tabId: 'data_db' });
      } else if (course === 'powerbi') {
        setActiveNode({ moduleId: 'powerbi_module1', tabId: 'intro' });
      } else if (course === 'agentic_ai') {
        setActiveNode({ moduleId: 'agentic_ai_foundation', tabId: 'day1' });
      } else if (course === 'python_fullstack') {
        setActiveNode({ moduleId: 'python_fullstack_demo', tabId: 'intro' });
      } else if (course === 'python_course' || course === 'python_da') {
        setActiveNode({ moduleId: 'python_day1', tabId: 'intro' });
      } else if (course === 'generative_ai_course') {
        setActiveNode({ moduleId: 'genai_module1', tabId: 'day1' });
      } else if (course === 'core_js') {
        setActiveNode({ moduleId: 'core_js_day1', tabId: 'intro' });
      } else if (course === 'react_course') {
        setActiveNode({ moduleId: 'react_module1', tabId: 'intro_react' });
      } else if (course === 'git_github') {
        setActiveNode({ moduleId: 'git_module1', tabId: 'intro_git' });
      } else if (course === 'json_course') {
        setActiveNode({ moduleId: 'json_module1', tabId: 'intro_json' });
      } else if (course === 'django_course') {
        setActiveNode({ moduleId: 'django_module1', tabId: 'intro_django' });
      } else if (course === 'devops') {
        setActiveNode({ moduleId: 'devops_module1', tabId: 'intro_sessions' });
      } else if (course === 'stats_course') {
        setActiveNode({ moduleId: 'stats_day1', tabId: 'theory' });
      } else if (course === 'numpy_course') {
        setActiveNode({ moduleId: 'numpy_day1', tabId: 'install' });
      } else if (course === 'pandas_course') {
        setActiveNode({ moduleId: 'pandas_day1', tabId: 'intro' });
      } else if (course === 'matplotlib_course') {
        setActiveNode({ moduleId: 'matplotlib_day1', tabId: 'intro' });
      } else if (course === 'seaborn_course') {
        setActiveNode({ moduleId: 'seaborn_day1', tabId: 'intro' });
      } else if (course === 'core_js') {
        setActiveNode({ moduleId: 'core_js_day1', tabId: 'intro' });
      } else if (course === 'induction') {
        setActiveNode({ moduleId: 'powerbi_demo', tabId: 'intro' });
      } else {
        const courseMap = {
          html_css: htmlCourseData,
          sql: sqlCourseData,
          summer_sql: summerSqlCourseData,
          sql_da: daSqlCourseData,
          powerbi: powerBiCourseData,
          agentic_ai: agenticAiCourseData,
          python_fullstack: pythonFullStackCourseData,
          python_course: pythonCourseData,
          python_da: pythonDaCourseData,
          generative_ai_course: generativeAiCourseData,
          react_course: reactCourseData,
          git_github: gitCourseData,
          json_course: jsonCourseData,
          django_course: djangoCourseData,
          devops: devopsCourseData,
          stats_course: statsCourseData,
          numpy_course: numpyCourseData,
          pandas_course: pandasCourseData,
          matplotlib_course: matplotlibCourseData,
          seaborn_course: seabornCourseData,
          core_js: coreJsCourseData,
          induction: inductionCourseData,
          tally_prime: tallyCourseData,
          web_design_20days: webDesignCourseData,
          spoko_story: spokoStoryCourseData,
          spoko_pro: spokoProCourseData,
          softskills: spokoProCourseData
        };
        const data = courseMap[course];
        if (data && data.length > 0 && data[0].items && data[0].items.length > 0) {
          setActiveNode({ moduleId: data[0].id, tabId: data[0].items[0].id });
        }
      }
    }
  };

  useEffect(() => {
    // Check for auto-login query parameter (?code=STU-XXXX)
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      const autoLogin = async () => {
        try {
          // Get or create device lock ID
          let deviceId = localStorage.getItem('lms_device_uuid');
          if (!deviceId) {
            deviceId = 'dev-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('lms_device_uuid', deviceId);
          }

          const res = await fetch('/api/students/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessCode: code.trim(), deviceId })
          });
          if (res.ok) {
            const studentData = await res.json();
            const sessionPayload = {
              role: 'student',
              name: studentData.name,
              username: studentData.accessCode,
              enrolledCourse: studentData.enrolledCourse,
              token: 'mock-student-session-token',
              accessCode: studentData.accessCode,
              studentId: studentData._id || studentData.id
            };
            handleLoginSuccess(sessionPayload);

            // Clean query params to keep browser address bar tidy
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            const err = await res.json();
            alert(err.error || 'Auto login failed.');
          }
        } catch (err) {
          console.warn('Auto-login parameter verification failed:', err);
        }
      };
      autoLogin();
    }
  }, []);

  useEffect(() => {
    const verifyDevice = async () => {
      if (session && session.role === 'student') {
        const deviceId = localStorage.getItem('lms_device_uuid');
        try {
          const res = await fetch('/api/students/verify-device', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessCode: session.accessCode, deviceId })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.valid === false) {
              alert('This student access key is locked to another device! You have been logged out.');
              handleLogout();
            }
          }
        } catch (err) {
          console.warn('Device verification check failed:', err);
        }
      }
    };
    verifyDevice();
  }, [session]);

  useEffect(() => {
    const enrolledList = enrolledCourse ? enrolledCourse.split(',') : [];
    const isEnrolled = enrolledCourse === 'all' || enrolledList.includes(activeCourse);
    if (activeCourse !== 'dashboard' && activeCourse !== 'induction' && !isEnrolled) {
      setActiveCourse('dashboard');
    }
  }, [activeCourse, enrolledCourse]);

  let currentCourseData;
  if (activeCourse === 'html_css') currentCourseData = htmlCourseData;
  else if (activeCourse === 'sql') currentCourseData = sqlCourseData;
  else if (activeCourse === 'sql_da') currentCourseData = daSqlCourseData;
  else if (activeCourse === 'summer_sql') currentCourseData = summerSqlCourseData;
  else if (activeCourse === 'powerbi') currentCourseData = powerBiCourseData;
  else if (activeCourse === 'agentic_ai') currentCourseData = agenticAiCourseData;
  else if (activeCourse === 'python_fullstack') currentCourseData = pythonFullStackCourseData;
  else if (activeCourse === 'python_course') currentCourseData = pythonCourseData;
  else if (activeCourse === 'python_da') currentCourseData = pythonDaCourseData;
  else if (activeCourse === 'generative_ai_course') currentCourseData = generativeAiCourseData;
  else if (activeCourse === 'react_course') currentCourseData = reactCourseData;
  else if (activeCourse === 'git_github') currentCourseData = gitCourseData;
  else if (activeCourse === 'json_course') currentCourseData = jsonCourseData;
  else if (activeCourse === 'django_course') currentCourseData = djangoCourseData;
  else if (activeCourse === 'devops') currentCourseData = devopsCourseData;
  else if (activeCourse === 'stats_course') currentCourseData = statsCourseData;
  else if (activeCourse === 'numpy_course') currentCourseData = numpyCourseData;
  else if (activeCourse === 'pandas_course') currentCourseData = pandasCourseData;
  else if (activeCourse === 'matplotlib_course') currentCourseData = matplotlibCourseData;
  else if (activeCourse === 'seaborn_course') currentCourseData = seabornCourseData;
  else if (activeCourse === 'core_js') currentCourseData = coreJsCourseData;
  else if (activeCourse === 'induction') currentCourseData = inductionCourseData;
  else if (activeCourse === 'tally_prime') currentCourseData = tallyCourseData;
  else if (activeCourse === 'web_design_20days') currentCourseData = webDesignCourseData;
  else if (activeCourse === 'spoko_story') currentCourseData = spokoStoryCourseData;
  else if (activeCourse === 'spoko_pro' || activeCourse === 'softskills') currentCourseData = spokoProCourseData;
  else if (activeCourse === 'spoko_hr' || activeCourse === 'hr_interview_mastery') currentCourseData = spokoHrCourseData;
  else if (activeCourse === 'spoko_reasoning') currentCourseData = spokoReasoningCourseData;

  if (!session) {
    return (
      <Suspense fallback={
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#1e40af', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
      }>
        <LandingPage onLoginSuccess={handleLoginSuccess} />
      </Suspense>
    );
  }

  return (
    <div className="app">
      <Suspense fallback={
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#64748b' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#1e40af', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>Loading content...</p>
        </div>
      }>
      {activeCourse === 'dashboard' ? (
        <Dashboard
          onSelectCourse={handleSelectCourse}
          enrolledCourse={enrolledCourse}
          setEnrolledCourse={setEnrolledCourse}
          session={session}
          onLogout={handleLogout}
          completedLessons={completedLessons}
          taskSubmissions={taskSubmissions}
        />
      ) : (
        <>
          <div
            className={`sidebar-overlay ${isMobileMenuOpen ? 'mobile-open' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <Sidebar
            courseStructure={currentCourseData}
            activeNode={activeNode}
            onNavClick={handleNavClick}
            onBackToDashboard={() => setActiveCourse('dashboard')}
            isMobileMenuOpen={isMobileMenuOpen}
            completedLessons={completedLessons}
            activeCourse={activeCourse}
            session={session}
            taskSubmissions={taskSubmissions}
          />
          <div className="main-content" style={{ flex: 1, height: '100vh', overflowY: 'auto', backgroundColor: 'var(--bg-color)', width: '100%' }}>

            {/* Mobile Header — shown on tablet/mobile via responsive.css */}
            <div className="mobile-header">
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#1E3A8A' }}>
                {activeCourse === 'spoko_reasoning' ? 'Logical Reasoning & Analytical Thinking' : activeCourse === 'spoko_hr' || activeCourse === 'hr_interview_mastery' ? 'HR Interview Mastery' : activeCourse === 'spoko_pro' || activeCourse === 'softskills' ? 'Professional Track (Soft Skills)' : activeCourse === 'spoko_story' ? 'Spoko Story-Based English' : activeCourse === 'tally_prime' ? 'AI powered Tally' : activeCourse === 'html_css' ? 'HTML, CSS & Bootstrap' : activeCourse === 'javascript_course' ? 'AI-Powered JavaScript' : activeCourse === 'core_js' ? 'Core JavaScript' : activeCourse === 'react_course' ? 'AI-Powered React JS' : activeCourse === 'powerbi' ? 'AI-Powered Data Analytics' : activeCourse === 'agentic_ai' ? 'Agentic AI Development' : activeCourse === 'induction' ? 'Free Induction & Demo Sessions' : activeCourse === 'devops' ? 'DevOps & CI/CD' : activeCourse === 'numpy_course' ? 'NumPy for Data Science' : activeCourse === 'pandas_course' ? 'Pandas for Data Science' : activeCourse === 'matplotlib_course' ? 'Matplotlib for Data Science' : activeCourse === 'seaborn_course' ? 'Seaborn for Data Science' : 'AI-Powered SQL'}
              </h2>
              <button
                className="btn btn-outline"
                style={{ padding: '0.5rem' }}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>

            {activeNode.tabId === 'ai_workflow' ? (
              <AILearningStudio activeCourse={activeCourse} activeModuleId={activeNode.moduleId} openAITutor={openAITutor} />
            ) : (
              <>
                {/* Assignment & Staff Review Page — Applicable for All Courses */}
                {['assignment', 'assignment_work', 'assessment', 'submission', 'js_assignment', 'assignment_day7', 'assignment_day8'].includes(activeNode.tabId) ? (
                  <AssignmentSubmissionPage courseKey={activeCourse} moduleId={activeNode.moduleId} onNavigate={handleNavClick} session={session} />
                ) : (
                  <>
                    {activeNode.moduleId === 'module1' && <Day1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module2' && <Day2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'html_project' && <HTMLProject activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module3' && <CSSDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module4' && <CSSDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module5' && <CSSDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module6' && <CSSDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module7' && <CSSDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module8' && <CSSDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'bootstrap_day1' && <BootstrapDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'bootstrap_day2' && <BootstrapDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'module9' && <CSSFinalProject activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'html_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="html" />}
                    {activeNode.moduleId === 'css_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="css" />}
                    {activeNode.moduleId === 'bootstrap_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="bootstrap" />}
                    {activeNode.moduleId === 'web_design_day1' && <WebDesignDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day2' && <WebDesignDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day3' && <WebDesignDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day4' && <WebDesignDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day5' && <WebDesignDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day6' && <WebDesignDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day7' && <WebDesignDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day8' && <WebDesignDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day9' && <WebDesignDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day10' && <WebDesignDay10 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day11' && <WebDesignDay11 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                    {activeNode.moduleId === 'web_design_day12' && <WebDesignDay12 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                  </>
                )}

                {/* SQL Course Rendering */}
                {activeNode.moduleId === 'sql_module1' && <SQLDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module2' && <SQLDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module3' && <SQLDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module4' && <SQLDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module5' && <SQLDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module6' && <SQLDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module7' && <SQLDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module8' && <SQLDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_module9' && <SQLDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_final_project' && <SQLFinalProject activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_da_day8' && <SQLDADay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'sql_da_final_project' && <SQLDAFinalProject activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* JavaScript Capstone & AI Tools */}
                {activeNode.moduleId === 'js_final_projects' && <JSFinalProjects activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'js_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="js" />}

                {/* Power BI Course Rendering */}
                {activeNode.moduleId === 'powerbi_demo' && <PowerBIDemo activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module1' && <PowerBIDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module2' && <PowerBIDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module3' && <PowerBIDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module4' && <PowerBIDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module5' && <PowerBIDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module6' && <PowerBIDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module7' && <PowerBIDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module8' && <PowerBIDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'powerbi_module9' && <PowerBIProjects activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Tally Prime Course Rendering */}
                {activeNode.moduleId.startsWith('tally_') && (
                  <TallyCourseDay
                    dayId={
                      activeNode.moduleId === 'tally_prime_module1' || activeNode.moduleId === 'tally_module1' ? 'day1' :
                      activeNode.moduleId === 'tally_prime_module2' || activeNode.moduleId === 'tally_module2' ? 'day2' :
                      activeNode.moduleId === 'tally_prime_module3' || activeNode.moduleId === 'tally_module3' ? 'day3' :
                      activeNode.moduleId === 'tally_prime_module4' || activeNode.moduleId === 'tally_module4' ? 'day4' :
                      activeNode.moduleId === 'tally_prime_project1' || activeNode.moduleId === 'tally_project1' ? 'tally_project1' :
                      activeNode.moduleId === 'tally_prime_module5' || activeNode.moduleId === 'tally_module5' ? 'day5' :
                      activeNode.moduleId === 'tally_prime_module6' || activeNode.moduleId === 'tally_module6' ? 'day6' :
                      activeNode.moduleId === 'tally_prime_module7' || activeNode.moduleId === 'tally_module7' ? 'day7' :
                      activeNode.moduleId === 'tally_prime_module8' || activeNode.moduleId === 'tally_module8' ? 'day8' :
                      activeNode.moduleId === 'tally_prime_module9' || activeNode.moduleId === 'tally_module9' ? 'day9' :
                      activeNode.moduleId === 'tally_prime_project2' || activeNode.moduleId === 'tally_project2' || activeNode.moduleId === 'tally_prime_module10' ? 'day10' :
                      activeNode.moduleId === 'tally_prime_module11' || activeNode.moduleId === 'tally_module11' ? 'day11' :
                      activeNode.moduleId === 'tally_prime_module12' || activeNode.moduleId === 'tally_module12' ? 'day12' :
                      activeNode.moduleId === 'tally_prime_module13' || activeNode.moduleId === 'tally_module13' ? 'day13' :
                      activeNode.moduleId === 'tally_prime_module14' || activeNode.moduleId === 'tally_module14' ? 'day14' :
                      activeNode.moduleId === 'tally_prime_project3' || activeNode.moduleId === 'tally_project3' || activeNode.moduleId === 'tally_prime_module15' ? 'day15' :
                      activeNode.moduleId === 'tally_prime_module16' || activeNode.moduleId === 'tally_module16' ? 'day16' :
                      activeNode.moduleId === 'tally_prime_module17' || activeNode.moduleId === 'tally_module17' ? 'day17' :
                      activeNode.moduleId === 'tally_prime_module18' || activeNode.moduleId === 'tally_module18' ? 'day18' :
                      activeNode.moduleId === 'tally_prime_module19' || activeNode.moduleId === 'tally_module19' ? 'day19' :
                      activeNode.moduleId === 'tally_prime_project4' || activeNode.moduleId === 'tally_project4' || activeNode.moduleId === 'tally_prime_module20' ? 'day20' :
                      activeNode.moduleId === 'tally_prime_module21' || activeNode.moduleId === 'tally_module21' ? 'day21' :
                      activeNode.moduleId === 'tally_prime_module22' || activeNode.moduleId === 'tally_module22' ? 'day22' :
                      activeNode.moduleId === 'tally_prime_module23' || activeNode.moduleId === 'tally_module23' ? 'day23' :
                      activeNode.moduleId === 'tally_prime_module24' || activeNode.moduleId === 'tally_module24' ? 'day24' :
                      activeNode.moduleId === 'tally_prime_project5' || activeNode.moduleId === 'tally_project5' || activeNode.moduleId === 'tally_prime_module25' ? 'day25' :
                      activeNode.moduleId === 'tally_prime_module26' || activeNode.moduleId === 'tally_module26' ? 'day26' :
                      activeNode.moduleId === 'tally_prime_module27' || activeNode.moduleId === 'tally_module27' ? 'day27' :
                      activeNode.moduleId === 'tally_prime_module28' || activeNode.moduleId === 'tally_module28' ? 'day28' :
                      activeNode.moduleId === 'tally_prime_module29' || activeNode.moduleId === 'tally_module29' ? 'day29' :
                      activeNode.moduleId === 'tally_prime_project6' || activeNode.moduleId === 'tally_project6' || activeNode.moduleId === 'tally_prime_module30' || activeNode.moduleId === 'tally_module30' ? 'day30' :
                      activeNode.moduleId === 'tally_prime_final_project' || activeNode.moduleId === 'tally_final_project' || activeNode.moduleId === 'tally_prime_module31' || activeNode.moduleId === 'tally_module31' ? 'day31' :
                      activeNode.moduleId || activeNode.tabId || 'day1'
                    }
                    activeTab={activeNode.tabId}
                    activeModuleId={activeNode.moduleId}
                    onNavigate={handleNavClick}
                    openAITutor={openAITutor}
                    session={session}
                    onSubmitTask={() => setShowTaskModal(true)}
                  />
                )}

                {/* Agentic AI Course Rendering */}
                {activeNode.moduleId === 'agentic_ai_foundation' && activeNode.tabId === 'day1' && <AgenticAIDemo activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_foundation' && activeNode.tabId === 'day2' && <AgenticAIDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_foundation' && activeNode.tabId === 'day3' && <AgenticAIDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_foundation' && activeNode.tabId === 'day4' && <AgenticAIDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_foundation' && activeNode.tabId === 'day5' && <AgenticAIDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Agentic AI Module 2 & 3 Course Rendering */}
                {activeNode.moduleId === 'agentic_ai_module2' && activeNode.tabId === 'day6' && <AgenticAIDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module2' && activeNode.tabId === 'day7' && <AgenticAIDay7 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module2' && activeNode.tabId === 'day8' && <AgenticAIDay8 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module2' && activeNode.tabId === 'day9' && <AgenticAIDay9 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module2' && activeNode.tabId === 'day10' && <AgenticAIDay10 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module2' && activeNode.tabId === 'module2_project' && <GenAIModule2Project />}
                {activeNode.moduleId === 'agentic_ai_module3' && activeNode.tabId === 'day11' && <AgenticAIDay11 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module3' && activeNode.tabId === 'day12' && <AgenticAIDay12 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module3' && activeNode.tabId === 'day13' && <AgenticAIDay13 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module3' && activeNode.tabId === 'day14' && <AgenticAIDay14 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module3' && activeNode.tabId === 'day15' && <AgenticAIDay15 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module3' && activeNode.tabId === 'module3_project' && <AgenticAIModule3Project onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Agentic AI Module 4 — Flowise & Visual AI Agents */}
                {activeNode.moduleId === 'agentic_ai_module4' && activeNode.tabId === 'day16' && <AgenticAIDay16 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module4' && activeNode.tabId === 'day17' && <AgenticAIDay17 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module4' && activeNode.tabId === 'day18' && <AgenticAIDay18 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module4' && activeNode.tabId === 'day19' && <AgenticAIDay19 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module4' && activeNode.tabId === 'day20' && <AgenticAIDay20 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module4' && activeNode.tabId === 'module4_project' && <AgenticAIModule4Project onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Agentic AI Module 5 — LangChain & Agent Development */}
                {activeNode.moduleId === 'agentic_ai_module5' && activeNode.tabId === 'day21' && <AgenticAIDay21 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module5' && activeNode.tabId === 'day22' && <AgenticAIDay22 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module5' && activeNode.tabId === 'day23' && <AgenticAIDay23 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module5' && activeNode.tabId === 'day24' && <AgenticAIDay24 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module5' && activeNode.tabId === 'day25' && <AgenticAIDay25 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module5' && activeNode.tabId === 'module5_project' && <AgenticAIModule5Project onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Agentic AI Module 6 — LangGraph & Stateful Agents */}
                {activeNode.moduleId === 'agentic_ai_module6' && activeNode.tabId === 'day26' && <AgenticAIDay26 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module6' && activeNode.tabId === 'day27' && <AgenticAIDay27 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module6' && activeNode.tabId === 'day28' && <AgenticAIDay28 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module6' && activeNode.tabId === 'day29' && <AgenticAIDay29 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module6' && activeNode.tabId === 'day30' && <AgenticAIDay30 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module6' && activeNode.tabId === 'module6_project' && <AgenticAIModule6Project onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Agentic AI Module 7 — CrewAI Multi-Agent Systems */}
                {activeNode.moduleId === 'agentic_ai_module7' && activeNode.tabId === 'day31' && <AgenticAIDay31 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module7' && activeNode.tabId === 'day32' && <AgenticAIDay32 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module7' && activeNode.tabId === 'day33' && <AgenticAIDay33 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module7' && activeNode.tabId === 'day34' && <AgenticAIDay34 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module7' && activeNode.tabId === 'day35' && <AgenticAIDay35 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module7' && activeNode.tabId === 'module7_project' && <AgenticAIModule7Project onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Agentic AI Module 8 — Agno AI & Advanced Agent Development */}
                {activeNode.moduleId === 'agentic_ai_module8' && activeNode.tabId === 'day36' && <AgenticAIDay36 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module8' && activeNode.tabId === 'day37' && <AgenticAIDay37 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module8' && activeNode.tabId === 'day38' && <AgenticAIDay38 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module8' && activeNode.tabId === 'day39' && <AgenticAIDay39 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module8' && activeNode.tabId === 'day40' && <AgenticAIDay40 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'agentic_ai_module8' && activeNode.tabId === 'module8_project' && <AgenticAIModule8Project onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {activeNode.moduleId === 'generative_ai_demo' && <GenerativeAIDemo activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* AI Python Full Stack Demo Rendering */}
                {activeNode.moduleId === 'python_fullstack_demo' && <PythonFullStackDemo activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* Python Core & OOPs Course Rendering */}
                {activeNode.moduleId === 'python_day1' && <PythonDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day2' && <PythonDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day3' && <PythonDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day4' && <PythonDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_games' && <PythonGameProjects activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day5' && <PythonDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day6' && <PythonDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day7' && <PythonDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_apps' && <PythonApplicationProjects activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day8' && <PythonDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day9' && <PythonDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day10' && <PythonDay10 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day11' && <PythonDay11 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day12' && <PythonDay12 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_day13' && <PythonDay13 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_final_projects' && <PythonFinalProjects activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'python_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="python" />}
                {activeNode.moduleId === 'genai_module1' && activeNode.tabId === 'day1' && <GenAIDay1 activeTab="intro" onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module1' && activeNode.tabId === 'day2' && <GenAIDay2 activeTab="intro" onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module1' && activeNode.tabId === 'day3' && <GenAIDay3 activeTab="intro" onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module1' && activeNode.tabId === 'day4' && <GenAIDay4 activeTab="intro" onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module1' && activeNode.tabId === 'day5' && <GenAIDay5 openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module1' && activeNode.tabId === 'mini_project' && <GenAIMiniProject />}
                {activeNode.moduleId === 'genai_module2' && activeNode.tabId === 'day6' && <GenAIDay6 activeTab="intro" onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module2' && activeNode.tabId === 'day7' && <GenAIDay7 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module2' && activeNode.tabId === 'day8' && <GenAIDay8 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module2' && activeNode.tabId === 'day9' && <GenAIDay9 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module2' && activeNode.tabId === 'day10' && <GenAIDay10 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module2' && activeNode.tabId === 'module2_project' && <GenAIModule2Project />}
                {activeNode.moduleId === 'genai_module3' && activeNode.tabId === 'day11' && <GenAIDay11 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module3' && activeNode.tabId === 'day12' && <GenAIDay12 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module3' && activeNode.tabId === 'day13' && <GenAIDay13 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module3' && activeNode.tabId === 'day14' && <GenAIDay14 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module3' && activeNode.tabId === 'day15' && <GenAIDay15 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module4' && activeNode.tabId === 'day16' && <GenAIDay16 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module4' && activeNode.tabId === 'day17' && <GenAIDay17 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module4' && activeNode.tabId === 'day18' && <GenAIDay18 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module4' && activeNode.tabId === 'day19' && <GenAIDay19 onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'genai_module4' && activeNode.tabId === 'day20' && <GenAIDay20 onNavigate={handleNavClick} openAITutor={openAITutor} />}

                {/* React Course Rendering */}
                {activeNode.moduleId === 'react_js_essentials' && <ReactJSEssentials activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module1' && <ReactDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module2' && <ReactDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module3' && <ReactDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module4' && <ReactDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module5' && <ReactDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module6' && <ReactDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module7' && <ReactDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module8' && <ReactDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module9' && <ReactDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module10' && <ReactDay10 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module11' && <ReactDay11 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module12' && <ReactDay12 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module13' && <ReactDay13 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module14' && <ReactDay14 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_module15' && <ReactDay15 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'git_module1' && <GitDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'git_module2' && <GitDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'json_module1' && <JSONDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module1' && <DjangoDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module2' && <DjangoDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module3' && <DjangoDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module4' && <DjangoDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module5' && <DjangoDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module6' && <DjangoDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module7' && <DjangoDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module8' && <DjangoDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module9' && <DjangoDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module10' && <DjangoDay10 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module11' && <DjangoDay11 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module12' && <DjangoDay12 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module13' && <DjangoDay13 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module14' && <DjangoDay14 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'django_module15' && <DjangoDay15 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'devops_module1' && <DevOpsDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'devops_module2' && <DevOpsDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'devops_module3' && <DevOpsDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'react_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="react" />}
                {activeNode.moduleId === 'git_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="git" />}
                {activeNode.moduleId === 'json_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="json" />}
                {activeNode.moduleId === 'django_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="django" />}
                {activeNode.moduleId === 'devops_ai_module' && <AIPowerTools activeTab={activeNode.tabId} onNavigate={handleNavClick} course="devops" />}

                {/* Statistics Course Rendering */}
                {activeNode.moduleId === 'stats_day1' && <StatsDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day2' && <StatsDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day3' && <StatsDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day4' && <StatsDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day5' && <StatsDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day6' && <StatsDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day7' && <StatsDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day8' && <StatsDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day9' && <StatsDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day10' && <StatsDay10 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day11' && <StatsDay11 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day12' && <StatsDay12 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day13' && <StatsDay13 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day14' && <StatsDay14 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day15' && <StatsDay15 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day16' && <StatsDay16 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_day17' && <StatsDay17 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_mini_projects' && <StatsMiniProjects activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'stats_final_project' && <StatsFinalProject activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'numpy_day1' && <NumpyDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'numpy_day2' && <NumpyDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'numpy_day3' && <NumpyDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'numpy_day4' && <NumpyDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'numpy_day5' && <NumpyDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'numpy_day6' && <NumpyDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'pandas_day1' && <PandasDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'pandas_day2' && <PandasDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'pandas_day3' && <PandasDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'pandas_day4' && <PandasDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'pandas_day5' && <PandasDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'pandas_day6' && <PandasDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'matplotlib_day1' && <MatplotlibDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'matplotlib_day2' && <MatplotlibDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'matplotlib_day3' && <MatplotlibDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'matplotlib_day4' && <MatplotlibDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'matplotlib_day5' && <MatplotlibDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'seaborn_day1' && <SeabornDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'seaborn_day2' && <SeabornDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'seaborn_day3' && <SeabornDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'seaborn_day4' && <SeabornDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day1' && <CoreJSDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day2' && <CoreJSDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day3' && <CoreJSDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day4' && <CoreJSDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day5' && <CoreJSDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day6' && <CoreJSDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day7' && <CoreJSDay7 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day8' && <CoreJSDay8 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day9' && <CoreJSDay9 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId === 'core_js_day10' && <CoreJSDay10 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} />}
                {activeNode.moduleId.startsWith('stats_day') && !['stats_day1', 'stats_day2', 'stats_day3', 'stats_day4', 'stats_day5', 'stats_day6', 'stats_day7', 'stats_day8', 'stats_day9', 'stats_day10', 'stats_day11', 'stats_day12', 'stats_day13', 'stats_day14', 'stats_day15', 'stats_day16', 'stats_day17', 'stats_mini_projects', 'stats_final_project'].includes(activeNode.moduleId) && <StatsDayPlaceholder activeTab={activeNode.tabId} onNavigate={handleNavClick} dayTitle={activeNode.moduleId.replace('stats_day', 'Day ')} />}

                {/* Spoko Story-Based English Course Rendering */}
                {activeNode.moduleId === 'spoko_story_day1' && <SpokoStoryDay1 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} session={session} />}
                {activeNode.moduleId === 'spoko_story_day2' && <SpokoStoryDay2 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} session={session} />}
                {activeNode.moduleId === 'spoko_story_day3' && <SpokoStoryDay3 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} session={session} />}
                {activeNode.moduleId === 'spoko_story_day4' && <SpokoStoryDay4 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} session={session} />}
                {activeNode.moduleId === 'spoko_story_day5' && <SpokoStoryDay5 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} session={session} />}
                {activeNode.moduleId === 'spoko_story_day6' && <SpokoStoryDay6 activeTab={activeNode.tabId} onNavigate={handleNavClick} openAITutor={openAITutor} session={session} />}

                {/* Spoko Professional Track (Soft Skills) Course Rendering */}
                {activeNode.moduleId.startsWith('spoko_pro_topic') && (
                  <SpokoProTopic
                    topic={parseInt(activeNode.moduleId.replace('spoko_pro_topic', '')) || 1}
                    activeTab={activeNode.tabId}
                    onNavigate={handleNavClick}
                    openAITutor={openAITutor}
                    session={session}
                  />
                )}

                {/* Spoko HR Interview Mastery Course Rendering */}
                {(activeCourse === 'spoko_hr' || activeCourse === 'hr_interview_mastery' || activeNode.moduleId?.startsWith('spoko_hr_')) && (
                  <SpokoHrCourse
                    activeNode={activeNode}
                    onNavigate={handleNavClick}
                    session={session}
                    completedLessons={completedLessons}
                  />
                )}

                {/* Spoko Logical Reasoning & Analytical Thinking (Level 1: Day 1, Day 2, Day 3, Day 4) Rendering */}
                {(activeCourse === 'spoko_reasoning' || activeNode.moduleId?.startsWith('spoko_reasoning_')) && (
                  activeNode.moduleId === 'spoko_reasoning_l1_d2' ? (
                    <SpokoReasoningDay2
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l1_d3' ? (
                    <SpokoReasoningDay3
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l1_d4' ? (
                    <SpokoReasoningDay4
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l1_d5' ? (
                    <SpokoReasoningDay5
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l1_d6' ? (
                    <SpokoReasoningDay6
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l1_d7' ? (
                    <SpokoReasoningDay7
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l2_d8' ? (
                    <SpokoReasoningDay8
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l2_d9' ? (
                    <SpokoReasoningDay9
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l2_d10' ? (
                    <SpokoReasoningDay10
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l2_d11' ? (
                    <SpokoReasoningDay11
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l3_d12' ? (
                    <SpokoReasoningLevel3Day12
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : activeNode.moduleId === 'spoko_reasoning_l3_d13' ? (
                    <SpokoReasoningLevel3Day13
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d14' || activeNode.moduleId === 'spoko_reasoning_l3_d3') ? (
                    <SpokoReasoningLevel3Day14
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d15' || activeNode.moduleId === 'spoko_reasoning_l3_d4') ? (
                    <SpokoReasoningLevel3Day15
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d16' || activeNode.moduleId === 'spoko_reasoning_l3_d5') ? (
                    <SpokoReasoningLevel3Day16
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d17' || activeNode.moduleId === 'spoko_reasoning_l3_d6') ? (
                    <SpokoReasoningLevel3Day17
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d18' || activeNode.moduleId === 'spoko_reasoning_l3_d7') ? (
                    <SpokoReasoningLevel3Day18
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d19' || activeNode.moduleId === 'spoko_reasoning_l3_d8') ? (
                    <SpokoReasoningLevel3Day19
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d20' || activeNode.moduleId === 'spoko_reasoning_l3_d9') ? (
                    <SpokoReasoningLevel3Day20
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (activeNode.moduleId === 'spoko_reasoning_l3_d21' || activeNode.moduleId === 'spoko_reasoning_l3_d10') ? (
                    <SpokoReasoningLevel3Day21
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  ) : (
                    <SpokoReasoningDay1
                      activeTab={activeNode.tabId}
                      onNavigate={handleNavClick}
                      session={session}
                      completedLessons={completedLessons}
                    />
                  )
                )}
              </>
            )}

            {/* 🔽 TOPIC PROGRESS BAR AT BOTTOM OF EACH TOPIC */}
            {session?.role === 'student' && activeCourse !== 'spoko_pro' && activeCourse !== 'spoko_hr' && activeCourse !== 'hr_interview_mastery' && activeCourse !== 'spoko_reasoning' && activeNode.tabId !== 'ai_workflow' && !['assignment', 'assignment_work', 'assessment', 'submission', 'js_assignment', 'assignment_day7', 'assignment_day8'].includes(activeNode.tabId) && (
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--surface-border)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                marginTop: '2.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    Topic Progress:
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    background: '#f1f5f9',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '8px'
                  }}>
                    {currentCourseData?.flatMap(m => m.items || [])?.find(item => item.id === activeNode?.tabId)?.label || 'Lesson Content'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Mark Complete Checkbox Button */}
                  {(() => {
                    const currentLessonKey = `${activeCourse}:${activeNode.moduleId}:${activeNode.tabId}`;
                    const isCompleted = completedLessons.includes(currentLessonKey) ||
                      completedLessons.includes(`${activeNode.moduleId}:${activeNode.tabId}`);
                    return (
                      <button
                        onClick={() => toggleLessonCompletion(currentLessonKey, !isCompleted)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '1px solid',
                          borderColor: isCompleted ? '#10b981' : '#cbd5e1',
                          background: isCompleted ? '#d1fae5' : '#ffffff',
                          color: isCompleted ? '#065f46' : '#475569',
                          padding: '0.5rem 1rem',
                          borderRadius: '10px',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isCompleted ? '0 2px 4px rgba(16, 185, 129, 0.1)' : 'none'
                        }}
                      >
                        <CheckCircle size={16} color={isCompleted ? '#10b981' : '#64748b'} fill={isCompleted ? '#ffffff' : 'transparent'} />
                        {isCompleted ? 'Completed 🎉' : 'Mark Completed'}
                      </button>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
          <FloatingAITutor
            isOpen={tutorOpen}
            onOpen={() => setTutorOpen(true)}
            onClose={() => setTutorOpen(false)}
            initialQuestion={initialQuestion}
            activeCourse={activeCourse}
          />
        </>
      )}

      {/* 📝 TASK SUBMISSION MODAL */}
      {showTaskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '520px',
            padding: '2.25rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem 0', fontFamily: 'system-ui' }}>
              Submit Topic Assignment
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 1.5rem 0', lineHeight: 1.4, fontFamily: 'system-ui' }}>
              {activeCourse === 'tally_prime' || activeNode?.moduleId?.startsWith('tally_')
                ? 'Submit your assignment link (Google Drive / cloud backup / screenshot) or type your journal entries and answers below.'
                : 'Submit your code repository link, event host URL, or a text explanation of your solution.'}
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              submitTask(activeNode.moduleId, activeNode.tabId, taskSubmitUrl, taskSubmitNotes);
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  {activeCourse === 'tally_prime' || activeNode?.moduleId?.startsWith('tally_')
                    ? 'Submission URL (Google Drive, Cloud Link, or Screenshots — Optional)'
                    : 'Submission URL (GitHub, Netlify, Vercel, CodePen, etc.)'}
                </label>
                <input
                  type="url"
                  placeholder={activeCourse === 'tally_prime' || activeNode?.moduleId?.startsWith('tally_')
                    ? 'https://drive.google.com/... (optional if answering below)'
                    : 'https://github.com/your-username/project-repo'}
                  value={taskSubmitUrl}
                  onChange={(e) => setTaskSubmitUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  {activeCourse === 'tally_prime' || activeNode?.moduleId?.startsWith('tally_')
                    ? 'Journal Entries / Ledger Details / Answer Text'
                    : 'Submission Details / Code Snippets / Notes'}
                </label>
                <textarea
                  placeholder={activeCourse === 'tally_prime' || activeNode?.moduleId?.startsWith('tally_')
                    ? 'Type your journal entries, ledger groups, voucher steps, or answer text...'
                    : 'Describe your implementation details, paste short scripts, or provide answer text...'}
                  rows={4}
                  value={taskSubmitNotes}
                  onChange={(e) => setTaskSubmitNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskModal(false);
                    setTaskSubmitUrl('');
                    setTaskSubmitNotes('');
                  }}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={taskSubmitLoading}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: 'var(--glow-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {taskSubmitLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🛡️ STUDENT ADMISSION STATUS MODAL */}
      <StudentAdmissionStatusModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        session={session}
        requestedCourseName={admissionBlockedCourse || activeCourse}
      />
      </Suspense>
    </div>
  );
}

export default App;
