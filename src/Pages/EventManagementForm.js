import React, { useState } from 'react';
import { Container, Button, Typography, TextField, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText, Card, CardContent, Grid, Paper, Collapse, Fade, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Custom Styled Components
const StyledCard = styled(Card)({
  background: '#f5f5f5',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '15px',
  padding: '20px',
  maxWidth: '800px',
  margin: 'auto',
  transition: 'all 0.3s ease',
});

const StyledButton = styled(Button)({
  backgroundColor: '#6482AD',
  color: '#ffffff',
  fontWeight: 'bold',
  padding: '10px 20px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#7FA1C3',
    transform: 'scale(1.03)',
  },
});

const EventManagementForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const skillOptions = ['First Aid', 'Event Planning', 'Cooking', 'Child Care'];
  const urgencyOptions = ['Low', 'Medium', 'High'];

  const validateForm = () => {
    const newErrors = {};
    if (!eventName) newErrors.eventName = 'Event name is required.';
    if (!eventDescription) newErrors.eventDescription = 'Event description is required.';
    if (!location) newErrors.location = 'Location is required.';
    if (requiredSkills.length === 0) newErrors.requiredSkills = 'At least one skill is required.';
    if (!urgency) newErrors.urgency = 'Urgency is required.';
    if (!eventDate) newErrors.eventDate = 'Event date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const eventData = { eventName, eventDescription, location, requiredSkills, urgency, eventDate };
      
      try {
        const response = await axios.post('http://localhost:4000/events/create', eventData);
        setFormSubmitted(true);
        setIsSubmitting(false);
        setTimeout(() => setFormSubmitted(false), 3000);
        console.log('Event created:', response.data);

        // Clear form
        setEventName('');
        setEventDescription('');
        setLocation('');
        setRequiredSkills([]);
        setUrgency('');
        setEventDate('');
      } catch (error) {
        console.error('Failed to create event:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Fade in={true} timeout={600}>
        <StyledCard>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}>
              Event Management Form
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    fullWidth
                    error={!!errors.eventName}
                    helperText={errors.eventName}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Event Date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.eventDate}
                    helperText={errors.eventDate}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.eventDescription}
                    helperText={errors.eventDescription}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.requiredSkills} variant="outlined">
                    <InputLabel>Required Skills</InputLabel>
                    <Select
                      multiple
                      value={requiredSkills}
                      onChange={(e) => setRequiredSkills(e.target.value)}
                      renderValue={(selected) => selected.join(', ')}
                      label="Required Skills"
                    >
                      {skillOptions.map((skill, index) => (
                        <MenuItem key={index} value={skill}>{skill}</MenuItem>
                      ))}
                    </Select>
                    {errors.requiredSkills && <FormHelperText>{errors.requiredSkills}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.urgency} variant="outlined">
                    <InputLabel>Urgency</InputLabel>
                    <Select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      label="Urgency"
                    >
                      {urgencyOptions.map((level, index) => (
                        <MenuItem key={index} value={level}>{level}</MenuItem>
                      ))}
                    </Select>
                    {errors.urgency && <FormHelperText>{errors.urgency}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <StyledButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} /> : 'Create Event'}
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
            <Collapse in={formSubmitted}>
              <Paper elevation={2} sx={{ mt: 4, p: 2, backgroundColor: '#4CAF50', color: '#ffffff' }}>
                <Typography variant="body1" align="center">
                  Event created successfully!
                </Typography>
              </Paper>
            </Collapse>
          </CardContent>
        </StyledCard>
      </Fade>
    </Container>
  );
};

export default EventManagementForm;
