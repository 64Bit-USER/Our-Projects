import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const url = 'http://localhost:5000'

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('authToken', json.authToken);
            props.showAlert("Welcome Back to INotebook", "success");
            history.push("/home");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return (
        <div className="mt-2">
            <h2 className="mb-4">Login To Save Your Notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-2">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" placeholder="name@example.com" />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login;
