const mongoose = require('mongoose');

const courseMaterialSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String },
  file_url: { type: String },
  file_type: { type: String, required: true },
  file_size: { type: Number },
  order_index: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CourseMaterial', courseMaterialSchema);
