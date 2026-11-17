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
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  duration: { type: String, default: '3 months' },
  desc: { type: String, default: '' },
  bannerColor: { type: String, default: '#1e40af' },
  iconKey: { type: String, default: 'BookOpen' },
  badge: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  isFeaturedLanding: { type: Boolean, default: true },
  topics: { type: [String], default: [] },
  modules: { type: [mongoose.Schema.Types.Mixed], default: [] },
  fee: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

async function seed() {
  console.log('📡 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('✅ Connected to MongoDB Atlas!');

  const jsonPath = path.join(currentDir, 'courses.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ courses.json not found at:', jsonPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const courses = JSON.parse(raw);
  console.log(`📦 Found ${courses.length} courses to seed...`);

  let inserted = 0;
  let updated = 0;

  for (const c of courses) {
    const existing = await Course.findOne({ courseId: c.courseId });
    if (existing) {
      await Course.updateOne(
        { courseId: c.courseId },
        { $set: { ...c, updatedAt: new Date() } }
      );
      updated++;
    } else {
      await Course.create({ ...c, createdAt: new Date(), updatedAt: new Date() });
      inserted++;
    }
  }

  const totalInDb = await Course.countDocuments();
  console.log(`🎉 Seeding complete! Inserted: ${inserted}, Updated: ${updated}, Total in DB: ${totalInDb}`);

  await mongoose.disconnect();
  console.log('👋 Disconnected from MongoDB.');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
