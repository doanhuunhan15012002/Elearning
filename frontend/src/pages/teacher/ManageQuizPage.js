import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import axios from 'axios';
import TeacherViewMark from './TeacherViewMark';
const ManageQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      setQuizzes(quizzes.filter(q => q._id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleEdit = (quizId) => {
    navigate(`/Teacher/quiz/edit/${quizId}`);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Quản lý Quizzes</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/Teacher/quiz/create')}

        >
          Tạo Quiz
        </Button>

      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Chủ đề</TableCell>
              <TableCell>Câu hỏi</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz, index) => (
              <TableRow key={quiz._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{quiz.questions.length}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/Teacher/view-quiz/${quiz._id}`)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => navigate(`/Teacher/edit-quiz/${quiz._id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    <Delete />
                  </IconButton>
                  {/* ✅ Thêm nút Xem kết quả ở đây */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/Teacher/quiz-results/${quiz._id}`)}
                    sx={{ ml: 1 }}
                  >
                    Kết quả
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageQuizPage;
