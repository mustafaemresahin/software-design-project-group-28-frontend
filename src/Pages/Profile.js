import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, TextareaAutosize, Button, Box, Paper, Typography, Grid, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const states = [
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  // Add more states as needed
];

const skills = [
  'Programming', 'Design', 'Marketing', 'Writing', 'Project Management'
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

  const [autocomplete, setAutocomplete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSkillChange = (event) => {
    setProfile({ ...profile, skills: event.target.value });
  };

  const handleAvailabilityChange = (newDate) => {
    setProfile({ ...profile, availability: [...profile.availability, newDate] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      const addressComponents = place.address_components;

      setProfile({
        ...profile,
        address1: address,
        city: addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '',
        state: addressComponents.find(comp => comp.types.includes('administrative_area_level_1'))?.short_name || '',
        zip: addressComponents.find(comp => comp.types.includes('postal_code'))?.long_name || ''
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
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY" libraries={['places']}>
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                  >
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12}>
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
                <TextareaAutosize
                  placeholder="Preferences (Optional)"
                  name="preferences"
                  value={profile.preferences}
                  onChange={handleInputChange}
                  minRows={3}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#cfd8dc' }}
                />
              </Grid>

              {/* Availability */}
              <Grid item xs={12}>
                <DatePicker
                  label="Availability"
                  value={null}
                  onChange={(newDate) => handleAvailabilityChange(newDate)}
                  renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ padding: '10px 20px', borderRadius: '20px', marginTop: '20px' }}>
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Confirmation Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Profile Saved"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your profile has been saved successfully!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}

export default Profile;
