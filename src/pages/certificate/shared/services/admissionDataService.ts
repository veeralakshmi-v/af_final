import type { IDCardData } from '../../idcard/types/idcard';
import type { CertificateData } from '../../certificate/types/certificate';
import { generateNextIDCardNumber } from '../../idcard/data/idCardStore';
import { generateNextCertificateId, formatDurationRange } from '../../certificate/data/certificateStore';
import { getRandomTwoQualities } from '../../certificate/data/qualityLibrary';

export interface AdmissionCandidate {
  id: string; // e.g. "APP-2026-001" or student ID / accessCode
  applicationReference: string;
  studentName: string;
  courseName: string;
  courseKey: string;
  dob: string;
  doj: string;
  joiningDate: string;
  contactNumber: string;
  email: string;
  fatherName: string;
  address: string;
  photoUrl: string;
  idCardNumber: string;
  idCardStatus: string;
  admissionStatus: string;
  educationQualification?: string;
  idProofType?: string;
  idProofNumber?: string;
  submittedAt?: string;
  source: 'admission' | 'student';
}

/**
 * Normalizes course names to readable certificate / ID card titles
 */
export function normalizeCourseTitle(rawCourse: string): string {
  if (!rawCourse) return 'Python Full Stack Development';
  const c = rawCourse.trim();

  // If it's a comma-separated track list, check if it's fullstack or data
  if (c.includes(',')) {
    if (c.includes('python_fullstack') || c.includes('django') || c.includes('react')) {
      return 'Full Stack Development in Python';
    }
    if (c.includes('data_analysis') || c.includes('powerbi')) {
      return 'Data Analysis Specialization';
    }
    if (c.includes('data_analytics') || c.includes('pandas')) {
      return 'Data Analytics & Visualization';
    }
    if (c.includes('summer')) {
      return 'Summer Python & AI Bootcamp';
    }
    return 'Full Stack Development in Python';
  }

  const map: Record<string, string> = {
    python_fullstack: 'Full Stack Development in Python',
    python_course: 'Core Python & Object-Oriented Programming',
    web_design_20days: 'AI-Powered Web Design & UI Development',
    html_css: 'Responsive Web Design (HTML, CSS & Bootstrap)',
    sql: 'Databases & SQL Engineering',
    core_js: 'Modern JavaScript & Dynamic Web Apps',
    react_course: 'AI-Powered React JS Frontend Development',
    django_course: 'Full Stack Web Development with Django',
    git_github: 'Git Version Control & Collaborative Engineering',
    json_course: 'JSON Essentials & RESTful API Architecture',
    devops: 'DevOps & Cloud Systems Framework',
    data_analysis: 'Data Analysis Specialization',
    python_da: 'Python for Data Analytics & Insights',
    sql_da: 'SQL for Data Analytics & Business Intelligence',
    powerbi: 'Power BI Business Analytics & Dashboards',
    data_analytics: 'Data Analytics & Visualization',
    stats_course: 'Applied Statistics for Data Science',
    numpy_course: 'NumPy Numerical Computing',
    pandas_course: 'Pandas Data Analysis & Manipulation',
    matplotlib_course: 'Data Visualization with Matplotlib & Seaborn',
    summer_python: 'Summer Python & AI Bootcamp',
    summer_sql: 'Summer Database & SQL Bootcamp',
    summer_html: 'Summer Web Design Bootcamp',
    agentic_ai: 'Agentic AI & LLM Systems Architecture',
    tally_prime: 'Tally Prime & GST Certification',
    spoko_hr: 'HR Interview Mastery & Professional Communication',
    spoko_reasoning: 'Logical Reasoning & Analytical Thinking',
    all: 'Complete Software & AI Engineering Curriculum'
  };

  if (map[c.toLowerCase()]) return map[c.toLowerCase()];
  if (c.length > 3 && !c.includes('_')) return c;

  return c
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Tailored assessment tags by course
 */
export function getAssessmentTagsForCourse(courseName: string): string[] {
  const norm = (courseName || '').toLowerCase();
  if (norm.includes('data analys') || norm.includes('power bi')) {
    return ['Python for Analytics', 'SQL & Databases', 'Power BI', 'Data Cleaning', 'EDA', 'DAX Formulas', 'Interactive Dashboards'];
  }
  if (norm.includes('data analytics') || norm.includes('stats') || norm.includes('pandas')) {
    return ['Applied Statistics', 'NumPy', 'Pandas', 'Matplotlib & Seaborn', 'Data Preprocessing', 'Hypothesis Testing', 'Predictive Modeling'];
  }
  if (norm.includes('tally')) {
    return ['Tally Prime 4.0', 'GST Invoicing & E-Way Bills', 'Ledger Accounting', 'Inventory Management', 'Payroll', 'Balance Sheet Finalization'];
  }
  if (norm.includes('agentic') || norm.includes('ai') || norm.includes('bootcamp')) {
    return ['Prompt Engineering', 'LangChain', 'Flowise AI', 'RAG Pipelines', 'Vector Databases', 'Autonomous Agents', 'OpenAI & Claude APIs'];
  }
  if (norm.includes('web design') || norm.includes('html')) {
    return ['HTML5 Semantic Elements', 'CSS3 Flexbox & Grid', 'Responsive UI', 'Bootstrap 5', 'Modern Typography', 'Web Deployment'];
  }

  // Default Full Stack Python
  return ['HTML', 'CSS', 'JS', 'Bootstrap', 'JSON', 'Git/GitHub', 'Devops', 'React', 'Python', 'Django and SQL'];
}

/**
 * Calculates default course duration (e.g. 3 to 6 months from start date)
 */
export function calculateCourseDates(startDateStr?: string): { startDate: string; endDate: string; formattedDuration: string } {
  const today = new Date();
  let start = today;

  if (startDateStr && !isNaN(new Date(startDateStr).getTime())) {
    start = new Date(startDateStr);
  }

  const end = new Date(start);
  end.setMonth(end.getMonth() + 3);

  const startIso = start.toISOString().split('T')[0];
  const endIso = end.toISOString().split('T')[0];
  const formattedDuration = formatDurationRange(startIso, endIso);

  return {
    startDate: startIso,
    endDate: endIso,
    formattedDuration
  };
}

/**
 * Fetches all admission candidates from /api/admissions and /api/students
 */
export async function fetchAdmissionCandidates(preloadedStudents: any[] = []): Promise<AdmissionCandidate[]> {
  const candidatesMap = new Map<string, AdmissionCandidate>();

  // 1. Fetch from /api/admissions
  try {
    const res = await fetch('/api/admissions');
    if (res.ok) {
      const admissions = await res.json();
      if (Array.isArray(admissions)) {
        admissions.forEach(adm => {
          const ref = adm.applicationReference || adm._id || `APP-${Math.random()}`;
          const form = adm.admissionFormData || {};
          const candidateName = (form.fullName || adm.studentName || '').trim();
          if (!candidateName) return;

          const rawCourse = form.courseName || form.course || adm.courseName || adm.courseKey || '';
          const resolvedCourse = normalizeCourseTitle(rawCourse);
          const resolvedDob = (form.dob || adm.dob || '').trim();
          const resolvedDoj = (form.doj || form.joiningDate || adm.doj || adm.joiningDate || '').trim();
          const resolvedPhone = (form.contactNumber || adm.contactNumber || '').trim();
          const resolvedFather = (form.fatherName || '').trim();
          const resolvedAddress = (form.address || '').trim();
          const resolvedPhoto = form.photoUrl || adm.photoUrl || '';
          const resolvedIdCard = (adm.idCardNumber || form.idCardNumber || '').trim();

          candidatesMap.set(ref, {
            id: ref,
            applicationReference: adm.applicationReference || ref,
            studentName: candidateName,
            courseName: resolvedCourse,
            courseKey: adm.courseKey || form.course || 'python_fullstack',
            dob: resolvedDob,
            doj: resolvedDoj,
            joiningDate: resolvedDoj,
            contactNumber: resolvedPhone,
            email: (form.email || adm.email || '').trim(),
            fatherName: resolvedFather,
            address: resolvedAddress,
            photoUrl: resolvedPhoto,
            idCardNumber: resolvedIdCard,
            idCardStatus: adm.idCardStatus || (resolvedIdCard ? 'Issued' : 'Not Generated'),
            admissionStatus: adm.verificationStatus || adm.admissionStatus || 'Submitted',
            educationQualification: form.educationQualification || '',
            idProofType: form.idProofType || '',
            idProofNumber: form.idProofNumber || '',
            submittedAt: adm.createdAt || form.submittedAt,
            source: 'admission'
          });
        });
      }
    }
  } catch (e) {
    console.warn('Could not fetch /api/admissions directly:', e);
  }

  // 2. Fetch or incorporate /api/students
  let studentsList = preloadedStudents;
  if (!studentsList || studentsList.length === 0) {
    try {
      const res = await fetch('/api/students');
      if (res.ok) {
        studentsList = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch /api/students:', e);
    }
  }

  if (Array.isArray(studentsList)) {
    studentsList.forEach(s => {
      const key = s.accessCode || s.studentId || s._id || s.name;
      const form = s.admissionFormData || {};
      const candidateName = (s.name || form.fullName || '').trim();
      if (!candidateName) return;

      const rawCourse = s.enrolledCourse || s.course || form.courseName || form.course || '';
      const resolvedCourse = normalizeCourseTitle(rawCourse);
      const resolvedDob = (s.dob || form.dob || '').trim();
      const resolvedDoj = (s.doj || s.joiningDate || form.doj || form.joiningDate || '').trim();
      const resolvedPhone = (s.contactNumber || s.phone || form.contactNumber || '').trim();
      const resolvedFather = (s.fatherName || form.fatherName || '').trim();
      const resolvedAddress = (s.address || form.address || '').trim();
      const resolvedPhoto = s.photoUrl || form.photoUrl || '';
      const resolvedIdCard = (s.idCardNumber || form.idCardNumber || '').trim();

      // Check if candidate already registered via admission
      const existing = Array.from(candidatesMap.values()).find(c => 
        c.studentName.toLowerCase() === candidateName.toLowerCase() ||
        (resolvedPhone && c.contactNumber === resolvedPhone)
      );

      if (existing) {
        // Enrich existing record with any missing student fields
        if (!existing.photoUrl && resolvedPhoto) existing.photoUrl = resolvedPhoto;
        if (!existing.dob && resolvedDob) existing.dob = resolvedDob;
        if (!existing.doj && resolvedDoj) existing.doj = resolvedDoj;
        if (!existing.idCardNumber && resolvedIdCard) existing.idCardNumber = resolvedIdCard;
      } else {
        candidatesMap.set(`STU-${key}`, {
          id: s.accessCode || `STU-${key}`,
          applicationReference: s.accessCode || `STU-${key}`,
          studentName: candidateName,
          courseName: resolvedCourse,
          courseKey: s.enrolledCourse || 'python_fullstack',
          dob: resolvedDob,
          doj: resolvedDoj,
          joiningDate: resolvedDoj,
          contactNumber: resolvedPhone,
          email: (s.email || form.email || '').trim(),
          fatherName: resolvedFather,
          address: resolvedAddress,
          photoUrl: resolvedPhoto,
          idCardNumber: resolvedIdCard,
          idCardStatus: resolvedIdCard ? 'Issued' : 'Not Generated',
          admissionStatus: s.admissionStatus || 'Approved',
          educationQualification: s.educationQualification || form.educationQualification || '',
          idProofType: s.idProofType || form.idProofType || '',
          idProofNumber: s.idProofNumber || form.idProofNumber || '',
          submittedAt: s.createdAt,
          source: 'student'
        });
      }
    });
  }

  return Array.from(candidatesMap.values()).sort((a, b) => 
    (b.submittedAt ? new Date(b.submittedAt).getTime() : 0) - (a.submittedAt ? new Date(a.submittedAt).getTime() : 0)
  );
}

/**
 * Populates IDCardData directly from an admission form record
 */
export function populateIDCardFromAdmission(candidate: AdmissionCandidate, existingCards: IDCardData[] = []): IDCardData {
  const cardId = candidate.idCardNumber && candidate.idCardNumber.trim() 
    ? candidate.idCardNumber.trim() 
    : generateNextIDCardNumber(existingCards);

  const fallbackPhoto = '/id_card_assets/sample_student_photo.jpg';

  return {
    id: cardId,
    studentName: candidate.studentName.toUpperCase(),
    courseName: candidate.courseName,
    studentContact: candidate.contactNumber || '9840123456',
    emergencyPhone: candidate.fatherName ? `Father: ${candidate.fatherName}` : candidate.contactNumber || '9840123456',
    parentPhone: candidate.contactNumber || '9840123456',
    dob: candidate.dob || '2004-01-01',
    bloodGroup: 'B+ve',
    address: candidate.address || 'Theni, Tamil Nadu',
    emergencyContact: candidate.contactNumber || '9840123456',
    photoUrl: candidate.photoUrl || fallbackPhoto,
    qrCodeUrl: `https://www.alphafly.in/verify/id/${cardId}`,
    issueDate: candidate.doj || candidate.joiningDate || new Date().toISOString().split('T')[0],
    validUntil: '2026-12-31'
  };
}

/**
 * Populates CertificateData directly from an admission form record
 */
export function populateCertificateFromAdmission(candidate: AdmissionCandidate, existingCerts: CertificateData[] = []): CertificateData {
  const certId = generateNextCertificateId(existingCerts);
  const { startDate, endDate, formattedDuration } = calculateCourseDates(candidate.doj || candidate.joiningDate);
  const assessmentTags = getAssessmentTagsForCourse(candidate.courseName);
  const randomQualities = getRandomTwoQualities();

  return {
    id: certId,
    studentName: candidate.studentName.toUpperCase(),
    courseName: candidate.courseName,
    description: `has successfully completed the ${candidate.courseName} program at Alpha Fly Computer Education, Theni, demonstrating technical proficiency and dedication.`,
    startDate,
    endDate,
    formattedDuration,
    issueDate: new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    finalAssessment: assessmentTags,
    finalAssessmentRaw: assessmentTags.join(', '),
    qualities: randomQualities,
    photoUrl: candidate.photoUrl || undefined,
    photoFit: 'contain',
    qrCodeUrl: `https://www.alphafly.in/verify/${certId}`,
    generatedDate: new Date().toISOString().split('T')[0],
    templateId: 'template-1',
    status: 'verified'
  };
}
