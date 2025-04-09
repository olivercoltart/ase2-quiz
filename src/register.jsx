import { useState } from 'react';
// import './App.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

        return (
            <div className="app-container">
                <div className="quiz-box">
                    <h2>🐾 Register New User</h2>

                    <div>
                        <label>Name:</label><br />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label>Email:</label><br />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label>Password:</label><br />
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" />
                    </div>

                    <button disabled>Register (Coming Soon)</button>
                </div>
            </div>
        );
    }


export default Register;
