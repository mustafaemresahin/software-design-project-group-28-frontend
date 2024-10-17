import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, Button, Box, Paper, Typography, Grid, Chip, Snackbar, Alert, Fade } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Cancel as CancelIcon } from '@mui/icons-material';

const states = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

const skills = [
  "Food Preparation & Serving",
  "Cleaning & Sanitation",
  "First Aid & CPR",
  "Event Planning & Coordination",
  "Counseling & Emotional Support",
  "Child Care",
  "Administrative & Clerical Work",
  "Language Translation & Interpretation",
  "Transportation & Driving",
  "Handyman Skills (Basic Repairs & Maintenance)"
];

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    skills: [],
    preferences: '',
    availability: [],
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage after login

  console.log('User ID from localStorage in Profile page:', userId); // Debug log

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:4000/profile/${userId}`);
          const data = await response.json();
          if (response.ok) {
            // Ensure availability dates are parsed as Date objects
            const parsedProfile = { 
              ...data, 
              availability: data.availability.map(dateString => new Date(dateString))
            };
            setProfile(parsedProfile);
          } else {
            setErrorMessage('Failed to load profile.');
          }
        } catch (error) {
          setErrorMessage('Error fetching profile.');
        }
      } else {
        setErrorMessage('User ID is undefined.');
      }
    };

    fetchProfile();
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSkillChange = (event) => {
    setProfile({ ...profile, skills: event.target.value });
  };

  const handleAvailabilityChange = (newDate) => {
    if (newDate) {
      setProfile({ ...profile, availability: [...profile.availability, newDate] });
    }
  };

  const removeAvailabilityDate = (dateToRemove) => {
    setProfile({
      ...profile,
      availability: profile.availability.filter(date => date !== dateToRemove)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileToSave = {
      ...profile,
      availability: profile.availability.map(date => date.toISOString()), // Convert dates to ISO strings
      userId // Ensure userId is passed
    };

    // Debug: Check the data being sent to the backend
    console.log('Profile to Save:', profileToSave);

    try {
      const response = await fetch('http://localhost:4000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileToSave) // Sending data to the server
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Profile updated successfully:', data); // Debug log to check backend response
        setShowConfirmation(true);
        localStorage.setItem('userProfile', JSON.stringify(profileToSave)); // Optional: Save locally
      } else {
        setErrorMessage(data.message || 'Failed to save profile.');
      }
    } catch (error) {
      setErrorMessage('Error submitting profile.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: '35px', backgroundColor: '#E2DAD6', minHeight: '100vh' }}>
        <Fade in={true} timeout={600}>
          <Paper elevation={6} sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold', color: '#6482AD' }}>
              Complete Your Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Full Name */}
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    inputProps={{ maxLength: 50 }}
                    value={profile.fullName}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* Address 1 */}
                <Grid item xs={12}>
                  <TextField
                    label="Address 1"
                    name="address1"
                    inputProps={{ maxLength: 100 }}
                    value={profile.address1}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* Address 2 */}
                <Grid item xs={12}>
                  <TextField
                    label="Address 2"
                    name="address2"
                    inputProps={{ maxLength: 100 }}
                    value={profile.address2}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* City */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="City"
                    name="city"
                    inputProps={{ maxLength: 100 }}
                    value={profile.city}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* State */}
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={profile.state}
                      onChange={handleInputChange}
                      label="State"
                    >
                      {states.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Zip Code */}
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Zip Code"
                    name="zip"
                    inputProps={{ maxLength: 9, minLength: 5 }}
                    value={profile.zip}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* Skills */}
                <Grid item xs={12}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel>Skills</InputLabel>
                    <Select
                      name="skills"
                      multiple
                      value={profile.skills}
                      onChange={handleSkillChange}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {skills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          <Checkbox checked={profile.skills.includes(skill)} />
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Preferences */}
                <Grid item xs={12}>
                  <TextField
                    label="Preferences (Optional)"
                    name="preferences"
                    value={profile.preferences}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* Availability */}
                <Grid item xs={12}>
                  <DatePicker
                    label="Add Availability"
                    value={null}
                    onChange={(newDate) => handleAvailabilityChange(newDate)}
                    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                  />
                  <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.availability.map((date, index) => {
                      const parsedDate = new Date(date); // Ensure it's a valid Date object

                      // Check if parsedDate is valid before calling .toLocaleDateString()
                      if (!isNaN(parsedDate)) {
                        return (
                          <Chip
                            key={index}
                            label={parsedDate.toLocaleDateString()} // Use the parsed date here
                            onDelete={() => removeAvailabilityDate(date)}
                            deleteIcon={<CancelIcon />}
                            sx={{ margin: '5px' }}
                          />
                        );
                      } else {
                        console.error('Invalid date:', date);
                        return null;
                      }
                    })}
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: '#6482AD', 
                      padding: '10px 20px', 
                      borderRadius: '20px', 
                      marginTop: '20px',
                      '&:hover': {backgroundColor: '#7FA1C3'}
                    }}>
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            </form>

            {/* Confirmation Snackbar */}
            <Snackbar 
              open={showConfirmation} 
              autoHideDuration={4000} 
              onClose={() => setShowConfirmation(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert onClose={() => setShowConfirmation(false)} severity="success" sx={{ width: '100%' }}>
                Profile saved successfully!
              </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar 
              open={Boolean(errorMessage)} 
              autoHideDuration={4000} 
              onClose={() => setErrorMessage('')}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          </Paper>
        </Fade>
      </Box>
    </LocalizationProvider>
  );
};

export default Profile;