import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  <Grid container spacing={3}>
    {/* Students */}
    <Grid item xs={12} md={4}>
      <StyledCard>
        <CardIcon src={Students} alt="Students" />
        <CardTitle>Tổng số học sinh</CardTitle>
        <CardNumber>
          <Data start={0} end={numberOfStudents} duration={2.5} />
        </CardNumber>
      </StyledCard>
    </Grid>

    {/* Classes */}
    <Grid item xs={12} md={4}>
      <StyledCard>
        <CardIcon src={Classes} alt="Classes" />
        <CardTitle>Tổng số lớp học</CardTitle>
        <CardNumber>
          <Data start={0} end={numberOfClasses} duration={2.5} />
        </CardNumber>
      </StyledCard>
    </Grid>

    {/* Teachers */}
    <Grid item xs={12} md={4}>
      <StyledCard>
        <CardIcon src={Teachers} alt="Teachers" />
        <CardTitle>Tổng số giáo viên</CardTitle>
        <CardNumber>
          <Data start={0} end={numberOfTeachers} duration={2.5} />
        </CardNumber>
      </StyledCard>
    </Grid>

    {/* Notice Board */}
    <Grid item xs={12}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <SeeNotice />
      </Paper>
    </Grid>
  </Grid>
</Container>

        </>
    );
};


const StyledCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

const CardIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const CardNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #7f56da;
`;


const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default AdminHomePage