import React, { useState } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Fade } from '@mui/material';

const Notification = () => {
    // Simulated notifications data
    const [notifications] = useState([
        { id: 1, message: "Event A is happening soon", date: "Moday, September 14, 2024" },
        { id: 2, message: "Don't forget to RSVP for Event B", date: "Tuesday, September 15, 2024" },
        { id: 3, message: "You have been assigned to Event C", date: "Wednesday, September 16, 2024" },
        { id: 4, message: "You have been assigned to Event D", date: "Thursday, September 17, 2024"}
    ]);

    return (
        <Box sx={{ padding: '35px' }}>
            <Paper elevation={3} sx={{ padding: '10px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" sx={{ marginTop: '10px', marginBottom: '5px', textAlign: 'center', fontWeight: 'bold', color: '#6482AD' }}>
                    Notifications
                </Typography>
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id} sx={{ borderBottom: '1px solid #ccc' }}>
                            <ListItemText 
                                primary={notification.message} 
                                secondary={notification.date} 
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Notification;
