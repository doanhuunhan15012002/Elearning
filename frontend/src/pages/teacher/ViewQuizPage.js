import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';

const ViewQuizPage = () => {
  const { id } = useParams(); // Lấy quizId từ URL
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Lỗi khi tải bài kiểm tra:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {quiz.questions.map((question, index) => (
            <Box key={index} mb={2}>
              <Typography variant="h6">Câu hỏi {index + 1}</Typography>
              <Typography>{question.questionText}</Typography>
              <List dense>
                {question.options.map((option, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      bgcolor: i === question.correctAnswer ? 'lightgreen' : 'inherit',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText primary={`${String.fromCharCode(65 + i)}. ${option}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ViewQuizPage;
