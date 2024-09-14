// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation(); // Get the current location

    // Define a function to determine if the path is active
    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#343a40' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Website
                </Typography>
                <Box>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/" 
                        sx={{
                            backgroundColor: isActive('/') ? '#495057' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/') ? '#495057' : '#3c4045' } // Hover effect
                        }}
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/login" 
                        sx={{
                            backgroundColor: isActive('/login') ? '#495057' : 'inherit', // Darker shade for active
                            '&:hover': { backgroundColor: isActive('/login') ? '#495057' : '#3c4045' } // Hover effect
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;