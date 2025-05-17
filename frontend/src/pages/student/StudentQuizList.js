import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
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
        Available Quizzes
      </Typography>
      {quizzes.length === 0 ? (
        <Typography>No quizzes available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {quiz.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/Student/take-quiz/${quiz._id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Take Quiz
                  </Button>
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
