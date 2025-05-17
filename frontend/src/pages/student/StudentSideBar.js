import * as React from 'react';
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
const StudentSideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === `/Student/${path}` || location.pathname.startsWith(`/Student/${path}/`);

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/Student" || location.pathname === "/Student/dashboard" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton component={Link} to="subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={isActive("subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="quizzes">
                    <ListItemIcon>
                        <QuizIcon color={isActive("quizzes") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Quiz" />
                </ListItemButton>
                <ListItemButton component={Link} to="attendance">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={isActive("attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>

                <ListItemButton component={Link} to="complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={isActive("complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
            </React.Fragment>

            <Divider sx={{ my: 1 }} />

            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>

                <ListItemButton component={Link} to="profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={isActive("profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton component={Link} to="logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={isActive("logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    );
};

export default StudentSideBar;
