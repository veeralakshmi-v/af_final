import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('⚠️ DNS override failed:', e.message);
}

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, '..');
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

export const coursePageSchema = new mongoose.Schema({
  pageId: { type: String, required: true, unique: true },
  subject: { type: String, required: true, index: true },
  courseKey: { type: String, default: '', index: true },
  moduleId: { type: String, default: '', index: true },
  componentName: { type: String, required: true, index: true },
  fileName: { type: String, required: true },
  title: { type: String, default: '' },
  rawContent: { type: String, default: '' },
  fileSizeBytes: { type: Number, default: 0 },
  isInteractive: { type: Boolean, default: false },
  location: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const CoursePage = mongoose.models.CoursePage || mongoose.model('CoursePage', coursePageSchema);

// Subject to courseKey mapping
const subjectToCourseKey = {
  'html-css': 'html_css',
  'sql': 'sql',
  'powerbi': 'powerbi',
  'agentic-ai': 'agentic_ai',
  'python': 'python_course',
  'generative-ai': 'generative_ai_course',
  'react': 'react_course',
  'git': 'git_github',
  'json': 'json_course',
  'django': 'django_course',
  'devops': 'devops',
  'statistics': 'stats_course',
  'numpy': 'numpy_course',
  'pandas': 'pandas_course',
  'matplotlib': 'matplotlib_course',
  'seaborn': 'seaborn_course',
  'javascript': 'core_js',
  'tally': 'tally_prime',
  'web-design': 'web_design_20days',
  'spoko': 'spoko_pro',
  'ai': 'ai_tools'
};

export async function extractAllCoursePages() {
  const pagesDir = path.join(rootDir, 'src', 'pages');
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Extract moduleId -> component mappings from App.jsx
  const renderRegex = /activeNode\.moduleId\s*===\s*['"]([^'"]+)['"]\s*&&\s*<([A-Za-z0-9_]+)/g;
  const compToModuleMap = {};
  let rm;
  while ((rm = renderRegex.exec(appContent)) !== null) {
    compToModuleMap[rm[2]] = rm[1];
  }

  const ignoredDirs = ['dashboards', 'certificate', 'invoice'];
  const subjectDirs = fs.readdirSync(pagesDir).filter(f => {
    const full = path.join(pagesDir, f);
    return fs.statSync(full).isDirectory() && !ignoredDirs.includes(f);
  });

  const pages = [];

  for (const subject of subjectDirs) {
    const dirPath = path.join(pagesDir, subject);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jsx'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const compName = file.replace(/\.jsx$/, '');
      const pageId = `${subject}_${compName}`;

      // Extract title
      let title = '';
      const titleMatch = content.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
      if (titleMatch) {
        title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      }
      if (!title) {
        const sectionTitle = content.match(/title\s*=\s*["']([^"']+)["']/);
        if (sectionTitle) title = sectionTitle[1];
      }
      if (!title) title = compName;

      const moduleId = compToModuleMap[compName] || compName.toLowerCase();
      const courseKey = subjectToCourseKey[subject] || subject.replace(/-/g, '_');

      const isInteractive = /useState|useEffect|eval\(|<iframe|<textarea|Playground|interactive/i.test(content);
      const location = `src/pages/${subject}/${file}`;

      pages.push({
        pageId,
        subject,
        courseKey,
        moduleId,
        componentName: compName,
        fileName: file,
        title: title.slice(0, 150),
        rawContent: content,
        fileSizeBytes: content.length,
        isInteractive,
        location,
        updatedAt: new Date()
      });
    }
  }

  return pages;
}

export async function seedCoursePages() {
  console.log('📡 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('✅ Connected to MongoDB Atlas!');

  console.log('🔍 Scanning src/pages across all subjects...');
  const pages = await extractAllCoursePages();
  console.log(`📦 Found ${pages.length} course pages across all subjects.`);

  console.log('🚀 Upserting course pages into MongoDB collection "course_pages"...');
  let inserted = 0;
  let updated = 0;

  for (const page of pages) {
    const res = await CoursePage.updateOne(
      { pageId: page.pageId },
      { $set: page },
      { upsert: true }
    );
    if (res.upsertedCount > 0) inserted++;
    else updated++;
  }

  console.log(`✅ Upsert complete! Inserted: ${inserted}, Updated: ${updated}`);
  const totalCount = await CoursePage.countDocuments();
  console.log(`🎉 Total course pages in MongoDB Atlas "course_pages" collection: ${totalCount}`);

  // Also write offline catalog index
  const catalogPath = path.join(currentDir, 'course_pages_catalog.json');
  const catalogList = pages.map(({ rawContent, ...meta }) => meta);
  fs.writeFileSync(catalogPath, JSON.stringify(catalogList, null, 2), 'utf8');
  console.log(`💾 Saved catalog index (${catalogList.length} items) to server/course_pages_catalog.json`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB Atlas.');
  return { totalCount, inserted, updated };
}

// If run directly via CLI
if (process.argv[1] && process.argv[1].endsWith('seedCoursePages.js')) {
  seedCoursePages()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ Seeding failed:', err);
      process.exit(1);
    });
}
