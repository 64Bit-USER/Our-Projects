import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const url = 'http://localhost:5000'

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${url}/api/auth/createuser`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('authToken', json.authToken);
            props.showAlert("Welcome to INotebook", "success");
            history.push("/home");
        }
        else {
            props.showAlert("Invalid Details", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return (
        <div className="mt-2">
            <h2 className="mb-4">Create an Account for accessing iNotebook</h2>
            <form className="container" onSubmit={handleSubmit}>
                <div className="my-2">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" placeholder="Your Name" onChange={onChange} name="name" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={onChange} name="email" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={onChange} name="password" minLength={5} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="cpasswordd" placeholder="Confirm Password" onChange={onChange} name="cpassword" minLength={5} required />
                        <label htmlFor="cpassword">Confirm Password</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    );
}

export default Signup;
