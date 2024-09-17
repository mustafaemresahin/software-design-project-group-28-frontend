import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

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
                    margin: '0 5px', // Reduced margin for closer spacing
                    color: '#fff', // Set the text color to white
                    textDecoration: 'none', // Remove underline
                    fontWeight: isActive('/') ? 'bold' : 'normal' // Highlight the selected tab
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
                    margin: '0 5px', // Reduced margin for closer spacing
                    color: '#fff', // Set the text color to white
                    textDecoration: 'none', // Remove underline
                    fontWeight: isActive('/event-management') ? 'bold' : 'normal' // Highlight the selected tab
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
                    margin: '0 5px', // Reduced margin for closer spacing
                    color: '#fff', // Set the text color to white
                    textDecoration: 'none', // Remove underline
                    fontWeight: isActive('/volunteer-matching') ? 'bold' : 'normal' // Highlight the selected tab
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
                        margin: '0 5px', // Reduced margin for closer spacing
                        color: '#fff', // Set the text color to white
                        textDecoration: 'none', // Remove underline
                        fontWeight: isActive('/login') ? 'bold' : 'normal' // Highlight the selected tab
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
                        margin: '0 5px', // Reduced margin for closer spacing
                        color: '#fff', // Set the text color to white
                        textDecoration: 'none', // Remove underline
                        fontWeight: isActive('/profile') ? 'bold' : 'normal' // Highlight the selected tab
                    }}
                >
                    Profile
                </Button>
            )}
            <Button
                    component={Link}
                    to="/profile"
                    sx={{
                        backgroundColor: isActive('/profile') ? '#7FA1C3' : 'inherit',
                        '&:hover': { backgroundColor: '#7FA1C3' },
                        margin: '0 5px', // Reduced margin for closer spacing
                        color: '#fff', // Set the text color to white
                        textDecoration: 'none', // Remove underline
                        fontWeight: isActive('/profile') ? 'bold' : 'normal' // Highlight the selected tab
                    }}
                >
                    Profile
            </Button>
            <Button
                component={Link}
                to="/notification"
                sx={{
                    backgroundColor: isActive('/notification') ? '#7FA1C3' : 'inherit',
                    '&:hover': { backgroundColor: '#7FA1C3' },
                    margin: '0 5px', // Reduced margin for closer spacing
                    color: '#fff', // Set the text color to white
                    textDecoration: 'none', // Remove underline
                    fontWeight: isActive('/notification') ? 'bold' : 'normal' // Highlight the selected tab
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

                    {/* Title */}
                    <Typography
                        variant="h6"
                        component={Link} // Make the title clickable
                        to="/" // Navigate to home
                        sx={{ 
                            textDecoration: 'none', // Remove underline from link
                            color: '#fff', // Force the text color to white
                            display: 'flex', 
                            alignItems: 'center', 
                            flexGrow: { xs: 1, md: 0 }, // Centered on mobile, left on desktop
                        }}
                    >
                        Volunteezy
                    </Typography>

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
