// VolunteerMatchingForm.js

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Paper,
  Collapse,
  Fade,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

// Custom Styled Components
const StyledCard = styled(Card)({
  background: '#f5f5f5',
  boxShadow: '0px 6px 24px rgba(0,0,0,0.12)',
  borderRadius: '20px',
  padding: '30px',
  maxWidth: '900px',
  margin: 'auto',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#6482AD',
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '12px 25px',
  borderRadius: '25px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    backgroundColor: '#7FA1C3',
    boxShadow: '0px 8px 30px rgba(100, 130, 173, 0.3)',
    transform: 'scale(1.05)',
  },
});

const StyledAlert = styled(Alert)({
  borderRadius: '15px',
  marginTop: '20px',
  fontSize: '14px',
});

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const VolunteerMatchingForm = () => {
  // State variables
  const [matchedEvent, setMatchedEvent] = useState('');
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({ matchedEvent: false });
  const [duplicateAssignments, setDuplicateAssignments] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [assignmentError, setAssignmentError] = useState(null);
  const [allSelected, setAllSelected] = useState(false);

  // Fetch events and matches on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventsResponse, matchesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/events/all`),
          axios.get(`${API_BASE_URL}/matching/matched`),
        ]);
        setEvents(eventsResponse.data);
        setMatches(matchesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchError('Failed to load events or matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle event selection
  const handleEventSelection = async (event) => {
    const eventId = event.target.value;
    setMatchedEvent(eventId);
    setFetchError(null);
    setAssignmentError(null);
    setDuplicateAssignments([]);
    setFormSubmitted(false);
    try {
      setLoading(true);
      // Fetch matched users for the selected event
      const response = await axios.post(`${API_BASE_URL}/matching/match`, { eventId });
      setMatchedUsers(response.data);

      // Determine already assigned volunteers for this event
      const currentAssigned = matches
        .filter(
          (match) =>
            match.eventId &&
            match.eventId._id === eventId &&
            match.userId &&
            match.userId._id
        )
        .map((match) => match.userId._id);

      setSelectedVolunteers(currentAssigned);
    } catch (error) {
      console.error('Error matching volunteers:', error);
      setFetchError('Failed to fetch matched volunteers. Please try again.');
      setMatchedUsers([]);
      setSelectedVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle volunteer selection toggle
  const handleVolunteerSelect = (userId) => {
    setSelectedVolunteers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Handle Select All toggle
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedVolunteers([]);
    } else {
      const allUserIds = matchedUsers.map(profile => profile.user._id);
      setSelectedVolunteers(allUserIds);
    }
    setAllSelected(!allSelected);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ matchedEvent: false });
    setAssignmentError(null);
    setDuplicateAssignments([]);
    setFormSubmitted(false);

    // Validation: Ensure an event is selected
    if (!matchedEvent) {
      setErrors({ matchedEvent: true });
      return;
    }

    // Determine current assignments for the selected event
    const currentAssigned = matches
      .filter(
        (match) =>
          match.eventId &&
          match.eventId._id === matchedEvent &&
          match.userId &&
          match.userId._id
      )
      .map((match) => match.userId._id);

    // Determine volunteers to assign and unassign
    const toAssign = selectedVolunteers.filter((id) => !currentAssigned.includes(id));
    const toUnassign = currentAssigned.filter((id) => !selectedVolunteers.includes(id));

    // Handle duplicate assignments (optional, based on backend logic)
    const duplicates = toAssign.filter((volunteerId) =>
      matches.some(
        (match) =>
          match.eventId &&
          match.eventId._id === matchedEvent &&
          match.userId &&
          match.userId._id === volunteerId
      )
    );

    if (duplicates.length > 0) {
      const duplicateNames = duplicates.map((duplicateId) => {
        const duplicateUser = matchedUsers.find(
          (user) => user.user && user.user._id === duplicateId
        );
        return duplicateUser ? duplicateUser.user.name : 'Unknown User';
      });
      setDuplicateAssignments(duplicateNames);
      return;
    }

    try {
      setLoading(true);

      // Batch assign volunteers
      if (toAssign.length > 0) {
        await axios.post(`${API_BASE_URL}/matching/assign`, {
          userId: toAssign, // Correct key
          eventId: matchedEvent,
          action: 'assign',
        });
      }

      // Batch unassign volunteers
      if (toUnassign.length > 0) {
        await axios.post(`${API_BASE_URL}/matching/assign`, {
          userId: toUnassign, // Correct key
          eventId: matchedEvent,
          action: 'unassign',
        });
      }

      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);

      // Refresh matches
      const updatedMatchesResponse = await axios.get(`${API_BASE_URL}/matching/matched`);
      setMatches(updatedMatchesResponse.data);
    } catch (error) {
      console.error('Error assigning/unassigning volunteers:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setAssignmentError(error.response.data.message);
      } else {
        setAssignmentError('Failed to save changes. Please try again.');
      }
    } finally {
      setLoading(false);
      setDuplicateAssignments([]);
      setAllSelected(false);
    }
  };

  // Memoize grouped matches to optimize performance
  const groupedMatches = useMemo(() => {
    return matches.reduce((acc, match) => {
      const eventName = match.eventId ? match.eventId.eventName : 'Unknown Event';
      if (!acc[eventName]) acc[eventName] = [];
      acc[eventName].push(match.userId ? match.userId.name : 'Unknown Volunteer');
      return acc;
    }, {});
  }, [matches]);

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Fade in={true} timeout={600}>
        <StyledCard>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 4, fontWeight: 'bold', letterSpacing: '0.5px', color: '#6482AD' }}
            >
              Volunteer Matching and Assignment
            </Typography>
            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mb: 3 }} />}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Event Selection */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={errors.matchedEvent}>
                    <InputLabel>Matched Event</InputLabel>
                    <Select
                      value={matchedEvent}
                      onChange={handleEventSelection}
                      label="Matched Event"
                    >
                      {events.map((event) => (
                        <MenuItem key={event._id} value={event._id}>
                          {event.eventName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.matchedEvent && (
                    <StyledAlert severity="error">Please select an event to match.</StyledAlert>
                  )}
                </Grid>

                {/* Fetch and Display Fetch Errors */}
                {fetchError && (
                  <Grid item xs={12}>
                    <StyledAlert severity="error">{fetchError}</StyledAlert>
                  </Grid>
                )}

                {/* Recommended Volunteers */}
                <Grid item xs={12}>
                  {matchedUsers.length > 0 ? (
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: 'bold', color: '#6482AD' }}
                      >
                        Recommended Volunteers
                      </Typography>
                      <Grid container spacing={3}>
                        {/* "Select All" Checkbox */}
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={allSelected}
                                onChange={handleSelectAll}
                                color="primary"
                              />
                            }
                            label="Select All"
                            sx={{ mb: 2 }}
                          />
                        </Grid>

                        {/* Volunteer Cards */}
                        {matchedUsers.map((profile) => {
                          if (!profile.user) return null; // Skip if user data is missing
                          const isSelected = selectedVolunteers.includes(profile.user._id);

                          return (
                            <Grid item xs={12} sm={6} md={4} key={profile.user._id}>
                              <Paper
                                elevation={3}
                                onClick={() => handleVolunteerSelect(profile.user._id)}
                                sx={{
                                  padding: '16px',
                                  borderRadius: '10px',
                                  backgroundColor: isSelected ? '#e0f7fa' : '#ffffff',
                                  boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.3s ease',
                                  '&:hover': {
                                    backgroundColor: isSelected ? '#b2ebf2' : '#f7faff',
                                  },
                                }}
                              >
                                {/* Volunteer Name */}
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontWeight: 'bold', color: '#444' }}
                                >
                                  {profile.fullName}
                                </Typography>

                                {/* Volunteer Username */}
                                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                  @{profile.user.name}
                                </Typography>

                                {/* Volunteer Skills */}
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: '#888',
                                    fontStyle: 'italic',
                                    fontSize: '0.9rem',
                                    mb: 2,
                                  }}
                                >
                                  Skills: {profile.skills?.join(', ') || 'N/A'}
                                </Typography>

                                {/* "Select" Checkbox */}
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={isSelected}
                                      onChange={(e) => {
                                        e.stopPropagation(); // Prevent parent `onClick` from firing
                                        handleVolunteerSelect(profile.user._id);
                                      }}
                                      sx={{ '&.Mui-checked': { color: '#6482AD' } }}
                                    />
                                  }
                                  label="Select"
                                  sx={{ margin: 0 }}
                                />
                              </Paper>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  ) : (
                    // No Volunteers Found
                    <Box sx={{ textAlign: 'center', mt: 10, mb: 10 }}>
                      <Typography variant="h5" sx={{ color: '#444' }}>
                        No volunteers found
                      </Typography>
                    </Box>
                  )}
                </Grid>

                {/* Assignment Error */}
                {assignmentError && (
                  <Grid item xs={12}>
                    <StyledAlert severity="error">{assignmentError}</StyledAlert>
                  </Grid>
                )}

                {/* Duplicate Assignments Warning */}
                {duplicateAssignments.length > 0 && (
                  <Grid item xs={12}>
                    <StyledAlert severity="warning">
                      Warning: The following volunteers are already assigned to this event:{' '}
                      {duplicateAssignments.join(', ')}.
                    </StyledAlert>
                  </Grid>
                )}

                {/* Submit Button */}
                <Grid item xs={12} textAlign="center">
                  <StyledButton type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>

            {/* Success Message */}
            <Collapse in={formSubmitted}>
              <StyledAlert severity="success">Changes saved successfully!</StyledAlert>
            </Collapse>

            {/* Current Matches Display */}
            <Typography
              variant="h5"
              sx={{ mt: 5, fontWeight: 'bold', color: '#6482AD' }}
            >
              Current Matches
            </Typography>
            {Object.keys(groupedMatches).length > 0 ? (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {Object.entries(groupedMatches).map(([eventName, volunteers]) => (
                  <Grid item xs={12} key={eventName}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: '15px',
                        backgroundColor: '#EDEDED',
                        boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                      }}
                    >
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
              <Typography variant="body2" sx={{ mt: 3, color: '#888888' }}>
                No matches available.
              </Typography>
            )}
          </CardContent>
        </StyledCard>
      </Fade>
    </Container>
  );
};

export default VolunteerMatchingForm;
