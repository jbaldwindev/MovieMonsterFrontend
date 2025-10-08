import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/MovieCarousel.css';
import MovieService from '../Services/MovieService.js';

const MovieCarousel = (props) => {
    const [movieList, setMovieList ] = useState([]);
    const maxPagCount = 5;
    const navigate = useNavigate();

    const getMovies = () => {
        MovieService.getPlaying(1).then((res) => {
            setMovieList(res.data.movieList);
        }).catch((err) => {
            console.log("Failed to retrieve films for carousel: " + err);
            setMovieList([]);
        })
    }

    const redirectToMovie = (movieIndex) => {
        navigate("/movie/" + movieList[movieIndex].id);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="carousel-div">
            {movieList && movieList.length >= maxPagCount ? 
                <Carousel>
                    {movieList.slice(0, maxPagCount).map((movie, index) => (
                        <Carousel.Item className="carousel-item" onClick={() => redirectToMovie(index)}>
                            <img className="carousel-img" src={"https://image.tmdb.org/t/p/w1280/" + movie.backdropPath}></img>
                            <Carousel.Caption>
                            <h3>{movie.englishTitle}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                    </Carousel>
            :
                <></>
            }
        </div>
    )
}

export default MovieCarousel;