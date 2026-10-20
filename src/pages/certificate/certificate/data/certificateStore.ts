import type { CertificateData, CustomAssets } from '../types/certificate';
import { getRandomTwoQualities } from './qualityLibrary';

const STORAGE_KEY = 'alphafly_certificates_db_v2';
const ASSETS_STORAGE_KEY = 'alphafly_custom_assets_v2';

export const INITIAL_CERTIFICATES: CertificateData[] = [
  {
    "id": "AFE-2026-0001",
    "studentName": "Kousalya V",
    "courseName": "Data Analytics & Visualization",
    "description": "has successfully completed Data Analytics & Visualization Course in Alpha Fly Education, Theni",
    "startDate": "2024-09-11",
    "endDate": "2024-12-04",
    "formattedDuration": "Sep 11,2024 - Dec 04,2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL",
      "DevOps"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL, DevOps",
    "qualities": [
      {
        "id": "creative",
        "title": "Creative",
        "description": "Demonstrating creativity while developing projects and solving problems."
      },
      {
        "id": "disciplined",
        "title": "Disciplined",
        "description": "Following a structured approach towards learning and completing tasks."
      }
    ],
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0001",
    "generatedDate": "2026-09-18",
    "templateId": "template-1",
    "status": "verified",
    "photoUrl": "/id_card_assets/kousalya_photo.jpg",
    "photoFit": "contain"
  },
  {
    "id": "AFE-2026-0002",
    "studentName": "DHIVYA DHARSHINI K",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2025-02-28",
    "formattedDuration": "June 15, 2024 - Feb 28, 2025",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "DevOps",
      "React",
      "Python",
      "Django",
      "SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, DevOps, React, Python, Django, SQL",
    "qualities": [
      {
        "id": "creative",
        "title": "Creative",
        "description": "Generating original and innovative ideas."
      },
      {
        "id": "resilient",
        "title": "Resilient",
        "description": "Recovering quickly from difficulties and maintaining determination."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0002",
    "generatedDate": "2025-02-28",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0003",
    "studentName": "DEVA SURIYAN J",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2024-12-15",
    "formattedDuration": "June 15, 2024 - Dec 15, 2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "innovative",
        "title": "Innovative",
        "description": "Bringing creative and original ideas to assignments or projects."
      },
      {
        "id": "eager",
        "title": "Eager",
        "description": "Displaying enthusiasm and eagerness to participate in class."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0003",
    "generatedDate": "2024-12-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0004",
    "studentName": "SATHYA M",
    "courseName": "Data Analytics & Business Intelligence",
    "description": "has successfully completed the Comprehensive Data Analytics, Power BI & Applied Python program, and demonstrated mastery in analytical dashboard design.",
    "startDate": "2024-08-01",
    "endDate": "2024-11-30",
    "formattedDuration": "Aug 01,2024 - Nov 30,2024",
    "finalAssessment": [
      "SQL & Data Extraction",
      "Python for Analytics",
      "Pandas & NumPy",
      "Matplotlib & Seaborn",
      "Power BI Dashboards",
      "DAX Modeling"
    ],
    "finalAssessmentRaw": "SQL & Data Extraction, Python for Analytics, Pandas & NumPy, Matplotlib & Seaborn, Power BI Dashboards, DAX Modeling",
    "qualities": [
      {
        "id": "consistent",
        "title": "Consistent",
        "description": "Maintaining consistent effort and participation throughout the course."
      },
      {
        "id": "adaptable",
        "title": "Adaptable",
        "description": "Quickly adapting to new concepts, technologies and learning environments."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0004",
    "generatedDate": "2024-11-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0005",
    "studentName": "Vishnupriya R",
    "courseName": "Full Stack Web Development",
    "description": "has successfully completed the Full Stack Web Development program, including modern component architecture, state management, and cloud deployments.",
    "startDate": "2024-07-01",
    "endDate": "2024-11-15",
    "formattedDuration": "July 01, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "HTML5 & CSS3",
      "Modern JavaScript (ES6+)",
      "React Components & Hooks",
      "Git/GitHub",
      "JSON APIs",
      "DevOps & Deployment"
    ],
    "finalAssessmentRaw": "HTML5 & CSS3, Modern JavaScript (ES6+), React Components & Hooks, Git/GitHub, JSON APIs, DevOps & Deployment",
    "qualities": [
      {
        "id": "problem_solver",
        "title": "Problem Solver",
        "description": "Approaching technical challenges with logical and practical solutions."
      },
      {
        "id": "responsible",
        "title": "Responsible",
        "description": "Demonstrating responsibility towards assignments, projects and deadlines."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0005",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0006",
    "studentName": "THULASI S",
    "courseName": "Modern Web Design & Frontend Development",
    "description": "has successfully completed the Modern Web Design & Frontend UI Development Certification program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-31",
    "formattedDuration": "Aug 01, 2024 - Oct 31, 2024",
    "finalAssessment": [
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
      "Responsive Design",
      "Bootstrap",
      "Modern UI/UX"
    ],
    "finalAssessmentRaw": "HTML5, CSS3, Flexbox & CSS Grid, Responsive Design, Bootstrap, Modern UI/UX",
    "qualities": [
      {
        "id": "collaborative",
        "title": "Collaborative",
        "description": "Working effectively with peers during activities and projects."
      },
      {
        "id": "curious",
        "title": "Curious",
        "description": "Showing curiosity and willingness to explore new concepts."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0006",
    "generatedDate": "2024-10-31",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0007",
    "studentName": "Manojkumar K",
    "courseName": "Data Analytics & Business Intelligence",
    "description": "has successfully completed the Comprehensive Data Analytics, Power BI & Applied Python program, and demonstrated mastery in analytical dashboard design.",
    "startDate": "2024-08-01",
    "endDate": "2024-11-30",
    "formattedDuration": "Aug 01,2024 - Nov 30,2024",
    "finalAssessment": [
      "SQL & Data Extraction",
      "Python for Analytics",
      "Pandas & NumPy",
      "Matplotlib & Seaborn",
      "Power BI Dashboards",
      "DAX Modeling"
    ],
    "finalAssessmentRaw": "SQL & Data Extraction, Python for Analytics, Pandas & NumPy, Matplotlib & Seaborn, Power BI Dashboards, DAX Modeling",
    "qualities": [
      {
        "id": "dedicated",
        "title": "Dedicated",
        "description": "Showing commitment and dedication towards learning and completing assigned tasks."
      },
      {
        "id": "creative",
        "title": "Creative",
        "description": "Demonstrating creativity while developing projects and solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0007",
    "generatedDate": "2024-11-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0008",
    "studentName": "Ragavi K",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2024-12-15",
    "formattedDuration": "June 15, 2024 - Dec 15, 2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "disciplined",
        "title": "Disciplined",
        "description": "Following a structured approach towards learning and completing tasks."
      },
      {
        "id": "quick_learner",
        "title": "Quick Learner",
        "description": "Demonstrating the ability to understand and apply new concepts quickly."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0008",
    "generatedDate": "2024-12-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0009",
    "studentName": "KEERTHI PRIYAN N",
    "courseName": "Core JavaScript & Modern Web Development",
    "description": "has successfully completed the Core JavaScript & Asynchronous Web Programming program.",
    "startDate": "2024-07-15",
    "endDate": "2024-10-30",
    "formattedDuration": "July 15, 2024 - Oct 30, 2024",
    "finalAssessment": [
      "ES6+ JavaScript",
      "DOM Manipulation",
      "Async/Await & Promises",
      "API Integration",
      "OOP & Modular JS"
    ],
    "finalAssessmentRaw": "ES6+ JavaScript, DOM Manipulation, Async/Await & Promises, API Integration, OOP & Modular JS",
    "qualities": [
      {
        "id": "technical",
        "title": "Technical",
        "description": "Applying technical knowledge effectively during practical activities."
      },
      {
        "id": "leadership",
        "title": "Leadership",
        "description": "Taking initiative and demonstrating leadership during team activities."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0009",
    "generatedDate": "2024-10-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0010",
    "studentName": "Janani R",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2024-12-15",
    "formattedDuration": "June 15, 2024 - Dec 15, 2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "communication",
        "title": "Communication",
        "description": "Expressing ideas clearly and participating actively in discussions."
      },
      {
        "id": "analytical",
        "title": "Analytical",
        "description": "Demonstrating logical thinking and analytical ability while solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0010",
    "generatedDate": "2024-12-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0011",
    "studentName": "Maheswari N",
    "courseName": "Spoko Professional English & Communication",
    "description": "has successfully completed the Spoko Professional Business English & Corporate Communication program.",
    "startDate": "2024-09-01",
    "endDate": "2024-11-01",
    "formattedDuration": "Sep 01, 2024 - Nov 01, 2024",
    "finalAssessment": [
      "Business Communication",
      "Interview Mastery",
      "Corporate Etiquette",
      "Verbal Fluency",
      "Professional Presentation"
    ],
    "finalAssessmentRaw": "Business Communication, Interview Mastery, Corporate Etiquette, Verbal Fluency, Professional Presentation",
    "qualities": [
      {
        "id": "innovative",
        "title": "Innovative",
        "description": "Bringing creative and original ideas to assignments or projects."
      },
      {
        "id": "eager",
        "title": "Eager",
        "description": "Displaying enthusiasm and eagerness to participate in class."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0011",
    "generatedDate": "2024-11-01",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0012",
    "studentName": "G. Narendra prasandh",
    "courseName": "Core JavaScript & Modern Web Development",
    "description": "has successfully completed the Core JavaScript & Asynchronous Web Programming program.",
    "startDate": "2024-07-15",
    "endDate": "2024-10-30",
    "formattedDuration": "July 15, 2024 - Oct 30, 2024",
    "finalAssessment": [
      "ES6+ JavaScript",
      "DOM Manipulation",
      "Async/Await & Promises",
      "API Integration",
      "OOP & Modular JS"
    ],
    "finalAssessmentRaw": "ES6+ JavaScript, DOM Manipulation, Async/Await & Promises, API Integration, OOP & Modular JS",
    "qualities": [
      {
        "id": "consistent",
        "title": "Consistent",
        "description": "Maintaining consistent effort and participation throughout the course."
      },
      {
        "id": "adaptable",
        "title": "Adaptable",
        "description": "Quickly adapting to new concepts, technologies and learning environments."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0012",
    "generatedDate": "2024-10-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0013",
    "studentName": "Thanusha S",
    "courseName": "Tally Prime & Financial Accounting",
    "description": "has successfully completed the Professional Tally Prime & Business Accounting program, including GST filing and statutory compliance.",
    "startDate": "2024-08-15",
    "endDate": "2024-11-15",
    "formattedDuration": "Aug 15, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "Tally Prime",
      "Vouchers & Ledgers",
      "GST Compliance",
      "TDS/TCS Returns",
      "Inventory & Payroll",
      "Financial Statements"
    ],
    "finalAssessmentRaw": "Tally Prime, Vouchers & Ledgers, GST Compliance, TDS/TCS Returns, Inventory & Payroll, Financial Statements",
    "qualities": [
      {
        "id": "problem_solver",
        "title": "Problem Solver",
        "description": "Approaching technical challenges with logical and practical solutions."
      },
      {
        "id": "responsible",
        "title": "Responsible",
        "description": "Demonstrating responsibility towards assignments, projects and deadlines."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0013",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0014",
    "studentName": "Pavithra M",
    "courseName": "Tally Prime & Financial Accounting",
    "description": "has successfully completed the Professional Tally Prime & Business Accounting program, including GST filing and statutory compliance.",
    "startDate": "2024-08-15",
    "endDate": "2024-11-15",
    "formattedDuration": "Aug 15, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "Tally Prime",
      "Vouchers & Ledgers",
      "GST Compliance",
      "TDS/TCS Returns",
      "Inventory & Payroll",
      "Financial Statements"
    ],
    "finalAssessmentRaw": "Tally Prime, Vouchers & Ledgers, GST Compliance, TDS/TCS Returns, Inventory & Payroll, Financial Statements",
    "qualities": [
      {
        "id": "collaborative",
        "title": "Collaborative",
        "description": "Working effectively with peers during activities and projects."
      },
      {
        "id": "curious",
        "title": "Curious",
        "description": "Showing curiosity and willingness to explore new concepts."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0014",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0015",
    "studentName": "G. INDIRA",
    "courseName": "Tally Prime & Financial Accounting",
    "description": "has successfully completed the Professional Tally Prime & Business Accounting program, including GST filing and statutory compliance.",
    "startDate": "2024-08-15",
    "endDate": "2024-11-15",
    "formattedDuration": "Aug 15, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "Tally Prime",
      "Vouchers & Ledgers",
      "GST Compliance",
      "TDS/TCS Returns",
      "Inventory & Payroll",
      "Financial Statements"
    ],
    "finalAssessmentRaw": "Tally Prime, Vouchers & Ledgers, GST Compliance, TDS/TCS Returns, Inventory & Payroll, Financial Statements",
    "qualities": [
      {
        "id": "dedicated",
        "title": "Dedicated",
        "description": "Showing commitment and dedication towards learning and completing assigned tasks."
      },
      {
        "id": "creative",
        "title": "Creative",
        "description": "Demonstrating creativity while developing projects and solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0015",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0016",
    "studentName": "Dharika M",
    "courseName": "SQL Database Architecture & Design",
    "description": "has successfully completed the SQL Database Architecture, Query Optimization & Data Management program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-15",
    "formattedDuration": "Aug 01, 2024 - Oct 15, 2024",
    "finalAssessment": [
      "Relational Database Design",
      "Complex SQL Queries",
      "Joins & Subqueries",
      "Stored Procedures",
      "Indexing & Optimization"
    ],
    "finalAssessmentRaw": "Relational Database Design, Complex SQL Queries, Joins & Subqueries, Stored Procedures, Indexing & Optimization",
    "qualities": [
      {
        "id": "disciplined",
        "title": "Disciplined",
        "description": "Following a structured approach towards learning and completing tasks."
      },
      {
        "id": "quick_learner",
        "title": "Quick Learner",
        "description": "Demonstrating the ability to understand and apply new concepts quickly."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0016",
    "generatedDate": "2024-10-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0017",
    "studentName": "Ananthi R",
    "courseName": "Tally Prime & Financial Accounting",
    "description": "has successfully completed the Professional Tally Prime & Business Accounting program, including GST filing and statutory compliance.",
    "startDate": "2024-08-15",
    "endDate": "2024-11-15",
    "formattedDuration": "Aug 15, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "Tally Prime",
      "Vouchers & Ledgers",
      "GST Compliance",
      "TDS/TCS Returns",
      "Inventory & Payroll",
      "Financial Statements"
    ],
    "finalAssessmentRaw": "Tally Prime, Vouchers & Ledgers, GST Compliance, TDS/TCS Returns, Inventory & Payroll, Financial Statements",
    "qualities": [
      {
        "id": "technical",
        "title": "Technical",
        "description": "Applying technical knowledge effectively during practical activities."
      },
      {
        "id": "leadership",
        "title": "Leadership",
        "description": "Taking initiative and demonstrating leadership during team activities."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0017",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0018",
    "studentName": "Ramya Shri V",
    "courseName": "Data Analytics & Business Intelligence",
    "description": "has successfully completed the Comprehensive Data Analytics, Power BI & Applied Python program, and demonstrated mastery in analytical dashboard design.",
    "startDate": "2024-08-01",
    "endDate": "2024-11-30",
    "formattedDuration": "Aug 01,2024 - Nov 30,2024",
    "finalAssessment": [
      "SQL & Data Extraction",
      "Python for Analytics",
      "Pandas & NumPy",
      "Matplotlib & Seaborn",
      "Power BI Dashboards",
      "DAX Modeling"
    ],
    "finalAssessmentRaw": "SQL & Data Extraction, Python for Analytics, Pandas & NumPy, Matplotlib & Seaborn, Power BI Dashboards, DAX Modeling",
    "qualities": [
      {
        "id": "communication",
        "title": "Communication",
        "description": "Expressing ideas clearly and participating actively in discussions."
      },
      {
        "id": "analytical",
        "title": "Analytical",
        "description": "Demonstrating logical thinking and analytical ability while solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0018",
    "generatedDate": "2024-11-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0019",
    "studentName": "V. Kaven Atchyuthan",
    "courseName": "Core JavaScript & Modern Web Development",
    "description": "has successfully completed the Core JavaScript & Asynchronous Web Programming program.",
    "startDate": "2024-07-15",
    "endDate": "2024-10-30",
    "formattedDuration": "July 15, 2024 - Oct 30, 2024",
    "finalAssessment": [
      "ES6+ JavaScript",
      "DOM Manipulation",
      "Async/Await & Promises",
      "API Integration",
      "OOP & Modular JS"
    ],
    "finalAssessmentRaw": "ES6+ JavaScript, DOM Manipulation, Async/Await & Promises, API Integration, OOP & Modular JS",
    "qualities": [
      {
        "id": "innovative",
        "title": "Innovative",
        "description": "Bringing creative and original ideas to assignments or projects."
      },
      {
        "id": "eager",
        "title": "Eager",
        "description": "Displaying enthusiasm and eagerness to participate in class."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0019",
    "generatedDate": "2024-10-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0020",
    "studentName": "MARI SELVAM",
    "courseName": "Modern Web Design & Frontend Development",
    "description": "has successfully completed the Modern Web Design & Frontend UI Development Certification program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-31",
    "formattedDuration": "Aug 01, 2024 - Oct 31, 2024",
    "finalAssessment": [
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
      "Responsive Design",
      "Bootstrap",
      "Modern UI/UX"
    ],
    "finalAssessmentRaw": "HTML5, CSS3, Flexbox & CSS Grid, Responsive Design, Bootstrap, Modern UI/UX",
    "qualities": [
      {
        "id": "consistent",
        "title": "Consistent",
        "description": "Maintaining consistent effort and participation throughout the course."
      },
      {
        "id": "adaptable",
        "title": "Adaptable",
        "description": "Quickly adapting to new concepts, technologies and learning environments."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0020",
    "generatedDate": "2024-10-31",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0021",
    "studentName": "Satheesh D",
    "courseName": "Modern Web Design & Frontend Development",
    "description": "has successfully completed the Modern Web Design & Frontend UI Development Certification program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-31",
    "formattedDuration": "Aug 01, 2024 - Oct 31, 2024",
    "finalAssessment": [
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
      "Responsive Design",
      "Bootstrap",
      "Modern UI/UX"
    ],
    "finalAssessmentRaw": "HTML5, CSS3, Flexbox & CSS Grid, Responsive Design, Bootstrap, Modern UI/UX",
    "qualities": [
      {
        "id": "problem_solver",
        "title": "Problem Solver",
        "description": "Approaching technical challenges with logical and practical solutions."
      },
      {
        "id": "responsible",
        "title": "Responsible",
        "description": "Demonstrating responsibility towards assignments, projects and deadlines."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0021",
    "generatedDate": "2024-10-31",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0022",
    "studentName": "Uthaya Chandran",
    "courseName": "Modern Web Design & Frontend Development",
    "description": "has successfully completed the Modern Web Design & Frontend UI Development Certification program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-31",
    "formattedDuration": "Aug 01, 2024 - Oct 31, 2024",
    "finalAssessment": [
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
      "Responsive Design",
      "Bootstrap",
      "Modern UI/UX"
    ],
    "finalAssessmentRaw": "HTML5, CSS3, Flexbox & CSS Grid, Responsive Design, Bootstrap, Modern UI/UX",
    "qualities": [
      {
        "id": "collaborative",
        "title": "Collaborative",
        "description": "Working effectively with peers during activities and projects."
      },
      {
        "id": "curious",
        "title": "Curious",
        "description": "Showing curiosity and willingness to explore new concepts."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0022",
    "generatedDate": "2024-10-31",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0023",
    "studentName": "Jeyakodi K",
    "courseName": "Modern Web Design & Frontend Development",
    "description": "has successfully completed the Modern Web Design & Frontend UI Development Certification program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-31",
    "formattedDuration": "Aug 01, 2024 - Oct 31, 2024",
    "finalAssessment": [
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
      "Responsive Design",
      "Bootstrap",
      "Modern UI/UX"
    ],
    "finalAssessmentRaw": "HTML5, CSS3, Flexbox & CSS Grid, Responsive Design, Bootstrap, Modern UI/UX",
    "qualities": [
      {
        "id": "dedicated",
        "title": "Dedicated",
        "description": "Showing commitment and dedication towards learning and completing assigned tasks."
      },
      {
        "id": "creative",
        "title": "Creative",
        "description": "Demonstrating creativity while developing projects and solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0023",
    "generatedDate": "2024-10-31",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0024",
    "studentName": "Kousalya V",
    "courseName": "Modern Web Design & Frontend Development",
    "description": "has successfully completed the Modern Web Design & Frontend UI Development Certification program.",
    "startDate": "2024-08-01",
    "endDate": "2024-10-31",
    "formattedDuration": "Aug 01, 2024 - Oct 31, 2024",
    "finalAssessment": [
      "HTML5",
      "CSS3",
      "Flexbox & CSS Grid",
      "Responsive Design",
      "Bootstrap",
      "Modern UI/UX"
    ],
    "finalAssessmentRaw": "HTML5, CSS3, Flexbox & CSS Grid, Responsive Design, Bootstrap, Modern UI/UX",
    "qualities": [
      {
        "id": "disciplined",
        "title": "Disciplined",
        "description": "Following a structured approach towards learning and completing tasks."
      },
      {
        "id": "quick_learner",
        "title": "Quick Learner",
        "description": "Demonstrating the ability to understand and apply new concepts quickly."
      }
    ],
    "photoUrl": "/id_card_assets/kousalya_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0024",
    "generatedDate": "2024-10-31",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "contain"
  },
  {
    "id": "AFE-2026-0025",
    "studentName": "GokulNath",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2024-12-15",
    "formattedDuration": "June 15, 2024 - Dec 15, 2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "technical",
        "title": "Technical",
        "description": "Applying technical knowledge effectively during practical activities."
      },
      {
        "id": "leadership",
        "title": "Leadership",
        "description": "Taking initiative and demonstrating leadership during team activities."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0025",
    "generatedDate": "2024-12-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0026",
    "studentName": "Fazil",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2024-12-15",
    "formattedDuration": "June 15, 2024 - Dec 15, 2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "communication",
        "title": "Communication",
        "description": "Expressing ideas clearly and participating actively in discussions."
      },
      {
        "id": "analytical",
        "title": "Analytical",
        "description": "Demonstrating logical thinking and analytical ability while solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0026",
    "generatedDate": "2024-12-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0027",
    "studentName": "Naveen - DA",
    "courseName": "Data Analytics & Business Intelligence",
    "description": "has successfully completed the Comprehensive Data Analytics, Power BI & Applied Python program, and demonstrated mastery in analytical dashboard design.",
    "startDate": "2024-08-01",
    "endDate": "2024-11-30",
    "formattedDuration": "Aug 01,2024 - Nov 30,2024",
    "finalAssessment": [
      "SQL & Data Extraction",
      "Python for Analytics",
      "Pandas & NumPy",
      "Matplotlib & Seaborn",
      "Power BI Dashboards",
      "DAX Modeling"
    ],
    "finalAssessmentRaw": "SQL & Data Extraction, Python for Analytics, Pandas & NumPy, Matplotlib & Seaborn, Power BI Dashboards, DAX Modeling",
    "qualities": [
      {
        "id": "innovative",
        "title": "Innovative",
        "description": "Bringing creative and original ideas to assignments or projects."
      },
      {
        "id": "eager",
        "title": "Eager",
        "description": "Displaying enthusiasm and eagerness to participate in class."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0027",
    "generatedDate": "2024-11-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0028",
    "studentName": "Gowtham",
    "courseName": "Data Analytics & Business Intelligence",
    "description": "has successfully completed the Comprehensive Data Analytics, Power BI & Applied Python program, and demonstrated mastery in analytical dashboard design.",
    "startDate": "2024-08-01",
    "endDate": "2024-11-30",
    "formattedDuration": "Aug 01,2024 - Nov 30,2024",
    "finalAssessment": [
      "SQL & Data Extraction",
      "Python for Analytics",
      "Pandas & NumPy",
      "Matplotlib & Seaborn",
      "Power BI Dashboards",
      "DAX Modeling"
    ],
    "finalAssessmentRaw": "SQL & Data Extraction, Python for Analytics, Pandas & NumPy, Matplotlib & Seaborn, Power BI Dashboards, DAX Modeling",
    "qualities": [
      {
        "id": "consistent",
        "title": "Consistent",
        "description": "Maintaining consistent effort and participation throughout the course."
      },
      {
        "id": "adaptable",
        "title": "Adaptable",
        "description": "Quickly adapting to new concepts, technologies and learning environments."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0028",
    "generatedDate": "2024-11-30",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0029",
    "studentName": "Yazhini",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed the Full Stack Development in Python program, and has also successfully completed a Full Stack Development Internship.",
    "startDate": "2024-06-15",
    "endDate": "2024-12-15",
    "formattedDuration": "June 15, 2024 - Dec 15, 2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "problem_solver",
        "title": "Problem Solver",
        "description": "Approaching technical challenges with logical and practical solutions."
      },
      {
        "id": "responsible",
        "title": "Responsible",
        "description": "Demonstrating responsibility towards assignments, projects and deadlines."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0029",
    "generatedDate": "2024-12-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0030",
    "studentName": "Rama",
    "courseName": "Full Stack Web Development",
    "description": "has successfully completed the Full Stack Web Development program, including modern component architecture, state management, and cloud deployments.",
    "startDate": "2024-07-01",
    "endDate": "2024-11-15",
    "formattedDuration": "July 01, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "HTML5 & CSS3",
      "Modern JavaScript (ES6+)",
      "React Components & Hooks",
      "Git/GitHub",
      "JSON APIs",
      "DevOps & Deployment"
    ],
    "finalAssessmentRaw": "HTML5 & CSS3, Modern JavaScript (ES6+), React Components & Hooks, Git/GitHub, JSON APIs, DevOps & Deployment",
    "qualities": [
      {
        "id": "collaborative",
        "title": "Collaborative",
        "description": "Working effectively with peers during activities and projects."
      },
      {
        "id": "curious",
        "title": "Curious",
        "description": "Showing curiosity and willingness to explore new concepts."
      }
    ],
    "photoUrl": "/id_card_assets/sample_female_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0030",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0031",
    "studentName": "satheesh tally",
    "courseName": "Tally Prime & Financial Accounting",
    "description": "has successfully completed the Professional Tally Prime & Business Accounting program, including GST filing and statutory compliance.",
    "startDate": "2024-08-15",
    "endDate": "2024-11-15",
    "formattedDuration": "Aug 15, 2024 - Nov 15, 2024",
    "finalAssessment": [
      "Tally Prime",
      "Vouchers & Ledgers",
      "GST Compliance",
      "TDS/TCS Returns",
      "Inventory & Payroll",
      "Financial Statements"
    ],
    "finalAssessmentRaw": "Tally Prime, Vouchers & Ledgers, GST Compliance, TDS/TCS Returns, Inventory & Payroll, Financial Statements",
    "qualities": [
      {
        "id": "dedicated",
        "title": "Dedicated",
        "description": "Showing commitment and dedication towards learning and completing assigned tasks."
      },
      {
        "id": "creative",
        "title": "Creative",
        "description": "Demonstrating creativity while developing projects and solving problems."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0031",
    "generatedDate": "2024-11-15",
    "templateId": "template-1",
    "status": "verified",
    "photoFit": "cover"
  },
  {
    "id": "AFE-2026-0032",
    "studentName": "SANGERTH.A",
    "courseName": "Full Stack Development in Python",
    "description": "has successfully completed a Full Stack Development program in Python and a Full Stack Development internship.",
    "startDate": "2024-09-02",
    "endDate": "2024-12-14",
    "formattedDuration": "Sep 02,2024 - Dec 14,2024",
    "finalAssessment": [
      "HTML",
      "CSS",
      "JS",
      "Bootstrap",
      "JSON",
      "Git/GitHub",
      "Devops",
      "React",
      "Python",
      "Django and SQL"
    ],
    "finalAssessmentRaw": "HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL",
    "qualities": [
      {
        "id": "resourceful",
        "title": "Resourceful",
        "description": "Finding creative solutions and utilizing available resources."
      },
      {
        "id": "diligent",
        "title": "Diligent",
        "description": "Consistently putting in hard work and effort."
      }
    ],
    "photoUrl": "/id_card_assets/sample_student_photo.jpg",
    "photoFit": "cover",
    "qrCodeUrl": "https://www.alphafly.in/verify/AFE-2026-0032",
    "generatedDate": "2024-12-14",
    "templateId": "template-1",
    "status": "verified"
  }
];

export function formatDateString(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).replace(/(\w+)\s(\d+),\s(\d+)/, '$1 $2,$3');
}

export function formatDurationRange(start: string, end: string): string {
  if (!start && !end) return '';
  if (!start) return formatDateString(end);
  if (!end) return formatDateString(start);
  return `${formatDateString(start)} - ${formatDateString(end)}`;
}

export function getStoredCertificates(): CertificateData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CERTIFICATES));
      return INITIAL_CERTIFICATES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CERTIFICATES));
      return INITIAL_CERTIFICATES;
    }

    const initialMap = new Map<string, CertificateData>(
      INITIAL_CERTIFICATES.map(c => [c.id.toUpperCase(), c])
    );
    
    // Auto-recover: Check if any initial certificates are missing from localStorage
    const existingIds = new Set(parsed.map((c: any) => (c.id || '').toUpperCase()));
    let hasChanges = false;
    for (const initCert of INITIAL_CERTIFICATES) {
      if (!existingIds.has(initCert.id.toUpperCase())) {
        parsed.push(initCert);
        existingIds.add(initCert.id.toUpperCase());
        hasChanges = true;
      }
    }

    // Sanitize in case any certificate is missing required fields, or has outdated photos
    const sanitized = parsed.map((cert: any, idx: number): CertificateData => {
      const id = cert.id || `AFE-${new Date().getFullYear()}-${String(idx + 1).padStart(4, '0')}`;
      const idUpper = id.toUpperCase();
      const defaultDate = new Date().toISOString().split('T')[0];
      const genDate = cert.generatedDate || cert.issueDate || defaultDate;
      const initialCert = initialMap.get(idUpper);

      // Auto-heal student name for AFE-2026-0001 (Kousalya V was erroneously temporarily swapped with Sangerth)
      let studentName = cert.studentName || `Student ${idx + 1}`;
      if (idUpper === 'AFE-2026-0001' && studentName.toUpperCase().includes('SANGERTH')) {
        studentName = 'Kousalya V';
        hasChanges = true;
      }

      // Determine photoUrl and photoFit
      let photoUrl = cert.photoUrl;
      let photoFit = cert.photoFit;

      // If photoUrl was the generic sample boy photo or missing, upgrade to authentic photo from database
      if (!photoUrl || photoUrl === '/id_card_assets/sample_student_photo.jpg') {
        if (initialCert?.photoUrl && initialCert.photoUrl !== '/id_card_assets/sample_student_photo.jpg') {
          photoUrl = initialCert.photoUrl;
          hasChanges = true;
        } else if (!photoUrl) {
          photoUrl = '/id_card_assets/sample_student_photo.jpg';
        }
      }

      // Ensure AFE-2026-0001 uses recovered Kousalya artwork
      if (idUpper === 'AFE-2026-0001' && (!photoUrl || photoUrl.includes('sample_student_photo'))) {
        photoUrl = '/id_card_assets/kousalya_photo.jpg';
        photoFit = 'contain';
        hasChanges = true;
      }

      // Default photoFit: 'contain' for landscape artwork like Kousalya's, 'cover' for standard portrait photos
      if (!photoFit) {
        if (initialCert?.photoFit) {
          photoFit = initialCert.photoFit;
        } else if (photoUrl?.includes('kousalya') || idUpper === 'AFE-2026-0001') {
          photoFit = 'contain';
        } else {
          photoFit = 'cover';
        }
        hasChanges = true;
      }

      return {
        id,
        studentName,
        courseName: cert.courseName || initialCert?.courseName || 'Full Stack Development in Python',
        description: cert.description || initialCert?.description || 'has successfully completed the Full Stack Development program in Python and a Full Stack Development internship.',
        startDate: cert.startDate || initialCert?.startDate || '2024-09-02',
        endDate: cert.endDate || initialCert?.endDate || '2024-12-14',
        formattedDuration: cert.formattedDuration || cert.courseDuration || initialCert?.formattedDuration || 'Sep 02,2024 - Dec 14,2024',
        issueDate: cert.issueDate || genDate,
        generatedDate: genDate,
        finalAssessment: Array.isArray(cert.finalAssessment) && cert.finalAssessment.length > 0
          ? cert.finalAssessment
          : (initialCert?.finalAssessment || ['HTML', 'CSS', 'JS', 'Bootstrap', 'JSON', 'Git/GitHub', 'DevOps', 'React', 'Python', 'Django and SQL']),
        finalAssessmentRaw: cert.finalAssessmentRaw || (Array.isArray(cert.finalAssessment) ? cert.finalAssessment.join(', ') : initialCert?.finalAssessmentRaw || ''),
        qualities: (Array.isArray(cert.qualities) && cert.qualities.length >= 2) ? cert.qualities : (initialCert?.qualities || getRandomTwoQualities()),
        photoUrl,
        photoFit,
        qrCodeUrl: cert.qrCodeUrl || `https://www.alphafly.in/verify/${id}`,
        templateId: cert.templateId || 'template-1',
        status: cert.status || 'verified',
      };
    });

    if (hasChanges) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (saveErr) {
        console.warn('Could not auto-save healed certificates to localStorage:', saveErr);
      }
    }

    return sanitized;
  } catch (e) {
    return INITIAL_CERTIFICATES;
  }
}

/**
 * Force recovery: Merges all initial database certificates and preserves any user edits.
 */
export function recoverAllCertificates(): CertificateData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: CertificateData[] = raw ? JSON.parse(raw) : [];
    const certMap = new Map<string, CertificateData>();

    // Load initial certificates (with correct Kousalya artwork and female student photos)
    for (const c of INITIAL_CERTIFICATES) {
      certMap.set(c.id.toUpperCase(), { ...c });
    }

    // Overlay existing user edits or newly added certificates
    if (Array.isArray(existing)) {
      for (const c of existing) {
        if (c && c.id) {
          const idUpper = c.id.toUpperCase();
          const initCert = certMap.get(idUpper);

          // If AFE-2026-0001 was temporarily Sangerth, keep Kousalya
          if (idUpper === 'AFE-2026-0001' && (c.studentName?.toUpperCase().includes('SANGERTH') || c.photoUrl?.includes('sample_student_photo'))) {
            continue;
          }

          // If user had generic sample photo but initial certificate has authentic photo, keep authentic
          let photoUrl = c.photoUrl;
          let photoFit = c.photoFit;
          if ((!photoUrl || photoUrl === '/id_card_assets/sample_student_photo.jpg') && initCert?.photoUrl && initCert.photoUrl !== '/id_card_assets/sample_student_photo.jpg') {
            photoUrl = initCert.photoUrl;
            photoFit = initCert.photoFit;
          }

          certMap.set(idUpper, {
            ...(initCert || {}),
            ...c,
            photoUrl: photoUrl || initCert?.photoUrl || '/id_card_assets/sample_student_photo.jpg',
            photoFit: photoFit || initCert?.photoFit || 'cover'
          });
        }
      }
    }

    const merged = Array.from(certMap.values());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CERTIFICATES));
    return INITIAL_CERTIFICATES;
  }
}

export function saveStoredCertificates(certs: CertificateData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  } catch (e) {
    console.error('Error saving certificates to localStorage:', e);
  }
}

export function generateNextCertificateId(existingCerts: CertificateData[]): string {
  const currentYear = new Date().getFullYear();
  let maxSeq = 0;

  existingCerts.forEach(c => {
    const match = c.id.match(/AFE-(\d{4})-(\d+)/i);
    if (match) {
      const seq = parseInt(match[2], 10);
      if (!isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  });

  const nextSeq = (maxSeq + 1).toString().padStart(4, '0');
  return `AFE-${currentYear}-${nextSeq}`;
}

export function createNewBlankCertificate(existingCerts: CertificateData[]): CertificateData {
  const newId = generateNextCertificateId(existingCerts);
  const randomQualities = getRandomTwoQualities();

  return {
    id: newId,
    studentName: '',
    courseName: 'Full Stack Development in Python',
    description:
      'has successfully completed a Full Stack Development program in Python and a Full Stack Development internship.',
    startDate: '2024-09-02',
    endDate: '2024-12-14',
    formattedDuration: 'Sep 02,2024 - Dec 14,2024',
    finalAssessment: [
      'HTML',
      'CSS',
      'JS',
      'Bootstrap',
      'JSON',
      'Git/GitHub',
      'Devops',
      'React',
      'Python',
      'Django and SQL'
    ],
    finalAssessmentRaw: 'HTML, CSS, JS, Bootstrap, JSON, Git/GitHub, Devops, React, Python, Django and SQL',
    qualities: randomQualities,
    qrCodeUrl: `https://www.alphafly.in/verify/${newId}`,
    generatedDate: new Date().toISOString().split('T')[0],
    templateId: 'template-1',
    status: 'verified'
  };
}

export function getStoredAssets(): CustomAssets {
  try {
    const raw = localStorage.getItem(ASSETS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveStoredAssets(assets: CustomAssets): void {
  try {
    localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(assets));
  } catch (e) {
    console.error('Error saving custom assets to localStorage:', e);
  }
}
