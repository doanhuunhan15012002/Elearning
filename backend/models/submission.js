const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  student: { type: String, required: true },  // hoặc ObjectId nếu bạn dùng
  answers: [{ type: String }],
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
