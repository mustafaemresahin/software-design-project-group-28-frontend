// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar'; // Import the Navbar
import Notification from './Pages/Notification';
import Registration from './Pages/Registration';
import EventManagementForm from './Pages/EventManagementForm';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
            <Route path="/event-management" element={<EventManagementForm />} />
            <Route path="/notification" element={<Notification/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
