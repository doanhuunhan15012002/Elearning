import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from '@mui/material';

const TeacherViewMark = () => {
  const { quizId } = useParams(); // Lấy quizId từ URL param
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/submissions/quiz/${quizId}`);
      console.log('API response data:', res.data);  // <-- Đặt ở đây
      setSubmissions(res.data);
    } catch (err) {
      console.error('Lỗi lấy kết quả:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchSubmissions();
}, [quizId]);



  if (loading) return <CircularProgress />;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Kết quả bài kiểm tra
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên sinh viên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Điểm</TableCell>
              <TableCell>Ngày nộp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
  <TableRow key={submission._id}>
    <TableCell>{submission.student?.name || 'N/A'}</TableCell>
    <TableCell>{submission.student?.email || 'N/A'}</TableCell>
    <TableCell>{submission.score}</TableCell>
    <TableCell>{new Date(submission.createdAt).toLocaleString()}</TableCell>
  </TableRow>
))}

          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TeacherViewMark;
