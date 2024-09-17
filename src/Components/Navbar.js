import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Custom logo path
const logoPath = process.env.PUBLIC_URL + '/volunteezy-logo.png';

const Navbar = ({ isLoggedIn }) => {
    const location = useLocation(); // Get the current location
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    // Define a function to determine if the path is active
    const isActive = (path) => location.pathname === path;

    // Toggle mobile menu
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Handle navigation
    const handleNavigation = (path) => {
        navigate(path);
        handleDrawerToggle();
    };

    // Render the menu buttons for the left side
    const menuButtonsLeft = (
        <>
            <Button
                component={Link}
                to="/"
                sx={{
                    backgroundColor: isActive('/') ? '#7FA1C3' : 'inherit',
                    '&:hover': { backgroundColor: '#7FA1C3' },
                    margin: '0 5px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: isActive('/') ? 'bold' : 'normal'
                }}
            >
                Home
            </Button>
            <Button
                component={Link}
                to="/event-management"
                sx={{
                    backgroundColor: isActive('/event-management') ? '#7FA1C3' : 'inherit',
                    '&:hover': { backgroundColor: '#7FA1C3' },
                    margin: '0 5px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: isActive('/event-management') ? 'bold' : 'normal'
                }}
            >
                Event Management
            </Button>
            <Button
                component={Link}
                to="/volunteer-matching"
                sx={{
                    backgroundColor: isActive('/volunteer-matching') ? '#7FA1C3' : 'inherit',
                    '&:hover': { backgroundColor: '#7FA1C3' },
                    margin: '0 5px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: isActive('/volunteer-matching') ? 'bold' : 'normal'
                }}
            >
                Volunteer Matching
            </Button>
        </>
    );

    // Render the menu buttons for the right side (Login/Profile)
    const menuButtonsRight = (
        <>
            {!isLoggedIn ? (
                <Button
                    component={Link}
                    to="/login"
                    sx={{
                        backgroundColor: isActive('/login') ? '#7FA1C3' : 'inherit',
                        '&:hover': { backgroundColor: '#7FA1C3' },
                        margin: '0 5px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: isActive('/login') ? 'bold' : 'normal'
                    }}
                >
                    Login
                </Button>
            ) : (
                <Button
                    component={Link}
                    to="/profile"
                    sx={{
                        backgroundColor: isActive('/profile') ? '#7FA1C3' : 'inherit',
                        '&:hover': { backgroundColor: '#7FA1C3' },
                        margin: '0 5px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: isActive('/profile') ? 'bold' : 'normal'
                    }}
                >
                    Profile
                </Button>
            )}
            <Button
                component={Link}
                to="/notification"
                sx={{
                    backgroundColor: isActive('/notification') ? '#7FA1C3' : 'inherit',
                    '&:hover': { backgroundColor: '#7FA1C3' },
                    margin: '0 5px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: isActive('/notification') ? 'bold' : 'normal'
                }}
            >
                Notifications
            </Button>
        </>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#6482AD' }}>
                <Toolbar>
                    {/* Menu button for mobile */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, marginRight: 2 }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Logo and Title */}
                    <Box 
                        component={Link} // Make the entire box clickable
                        to="/" // Navigate to home
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            textDecoration: 'none', // Remove underline from link
                        }}
                    >
                        {/* Logo */}
                        <img 
                            src={logoPath} 
                            alt="Volunteezy Logo"
                            style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer' }} // Adjust logo size
                        />
                        {/* Title */}
                        <Typography
                            variant="h6"
                            sx={{ 
                                color: '#fff',
                                fontFamily: '"Pacifico", cursive', // Apply the cursive font
                                fontWeight: 400, // Adjust the font weight
                                fontSize: '1.5rem', // Adjust font size
                                cursor: 'pointer', // Change cursor to pointer for better UX
                            }}
                        >
                            Volunteezy
                        </Typography>
                    </Box>

                    {/* Menu items on the left */}
                    <Box sx={{ flexGrow: 1, marginLeft: '25px', display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
                        {menuButtonsLeft}
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuButtonsRight}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Menu */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': { width: 250, backgroundColor: '#6482AD', color: '#E2DAD6' },
                }}
            >
                <List>
                    <ListItem button onClick={() => handleNavigation('/')}>
                        <ListItemText primary="Home" sx={{ color: '#E2DAD6' }} />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation('/event-management')}>
                        <ListItemText primary="Event Management" sx={{ color: '#E2DAD6' }} />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation('/volunteer-matching')}>
                        <ListItemText primary="Volunteer Matching" sx={{ color: '#E2DAD6' }} />
                    </ListItem>
                    {!isLoggedIn ? (
                        <ListItem button onClick={() => handleNavigation('/login')}>
                            <ListItemText primary="Login" sx={{ color: '#E2DAD6' }} />
                        </ListItem>
                    ) : (
                        <ListItem button onClick={() => handleNavigation('/profile')}>
                            <ListItemText primary="Profile" sx={{ color: '#E2DAD6' }} />
                        </ListItem>
                    )}
                    <ListItem button onClick={() => handleNavigation('/notification')}>
                        <ListItemText primary="Notifications" sx={{ color: '#E2DAD6' }} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
