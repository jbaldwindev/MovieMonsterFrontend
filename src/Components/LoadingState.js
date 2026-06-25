import Spinner from 'react-bootstrap/Spinner';
import '../Styles/LoadingState.css';

const LoadingState = ({ label = "Loading...", className = "" }) => {
    return (
        <div className={`loading-state ${className}`}>
            <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">{label}</span>
            </Spinner>
            <p>{label}</p>
        </div>
    );
}

export default LoadingState;
