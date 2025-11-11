import {useState} from 'react';
import Signup from './Signup.js';
import Login from './Login.js';
import '../Styles/UserValidation.css';
import Alert from 'react-bootstrap/Alert';

const UserValidation = () => {
    const [loginErrorExists, setLoginErrorExists] = useState(false);
    const [signupOccured, setSignupOccured] = useState(false);
    const loginError = () => {
        setLoginErrorExists(true);
    }

    const successfulSignup = () => {
        setSignupOccured(true);
    }

    return (
        <div className="page-container">
            <h1>Welcome to MovieMonster</h1>
            <Alert show={loginErrorExists} variant="danger">Username or password are incorrect.</Alert>
            <Alert show={signupOccured} variant="success">Account successfully created. Please log in!</Alert>
            <div className="validation-container">
                <div className="signup-container">
                    <Signup successFn={successfulSignup}/>
                </div>
                <div className="divider"></div>
                <div className="login-container">
                    <Login errorFn={loginError}/>
                </div>
            </div>
        </div>
    )
}

export default UserValidation;