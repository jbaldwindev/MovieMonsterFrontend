import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';

const Dashboard = (props) => {
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [movieTitle, setMovieTitle] = useState("");
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        MovieService.getPopular(1).then((res) => {
            console.log(res.data.movieList[0].originalTitle);
            setMovieTitle(res.data.movieList[0].originalTitle);
            let retrievedMoviesList = [];

            for (const movie of res.data.movieList) { 
                retrievedMoviesList = [...retrievedMoviesList, movie];
            }
            setMovieList(retrievedMoviesList);
            setPopularLoaded(true);
        });
    }, []);

    return (
        <div>
            <h1>this is the dashboard</h1>
            {popularLoaded ?  movieList.map((movie) => (
                <div>
                    <h1>{movie.originalTitle}</h1>
                    <h3>{movie.posterPath}</h3>
                </div>
            )) : <h1>not yet loaded</h1>}
        </div>
    );
}
export default Dashboard;