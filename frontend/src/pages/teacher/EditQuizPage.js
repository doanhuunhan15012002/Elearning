import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Paper,
  Grid,
  MenuItem,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';

const EditQuizPage = () => {
  const { id } = useParams(); // Lấy quiz ID từ URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({ title: '', questions: [] });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (err) {
        console.error('Lỗi khi tải bài quiz:', err);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleTitleChange = (e) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          text: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
        },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updated = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updated });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/quizzes/${id}`, quiz);
      alert('Đã cập nhật quiz thành công!');
      navigate('/Teacher/manage-quizzes');
    } catch (error) {
      console.error('Lỗi cập nhật quiz:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Chỉnh sửa Quiz</Typography>

      <TextField
        fullWidth
        label="Chủ đề"
        value={quiz.title}
        onChange={handleTitleChange}
        margin="normal"
      />

      {quiz.questions.map((q, qIndex) => (
        <Paper key={qIndex} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label={`Câu hỏi ${qIndex + 1}`}
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              />

            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={() => handleDeleteQuestion(qIndex)}>
                <Delete />
              </IconButton>
            </Grid>

            {q.options.map((opt, optIndex) => (
              <Grid item xs={6} key={optIndex}>
                <TextField
                  fullWidth
                  label={`Option ${String.fromCharCode(65 + optIndex)}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                select
                label="Đáp án đúng"
                fullWidth
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qIndex, 'correctAnswer', parseInt(e.target.value))
                }
              >
                {q.options.map((_, i) => (
                  <MenuItem key={i} value={i}>
                    {String.fromCharCode(65 + i)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddQuestion}
        sx={{ mb: 2 }}
      >
        Thêm câu hỏi
      </Button>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Box>

    </Box>
  );
};

export default EditQuizPage;
