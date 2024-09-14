import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, CardContent } from '@mui/material';

const WelcomeCard = ({ onButtonClick }) => (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <CardContent>
            <Typography variant="h4" gutterBottom>
                Welcome to My Website
            </Typography>
            <Typography variant="body1" paragraph>
                This is a paragraph of text. Explore our website to find more interesting features.
            </Typography>
            <Button 
                variant="contained" 
                onClick={onButtonClick}
                sx={{ backgroundColor: '#7FA1C3', color: '#ffffff', '&:hover': { backgroundColor: '#5A7A9F' } }} // Customize hover effect
            >
                Go to Login
            </Button>
        </CardContent>
    </Card>
);

const Home = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <WelcomeCard onButtonClick={navigateToLogin} />
            </Box>
        </Container>
    );
};

export default Home;
