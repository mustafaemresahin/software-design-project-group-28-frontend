import React from 'react';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  background: '#f5f5f5',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
  borderRadius: '15px',
  padding: '20px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 25px rgba(0,0,0,0.3)',
  },
  cursor: 'pointer',
});

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard onClick={() => handleNavigation('/admin/reports/volunteer')}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Volunteer Reports
              </Typography>
              <Typography variant="body2">
                Generate and download detailed reports on volunteer participation.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard onClick={() => handleNavigation('/admin/reports/events')}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Event Reports
              </Typography>
              <Typography variant="body2">
                Generate and download detailed reports on event management.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
