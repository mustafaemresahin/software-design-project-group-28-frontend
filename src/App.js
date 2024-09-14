// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar'; // Import the Navbar
import Notification from './Pages/Notification';

function App() {

  return (

    <Router>
      <div>
        <Navbar /> {/* Add the Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notification" element={<Notification/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
