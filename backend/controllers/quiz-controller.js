const Quiz = require('../models/quiz');
const Submission = require('../models/submission');

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

// Sinh viên làm bài và hệ thống tự chấm điểm
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    // Tạm thời giả lập userId vì chưa có middleware xác thực
    const userId = 'dummyUserId';

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      // So sánh đáp án đúng, giả sử correctAnswer và answers[i] cùng kiểu (chuỗi hoặc số)
      if (q.correctAnswer === answers[i]) score++;
    });

    const submission = new Submission({
      quiz: quizId,
      student: userId,
      answers,
      score,
    });

    await submission.save();

    res.status(200).json({
      message: 'Quiz submitted successfully',
      score,
      total: quiz.questions.length
    });
  } catch (error) {
    console.error("❌ Error submitting quiz:", error);
    if (error.stack) console.error(error.stack);
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
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
