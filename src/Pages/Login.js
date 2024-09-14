import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email, 'Password:', password);
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
        },
        box: {
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
        },
        title: {
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#333',
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
        inputFocus: {
            borderColor: '#007bff',
        },
        button: {
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
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
                <h1 style={styles.title}>Welcome Back!</h1>
                <form onSubmit={handleSubmit}>
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
                    >
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
