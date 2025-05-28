const Submission = require('../models/submission');
const Student = require('../models/studentSchema'); // vẫn cần import để populate hoạt động

exports.getSubmissionsByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const submissions = await Submission.find({ student: studentId })
      .populate('quiz')
      .populate('student'); // ref: 'student' nên phải có model student

    if (!submissions.length) {
      return res.status(404).json({ message: 'No submissions found for this student' });
    }

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions by student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
