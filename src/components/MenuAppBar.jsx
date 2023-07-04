import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Popper} from "@mui/material";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import {useEffect, useRef, useState} from "react";
import shoeDog from '../resources/ShoeDog2.png';
import {removeUserDetails} from "../actions/action";
import {useDispatch, useSelector} from "react-redux";


export default function MenuAppBar() {
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const anchorProfileRef = useRef(null);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if(token && token !== '') {
            // console.log("--->",new Date()/1000);
            // console.log("--->",token.expiryDate);
            let notExpired = true; //token.expiryDate > new Date()/1000;
            if(notExpired) {
                    let aux = user.role;
                    if (aux === "ADMIN" || aux === "USER") {
                        setAuth(true);
                    }
            } else {
                // console.log("token expired!");
                localStorage.clear();
                setAuth(false);
                //dispatch(removeUserDetails());
                navigate("/login");}
        }

    }, [user]);

    const handleLogout = () => {
        localStorage.clear();
        setAuth(false);
        dispatch(removeUserDetails());
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleMenuProfile = (event) => {
        setAnchorElProfile(event.currentTarget);
        setOpenProfileMenu(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseProfile = () => {
        setOpenProfileMenu(false);
    };

    const handleCloseToggle = () => {
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <Button
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            id="composition-button"
                            ref={anchorRef}
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleMenu(event)}
                        >
                            <MenuIcon/>

                        </Button>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={() => handleCloseToggle()}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                                                <MenuItem onClick={() => navigate("/reviews")}>Find reviews</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>

                    <Typography variant="img" component="div" sx={{ flexGrow: 1 }}>
                        <img src={shoeDog} alt="profile-pic"/>
                    </Typography>
                    <div>
                        {auth === false && <div>
                            <Button color="inherit" variant="outlined" onClick={() => navigate("/login")}>Login</Button>
                        </div>}
                    </div>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                ref={anchorProfileRef}
                                onClick={(event) => handleMenuProfile(event)}
                                color="inherit"
                            >
                                <Avatar alt="avatar"  />
                            </IconButton>
                            <Popper
                                open={openProfileMenu}
                                anchorEl={anchorProfileRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={() => handleCloseProfile()}>
                                                <MenuList
                                                    autoFocusItem={openProfileMenu}
                                                    id="user-profile-menu"
                                                    aria-labelledby="profile-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <MenuItem onClick={()=>navigate("/profile")}>Profile</MenuItem>
                                                    <MenuItem onClick={handleCloseProfile}>My Reviews</MenuItem>
                                                    <MenuItem onClick={()=>navigate("/addReview")}>Add Review</MenuItem>
                                                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>)}
                            </Popper>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
