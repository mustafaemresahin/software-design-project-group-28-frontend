import React, { useState } from 'react';
import { Container, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Grid, Paper, Collapse, Fade, Alert } from '@mui/material';
import { styled } from '@mui/system';

// Custom Styled Components
const StyledCard = styled(Card)({
  background: '#F5EDED', // Light beige background from the palette
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '5px', // Less rounded corners
  padding: '20px',
  maxWidth: '800px',
  margin: 'auto',
  transition: 'all 0.3s ease', // Smooth transition effect
});

const StyledButton = styled(Button)({
  backgroundColor: '#6482AD', // Primary blue from the palette
  color: '#ffffff',
  fontWeight: 'bold',
  padding: '10px 20px',
  transition: 'transform 0.2s ease', // Smooth button animation
  '&:hover': {
    backgroundColor: '#7FA1C3', // Secondary blue from the palette
    transform: 'scale(1.03)', // Slightly enlarge on hover
  },
});

const VolunteerMatchingForm = () => {
  const [volunteerName, setVolunteerName] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({ volunteerName: false, matchedEvent: false });

  // Mock data for volunteers and events
  const volunteerOptions = ['John Doe', 'Jane Smith', 'Bob Johnson'];
  const eventOptions = ['Community Cleanup', 'Food Drive', 'Charity Run'];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    let formErrors = {};
    if (!volunteerName) formErrors.volunteerName = true;
    if (!matchedEvent) formErrors.matchedEvent = true;

    if (Object.keys(formErrors).length === 0) {
      // Simulate matching process if no errors
      setFormSubmitted(true);

      const matchingData = {
        volunteerName,
        matchedEvent,
      };
      console.log('Matching Data:', matchingData);

      // Clear form
      setVolunteerName('');
      setMatchedEvent('');

      setTimeout(() => setFormSubmitted(false), 3000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Fade in={true} timeout={600}>
        <StyledCard>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}>
              Volunteer Matching Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#F5EDED' }} error={errors.volunteerName}>
                    <InputLabel>Volunteer Name</InputLabel>
                    <Select
                      value={volunteerName}
                      onChange={(e) => {
                        setVolunteerName(e.target.value);
                        setErrors((prevErrors) => ({ ...prevErrors, volunteerName: false }));
                      }}
                      label="Volunteer Name"
                    >
                      {volunteerOptions.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.volunteerName && (
                    <Alert severity="error" sx={{ mt: 1 }}>Please select a volunteer name.</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#F5EDED' }} error={errors.matchedEvent}>
                    <InputLabel>Matched Event</InputLabel>
                    <Select
                      value={matchedEvent}
                      onChange={(e) => {
                        setMatchedEvent(e.target.value);
                        setErrors((prevErrors) => ({ ...prevErrors, matchedEvent: false }));
                      }}
                      label="Matched Event"
                    >
                      {eventOptions.map((event, index) => (
                        <MenuItem key={index} value={event}>
                          {event}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.matchedEvent && (
                    <Alert severity="error" sx={{ mt: 1 }}>Please select an event to match.</Alert>
                  )}
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <StyledButton type="submit">
                    Match Volunteer
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
            <Collapse in={formSubmitted}>
              <Paper elevation={2} sx={{ mt: 4, p: 2, backgroundColor: '#4CAF50', color: '#ffffff' }}>
                <Typography variant="body1" align="center">
                  Volunteer matched successfully!
                </Typography>
              </Paper>
            </Collapse>
          </CardContent>
        </StyledCard>
      </Fade>
    </Container>
  );
};

export default VolunteerMatchingForm;
