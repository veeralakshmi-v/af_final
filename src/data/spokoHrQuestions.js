import { day1Questions } from './hrQuestions/day1.js';
import { day2Questions } from './hrQuestions/day2.js';
import { day3Questions } from './hrQuestions/day3.js';
import { day4Questions } from './hrQuestions/day4.js';
import { day5Questions } from './hrQuestions/day5.js';

export const allHrQuestions = [
  ...day1Questions,
  ...day2Questions,
  ...day3Questions,
  ...day4Questions,
  ...day5Questions
];

export const TOTAL_QUESTIONS_COUNT = allHrQuestions.length; // Exactly 100
export const QUESTIONS_PER_DAY = 20;

export const HR_DAYS_CONFIG = [
  {
    day: 1,
    topic: "Introduction and Personal Background",
    range: "1 – 20",
    badge: "Foundation",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    bgLight: "rgba(99, 102, 241, 0.08)",
    description: "Master the foundational personal elevator pitch, resume walkthrough, strengths, weaknesses, motivations, values, and personal development goals."
  },
  {
    day: 2,
    topic: "Career Goals, Motivation and Job Change",
    range: "21 – 40",
    badge: "Strategy",
    color: "#0284c7",
    gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    bgLight: "rgba(2, 132, 199, 0.08)",
    description: "Articulate your career aspirations, company research, motivation, reasons for job transitions, manager preferences, and 90-day onboarding impact."
  },
  {
    day: 3,
    topic: "Behavioral, Situational and Teamwork Questions",
    range: "41 – 60",
    badge: "STAR Method",
    color: "#059669",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    bgLight: "rgba(5, 150, 105, 0.08)",
    description: "Structure high-impact behavioral answers using the STAR methodology (Situation, Task, Action, Result) across team conflicts, mistakes, deadlines, and leadership."
  },
  {
    day: 4,
    topic: "Salary, Work Preferences and Challenging Questions",
    range: "61 – 80",
    badge: "Negotiation",
    color: "#d97706",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    bgLight: "rgba(217, 119, 6, 0.08)",
    description: "Confidently handle compensation expectations, current vs. expected CTC, notice period, relocation, shift work, employment gaps, and tough questions with integrity."
  },
  {
    day: 5,
    topic: "Experience, Professionalism and Final Interview Questions",
    range: "81 – 100",
    badge: "Executive Polish",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    bgLight: "rgba(124, 58, 237, 0.08)",
    description: "Demonstrate senior-level professionalism, ethical conviction, confidential data handling, relationship building, week-one roadmap, and high-impact closing questions."
  }
];

export function getQuestionsByDay(dayNumber) {
  const d = Number(dayNumber);
  return allHrQuestions.filter(q => q.day === d);
}

export function getQuestionById(questionId) {
  const id = Number(questionId);
  return allHrQuestions.find(q => q.id === id);
}
