import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, Grid, Fade } from '@mui/material';
import { styled, keyframes } from '@mui/system';

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
  backgroundColor: '#7FA1C3', // Secondary color from the palette
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
  backgroundColor: '#F5EDED',
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

const Home = () => {
  const navigate = useNavigate();

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

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <HeroSection>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Volunteezy
        </Typography>
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
            sx={{ color: '#6482AD', fontWeight: 'bold', transition: 'color 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) !important' }}
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
