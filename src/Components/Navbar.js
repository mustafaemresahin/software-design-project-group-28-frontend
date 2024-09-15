// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation(); // Get the current location

    // Define a function to determine if the path is active
    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#6482AD' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Volunteezy 
                </Typography>
                <Box>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/" 
                        sx={{
                            backgroundColor: isActive('/') ? '#7FA1C3' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/') ? '#7FA1C3' : '#7FA1C3' } // Hover effect
                        }}
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/login" 
                        sx={{
                            backgroundColor: isActive('/login') ? '#7FA1C3' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/login') ? '#7FA1C3' : '#7FA1C3' } // Hover effect
                        }}
                    >
                        Login
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/notification" 
                        sx={{
                            backgroundColor: isActive('/notification') ? '#7FA1C3' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/notification') ? '#7FA1C3' : '#7FA1C3' } // Hover effect
                        }}
                    >
                        Notifications
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/event-management" 
                        sx={{
                            backgroundColor: isActive('/event-management') ? '#7FA1C3' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/login') ? '#7FA1C3' : '#7FA1C3' } // Hover effect
                        }}
                    >
                        Event Management
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/volunteer-matching" 
                        sx={{
                            backgroundColor: isActive('/volunteer-matching') ? '#7FA1C3' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/volunteer-matching') ? '#7FA1C3' : '#7FA1C3' } // Hover effect
                        }}
                    >
                        Volunteer Matching
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/volunteer-history" 
                        sx={{
                            backgroundColor: isActive('/volunteer-history') ? '#495057' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/volunteer-history') ? '#495057' : '#3c4045' } // Hover effect
                        }}
                    >
                        Volunteer History
                        </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
