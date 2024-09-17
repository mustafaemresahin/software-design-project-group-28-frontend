import React, { useState } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const Notification = () => {
    // Simulated notifications data
    const [notifications] = useState([
        { id: 1, message: "Event A is happening soon", date: "Moday, September 14, 2024" },
        { id: 2, message: "Don't forget to RSVP for Event B", date: "Tuesday, September 15, 2024" },
        { id: 3, message: "You have been assigned to Event C", date: "Wednesday, September 16, 2024" },
        { id: 4, message: "You have been assigned to Event D", date: "Thursday, September 17, 2024"}
    ]);

    const [checked, setChecked] = useState(true);

    return (
        <Box sx={{ padding: '40px' }}>
            <Fade in={checked} timeout={600}>
                <Box>
                    <Paper elevation={3} sx={{ padding: '50px', marginBottom: '15px', backgroundColor: '#f5f5f5', maxWidth: '800px', margin: '0 auto' }}>
                        <Typography variant="h4" sx={{ marginTop: '8px', marginBottom: '22px', textAlign: 'center', fontWeight: 'bold', color: '#6482AD' }}>
                            Notifications
                        </Typography>
                        <List>
                            {notifications.map((notification) => (
                                <Fade key={notification.id} in={checked} timeout={600}>
                                    <Paper elevation={2} sx={{ padding: '10px', marginBottom: '15px', backgroundColor: '#f5f5f5' }}>
                                        <ListItem>
                                            <ListItemText 
                                                primary={notification.message} 
                                                secondary={notification.date} 
                                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                            />
                                        </ListItem>
                                    </Paper>
                                </Fade>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Fade>
        </Box>
    );
};

export default Notification;
