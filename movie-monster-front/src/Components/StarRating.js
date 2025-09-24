import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieService from '../Services/MovieService';
import '../Styles/StarRating.css';

//TODO add X button to remove rating if rated
const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        MovieService.getRating(sessionStorage.getItem("username"), props.movieId).then(res => {
            if (res.data != null) {
                setRating(res.data.movieRating);
            }
        }).catch(error => {
            console.log("Not yet Reviewed");
        });
    }, [])

    const starClicked = (selectedRating) => {
        setRating(selectedRating);
        MovieService.rateMovie(sessionStorage.getItem("username"), props.movieTitle, props.movieId, selectedRating)
            .then((res) => {
                console.log("Rating saved successfully");
            }).catch((err) => {
                console.log("Failed to rate movie: " + err)
            });
    }

    return (
        <div>
            {[1,2,3,4,5].map((star) => {
                let isFilled = star <= (hoverRating || rating);
                return (
                    isFilled ? 
                            <FontAwesomeIcon 
                                onMouseEnter={() => {setHoverRating(star)}}
                                onMouseLeave={() => {setHoverRating(0)}}
                                onClick={() => {starClicked(star)}}
                                className="filled-star"
                                icon="fa-solid fa-star"
                            /> 
                            : 
                            <FontAwesomeIcon
                                onMouseEnter={() => {setHoverRating(star)}}
                                onMouseLeave={() => {setHoverRating(0)}}
                                onClick={() => {starClicked(star)}}
                                className="hollow-star"
                                icon="fa-regular fa-star"
                            />
                )
            })}
        </div>
    )
}

export default StarRating;