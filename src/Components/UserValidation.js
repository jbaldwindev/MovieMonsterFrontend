import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup.js';
import Login from './Login.js';
import '../Styles/UserValidation.css';
import Alert from 'react-bootstrap/Alert';
import logo from '../Assets/MMLogo.png';
import AuthService from '../Services/AuthService';
import { useAuth } from '../Context/AuthContext';

const UserValidation = () => {
    const [loginErrorExists, setLoginErrorExists] = useState(false);
    const [signupOccured, setSignupOccured] = useState(false);
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const loginError = () => {
        setLoginErrorExists(true);
    }

    const successfulSignup = () => {
        setSignupOccured(true);
    }

    useEffect(() => {
        if(!user) {
            AuthService.getMe().then(res => {
                console.log("user was found, navigating to dash");
                setUser(res.data);
                navigate("/dashboard");
            }).catch(() => {
                setUser(null);
            });
        } else {
            console.log("User is present, navigating to dash")
            navigate("/dashboard");
        }
    }, [navigate, user, setUser]);

    return (
        <div className="page-container">
            <img className="logo-img" src={logo} alt="Movie Monster logo"></img>
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