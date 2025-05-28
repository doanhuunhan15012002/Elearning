import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user?._id;

    const fetchData = async () => {
      try {
        // Gọi API đồng thời lấy quiz và submission của học sinh
        const [quizRes, submissionRes] = await Promise.all([
          axios.get('http://localhost:5000/api/quizzes'),
          axios.get(`http://localhost:5000/api/submissions/student/${studentId}`)
        ]);

        const submissions = submissionRes.data;

        

        const quizzesWithStatus = quizRes.data.map(quiz => {
    

          const submission = submissions.find(s => {
           

            // So sánh dạng string để tránh lỗi do object khác nhau
            return String(s.quiz._id) === String(quiz._id);
          });
          return {
            ...quiz,
            submitted: !!submission,
            score: submission ? submission.score : null
          };
        });

        setQuizzes(quizzesWithStatus);
      } catch (error) {
        console.error('Error fetching quizzes or submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Quiz hiện có
      </Typography>

      {quizzes.length === 0 ? (
        <Typography>Không có quiz.</Typography>
      ) : (
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title}</Typography>
                  {quiz.submitted ? (
                    <Typography variant="subtitle1" color="green">
                      Điểm: {quiz.score} / {quiz.questions.length}
                    </Typography>
                  ) : (
                    <Button
                      component={Link}
                      to={`/Student/take-quiz/${quiz._id}`}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Làm quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StudentQuizList;
