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
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        console.error('Lỗi khi tìm nạp bài kiểm tra:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // ✅ Lưu index thay vì text
  const handleChange = (questionId, selectedIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedIndex,
    }));
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const studentId = user ? user._id : null;

      if (!studentId) {
        console.error('Không tìm thấy studentId trong localStorage');
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/quizzes/submit/${quizId}`,
        {
          studentId,
          answers,
        }
      );

      console.log('📥 Kết quả từ server:', res.data);
      setResult(res.data);
      navigate('/student/quizzes');
    } catch (err) {
      console.error('Lỗi gửi bài kiểm tra:', err);
      if (err.response) console.error('Server response:', err.response.data);
    }
  };

  if (loading) return <CircularProgress />;
  if (!quiz) return <Typography>Không tìm thấy bài kiểm tra.</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>{quiz.title}</Typography>

      {quiz.questions.map((q, index) => (
        <Paper key={q._id} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{`Câu ${index + 1}: ${q.questionText}`}</Typography>
          <RadioGroup
            value={answers[q._id] ?? ''}
            onChange={(e) => handleChange(q._id, parseInt(e.target.value))}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
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
          Gửi bài kiểm tra
        </Button>
      </Box>

      {result && (
        <Box mt={4}>
          <Typography variant="h6" color="success.main">
            ✅ Điểm của bạn: {result.score} / {result.total}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TakeQuizPage;
