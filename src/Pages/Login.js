// src/Pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';

const logoPath = '/volunteezy-logo.png';

const Login = ({ handleLoginState }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful', data);
                
                // Store token and userName in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.userName);

                // Pass user's name to handleLoginState
                if (handleLoginState) {
                    handleLoginState(data.userName); // Use the userName from the backend response
                }

                navigate('/'); // Redirect to home after login
            } else {
                console.error('Login failed:', data.message);
                alert(data.message);
            }
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
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
        },
        logo: {
            width: '80px',
            height: '80px',
            marginBottom: '20px',
        },
        title: {
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#6482AD',
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
    };

    return (
        <div style={styles.container}>
            <Fade in={true} timeout={600}>
                <div style={styles.box}>
                    <img 
                        src={logoPath} 
                        alt="Volunteezy Logo"
                        style={styles.logo}
                    />
                    <h1 style={styles.title}>Welcome Back!</h1>
                    <form onSubmit={handleLogin}>
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
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Login
                        </button>
                    </form>
                    <p>
                        Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
                    </p>
                </div>
            </Fade>
        </div>
    );
};

export default Login;
