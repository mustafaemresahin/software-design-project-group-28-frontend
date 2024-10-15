import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const logoPath = '/volunteezy-logo.png'; // Replace with the actual path to your logo image

const Registration = ({ handleLoginState }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setLoading(true); // Start loading
        setErrorMessage(''); // Clear any previous error

        try {
            // Registration API call
            const registrationResponse = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });

            const registrationData = await registrationResponse.json();

            if (registrationResponse.ok) {
                console.log('Registration successful', registrationData);

                // Now call the login API to log the user in
                const loginResponse = await fetch('http://localhost:4000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    console.log('Login successful after registration', loginData);

                    // Store token and userName in localStorage
                    localStorage.setItem('token', loginData.token);
                    localStorage.setItem('userName', loginData.userName);

                    // Pass user's name to handleLoginState
                    if (handleLoginState) {
                        handleLoginState(loginData.userName);
                    }

                    // Navigate to the profile page after registration and login
                    navigate('/profile');
                } else {
                    setErrorMessage('Login failed after registration. Please try logging in manually.');
                }
            } else {
                setErrorMessage(registrationData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false); // End loading
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
            marginBottom: '10px',
        },
        title: {
            fontSize: '1.5rem',
            color: '#6482AD',
            fontFamily: 'Arial, sans-serif',
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
        errorMessage: {
            color: 'red',
            marginBottom: '20px',
        },
        loadingSpinner: {
            display: 'block',
            margin: '20px auto',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <div style={styles.titleContainer}>
                    <img 
                        src={logoPath} 
                        alt="Volunteezy Logo"
                        style={styles.logo}
                    />
                    <Typography
                        variant="h2"
                        sx={styles.title}
                    >
                        Create Your Account
                    </Typography>
                </div>
                {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login" style={styles.link}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
