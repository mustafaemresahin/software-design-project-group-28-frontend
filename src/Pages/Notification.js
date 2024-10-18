import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Fade, Button } from '@mui/material';
import axios from 'axios';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:4000/notifs/all'); // Adjust this URL to your backend endpoint
                setNotifications(response.data); // Assume the backend returns an array of notifications
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Fetch notifications initially
        fetchNotifications();

        // Set interval to fetch notifications every 5 minutes
        const interval = setInterval(() => {
            fetchNotifications();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Function to dismiss a notification
    const dismissNotification = (id) => {
        setNotifications((prevNotifications) => 
            prevNotifications.filter(notification => notification._id !== id) // Use _id instead of id
        );
    };

    const [checked] = useState(true);

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    // Function to format time
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    return (
        <Box sx={{ padding: '40px' }}>
            <Fade in={checked} timeout={600}>
                <Box>
                    <Paper elevation={3} sx={{ padding: '50px', marginBottom: '15px', backgroundColor: '#f5f5f5', maxWidth: '800px', margin: '0 auto', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ marginTop: '8px', marginBottom: '22px', textAlign: 'center', fontWeight: 'bold', color: '#6482AD' }}>
                            Notifications
                        </Typography>
                        <List>
                            {notifications.map((notification) => (
                                <Fade key={notification._id} in={checked} timeout={600}>
                                    <Paper elevation={2} sx={{ padding: '10px', marginBottom: '15px', backgroundColor: '#f5f5f5' }}>
                                        <ListItem>
                                            <ListItemText 
                                                primary={notification.title} 
                                                secondary={
                                                    <>
                                                        <div>{notification.eventName}</div>
                                                        <div><strong>Date:</strong> {formatDate(notification.eventDate)}</div>
                                                        <div><strong>Location:</strong> {notification.location}</div>
                                                        <div><strong>Description:</strong> {notification.eventDescription}</div>
                                                    </>
                                                }
                                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                            />
                                            <Button 
                                                variant="outlined" 
                                                color="primary" 
                                                onClick={() => dismissNotification(notification._id)} 
                                                sx={{ marginLeft: 'auto' }}
                                            >
                                                Dismiss
                                            </Button>
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
