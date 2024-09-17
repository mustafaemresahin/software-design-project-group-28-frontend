import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel, TextareaAutosize, Button, Box, Paper, Typography, Fade } from '@mui/material';
import { DatePicker } from '@mui/lab';




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
        console.log(profile);
        // Submit form or handle form validation here
    };

    const [checked, setChecked] = useState(true);
    
    return (
        <Box sx={{ padding: '35px' }}>
            <Fade in={checked} timeout={600}>
            <Paper elevation={3} sx={{ padding: '10px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ marginTop: '10px', marginBottom: '5px', textAlign: 'center', fontWeight: 'bold', color: '#6482AD' }}>
                    User Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <TextField
                    label="Full Name"
                    name="fullName"
                    inputProps={{ maxLength: 50 }}
                    value={profile.fullName}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
            
                {/* Address 1 */}
                <TextField
                    label="Address 1"
                    name="address1"
                    inputProps={{ maxLength: 100 }}
                    value={profile.address1}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
            
                {/* Address 2 */}
                <TextField
                    label="Address 2"
                    name="address2"
                    inputProps={{ maxLength: 100 }}
                    value={profile.address2}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
            
                {/* City */}
                <TextField
                    label="City"
                    name="city"
                    inputProps={{ maxLength: 100 }}
                    value={profile.city}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
            
                {/* State */}
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>State</InputLabel>
                    <Select
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    >
                    {states.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                        {state.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            
                {/* Zip Code */}
                <TextField
                    label="Zip Code"
                    name="zip"
                    inputProps={{ maxLength: 9, minLength: 5 }}
                    value={profile.zip}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
            
                {/* Skills */}
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Skills</InputLabel>
                    <Select
                    name="skills"
                    multiple
                    value={profile.skills}
                    onChange={handleSkillChange}
                    renderValue={(selected) => selected.join(', ')}
                    >
                    {skills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                        <Checkbox checked={profile.skills.includes(skill)} />
                        {skill}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            
                {/* Preferences */}
                <TextareaAutosize
                    placeholder="Preferences (Optional)"
                    name="preferences"
                    value={profile.preferences}
                    onChange={handleInputChange}
                    minRows={3}
                    style={{ width: '100%', marginTop: '16px' }}
                />
            
            
                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Save Profile
                </Button>
                </form>
            </Paper>
            </Fade>
        </Box>
    );
    
}

export default Profile;