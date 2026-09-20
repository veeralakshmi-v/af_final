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
  web_design_20days: webDesignCourseData,
  web_design: webDesignCourseData
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

export const TALLY_ASSIGNMENTS_CONFIG = {
  tally_prime_module1: {
    dayTitle: 'Day 1 - Accounting Foundations & Setup',
    assignmentTitle: 'Day 1 Practical Assignment: Double Entry System & Tally Company Setup',
    tasks: [
      'Install Tally Prime in free Educational Mode on your computer.',
      'Create a company named "Alpha Fly Computer Education" with State set to Tamil Nadu.',
      'Classify the 3 Golden Rules: Personal (Debit receiver, Credit giver), Real (Debit in, Credit out), Nominal (Debit expenses, Credit incomes).',
      'Explain Modern Rules of Accounting for Assets, Liabilities, Capital, Expenses, and Incomes.',
      'Document the shortcut key (Ctrl+A) used to save company profiles and forms in Tally.'
    ],
    nextModuleId: 'tally_prime_module2',
    nextModuleTitle: 'Day 2 - Pre-defined & Custom Groups'
  },
  tally_prime_module2: {
    dayTitle: 'Day 2 - Pre-defined & Custom Groups',
    assignmentTitle: 'Day 2 Practical Assignment: 28 Pre-defined Groups & Custom Sub-Groups',
    tasks: [
      'Identify the 15 Primary Groups (Fixed Assets, Current Assets, Capital, etc.) in Tally Prime.',
      'Identify the 13 Sub-Groups (Bank Accounts, Cash-in-hand, Sundry Debtors, Sundry Creditors, etc.).',
      'Create a custom group "Local Customers" under Sundry Debtors from Gateway of Tally -> Create -> Group.',
      'Practice altering a group name and deleting a test group using Alt+D.',
      'Submit your explanation of why groups act as organizational folders in Tally.'
    ],
    nextModuleId: 'tally_prime_module3',
    nextModuleTitle: 'Day 3 - Ledgers Creation & Classification'
  },
  tally_prime_module3: {
    dayTitle: 'Day 3 - Ledgers Creation & Classification',
    assignmentTitle: 'Day 3 Practical Assignment: 20 Ledgers Creation & Group Classification',
    tasks: [
      'Identify the 2 pre-defined default ledgers in Tally (Cash A/c and Profit & Loss A/c).',
      'Create and classify 20 distinct business ledgers under their correct parent groups.',
      'Set opening balances for Cash and Bank accounts in the Ledger Alteration screen.',
      'Verify the created accounts in Gateway of Tally -> Chart of Accounts -> Ledgers.',
      'Submit the ledger mapping table showing Ledger Name and Assigned Parent Group.'
    ],
    nextModuleId: 'tally_prime_module4',
    nextModuleTitle: 'Day 4 - Accounting Reports & Financial Statements'
  },
  tally_prime_module4: {
    dayTitle: 'Day 4 - Accounting Reports & Financial Statements',
    assignmentTitle: 'Day 4 Assignment: Analyse a Company\'s Basic Financial Reports',
    tasks: [
      'Inspect and audit transactions in the Day Book using F2 / Alt+F2 date range filters.',
      'Generate the Trial Balance from Display More Reports and verify arithmetical balance (Total Debits = Total Credits).',
      'Analyze the Profit & Loss Account to evaluate Gross Profit margin % and Net Profit margin %.',
      'Examine the Balance Sheet to verify the fundamental accounting equation (Capital + Liabilities = Assets).',
      'Generate individual Ledger Reports under Account Books for Customer and Bank accounts.',
      'Complete the AI Activity: Give an AI-generated explanation of a sample financial report.'
    ],
    nextModuleId: 'tally_prime_project1',
    nextModuleTitle: 'Mini Project: Small Trading Business'
  },
  tally_prime_project1: {
    dayTitle: 'Mini Project: Small Trading Business',
    assignmentTitle: 'Mini Project: Complete Startup Trading Business Accounting Cycle',
    tasks: [
      'Create the complete company file for "Alpha Fly Traders" in Tally Prime with Tamil Nadu state settings.',
      'Set up regional customer groups, supplier ledgers, capital, bank, and expense accounts.',
      'Record all 10 startup transactions (Capital introduction, bank deposit, inventory purchases, credit/cash sales, rent).',
      'Generate and audit the Trial Balance and Profit & Loss reports.',
      'Submit the verified Trial Balance total debits and credits with detailed transaction breakdown.'
    ],
    nextModuleId: 'tally_prime_module5',
    nextModuleTitle: 'Day 5 - Complete Accounting Practice'
  },
  tally_prime_module5: {
    dayTitle: 'Day 5 - Complete Accounting Practice',
    assignmentTitle: 'Day 5 Capstone Assignment: 20 Advanced Mixed Transactions & Year-End Adjustments',
    tasks: [
      'Record Purchase & Sales Returns using Debit Note (Alt+F5) and Credit Note (Alt+F6).',
      'Record internal Bank-to-Bank and Petty Cash transfers using Contra (F4).',
      'Record non-cash depreciation and drawings entries in Journal (F7) and Payment (F5).',
      'Execute the 20 mixed practical transactions covering full accounting cycles.',
      'Submit your final Balance Sheet and comprehensive learning reflection for staff evaluation.'
    ],
    nextModuleId: 'tally_prime_module6',
    nextModuleTitle: 'Day 6 — Inventory Basics: Stock Groups & Items'
  },
  tally_prime_module6: {
    dayTitle: 'Day 6 — Inventory Basics: Stock Groups & Items',
    assignmentTitle: 'Day 6 Assignment: Inventory Basics & Master Creation Setup',
    tasks: [
      'Create Simple Units (Pcs, Box, Strip, Kg, Bottle) and Compound Units (1 Box = 10 Strips).',
      'Create hierarchical Stock Groups and parallel Stock Categories.',
      'Configure 10 Stock Items with opening quantities, base units, and purchase rates.',
      'Complete the AI Task: Classify products into appropriate stock groups.',
      'Verify the inventory balances and valuation in the Stock Summary report.'
    ],
    nextModuleId: 'tally_prime_module7',
    nextModuleTitle: 'Day 7 — Godown & Batch Management'
  },
  tally_prime_module7: {
    dayTitle: 'Day 7 — Godown & Batch Management',
    assignmentTitle: 'Day 7 Assignment: Create a Multi-Location Inventory System',
    tasks: [
      'Enable Godowns, Batches, and Expiry Dates in Company Features (F11).',
      'Set up a multi-location network (Central Warehouse, Town Retail Shop, Cold Storage).',
      'Configure batch-tracked medicines with Manufacturing and Expiry dates.',
      'Record inter-godown transfers using the Stock Journal Voucher (Alt + F7).',
      'Complete AI Activity: Identify possible stock-management issues & vulnerabilities.'
    ],
    nextModuleId: 'tally_prime_module8',
    nextModuleTitle: 'Day 8 — Inventory Transactions'
  },
  tally_prime_module8: {
    dayTitle: 'Day 8 — Inventory Transactions',
    assignmentTitle: 'Day 8 Assignment: Complete 20 Inventory Transactions',
    tasks: [
      'Master Item Invoice Mode (Ctrl + H) for Purchases (F9) and Sales (F8).',
      'Record 8 Purchase invoices allocating stock to designated godowns and batches.',
      'Record 8 Sales invoices with automatic stock deduction and profit calculation.',
      'Record Purchase/Sales Returns with Debit Note (Alt+F5) and Credit Note (Alt+F6).',
      'Audit stock movements in the Stock Summary and Movement Analysis reports.'
    ],
    nextModuleId: 'tally_prime_module9',
    nextModuleTitle: 'Day 9 — Inventory Analysis & Stock Summary'
  },
  tally_prime_module9: {
    dayTitle: 'Day 9 — Inventory Analysis & Stock Summary',
    assignmentTitle: 'Day 9 Assignment: Identify 5 Key Inventory Insights',
    tasks: [
      'Navigate and customize the Stock Summary report using F12 configuration.',
      'Analyze Closing Stock valuation across Average Cost, FIFO, and Last Purchase methods.',
      'Categorize stock into Fast-Moving, Slow-Moving, and Dead-Stock lines.',
      'Complete AI Activity: Give a stock report to AI and ask for business insights.',
      'Submit 5 structured inventory insights covering velocity, reorder levels, and profit margins.'
    ],
    nextModuleId: 'tally_prime_project2',
    nextModuleTitle: 'Day 10 — 🟦 Mini Project: Medical Store Inventory'
  },
  tally_prime_project2: {
    dayTitle: 'Day 10 — 🟦 Mini Project: Medical Store Inventory',
    assignmentTitle: 'Mini Project: Health Medical Store Complete Inventory System Submission',
    tasks: [
      'Set up the complete pharmaceutical company "Health Medical Store" in Tally Prime.',
      'Configure 3 specialized storage godowns (Central AC Godown, Cold Storage, Counter Shelf).',
      'Setup 8 medicine stock items with strict batch numbers, manufacturing, and expiry tracking.',
      'Record the complete 10-transaction lifecycle: purchases, cold-chain transfers, and counter sales.',
      'Complete AI Challenge: Analyze stock and identify Low-Stock items, Slow-Moving items, and Expiry risks.'
    ],
    nextModuleId: 'tally_prime_module11',
    nextModuleTitle: 'Day 11 — Purchase & Sales Orders'
  },
  tally_prime_module11: {
    dayTitle: 'Day 11 — Purchase & Sales Orders',
    assignmentTitle: 'Day 11 Assignment: Purchase & Sales Order Processing & Reporting',
    tasks: [
      'Enable Purchase & Sales Order processing in Tally Prime (F11).',
      'Record Purchase Orders (Ctrl+F9) with supplier terms and item specifications.',
      'Record Sales Orders (Ctrl+F8) capturing customer commitments and delivery dates.',
      'Complete AI Task: Convert a customer requirement email into a structured sales order.',
      'Extract and audit Pending Orders backlog reports under Statement of Inventory.'
    ],
    nextModuleId: 'tally_prime_module12',
    nextModuleTitle: 'Day 12 — Delivery & Receipt Notes'
  },
  tally_prime_module12: {
    dayTitle: 'Day 12 — Delivery & Receipt Notes',
    assignmentTitle: 'Day 12 Assignment: Complete 10 Order & Delivery Transactions',
    tasks: [
      'Record Receipt Notes (Alt+F9) with Tracking Numbers against Purchase Orders.',
      'Record Delivery Notes (Alt+F8) with Tracking Numbers against Sales Orders.',
      'Execute the complete 10-transaction order-to-delivery commercial lifecycle.',
      'Handle partial dispatches, rejections, and verify pending backlog balance.',
      'Link tracking numbers into final Purchase (F9) and Sales (F8) tax invoices.'
    ],
    nextModuleId: 'tally_prime_module13',
    nextModuleTitle: 'Day 13 — Debit & Credit Notes'
  },
  tally_prime_module13: {
    dayTitle: 'Day 13 — Debit & Credit Notes',
    assignmentTitle: 'Day 13 Assignment: Debit & Credit Note Operations & Auditing',
    tasks: [
      'Record Purchase Returns to suppliers using Debit Notes (Alt+F5) in Item Invoice mode.',
      'Record Sales Returns from customers using Credit Notes (Alt+F6) in Item Invoice mode.',
      'Record accounting price difference adjustments and volume rebate credit notes.',
      'Complete AI Task: Determine which note should be used for 6 commercial scenarios.',
      'Verify updated customer/supplier ledger balances and inventory count.'
    ],
    nextModuleId: 'tally_prime_module14',
    nextModuleTitle: 'Day 14 — Bill of Materials (BoM)'
  },
  tally_prime_module14: {
    dayTitle: 'Day 14 — Bill of Materials (BoM)',
    assignmentTitle: 'Day 14 Assignment: Bill of Materials Setup & Production Run Execution',
    tasks: [
      'Create Raw Material stock items and Finished Goods in Tally Prime.',
      'Configure Bill of Materials (BoM) component recipes inside finished items.',
      'Create and configure a dedicated Manufacturing Journal voucher type.',
      'Complete AI Activity: Create a simple product manufacturing plan using AI.',
      'Record batch production runs allocating technician wages and factory overheads.'
    ],
    nextModuleId: 'tally_prime_project3',
    nextModuleTitle: 'Day 15 — 🟦 Mini Project 5: Manufacturing Business'
  },
  tally_prime_project3: {
    dayTitle: 'Day 15 — 🟦 Mini Project 5: Manufacturing Business',
    assignmentTitle: 'Mini Project 5: ABC Computer World Complete Submission',
    tasks: [
      'Set up the complete manufacturing enterprise "ABC Computer World" in Tally Prime.',
      'Configure 3 Godowns: Raw Materials Store, Assembly Line, Finished Goods Showroom.',
      'Configure multi-level BoM recipes for "ABC Pro Office PC" and "ABC Apex Gaming Beast".',
      'Record component purchases, inter-godown transfers, and Manufacturing Journal runs.',
      'Record commercial sales, returns, and execute AI material consumption audit.'
    ],
    nextModuleId: null,
    nextModuleTitle: null
  },
  // Aliases for alternate module references
  tally_prime_module16: {
    dayTitle: 'Day 6 — Inventory Basics: Stock Groups & Items',
    assignmentTitle: 'Day 6 Assignment: Inventory Basics & Master Creation Setup',
    tasks: [
      'Create Simple Units and Compound Units in Tally Prime.',
      'Configure 10 Stock Items with opening quantities and rates.'
    ],
    nextModuleId: 'tally_prime_module7',
    nextModuleTitle: 'Day 7 — Godown & Batch Management'
  },
  tally_prime_project4: {
    dayTitle: 'Day 10 — 🟦 Mini Project: Medical Store Inventory',
    assignmentTitle: 'Mini Project: Health Medical Store Complete Inventory System Submission',
    tasks: [
      'Set up the complete pharmaceutical company "Health Medical Store" in Tally Prime.'
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

export function getCourseModuleOrder(courseKey, targetModuleId) {
  if (courseKey === 'html_css') {
    return HTML_CSS_MODULE_ORDER;
  }
  let courseModules = COURSE_DATA_MAP[courseKey];
  if ((!courseModules || !Array.isArray(courseModules)) && targetModuleId) {
    // Fallback search across COURSE_DATA_MAP for the course structure containing targetModuleId
    for (const k of Object.keys(COURSE_DATA_MAP)) {
      const list = COURSE_DATA_MAP[k];
      if (Array.isArray(list) && list.some(m => m.id === targetModuleId)) {
        courseModules = list;
        break;
      }
    }
  }
  if (courseModules && Array.isArray(courseModules)) {
    return courseModules.map(m => m.id);
  }
  return [];
}

export function getModuleConfig(courseKey, moduleId) {
  if (courseKey === 'html_css' && HTML_CSS_ASSIGNMENTS_CONFIG[moduleId]) {
    return HTML_CSS_ASSIGNMENTS_CONFIG[moduleId];
  }
  if ((courseKey === 'tally_prime' || courseKey === 'tally') && TALLY_ASSIGNMENTS_CONFIG[moduleId]) {
    return TALLY_ASSIGNMENTS_CONFIG[moduleId];
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

export function isModuleLocked(courseKeyOrModuleId, targetModuleIdOrValidations, maybeValidations, maybeSession, completedLessons = [], taskSubmissions = []) {
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
  const order = getCourseModuleOrder(courseKey, targetModuleId);
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
  const prevTask = Array.isArray(taskSubmissions) ? taskSubmissions.find(t => t.moduleId === prevModuleId) : null;

  // Next day is ONLY unlocked if staff has APPROVED previous day's submission!
  const isApprovedByValidation = prevValidation && (prevValidation.status === 'approved' || prevValidation.status === 'Approved');
  const isApprovedByTask = prevTask && (prevTask.status === 'Approved' || prevTask.status === 'approved');

  if (isApprovedByValidation || isApprovedByTask) {
    return false;
  }

  // Without staff approval, next day is LOCKED for student!
  return true;
}

export function getLockReason(courseKeyOrModuleId, targetModuleIdOrValidations, maybeValidations, maybeSession, completedLessons = [], taskSubmissions = []) {
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

  const order = getCourseModuleOrder(courseKey, targetModuleId);
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
  const prevTask = Array.isArray(taskSubmissions) ? taskSubmissions.find(t => t.moduleId === prevModuleId) : null;

  // Check if staff approved
  const isApprovedByValidation = prevValidation && (prevValidation.status === 'approved' || prevValidation.status === 'Approved');
  const isApprovedByTask = prevTask && (prevTask.status === 'Approved' || prevTask.status === 'approved');

  if (isApprovedByValidation || isApprovedByTask) return null;

  // Check if student submitted but pending staff evaluation
  const isPending = (prevValidation && (prevValidation.status === 'pending' || prevValidation.status === 'Submitted')) || 
                    (prevTask && (prevTask.status === 'Pending' || prevTask.status === 'Submitted'));

  const isRejected = (prevValidation && (prevValidation.status === 'rejected' || prevValidation.status === 'Rejected')) || 
                     (prevTask && (prevTask.status === 'Rejected' || prevTask.status === 'rejected'));

  if (isPending) {
    return {
      prevModuleId,
      prevTitle: config.dayTitle || 'Previous Day',
      reason: 'Pending Staff Review & Approval',
      detail: `Your submission for ${config.dayTitle || 'previous day'} has been received! Please wait for staff evaluation and approval to unlock this day.`
    };
  }

  if (isRejected) {
    return {
      prevModuleId,
      prevTitle: config.dayTitle || 'Previous Day',
      reason: 'Revision Requested by Staff',
      detail: `Staff requested changes on your ${config.dayTitle || 'previous day'} assignment. Please update and resubmit your assignment for staff approval.`
    };
  }

  return {
    prevModuleId,
    prevTitle: config.dayTitle || 'Previous Day',
    reason: 'Staff Approval Required',
    detail: `You must submit the ${config.dayTitle || 'previous day'} assignment/reflection and receive Staff Approval before unlocking this day.`
  };
}
