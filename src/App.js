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

  // Check localStorage for token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');

    // If token exists, assume the user is logged in
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName); // Set the username from localStorage
    }
  }, []);

  // Handle login
  const handleLoginState = (name) => {
    setIsLoggedIn(true);
    setUserName(name); // Set the user's name after login
    localStorage.setItem('userName', name); // Persist the user's name in localStorage
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
            <Route path="/signup" element={<Registration />} />
            <Route path="/event-management" element={isLoggedIn ? <EventManagementForm /> : <Login handleLoginState={handleLoginState} />} />
            <Route path="/volunteer-history" element={<VolunteerHistory />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/volunteer-matching" element={<VolunteerMatching />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
