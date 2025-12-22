import {useState, useEffect} from 'react';
import AuthService from "../Services/AuthService"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import "../Styles/Login.css";

const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);
    const { setUser } = useAuth();

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    useEffect(() => {
        if (username.length > 0 && password.length > 0) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [username, password]);

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const submitLogin = (e) => {
        e.preventDefault();

        AuthService.login(username, password)
        .then(() => AuthService.me())
        .then((meRes) => {
            setUser(meRes.data);
            navigate("/dashboard");
        })
        .catch(err => {
            console.log(err);
            props.errorFn();
        });

    };

    return (
        <div>
            <div className="centered">
                <h3>Log In</h3>
            </div>
            <Form onSubmit={submitLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={usernameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={passwordChange}/>
                </Form.Group>
                <div className="login-btn-container">
                    <Button variant="success" disabled={!canSubmit} type="submit">
                    Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Login;