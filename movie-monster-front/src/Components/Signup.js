import axios from 'axios';
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthService from '../Services/AuthService';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const passwordConfirmChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const submitRegistration = (e) => {
        e.preventDefault();
        AuthService.register(username, password).then((response) => {
            console.log(response);
        });
    }

    return (
        <div>
            <h1>Sign up</h1>
            <Form onSubmit={submitRegistration}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={usernameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={passwordChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={passwordConfirmChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    );
}

export default Signup;