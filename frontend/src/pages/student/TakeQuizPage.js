import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TakeQuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (questionIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user ? user._id : null;

    if (!studentId) {
      console.log(localStorage.getItem('studentId'))
      console.error('No studentId found in localStorage');
      return; // Hoặc bạn có thể show alert, hoặc xử lý khác
    }

    const res = await axios.post(`http://localhost:5000/api/quizzes/submit/${quizId}`, {
      studentId,  // lấy từ localStorage
      answers: quiz.questions.map((q, index) => ({
        questionId: q._id,
        answer: answers[index] || ''
      }))
    });
    
    setResult(res.data);
    navigate('/student/quizzes'); // Điều hướng sau khi nộp bài
  } catch (err) {
    console.error('Error submitting quiz:', err);
    if (err.response) console.error("Server:", err.response.data);
  }
};





  if (loading) return <CircularProgress />;

  if (!quiz) return <Typography>Quiz not found.</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>{quiz.title}</Typography>

      {quiz.questions.map((q, index) => (
        <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{`Q${index + 1}: ${q.questionText}`}</Typography>
          <RadioGroup
            value={answers[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={opt}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>
        </Paper>
      ))}

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Quiz
        </Button>
      </Box>

      {result && (
        <Box mt={4}>
          <Typography variant="h6" color="success.main">
            ✅ You scored {result.score} out of {result.total}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TakeQuizPage;
