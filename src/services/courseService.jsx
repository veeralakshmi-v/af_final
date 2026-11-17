import React from 'react';
import {
  Monitor, FileSpreadsheet, Calculator, Code, Globe, Megaphone,
  Palette, GraduationCap, Layers, BarChart3, MessageCircle, Bot,
  BookOpen, Database, Sparkles, Server, Cpu, Table, PieChart,
  Activity, MessageSquare, Brain, FileCode2, Cloud, GitBranch,
  Users, CheckCircle, HelpCircle, Box
} from 'lucide-react';

const API_BASE = '/api';
const CACHE_KEY = 'lms_cached_courses_catalog';

/**
 * Fetch all published courses from the database.
 * If featuredOnly is true, returns courses designated for the landing page.
 */
export async function getCoursesFromDb(featuredOnly = true) {
  try {
    const url = `${API_BASE}/courses${featuredOnly ? '?featured=true' : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      }
      return data;
    }
  } catch (err) {
    console.warn('⚠️ Failed to fetch courses from API, checking local cache:', err.message);
  }

  // Fallback to cached copy in localStorage if available
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {}
  }

  return [];
}

/**
 * Fetch a single course with its complete modules and syllabus from the database.
 */
export async function getCourseByIdFromDb(courseId) {
  try {
    const res = await fetch(`${API_BASE}/courses/${courseId}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`⚠️ Failed to fetch course ${courseId} from API:`, err.message);
    return null;
  }
}

/**
 * Dynamic Icon Component that renders Lucide icons based on string keys from the database.
 */
export function CourseIconRenderer({ iconKey, size = 32, style = {} }) {
  const iconMap = {
    Monitor: <Monitor size={size} style={style} />,
    FileSpreadsheet: <FileSpreadsheet size={size} style={style} />,
    Calculator: <Calculator size={size} style={style} />,
    Code: <Code size={size} style={style} />,
    Globe: <Globe size={size} style={style} />,
    Megaphone: <Megaphone size={size} style={style} />,
    Palette: <Palette size={size} style={style} />,
    GraduationCap: <GraduationCap size={size} style={style} />,
    Layers: <Layers size={size} style={style} />,
    BarChart3: <BarChart3 size={size} style={style} />,
    MessageCircle: <MessageCircle size={size} style={style} />,
    Bot: <Bot size={size} style={style} />,
    BookOpen: <BookOpen size={size} style={style} />,
    Database: <Database size={size} style={style} />,
    Sparkles: <Sparkles size={size} style={style} />,
    Server: <Server size={size} style={style} />,
    Cpu: <Cpu size={size} style={style} />,
    Table: <Table size={size} style={style} />,
    PieChart: <PieChart size={size} style={style} />,
    Activity: <Activity size={size} style={style} />,
    MessageSquare: <MessageSquare size={size} style={style} />,
    Brain: <Brain size={size} style={style} />,
    FileCode2: <FileCode2 size={size} style={style} />,
    Cloud: <Cloud size={size} style={style} />,
    GitBranch: <GitBranch size={size} style={style} />,
    Users: <Users size={size} style={style} />,
    CheckCircle: <CheckCircle size={size} style={style} />,
    Box: <Box size={size} style={style} />
  };

  return iconMap[iconKey] || <BookOpen size={size} style={style} />;
}
