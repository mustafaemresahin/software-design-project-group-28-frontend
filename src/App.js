// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Notification from './Pages/Notification';
import Registration from './Pages/Registration';
import VolunteerHistory from './Pages/VolunteerHistory';
import EventManagementForm from './Pages/EventManagementForm';
import EventList from './Pages/EventList';
import EventDetails from './Pages/EventDetails';
import VolunteerMatching from './Pages/VolunteerMatching';
import Profile from './Pages/Profile';
import { useState, useEffect } from 'react'; // Added useEffect to check for login on page load
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#E2DAD6',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
      },
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); // New state for user's name
  const [userId, setUserId] = useState('');     // For backend requests

  // Check localStorage for token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId'); // Assuming you store userId on login

    console.log('Retrieved Token:', token);
    console.log('Retrieved UserName:', storedUserName);
    console.log('Retrieved UserId:', storedUserId);

    // If token exists, assume the user is logged in
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName); // Set the username from localStorage
      setUserId(storedUserId); // Use the userId for backend requests
    }

    console.log('Stored User ID:', storedUserId); // Add this to check if it's being retrieved from localStorage
  }, []);

  // Handle login
  const handleLoginState = (name, id) => {
    setIsLoggedIn(true);
    setUserName(name); // Set the user's name after login
    setUserId(id); // Store userId
    localStorage.setItem('userName', name); // Persist the user's name in localStorage
    localStorage.setItem('userId', id); // Persist the userId in localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(''); // Clear the user's name on logout
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('userName'); // Remove the username from localStorage
    window.location.href = '/'; // Redirect to home
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          {/* Pass userName and isLoggedIn to the Navbar */}
          <Navbar isLoggedIn={isLoggedIn} userName={userName} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Pass handleLoginState to Login component */}
            <Route path="/login" element={<Login handleLoginState={handleLoginState} />} />
            <Route path="/signup" element={<Registration handleLoginState={handleLoginState} />} />
            <Route path="/create-event" element={isLoggedIn ? <EventManagementForm /> : <Login handleLoginState={handleLoginState} />} />
            <Route path="/event-management" element={isLoggedIn ? <EventList /> : <Login handleLoginState={handleLoginState} />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/volunteer-history" element={<VolunteerHistory />} />
            {/* Pass userName to Notification as currentUser */}
            <Route path="/notification" element={<Notification currentUser={userId} />} />
            <Route path="/volunteer-matching" element={<VolunteerMatching />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
