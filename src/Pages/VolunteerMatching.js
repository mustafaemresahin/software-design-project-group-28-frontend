import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Grid, Paper, Collapse, Fade, Alert, Checkbox, FormControlLabel, CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';

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

const VolunteerMatchingForm = () => {
  const [matchedEvent, setMatchedEvent] = useState('');
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({ matchedEvent: false, selectedVolunteers: false });
  const [duplicateAssignments, setDuplicateAssignments] = useState([]);

  // Fetch events on component load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/events/all');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch matches on component load
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/matching/matched');
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Handle event selection
  const handleEventSelection = async (event) => {
    const eventId = event.target.value;
    setMatchedEvent(eventId);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/matching/match', { eventId });
      setMatchedUsers(response.data);
      setSelectedVolunteers([]);
    } catch (error) {
      console.error('Error matching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle volunteer selection
  const handleVolunteerSelect = (userId) => {
    setSelectedVolunteers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!matchedEvent || selectedVolunteers.length === 0) {
      setErrors({ matchedEvent: !matchedEvent, selectedVolunteers: selectedVolunteers.length === 0 });
      return;
    }

    // Check for duplicate assignments
    const duplicates = selectedVolunteers.filter(volunteerId =>
      matches.some(match => match.eventId._id === matchedEvent && match.userId._id === volunteerId)
    );

    if (duplicates.length > 0) {
      const duplicateNames = duplicates.map(duplicateId => {
        const duplicateUser = matchedUsers.find(user => user.user._id === duplicateId);
        return duplicateUser ? duplicateUser.user.name : 'Unknown User';
      });
      setDuplicateAssignments(duplicateNames);
      return;
    }

    try {
      setLoading(true);
      for (const volunteerId of selectedVolunteers) {
        await axios.post('http://localhost:4000/matching/assign', { userId: volunteerId, eventId: matchedEvent });
      }
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);

      // Fetch updated matches
      const updatedMatches = await axios.get('http://localhost:4000/matching/matched');
      setMatches(updatedMatches.data);
    } catch (error) {
      console.error('Error assigning volunteers:', error);
    } finally {
      setLoading(false);
      setDuplicateAssignments([]);
    }
  };

  // Group matches by event
  const groupedMatches = matches.reduce((acc, match) => {
    const eventName = match.eventId ? match.eventId.eventName : 'Unknown Event';
    if (!acc[eventName]) {
      acc[eventName] = [];
    }
    acc[eventName].push(match.userId ? match.userId.name : 'Unknown Volunteer');
    return acc;
  }, {});

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Fade in={true} timeout={600}>
        <StyledCard>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}>
              Volunteer Matching and Assignment
            </Typography>
            {loading && <CircularProgress />}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#f5f5f5' }} error={errors.matchedEvent}>
                    <InputLabel>Matched Event</InputLabel>
                    <Select value={matchedEvent} onChange={handleEventSelection} label="Matched Event">
                      {events.map((event) => (
                        <MenuItem key={event._id} value={event._id}>
                          {event.eventName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.matchedEvent && <Alert severity="error" sx={{ mt: 1 }}>Please select an event to match.</Alert>}
                </Grid>

                <Grid item xs={12}>
                  {matchedUsers.length > 0 && (
                    <Box>
                      <Typography variant="h6">Recommended Volunteers</Typography>
                      <ul>
                        {matchedUsers.map((profile) => (
                          <li key={profile.user._id}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedVolunteers.includes(profile.user._id)}
                                  onChange={() => handleVolunteerSelect(profile.user._id)}
                                />
                              }
                              label={`${profile.user.name} (Skills: ${profile.skills.join(', ')})`}
                            />
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <StyledButton type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Assign Selected Volunteers'}
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>

            <Collapse in={formSubmitted}>
              <Paper elevation={2} sx={{ mt: 4, p: 2, backgroundColor: '#4CAF50', color: '#ffffff' }}>
                <Typography variant="body1" align="center">
                  Volunteers assigned successfully!
                </Typography>
              </Paper>
            </Collapse>

            <Collapse in={duplicateAssignments.length > 0}>
              <Paper elevation={2} sx={{ mt: 4, p: 2, backgroundColor: '#FF9800', color: '#ffffff' }}>
                <Typography variant="body1" align="center">
                  Warning: The following volunteers are already assigned to this event: {duplicateAssignments.join(', ')}.
                </Typography>
              </Paper>
            </Collapse>

            {/* Grouped Matches by Event */}
            <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold', color: '#6482AD' }}>Current Matches</Typography>
            {Object.keys(groupedMatches).length > 0 ? (
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {Object.entries(groupedMatches).map(([eventName, volunteers]) => (
                  <Grid item xs={12} key={eventName}>
                    <Paper elevation={2} sx={{ padding: '16px', borderRadius: '10px', backgroundColor: '#EDEDED' }}>
                      <Typography variant="body1">
                        <strong>Event:</strong> {eventName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Volunteers:</strong> {volunteers.join(', ')}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" sx={{ mt: 2, color: '#888888' }}>No matches available</Typography>
            )}
          </CardContent>
        </StyledCard>
      </Fade>
    </Container>
  );
};

export default VolunteerMatchingForm;
