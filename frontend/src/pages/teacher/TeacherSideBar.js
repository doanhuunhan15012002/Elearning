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
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser?.teachSclass?.sclassName || '';
    const location = useLocation();

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <>
            <ListItemButton component={Link} to="/Teacher/dashboard">
                <ListItemIcon>
                    <HomeIcon color={isActive("/Teacher/dashboard") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Trang chủ" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Teacher/class">
                <ListItemIcon>
                    <ClassOutlinedIcon color={isActive("/Teacher/class") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary={`Lớp ${sclassName}`} />
            </ListItemButton>

            <ListItemButton component={Link} to="/Teacher/quiz">
                <ListItemIcon>
                    <QuizOutlinedIcon color={isActive("/Teacher/quiz") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Quiz" />
            </ListItemButton>

            <ListItemButton component={Link} to="/Teacher/complain">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={isActive("/Teacher/complain") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Phản hồi" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset>
                Người dùng
            </ListSubheader>

            <ListItemButton component={Link} to="/Teacher/profile">
                <ListItemIcon>
                    <AccountCircleOutlinedIcon color={isActive("/Teacher/profile") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Thông tin cá nhân" />
            </ListItemButton>

            <ListItemButton component={Link} to="logout">
                <ListItemIcon>
                    <ExitToAppIcon color={isActive("logout") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" />
            </ListItemButton>
        </>
    );
};

export default TeacherSideBar;
