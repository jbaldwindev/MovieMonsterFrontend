import { useEffect } from 'react';
import '../Styles/MovieCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = (props) => {

    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(props.posterPath)
    }, []);

    const redirectMovie = () => {
        navigate("/Movie/" + props.movieId);
    }

    return (
        <div onClick={redirectMovie}>
            <img className="card-image hover-color hide-overflow"src={props.posterPath}></img>
        </div>
    )
}

export default MovieCard;