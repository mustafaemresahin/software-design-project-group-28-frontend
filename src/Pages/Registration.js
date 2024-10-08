import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography'; // Import Typography

const logoPath = '/volunteezy-logo.png'; // Replace with the actual path to your logo image

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Registration successful', data);
                // Optionally, store the token and redirect to a new page
            } else {
                console.error('Error:', data.message);
                alert(data.message); // Show error message
            }
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        box: {
            backgroundColor: '#f5f5f5',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
        },
        logo: {
            width: '60px',
            height: '60px',
            marginBottom: '10px', // Space between logo and title
        },
        title: {
            fontSize: '1.5rem', // Adjusted font size
            color: '#6482AD',
            fontFamily: 'Arial, sans-serif', // Apply the cursive font
            fontWeight: 400,
        },
        inputGroup: {
            marginBottom: '20px',
            textAlign: 'left',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '1rem',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
        },
        button: {
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: isHovered ? 'rgb(127, 161, 195)' : 'rgb(100, 130, 173)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        link: {
            marginTop: '20px',
            fontSize: '0.9rem',
            color: '#007bff',
            textDecoration: 'none',
        },
        linkHover: {
            textDecoration: 'underline',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <div style={styles.titleContainer}>
                    <img 
                        src={logoPath} 
                        alt="Volunteezy Logo"
                        style={styles.logo} // Apply logo styles
                    />
                    <Typography
                        variant="h2"
                        sx={styles.title} // Apply title styles
                    >
                        Create Your Account
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Register
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login" style={styles.link} onMouseEnter={e => e.target.style.textDecoration = 'underline'} onMouseLeave={e => e.target.style.textDecoration = 'none'}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
