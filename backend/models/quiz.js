// models/quiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: Number
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
