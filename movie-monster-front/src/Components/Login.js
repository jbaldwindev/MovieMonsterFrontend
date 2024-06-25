import React, {useState} from 'react';
import AuthService from "../Services/AuthService"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }
    //TODO retrieve token from response and save in session storage
    const submitRegistration = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then((res) => {
            console.log(res);
        });
    }

    return (
        <div>
            <h1>log in</h1>
            <Form onSubmit={submitRegistration}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={usernameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={passwordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;