import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthService from '../Services/AuthService';
import UserService from '../Services/UserService';
import '../Styles/Signup.css';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameErrorExists, setUsernameErrorExists] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
    const [passwordErrorExists, setPasswordErrorExists] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [confirmErrorExists, setConfirmErrorExists] = useState(false);
    const [confirmErrorMessage, setConfirmErrorMessage] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (usernameErrorExists || passwordErrorExists || confirmErrorExists) {
            setSubmitDisabled(true);
        } else {
            if (username.length > 0 && password.length > 0 && confirmPassword.length > 0) {
                setSubmitDisabled(false);
            } else {
                setSubmitDisabled(true);
            }
        }
    }, [
        usernameErrorExists, 
        passwordErrorExists, 
        confirmErrorExists,
        username.length,
        password.length,
        confirmPassword.length
    ]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {

            if (username.length === 0) {
                setUsernameErrorExists(false);
                setUsernameErrorMessage(null);
                return;
            }
            if (username.length > 0 && username.length < 3) {
                setUsernameErrorExists(true);
                setUsernameErrorMessage("Username must be greater than 3 characters");
                return;
            }
            UserService.isUsernameTaken(username)
                .then(res => {
                    if (res.data === true) {
                        setUsernameErrorMessage("Username is taken");
                        setUsernameErrorExists(res.data);
                    } else {
                        setUsernameErrorExists(false);
                        setUsernameErrorMessage(null);
                    }
                })
                .catch(() => setUsernameErrorExists(null))
        }, 1000);
    return () => clearTimeout(delayDebounce);
    }, [username]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (password.length > 0 && password.length < 8) {
                setPasswordErrorExists(true);
                setPasswordErrorMessage("Password must contain at least 8 characters")
            } else {
                setPasswordErrorExists(false);
                setPasswordErrorMessage(null);
            }
        }, 1000);
        return () => clearTimeout(delayDebounce);
    }, [password]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (confirmPassword.length > 0 && confirmPassword !== password) {
                setConfirmErrorExists(true);
                setConfirmErrorMessage("Passwords do not match");
            } else {
                setConfirmErrorExists(false);
                setConfirmErrorMessage(null);
            }
        }, 1000);
        return () => clearTimeout(delayDebounce);
    }, [confirmPassword, password]);
    
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
        }).then(() => {
            props.successFn();
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="centered">
                <h3>Sign Up</h3>
            </div>
            <Form onSubmit={submitRegistration}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} type="text" placeholder="Username" isInvalid={usernameErrorExists} onChange={usernameChange}/>
                    <Form.Control.Feedback type="invalid">
                        {usernameErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type="password" placeholder="Password" isInvalid={passwordErrorExists} onChange={passwordChange}/>
                    <Form.Control.Feedback type="invalid">
                        {passwordErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={confirmPassword} type="password" placeholder="Confirm Password" isInvalid={confirmErrorExists} onChange={passwordConfirmChange}/>
                    <Form.Control.Feedback type="invalid">
                        {confirmErrorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="signup-btn-container">
                    <Button variant="success" disabled={submitDisabled} type="submit">
                    Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Signup;