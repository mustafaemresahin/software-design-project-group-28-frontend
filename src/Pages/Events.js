import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Grid, Paper, Grow, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Custom Styled Components
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
});

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events/all');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 5, mb: 5 }}>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}>
        Events for Volunteers
      </Typography>

      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Grow in={true} timeout={(index + 1) * 300}>
              <div> {/* Wrapping StyledCard in a div to avoid transition issues */}
                <StyledCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                      {event.eventName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <strong>Location:</strong> {event.location}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Description:</strong> {event.eventDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <strong>Required Skills:</strong> {event.requiredSkills.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      <strong>Urgency:</strong> {event.urgency}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </div>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {events.length === 0 && (
        <Paper elevation={2} sx={{ mt: 4, p: 2, backgroundColor: '#FF9800', color: '#ffffff' }}>
          <Typography variant="body1" align="center">
            No events available.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Events;
