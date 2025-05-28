const mongoose = require('mongoose');
const student =  require('./studentSchema')

const submissionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  answers: [
    {
      questionId: String,
      answer: String
    }
  ],
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);

