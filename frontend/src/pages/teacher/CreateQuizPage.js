import React, { useState } from 'react';
import {
  Button, TextField, Typography, Paper, Grid, IconButton, Box
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'questionText') {
      updated[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      updated[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = parseInt(value);
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
 

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const quizData = { title, questions };
    console.log("🟢 Đang gửi quiz lên backend:", quizData); // 👉 log dữ liệu gửi đi

    const res = await axios.post('http://localhost:5000/api/quizzes/create', quizData);

    console.log("✅ Server phản hồi:", res.data); // 👉 log kết quả phản hồi

    alert('Quiz created successfully!');
    navigate('/Teacher/manage-quiz');
  } catch (err) {
    console.error("❌ Lỗi khi gửi quiz:", err);
    
    if (err.response) {
      console.log("📛 Server trả về lỗi:", err.response.data); // lỗi từ phía server
    } else if (err.request) {
      console.log("📡 Không nhận được phản hồi từ server:", err.request); // lỗi kết nối
    } else {
      console.log("⚠️ Lỗi không xác định:", err.message); // lỗi khác
    }

    console.log("📤 Dữ liệu đã gửi:", { title, questions }); // log lại dữ liệu

    alert('Failed to create quiz');
  }
};


  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Quiz
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Quiz Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />

        {questions.map((question, qIndex) => (
          <Paper key={qIndex} elevation={2} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label={`Question ${qIndex + 1}`}
                  variant="outlined"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeQuestion(qIndex)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>

              {question.options.map((opt, oIndex) => (
                <Grid item xs={6} key={oIndex}>
                  <TextField
                    fullWidth
                    label={`Option ${oIndex + 1}`}
                    variant="outlined"
                    value={opt}
                    onChange={(e) => handleQuestionChange(qIndex, `option-${oIndex}`, e.target.value)}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <TextField
                  label="Correct Option (0-3)"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0, max: 3 }}
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addQuestion}
          >
            Add Question
          </Button>

          <Button variant="contained" type="submit" color="primary">
            Create Quiz
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateQuizPage;
