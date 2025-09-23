import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/StarRating.css';

const StarRating = (props) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div>
            {[1,2,3,4,5].map((star) => {
                let isFilled = star <= (hoverRating || rating);
                return (
                    isFilled ? 
                            <FontAwesomeIcon 
                                onMouseEnter={() => {setHoverRating(star)}}
                                onMouseLeave={() => {setHoverRating(0)}}
                                onClick={() => {setRating(star)}}
                                className="filled-star"
                                icon="fa-solid fa-star"
                            /> 
                            : 
                            <FontAwesomeIcon
                                onMouseEnter={() => {setHoverRating(star)}}
                                onMouseLeave={() => {setHoverRating(0)}}
                                onClick={() => {setRating(star)}}
                                className="hollow-star"
                                icon="fa-regular fa-star"
                            />
                )
            })}
        </div>
    )
}

export default StarRating;