import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, Grid, Fade } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Loading animation for "Volunteezy"
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled(Box)({
  backgroundColor: '#6482AD',
  color: '#ffffff',
  padding: '60px 20px',
  borderRadius: '10px',
  textAlign: 'center',
  marginBottom: '20px',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
  animation: `${fadeIn} 1s ease-out`,
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7FA1C3',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#E2DAD6',
    color: '#6482AD',
  },
  padding: '10px 30px',
  marginTop: '20px',
  transition: 'all 0.4s ease',
}));

const FeatureCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  boxShadow: '0px 6px 20px rgba(0,0,0,0.15)',
  borderRadius: '15px',
  padding: '30px',
  textAlign: 'center',
  height: '100%',
  animation: `${fadeIn} 1s ease-out`,
  transition: 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) !important',
  '&:hover': {
    backgroundColor: '#7FA1C3 !important',
    color: '#F5EDED !important',
    transform: 'scale(1.1) !important',
  },
  '&:hover .feature-title': {
    color: '#F5EDED !important',
  },
  cursor: 'pointer',
});

const LoadingScreen = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#6482AD',
  color: '#ffffff',
  animation: `${fadeIn} 1.5s ease-out`,
});

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a delay before showing the homepage content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay for the loading screen

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const features = [
    { title: 'Manage Events', path: '/event-management', description: 'Create and manage events with ease. Track participants and ensure successful event execution.' },
    { title: 'Volunteer Matching', path: '/volunteer-matching', description: 'Match volunteers to the right events based on their skills and availability. Optimize your impact.' },
    { title: 'Real-Time Notifications', path: '/notification', description: 'Keep everyone informed with real-time notifications for event updates and volunteer assignments.' },
  ];

  if (loading) {
    // Render the loading screen
    return (
      <LoadingScreen>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Pacifico", cursive',
            fontSize: '4rem',
          }}
        >
          Volunteezy
        </Typography>
      </LoadingScreen>
    );
  }

  // Render the homepage content after the loading screen disappears
  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <HeroSection>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}> 
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ fontWeight: 'bold', marginRight: '10px' }}
          >
            Welcome to
          </Typography>
          <Typography
            variant="h2"
            sx={{ 
              color: '#fff',
              fontFamily: '"Pacifico", cursive',
              fontWeight: 400,
              marginBottom: '20px',
              fontSize: '3rem',
              marginLeft: '10px',
            }}
          >
            Volunteezy
          </Typography>
        </Box>

        <Typography variant="h5" paragraph>
          Empowering communities through seamless volunteer management.
        </Typography>
        <StyledButton variant="contained" onClick={navigateToLogin}>
          Get Started
        </StyledButton>
      </HeroSection>

      <Grid container spacing={4} sx={{ mt: -2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Fade in timeout={500 + index * 500}>
              <FeatureCard onClick={() => handleCardClick(feature.path)}>
                <Typography
                  variant="h5"
                  className="feature-title"
                  gutterBottom
                  sx={{ color: '#6482AD', fontWeight: 'bold', transition: 'color 0.8s' }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
