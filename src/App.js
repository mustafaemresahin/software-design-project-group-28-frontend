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
import Events from './Pages/Events';
import EventDetails from './Pages/EventDetails';
import VolunteerMatching from './Pages/VolunteerMatching';
import Profile from './Pages/Profile';
import AdminDashboard from './Pages/AdminDashboard';
import VolunteerReport from './Pages/VolunteerReport';
import EventReport from './Pages/EventReport';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');

    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserId(storedUserId);
      fetchUserRole(storedUserId, token);
    }
  }, []);

  const fetchUserRole = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:4000/profile/${userId}/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error.message);
    }
  };

  const handleLoginState = (name, id) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserId(id);
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} userRole={userRole} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home userRole={userRole} isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login handleLoginState={handleLoginState} />} />
            <Route path="/signup" element={<Registration handleLoginState={handleLoginState} />} />
            <Route path="/create-event" element={isLoggedIn ? <EventManagementForm /> : <Login handleLoginState={handleLoginState} />} />
            <Route path="/event-management" element={isLoggedIn ? <EventList /> : <Login handleLoginState={handleLoginState} />} />
            <Route path="/event-list" element={isLoggedIn ? <Events /> : <Login handleLoginState={handleLoginState} />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/volunteer-history" element={<VolunteerHistory />} />
            <Route path="/notification" element={<Notification currentUser={userId} />} />
            <Route path="/volunteer-matching" element={<VolunteerMatching />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reports/volunteer" element={<VolunteerReport />} />
            <Route path="/admin/reports/events" element={<EventReport />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
