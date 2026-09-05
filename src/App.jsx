import React, { useState, useEffect } from 'react';
import { Menu, CheckCircle, Send } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboards/Dashboard';
import Day1 from './pages/html-css/Day1';
import Day2 from './pages/html-css/Day2';
import HTMLProject from './pages/html-css/HTMLProject';
import CSSDay1 from './pages/html-css/CSSDay1';
import CSSDay2 from './pages/html-css/CSSDay2';
import CSSDay3 from './pages/html-css/CSSDay3';
import CSSDay4 from './pages/html-css/CSSDay4';
import CSSDay5 from './pages/html-css/CSSDay5';
import CSSDay6 from './pages/html-css/CSSDay6';
import CSSFinalProject from './pages/html-css/CSSFinalProject';
import BootstrapDay1 from './pages/html-css/BootstrapDay1';
import BootstrapDay2 from './pages/html-css/BootstrapDay2';
import SQLDay1 from './pages/sql/SQLDay1';
import SQLDay2 from './pages/sql/SQLDay2';
import SQLDay3 from './pages/sql/SQLDay3';
import SQLDay4 from './pages/sql/SQLDay4';
import SQLDay5 from './pages/sql/SQLDay5';
import SQLDay6 from './pages/sql/SQLDay6';
import SQLDay7 from './pages/sql/SQLDay7';
import SQLDay8 from './pages/sql/SQLDay8';
import SQLDay9 from './pages/sql/SQLDay9';
import SQLFinalProject from './pages/sql/SQLFinalProject';
import SQLDADay8 from './pages/sql/SQLDADay8';
import SQLDAFinalProject from './pages/sql/SQLDAFinalProject';
import PowerBIDemo from './pages/powerbi/PowerBIDemo';
import PowerBIDay1 from './pages/powerbi/PowerBIDay1';
import PowerBIDay2 from './pages/powerbi/PowerBIDay2';
import PowerBIDay3 from './pages/powerbi/PowerBIDay3';
import PowerBIDay4 from './pages/powerbi/PowerBIDay4';
import PowerBIDay5 from './pages/powerbi/PowerBIDay5';
import PowerBIDay6 from './pages/powerbi/PowerBIDay6';
import PowerBIDay7 from './pages/powerbi/PowerBIDay7';
import PowerBIDay8 from './pages/powerbi/PowerBIDay8';
import PowerBIProjects from './pages/powerbi/PowerBIProjects';
import AgenticAIDemo from './pages/agentic-ai/AgenticAIDemo';
import AgenticAIDay2 from './pages/agentic-ai/AgenticAIDay2';
import AgenticAIDay3 from './pages/agentic-ai/AgenticAIDay3';
import AgenticAIDay4 from './pages/agentic-ai/AgenticAIDay4';
import AgenticAIDay5 from './pages/agentic-ai/AgenticAIDay5';
import AgenticAIDay6 from './pages/agentic-ai/AgenticAIDay6';
import AgenticAIDay7 from './pages/agentic-ai/AgenticAIDay7';
import AgenticAIDay8 from './pages/agentic-ai/AgenticAIDay8';
import AgenticAIDay9 from './pages/agentic-ai/AgenticAIDay9';
import AgenticAIDay10 from './pages/agentic-ai/AgenticAIDay10';
import AgenticAIDay11 from './pages/agentic-ai/AgenticAIDay11';
import AgenticAIDay12 from './pages/agentic-ai/AgenticAIDay12';
import AgenticAIDay13 from './pages/agentic-ai/AgenticAIDay13';
import AgenticAIDay14 from './pages/agentic-ai/AgenticAIDay14';
import AgenticAIDay15 from './pages/agentic-ai/AgenticAIDay15';
import AgenticAIDay16 from './pages/agentic-ai/AgenticAIDay16';
import AgenticAIDay17 from './pages/agentic-ai/AgenticAIDay17';
import AgenticAIDay18 from './pages/agentic-ai/AgenticAIDay18';
import AgenticAIDay19 from './pages/agentic-ai/AgenticAIDay19';
import AgenticAIDay20 from './pages/agentic-ai/AgenticAIDay20';
import AgenticAIDay21 from './pages/agentic-ai/AgenticAIDay21';
import AgenticAIDay22 from './pages/agentic-ai/AgenticAIDay22';
import AgenticAIDay23 from './pages/agentic-ai/AgenticAIDay23';
import AgenticAIDay24 from './pages/agentic-ai/AgenticAIDay24';
import AgenticAIDay25 from './pages/agentic-ai/AgenticAIDay25';
import AgenticAIDay26 from './pages/agentic-ai/AgenticAIDay26';
import AgenticAIDay27 from './pages/agentic-ai/AgenticAIDay27';
import AgenticAIDay28 from './pages/agentic-ai/AgenticAIDay28';
import AgenticAIDay29 from './pages/agentic-ai/AgenticAIDay29';
import AgenticAIDay30 from './pages/agentic-ai/AgenticAIDay30';
import AgenticAIDay31 from './pages/agentic-ai/AgenticAIDay31';
import AgenticAIDay32 from './pages/agentic-ai/AgenticAIDay32';
import AgenticAIDay33 from './pages/agentic-ai/AgenticAIDay33';
import AgenticAIDay34 from './pages/agentic-ai/AgenticAIDay34';
import AgenticAIDay35 from './pages/agentic-ai/AgenticAIDay35';
import AgenticAIModule3Project from './pages/agentic-ai/AgenticAIModule3Project';
import AgenticAIModule4Project from './pages/agentic-ai/AgenticAIModule4Project';
import AgenticAIModule5Project from './pages/agentic-ai/AgenticAIModule5Project';
import AgenticAIModule6Project from './pages/agentic-ai/AgenticAIModule6Project';
import AgenticAIModule7Project from './pages/agentic-ai/AgenticAIModule7Project';
import AgenticAIDay36 from './pages/agentic-ai/AgenticAIDay36';
import AgenticAIDay37 from './pages/agentic-ai/AgenticAIDay37';
import AgenticAIDay38 from './pages/agentic-ai/AgenticAIDay38';
import AgenticAIDay39 from './pages/agentic-ai/AgenticAIDay39';
import AgenticAIDay40 from './pages/agentic-ai/AgenticAIDay40';
import AgenticAIModule8Project from './pages/agentic-ai/AgenticAIModule8Project';
import GenerativeAIDemo from './pages/generative-ai/GenerativeAIDemo';
import PythonFullStackDemo from './pages/python/PythonFullStackDemo';
import PythonDay1 from './pages/python/PythonDay1';
import PythonDay2 from './pages/python/PythonDay2';
import PythonDay3 from './pages/python/PythonDay3';
import PythonDay4 from './pages/python/PythonDay4';
import PythonGameProjects from './pages/python/PythonGameProjects';
import PythonDay5 from './pages/python/PythonDay5';
import PythonDay6 from './pages/python/PythonDay6';
import PythonDay7 from './pages/python/PythonDay7';
import PythonApplicationProjects from './pages/python/PythonApplicationProjects';
import PythonDay8 from './pages/python/PythonDay8';
import PythonDay9 from './pages/python/PythonDay9';
import PythonDay10 from './pages/python/PythonDay10';
import PythonDay11 from './pages/python/PythonDay11';
import PythonDay12 from './pages/python/PythonDay12';
import PythonDay13 from './pages/python/PythonDay13';
import PythonFinalProjects from './pages/python/PythonFinalProjects';
import GenAIDay1 from './pages/generative-ai/GenAIDay1';
import GenAIDay2 from './pages/generative-ai/GenAIDay2';
import GenAIDay3 from './pages/generative-ai/GenAIDay3';
import GenAIDay4 from './pages/generative-ai/GenAIDay4';
import GenAIDay5 from './pages/generative-ai/GenAIDay5';
import GenAIDay6 from './pages/generative-ai/GenAIDay6';
import GenAIDay7 from './pages/generative-ai/GenAIDay7';
import GenAIDay8 from './pages/generative-ai/GenAIDay8';
import GenAIDay9 from './pages/generative-ai/GenAIDay9';
import GenAIDay10 from './pages/generative-ai/GenAIDay10';
import GenAIDay11 from './pages/generative-ai/GenAIDay11';
import GenAIDay12 from './pages/generative-ai/GenAIDay12';
import GenAIDay13 from './pages/generative-ai/GenAIDay13';
import GenAIDay14 from './pages/generative-ai/GenAIDay14';
import GenAIDay15 from './pages/generative-ai/GenAIDay15';
import GenAIDay16 from './pages/generative-ai/GenAIDay16';
import GenAIDay17 from './pages/generative-ai/GenAIDay17';
import GenAIDay18 from './pages/generative-ai/GenAIDay18';
import GenAIDay19 from './pages/generative-ai/GenAIDay19';
import GenAIDay20 from './pages/generative-ai/GenAIDay20';
import GenAIModule2Project from './pages/generative-ai/GenAIModule2Project';
import GenAIMiniProject from './pages/generative-ai/GenAIMiniProject';
import JSDay1 from './pages/javascript/JSDay1';
import JSDay2 from './pages/javascript/JSDay2';
import JSDay3 from './pages/javascript/JSDay3';
import JSDay4 from './pages/javascript/JSDay4';
import JSDay5 from './pages/javascript/JSDay5';
import JSDay6 from './pages/javascript/JSDay6';
import JSDay7 from './pages/javascript/JSDay7';
import JSDay8 from './pages/javascript/JSDay8';
import JSDay9 from './pages/javascript/JSDay9';
import JSDay10 from './pages/javascript/JSDay10';
import JSFinalProjects from './pages/javascript/JSFinalProjects';
import AIPowerTools from './pages/ai/AIPowerTools';
import FloatingAITutor from './components/FloatingAITutor';
import AILearningStudio from './components/AILearningStudio';
import LandingPage from './pages/dashboards/LandingPage';
import ReactJSEssentials from './pages/react/ReactJSEssentials';
import ReactDay1 from './pages/react/ReactDay1';
import ReactDay2 from './pages/react/ReactDay2';
import ReactDay3 from './pages/react/ReactDay3';
import ReactDay4 from './pages/react/ReactDay4';
import ReactDay5 from './pages/react/ReactDay5';
import ReactDay6 from './pages/react/ReactDay6';
import ReactDay7 from './pages/react/ReactDay7';
import ReactDay8 from './pages/react/ReactDay8';
import ReactDay9 from './pages/react/ReactDay9';
import ReactDay10 from './pages/react/ReactDay10';
import ReactDay11 from './pages/react/ReactDay11';
import ReactDay12 from './pages/react/ReactDay12';
import ReactDay13 from './pages/react/ReactDay13';
import ReactDay14 from './pages/react/ReactDay14';
import ReactDay15 from './pages/react/ReactDay15';
import GitDay1 from './pages/git/GitDay1';
import GitDay2 from './pages/git/GitDay2';
import JSONDay1 from './pages/json/JSONDay1';
import DjangoDay1 from './pages/django/DjangoDay1';
import DjangoDay2 from './pages/django/DjangoDay2';
import DjangoDay3 from './pages/django/DjangoDay3';
import DjangoDay4 from './pages/django/DjangoDay4';
import DjangoDay5 from './pages/django/DjangoDay5';
import DjangoDay6 from './pages/django/DjangoDay6';
import DjangoDay7 from './pages/django/DjangoDay7';
import DjangoDay8 from './pages/django/DjangoDay8';
import DjangoDay9 from './pages/django/DjangoDay9';
import DjangoDay10 from './pages/django/DjangoDay10';
import DjangoDay11 from './pages/django/DjangoDay11';
import DjangoDay12 from './pages/django/DjangoDay12';
import DjangoDay13 from './pages/django/DjangoDay13';
import DjangoDay14 from './pages/django/DjangoDay14';
import DjangoDay15 from './pages/django/DjangoDay15';
import DevOpsDay1 from './pages/devops/DevOpsDay1';
import DevOpsDay2 from './pages/devops/DevOpsDay2';
import DevOpsDay3 from './pages/devops/DevOpsDay3';
import StatsDay1 from './pages/statistics/StatsDay1';
import StatsDay2 from './pages/statistics/StatsDay2';
import StatsDay3 from './pages/statistics/StatsDay3';
import StatsDay4 from './pages/statistics/StatsDay4';
import StatsDay5 from './pages/statistics/StatsDay5';
import StatsDay6 from './pages/statistics/StatsDay6';
import StatsDay7 from './pages/statistics/StatsDay7';
import StatsDay8 from './pages/statistics/StatsDay8';
import StatsDay9 from './pages/statistics/StatsDay9';
import StatsDay10 from './pages/statistics/StatsDay10';
import StatsDay11 from './pages/statistics/StatsDay11';
import StatsDay12 from './pages/statistics/StatsDay12';
import StatsDay13 from './pages/statistics/StatsDay13';
import StatsDay14 from './pages/statistics/StatsDay14';
import StatsDay15 from './pages/statistics/StatsDay15';
import StatsDay16 from './pages/statistics/StatsDay16';
import StatsDay17 from './pages/statistics/StatsDay17';
import StatsMiniProjects from './pages/statistics/StatsMiniProjects';
import StatsFinalProject from './pages/statistics/StatsFinalProject';
import StatsDayPlaceholder from './pages/statistics/StatsDayPlaceholder';
import NumpyDay1 from './pages/numpy/NumpyDay1';
import NumpyDay2 from './pages/numpy/NumpyDay2';
import NumpyDay3 from './pages/numpy/NumpyDay3';
import NumpyDay4 from './pages/numpy/NumpyDay4';
import NumpyDay5 from './pages/numpy/NumpyDay5';
import NumpyDay6 from './pages/numpy/NumpyDay6';
import PandasDay1 from './pages/pandas/PandasDay1';
import PandasDay2 from './pages/pandas/PandasDay2';
import PandasDay3 from './pages/pandas/PandasDay3';
import PandasDay4 from './pages/pandas/PandasDay4';
import PandasDay5 from './pages/pandas/PandasDay5';
import PandasDay6 from './pages/pandas/PandasDay6';
import MatplotlibDay1 from './pages/matplotlib/MatplotlibDay1';
import MatplotlibDay2 from './pages/matplotlib/MatplotlibDay2';
import MatplotlibDay3 from './pages/matplotlib/MatplotlibDay3';
import MatplotlibDay4 from './pages/matplotlib/MatplotlibDay4';
import MatplotlibDay5 from './pages/matplotlib/MatplotlibDay5';
import SeabornDay1 from './pages/seaborn/SeabornDay1';
import SeabornDay2 from './pages/seaborn/SeabornDay2';
import SeabornDay3 from './pages/seaborn/SeabornDay3';
import SeabornDay4 from './pages/seaborn/SeabornDay4';
import CoreJSDay1 from './pages/javascript/CoreJSDay1';
import CoreJSDay2 from './pages/javascript/CoreJSDay2';
import CoreJSDay3 from './pages/javascript/CoreJSDay3';
import CoreJSDay4 from './pages/javascript/CoreJSDay4';
import CoreJSDay5 from './pages/javascript/CoreJSDay5';
import CoreJSDay6 from './pages/javascript/CoreJSDay6';
import CoreJSDay7 from './pages/javascript/CoreJSDay7';
import CoreJSDay8 from './pages/javascript/CoreJSDay8';
import CoreJSDay9 from './pages/javascript/CoreJSDay9';
import CoreJSDay10 from './pages/javascript/CoreJSDay10';
import WebDesignDay1 from './pages/web-design/WebDesignDay1';
import WebDesignDay2 from './pages/web-design/WebDesignDay2';
import WebDesignDay3 from './pages/web-design/WebDesignDay3';
import WebDesignDay4 from './pages/web-design/WebDesignDay4';
import WebDesignDay5 from './pages/web-design/WebDesignDay5';
import WebDesignDay6 from './pages/web-design/WebDesignDay6';
import WebDesignDay7 from './pages/web-design/WebDesignDay7';
import WebDesignDay8 from './pages/web-design/WebDesignDay8';
import WebDesignDay9 from './pages/web-design/WebDesignDay9';
import WebDesignDay10 from './pages/web-design/WebDesignDay10';
import WebDesignDay11 from './pages/web-design/WebDesignDay11';
import WebDesignDay12 from './pages/web-design/WebDesignDay12';
import { htmlCourseData, sqlCourseData, summerSqlCourseData, daSqlCourseData, powerBiCourseData, agenticAiCourseData, inductionCourseData, pythonFullStackCourseData, pythonCourseData, pythonDaCourseData, generativeAiCourseData, reactCourseData, gitCourseData, jsonCourseData, djangoCourseData, devopsCourseData, statsCourseData, numpyCourseData, coreJsCourseData, pandasCourseData, matplotlibCourseData, seabornCourseData, tallyCourseData, webDesignCourseData } from './courseData';
import TallyCourseDay from './pages/tally/TallyCourseDay';
import AssignmentSubmissionPage from './components/AssignmentSubmissionPage';
import { isModuleLocked, getLockReason } from './utils/htmlCssLocking';
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
            const me = list.find(s => s.accessCode === session.accessCode);
            if (me) {
              setCompletedLessons(me.completedLessons || []);
              setTaskSubmissions(me.tasks || []);
            }
          }
        } catch (e) {
          console.warn('Failed to load student progress:', e);
        }
      };
      fetchStudentData();
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
      web_design_20days: webDesignCourseData
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
    const enrolledCoursesList = session?.enrolledCourse ? session.enrolledCourse.split(',') : [];
    const isEnrolled = session?.enrolledCourse === 'all' || enrolledCoursesList.includes(course);
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

      if (course === 'tally_prime') {
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
          web_design_20days: webDesignCourseData
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

  if (!session) {
    return <LandingPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
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
                {activeCourse === 'tally_prime' ? 'AI powered Tally' : activeCourse === 'html_css' ? 'HTML, CSS & Bootstrap' : activeCourse === 'javascript_course' ? 'AI-Powered JavaScript' : activeCourse === 'core_js' ? 'Core JavaScript' : activeCourse === 'react_course' ? 'AI-Powered React JS' : activeCourse === 'powerbi' ? 'AI-Powered Data Analytics' : activeCourse === 'agentic_ai' ? 'Agentic AI Development' : activeCourse === 'induction' ? 'Free Induction & Demo Sessions' : activeCourse === 'devops' ? 'DevOps & CI/CD' : activeCourse === 'numpy_course' ? 'NumPy for Data Science' : activeCourse === 'pandas_course' ? 'Pandas for Data Science' : activeCourse === 'matplotlib_course' ? 'Matplotlib for Data Science' : activeCourse === 'seaborn_course' ? 'Seaborn for Data Science' : 'AI-Powered SQL'}
              </h2>
              <button
                className="btn btn-outline"
                style={{ padding: '0.5rem' }}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>

            {session?.role === 'student' && activeNode.tabId !== 'ai_workflow' && (
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--surface-border)',
                borderRadius: '16px',
                padding: '1rem 1.5rem',
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

                  {/* Task Submission Button — Navigates directly to the Assignment Submission Page */}
                  {/* <button
                    onClick={() => handleNavClick(activeNode.moduleId, 'assignment')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--glow-primary)'
                    }}
                    title="Go to Assignment Page to submit assignment and student feedback"
                  >
                    <Send size={16} /> Submit Assignment
                  </button> */}
                </div>
              </div>
            )}

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
                    dayId={activeNode.tabId}
                    onNavigate={handleNavClick}
                    openAITutor={openAITutor}
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
              </>
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
              Submit your code repository link, event host URL, or a text explanation of your solution.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              submitTask(activeNode.moduleId, activeNode.tabId, taskSubmitUrl, taskSubmitNotes);
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', fontFamily: 'system-ui' }}>
                  Submission URL (GitHub, Netlify, Vercel, CodePen, etc.)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/project-repo"
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
                  Submission Details / Code Snippets / Notes
                </label>
                <textarea
                  placeholder="Describe your implementation details, paste short scripts, or provide answer text..."
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
    </div>
  );
}

export default App;
