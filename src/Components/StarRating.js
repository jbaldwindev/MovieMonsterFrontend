/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieService from '../Services/MovieService';
import { useAuth } from '../Context/AuthContext';
import '../Styles/StarRating.css';

const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const [ratingId, setRatingId] = useState();
    const [hoverRating, setHoverRating] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        MovieService.getRating(user, props.movieId).then(res => {
            if (res.data != null) {
                setRating(res.data.movieRating);
                console.log(res.data.ratingId);
                setRatingId(res.data.ratingId);
            }
        }).catch(error => {
            console.log("Not yet Reviewed: " + error);
        });
    }, [])

    const starClicked = (selectedRating) => {
        setRating(selectedRating);
        MovieService.rateMovie(user, props.movieTitle, props.movieId, selectedRating)
            .then(() => {
                console.log("Rating saved successfully");
            }).catch((err) => {
                console.log("Failed to rate movie: " + err)
            });
    }

    const removeRating = () => {
        setRating(0);
        MovieService.removeRating(user, ratingId)
            .then(() => {
                console.log("Rating successfully removed");
            }).catch((err) => {
                console.log("Failed to remove rating: " + err);
            })
    }

    return (
        <div className="rating-container">
            <div>Your Rating</div>
            <div className="star-container">
                {[1,2,3,4,5].map((star) => {
                    let isFilled = star <= (hoverRating || rating);
                    return (
                        isFilled ?
                                <FontAwesomeIcon 
                                    onMouseEnter={() => {setHoverRating(star)}}
                                    onMouseLeave={() => {setHoverRating(0)}}
                                    onClick={() => {starClicked(star)}}
                                    className="star filled-star"
                                    icon="fa-solid fa-star"
                                /> 
                                : 
                                <FontAwesomeIcon
                                    onMouseEnter={() => {setHoverRating(star)}}
                                    onMouseLeave={() => {setHoverRating(0)}}
                                    onClick={() => {starClicked(star)}}
                                    className="star hollow-star"
                                    icon="fa-regular fa-star"
                                />
                    )
                })}
                {rating ? <FontAwesomeIcon onClick={() => {removeRating()}} className="rating-x" icon="fa-solid fa-xmark"/> : <></>}
            </div>
        </div>
    )
}

export default StarRating;