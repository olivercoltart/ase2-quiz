import { useState} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = () => {
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify(formData));
        // Redirect to main page
        navigate('/');
    };

    return (
        <div className="app-container">
            <div className="register-box">
                <h2>Register New User</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                />

                <button onClick={handleRegister}>Register</button>
            </div>
        </div>

    );
}


export default Register;
