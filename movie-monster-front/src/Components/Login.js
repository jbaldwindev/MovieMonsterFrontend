import React, {useState} from 'react';
import AuthService from "../Services/AuthService"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    //TODO rememeber other requests will need to get the access token out of
    //the session storage and put in request header
    const submitLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then((res) => {
            let info = res.data;
            let retrievedToken = info["tokenType"] + info["accessToken"];
            sessionStorage.setItem("authToken", retrievedToken);
            navigate("/dashboard");
        });
    }

    return (
        <div>
            <h1>log in</h1>
            <Form onSubmit={submitLogin}>
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