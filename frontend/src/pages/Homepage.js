import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students2.avif";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <StyledLogoWrapper>
                <img
                    className="logo-img"
                    src="https://hcmunre.edu.vn/upload/elfinder/Trang%20GioiThieu/Logo-truong-EN-10cm-ban-quyen.png"
                    alt="School Logo"
                
                />
                
            </StyledLogoWrapper>

            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            Manage app of HCMUNRE
                            <br />
                        </StyledTitle>
                        <StyledText>
                            Create Quiz and Online review the lesson Streamline school management, class organization,
                            and add students and faculty. Seamlessly track attendance, assess performance, and provide
                            feedback. Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                >
                                    Login as Guest
                                </Button>
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{ color: "#550080" }}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;




const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledLogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  .logo-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .status-indicator {
    position: absolute;
    top: 0;
    left: 28px;
    width: 10px;
    height: 10px;
    background-color: #34d399; /* xanh lục */
    border: 2px solid white;
    border-radius: 9999px;
  }
`;
