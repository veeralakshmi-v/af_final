// Utility for LMS Course Assignment Validation & Navigation Locking across all courses
import { 
  htmlCourseData, sqlCourseData, summerSqlCourseData, daSqlCourseData, powerBiCourseData, 
  agenticAiCourseData, inductionCourseData, pythonFullStackCourseData, pythonCourseData, 
  pythonDaCourseData, generativeAiCourseData, reactCourseData, gitCourseData, jsonCourseData, 
  djangoCourseData, devopsCourseData, statsCourseData, numpyCourseData, coreJsCourseData, 
  pandasCourseData, matplotlibCourseData, seabornCourseData, tallyCourseData, webDesignCourseData 
} from '../courseData';

export const COURSE_DATA_MAP = {
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

export const HTML_CSS_MODULE_ORDER = [
  'module1',        // Day 1 - HTML Fundamentals
  'module2',        // Day 2 - HTML Advanced
  'html_project',   // HTML Final Project
  'module3',        // Day 3 - Introduction to CSS
  'module4',        // Day 4 - CSS Box Model
  'module5',        // Day 5 - Flex Box
  'module6',        // Day 6 - Modern Layouts
  'module7',        // Day 7 - CSS Units & Pseudo
  'module8',        // Day 8 - Animations & Media
  'bootstrap_day1', // Day 9 - Bootstrap Basics
  'bootstrap_day2', // Day 10 - Bootstrap Grid & Components
  'module9'         // Day 11 - HTML, CSS & Bootstrap Final Project
];

export const HTML_CSS_ASSIGNMENTS_CONFIG = {
  module1: {
    dayTitle: 'Day 1 - HTML Fundamentals',
    assignmentTitle: 'Day 1 Practical Assignment: Personal Semantic Portfolio Webpage',
    tasks: [
      'Create a standard HTML5 document structure with <!DOCTYPE html>, <html>, <head>, and <body>.',
      'Use proper semantic sectioning tags: <header>, <nav>, <main>, <article>, <section>, and <footer>.',
      'Include heading hierarchy (<h1> down to <h3>) and formatted paragraphs with <strong> and <em>.',
      'Create an ordered or unordered list of your skills and projects.',
      'Add hyper-links (<a>) with target="_blank" and embed an image (<img>) with descriptive alt text.'
    ],
    nextModuleId: 'module2',
    nextModuleTitle: 'Day 2 - HTML Advanced'
  },
  module2: {
    dayTitle: 'Day 2 - HTML Advanced',
    assignmentTitle: 'Day 2 Practical Assignment: Interactive Form & Data Table Portal',
    tasks: [
      'Construct a structured HTML table featuring <thead>, <tbody>, <tfoot>, <th>, <tr>, and <td> with colspan/rowspan attributes.',
      'Build a rich contact form utilizing <form>, <label>, <input>, <select>, <textarea>, and <button>.',
      'Incorporate HTML5 input types: email, tel, date, number, range, and color.',
      'Apply form validation attributes: required, minlength, maxlength, pattern, and placeholder.',
      'Embed media elements using <video> or <iframe> with fallback content.'
    ],
    nextModuleId: 'html_project',
    nextModuleTitle: 'HTML Final Project'
  },
  html_project: {
    dayTitle: 'HTML Capstone Project',
    assignmentTitle: 'HTML Capstone Assignment: Multi-Page Business Website Blueprint',
    tasks: [
      'Develop a multi-page HTML website (Home, About, Services, Contact).',
      'Maintain consistent navigation menus across all pages using semantic HTML lists and links.',
      'Embed structured data tables for pricing/services and interactive forms for customer feedback.',
      'Validate HTML5 compliance with zero syntax or unclosed tag errors.'
    ],
    nextModuleId: 'module3',
    nextModuleTitle: 'Day 3 - Introduction to CSS'
  },
  module3: {
    dayTitle: 'Day 3 - Introduction to CSS',
    assignmentTitle: 'Day 3 Practical Assignment: Styled Personal Card & Typography Suite',
    tasks: [
      'Create external, internal, and inline CSS rules to demonstrate cascade priority.',
      'Apply class, ID, element, and attribute CSS selectors to target elements cleanly.',
      'Customize background properties: background-color, background-image, background-size, and gradients.',
      'Format text & typography: font-family, font-size, line-height, text-align, and letter-spacing.',
      'Style custom bullet list images using background-size or ::before pseudo-elements.'
    ],
    nextModuleId: 'module4',
    nextModuleTitle: 'Day 4 - CSS Box Model'
  },
  module4: {
    dayTitle: 'Day 4 - CSS Box Model',
    assignmentTitle: 'Day 4 Practical Assignment: Box Model Layout & Position Overlay',
    tasks: [
      'Configure precise margin, border, padding, and content dimensions using box-sizing: border-box.',
      'Demonstrate position properties: static, relative, absolute, fixed, and sticky.',
      'Utilize z-index layering to position an overlay modal above background content.',
      'Implement overflow properties (scroll, auto, hidden) for long scrollable cards.'
    ],
    nextModuleId: 'module5',
    nextModuleTitle: 'Day 5 - Flex Box'
  },
  module5: {
    dayTitle: 'Day 5 - Flex Box',
    assignmentTitle: 'Day 5 Practical Assignment: Responsive Flexbox Dashboard Navigation & Cards',
    tasks: [
      'Create a flex container using display: flex, flex-direction, and flex-wrap.',
      'Align flex items along main and cross axes using justify-content and align-items.',
      'Apply flex-grow, flex-shrink, and flex-basis to build fluid self-adjusting grid cards.',
      'Design a responsive navbar that switches layout on narrower viewports.'
    ],
    nextModuleId: 'module6',
    nextModuleTitle: 'Day 6 - Modern Layouts'
  },
  module6: {
    dayTitle: 'Day 6 - Modern Layouts',
    assignmentTitle: 'Day 6 Practical Assignment: 2D CSS Grid Layout & Template Areas',
    tasks: [
      'Define a 2D grid using grid-template-columns and grid-template-rows with fr units.',
      'Use minmax() and auto-fit/auto-fill for responsive layouts without explicit media queries.',
      'Position items using grid-column, grid-row, and grid-template-areas.',
      'Add grid gaps and alignment control with gap, justify-items, and align-content.'
    ],
    nextModuleId: 'module7',
    nextModuleTitle: 'Day 7 - CSS Units & Pseudo'
  },
  module7: {
    dayTitle: 'Day 7 - CSS Units & Pseudo',
    assignmentTitle: 'Day 7 Practical Assignment: Modern Typography & Pseudo-Element Styling',
    tasks: [
      'Compare absolute units (px) with relative units (em, rem, %, vw, vh) in responsive typography.',
      'Apply pseudo-classes (:hover, :focus, :nth-child, :first-of-type) for dynamic interactive UI.',
      'Utilize pseudo-elements (::before, ::after) for custom bullet styling, badges, and decorative accents.'
    ],
    nextModuleId: 'module8',
    nextModuleTitle: 'Day 8 - Animations & Media'
  },
  module8: {
    dayTitle: 'Day 8 - Animations & Media',
    assignmentTitle: 'Day 8 Practical Assignment: Interactive Micro-Animations & Media Queries',
    tasks: [
      'Implement smooth CSS transitions (transition: property duration timing-function).',
      'Apply 2D/3D transforms (transform: rotate, scale, translate, skew).',
      'Construct multi-step keyframe animations (@keyframes) for dynamic UI banners.',
      'Write mobile-first media queries (@media) targeting mobile, tablet, and desktop breakpoints.'
    ],
    nextModuleId: 'bootstrap_day1',
    nextModuleTitle: 'Day 9 - Bootstrap Basics'
  },
  bootstrap_day1: {
    dayTitle: 'Day 9 - Bootstrap Basics',
    assignmentTitle: 'Day 9 Practical Assignment: Bootstrap Utility & Component Landing Page',
    tasks: [
      'Include Bootstrap 5 CDN link in your project head.',
      'Utilize Bootstrap containers (.container, .container-fluid) and margin/padding utility classes.',
      'Style buttons (.btn, .btn-primary), badges (.badge), and alerts (.alert).',
      'Format typography using Bootstrap display headings and lead paragraphs.'
    ],
    nextModuleId: 'bootstrap_day2',
    nextModuleTitle: 'Day 10 - Bootstrap Grid & Components'
  },
  bootstrap_day2: {
    dayTitle: 'Day 10 - Bootstrap Grid & Components',
    assignmentTitle: 'Day 10 Practical Assignment: Responsive Bootstrap Portal with Navbar & Cards',
    tasks: [
      'Build a responsive grid using .row and .col-*, .col-md-*, .col-lg-* grid break points.',
      'Create a collapsible Bootstrap Navigation Bar (.navbar, .navbar-expand-lg).',
      'Build product/profile card decks (.card, .card-body, .card-title) and data tables (.table).',
      'Incorporate Bootstrap JavaScript components: Modal dialogs and Carousels.'
    ],
    nextModuleId: 'module9',
    nextModuleTitle: 'Day 11 - Final Capstone'
  },
  module9: {
    dayTitle: 'Day 11 - Final Capstone',
    assignmentTitle: 'Day 11 Capstone Assignment: Production Enterprise Full Portal',
    tasks: [
      'Design a comprehensive full-stack corporate site combining HTML5, CSS Grid/Flexbox, and Bootstrap 5.',
      'Ensure 100% responsiveness across all screen sizes (mobile, tablet, desktop).',
      'Include full form validations, interactive UI components, animations, and accessible semantic markup.',
      'Submit your live Vercel/GitHub pages deployment link along with comprehensive reflection.'
    ],
    nextModuleId: null,
    nextModuleTitle: null
  }
};

const STORAGE_KEY = 'html_css_assignment_validations_v1';

export function getAssignmentValidations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveAssignmentValidation(moduleId, record) {
  try {
    const current = getAssignmentValidations();
    const updated = {
      ...current,
      [moduleId]: {
        ...current[moduleId],
        ...record,
        updatedAt: new Date().toISOString()
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('html_css_validation_changed'));
    return updated;
  } catch (e) {
    console.error('Failed to save validation:', e);
    return {};
  }
}

export function getCourseModuleOrder(courseKey) {
  if (courseKey === 'html_css') {
    return HTML_CSS_MODULE_ORDER;
  }
  const courseModules = COURSE_DATA_MAP[courseKey];
  if (courseModules && Array.isArray(courseModules)) {
    return courseModules.map(m => m.id);
  }
  return [];
}

export function getModuleConfig(courseKey, moduleId) {
  if (courseKey === 'html_css' && HTML_CSS_ASSIGNMENTS_CONFIG[moduleId]) {
    return HTML_CSS_ASSIGNMENTS_CONFIG[moduleId];
  }
  const courseModules = COURSE_DATA_MAP[courseKey] || [];
  const modObj = courseModules.find(m => m.id === moduleId);
  const dayTitle = modObj ? modObj.title : 'Day Assignment';
  const assignmentTitle = `${dayTitle} Practical Assignment & Staff Review`;
  
  const order = getCourseModuleOrder(courseKey);
  const idx = order.indexOf(moduleId);
  const nextModId = (idx >= 0 && idx < order.length - 1) ? order[idx + 1] : null;
  const nextModObj = nextModId ? courseModules.find(m => m.id === nextModId) : null;
  const nextModTitle = nextModObj ? nextModObj.title : 'Next Day';

  return {
    dayTitle,
    assignmentTitle,
    tasks: [
      `Complete all practical exercises and coding tasks for ${dayTitle}.`,
      'Submit your code snippet, GitHub/project link, and self-reflection feedback below.'
    ],
    nextModuleId: nextModId,
    nextModuleTitle: nextModTitle
  };
}

export function isModuleLocked(courseKeyOrModuleId, targetModuleIdOrValidations, maybeValidations, maybeSession) {
  let courseKey, targetModuleId, validations, session;

  if (typeof targetModuleIdOrValidations === 'string') {
    courseKey = courseKeyOrModuleId;
    targetModuleId = targetModuleIdOrValidations;
    validations = maybeValidations || getAssignmentValidations();
    session = maybeSession;
  } else {
    courseKey = 'html_css';
    targetModuleId = courseKeyOrModuleId;
    validations = targetModuleIdOrValidations || getAssignmentValidations();
    session = maybeValidations;
  }

  // 1. Staff users (Staff / Instructor / Admin) are NEVER locked out!
  const isStaff = (() => {
    if (session) {
      return Boolean(session.role === 'staff' || session.role === 'admin' || session.role === 'instructor');
    }
    try {
      const raw = localStorage.getItem('lms_user_session');
      if (raw) {
        const u = JSON.parse(raw);
        return Boolean(u && (u.role === 'staff' || u.role === 'admin' || u.role === 'instructor'));
      }
    } catch (e) {}
    return false;
  })();

  if (isStaff) return false;

  // 2. Student locking rules:
  const order = getCourseModuleOrder(courseKey);
  const index = order.indexOf(targetModuleId);
  
  // First module of any course is never locked for students
  if (index <= 0) return false;

  // If index is 1 and target module is Day 1 (e.g. react_module1 after react_js_essentials), it is open by default!
  const targetModuleObj = (COURSE_DATA_MAP[courseKey] || []).find(m => m.id === targetModuleId);
  if (index <= 1 && targetModuleObj) {
    const titleLower = (targetModuleObj.title || '').toLowerCase();
    if (titleLower.includes('day 1') || targetModuleId.endsWith('day1') || targetModuleId.endsWith('module1')) {
      return false;
    }
  }

  const prevModuleId = order[index - 1];
  const prevValidation = validations[prevModuleId];

  return !prevValidation || prevValidation.status !== 'approved';
}

export function getLockReason(courseKeyOrModuleId, targetModuleIdOrValidations, maybeValidations, maybeSession) {
  let courseKey, targetModuleId, validations, session;

  if (typeof targetModuleIdOrValidations === 'string') {
    courseKey = courseKeyOrModuleId;
    targetModuleId = targetModuleIdOrValidations;
    validations = maybeValidations || getAssignmentValidations();
    session = maybeSession;
  } else {
    courseKey = 'html_css';
    targetModuleId = courseKeyOrModuleId;
    validations = targetModuleIdOrValidations || getAssignmentValidations();
    session = maybeValidations;
  }

  // Staff users are never locked
  const isStaff = (() => {
    if (session) {
      return Boolean(session.role === 'staff' || session.role === 'admin' || session.role === 'instructor');
    }
    try {
      const raw = localStorage.getItem('lms_user_session');
      if (raw) {
        const u = JSON.parse(raw);
        return Boolean(u && (u.role === 'staff' || u.role === 'admin' || u.role === 'instructor'));
      }
    } catch (e) {}
    return false;
  })();

  if (isStaff) return null;

  const order = getCourseModuleOrder(courseKey);
  const index = order.indexOf(targetModuleId);
  if (index <= 0) return null;

  const targetModuleObj = (COURSE_DATA_MAP[courseKey] || []).find(m => m.id === targetModuleId);
  if (index <= 1 && targetModuleObj) {
    const titleLower = (targetModuleObj.title || '').toLowerCase();
    if (titleLower.includes('day 1') || targetModuleId.endsWith('day1') || targetModuleId.endsWith('module1')) {
      return null;
    }
  }

  const prevModuleId = order[index - 1];
  const config = getModuleConfig(courseKey, prevModuleId);
  const prevValidation = validations[prevModuleId];

  if (!prevValidation) {
    return {
      prevModuleId,
      prevTitle: config.dayTitle || 'Previous Day',
      reason: 'Assignment not submitted yet',
      detail: `You must submit the ${config.dayTitle || 'previous day'} assignment with student feedback (min 100 characters) and get Staff Validation before unlocking this content.`
    };
  }

  if (prevValidation.status === 'pending') {
    return {
      prevModuleId,
      prevTitle: config.dayTitle || 'Previous Day',
      reason: 'Pending Staff Review & Validation',
      detail: `Your submission for ${config.dayTitle || 'previous day'} is received! Wait for staff evaluation and approval to unlock this day.`
    };
  }

  if (prevValidation.status === 'rejected') {
    return {
      prevModuleId,
      prevTitle: config.dayTitle || 'Previous Day',
      reason: 'Revision Requested by Staff',
      detail: `Staff requested changes on your ${config.dayTitle || 'previous day'} assignment. Please update your submission according to staff feedback.`
    };
  }

  return null;
}
