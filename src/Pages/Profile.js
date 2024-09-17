import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, Button, Box, Paper, Typography, Grid, Chip, Snackbar, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { Cancel as CancelIcon } from '@mui/icons-material';

// Move libraries array outside of the component to prevent re-renders
const libraries = ['places'];

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

const skills = ['Programming', 'Design', 'Marketing', 'Writing', 'Project Management'];

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
    availability: [], // Updated to handle multiple dates
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing confirmation message

  // Load profile data from local storage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      // Parse date strings into Date objects
      parsedProfile.availability = parsedProfile.availability.map(dateString => new Date(dateString));
      setProfile(parsedProfile);
    }
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(profile);

    // Convert date objects to strings before saving
    const profileToSave = {
      ...profile,
      availability: profile.availability.map(date => date.toISOString())
    };
    localStorage.setItem('userProfile', JSON.stringify(profileToSave));

    // Display confirmation message
    setShowConfirmation(true);
  };

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components;

      // Extract and fill in the address components
      const streetNumber = addressComponents.find(comp => comp.types.includes('street_number'))?.long_name || '';
      const route = addressComponents.find(comp => comp.types.includes('route'))?.long_name || '';
      const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '';
      const state = addressComponents.find(comp => comp.types.includes('administrative_area_level_1'))?.short_name || '';
      const zip = addressComponents.find(comp => comp.types.includes('postal_code'))?.long_name || '';

      setProfile({
        ...profile,
        address1: `${streetNumber} ${route}`,
        city: city,
        state: state,
        zip: zip
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: '35px', backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
        <Paper elevation={6} sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '15px' }}>
          <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
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

              {/* Address 1 with Autocomplete */}
              <Grid item xs={12}>
                <LoadScript googleMapsApiKey="AIzaSyDSrG5Ng0BUoRCNJNDVRf8fPyy0f7ijeBo" libraries={libraries}>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
                  </Autocomplete>
                </LoadScript>
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
                  {profile.availability.map((date, index) => (
                    <Chip
                      key={index}
                      label={date.toLocaleDateString()}
                      onDelete={() => removeAvailabilityDate(date)}
                      deleteIcon={<CancelIcon />}
                      sx={{ margin: '5px' }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ padding: '10px 20px', borderRadius: '20px', marginTop: '20px' }}>
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setShowConfirmation(false)} severity="success" sx={{ width: '100%' }}>
              Profile saved successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default Profile;
