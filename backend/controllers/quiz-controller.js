const Quiz = require('../models/quiz');
const Submission = require('../models/submission');
const Student = require('../models/studentSchema')
// Tạo quiz (chỉ dành cho giáo viên)
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid quiz data" });
    }

    const newQuiz = new Quiz({ title, questions });


    await newQuiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz: newQuiz
    });
  } catch (err) {
    console.error("Error creating quiz:", err);
    res.status(500).json({ error: "Server error" });
    console.log(req.body)
  }
};

// Lấy danh sách quiz (cho giáo viên hoặc sinh viên)
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 }); // mới nhất lên trước
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};
// Xem quiz
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.submitQuiz = async (req, res) => {
  const quizId = req.params.id;

  const { studentId, answers } = req.body;

  try {
    console.log('Submit quiz params:', req.params);
    console.log('Submit quiz body:', req.body);
    // Kiểm tra student đã submit chưa
    const existingSubmission = await Submission.findOne({ student: studentId, quiz: quizId });
    if (existingSubmission) {
      return res.status(400).json({ message: 'Quiz already submitted.' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });

    const submission = new Submission({
      student: studentId,
      quiz: quizId,
      answers,
      score,
    });

    await submission.save();

    res.status(201).json({ message: 'Submission saved', score, total: quiz.questions.length });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ message: 'Server error' });
  }
};





// Xoá quiz theo ID
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// cập nhật quiz theo id
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, questions } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, questions },
      { new: true }
    );

    if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz updated", quiz: updatedQuiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.checkSubmission = async (req, res) => {
  const { quizId, studentId } = req.params;

  try {
    const submission = await Submission.findOne({ quiz: quizId, student: studentId });
    if (!submission) {
      return res.json({ submitted: false });
    }

    res.json({
      submitted: true,
      score: submission.score,
      total: submission.answers.length,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error checking submission' });
  }
};
exports.getSubmissionsByStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const submissions = await Submission.find({ student: studentId }).select('quiz score');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



