import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';

const Dashboard = (props) => {
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [movieTitle, setMovieTitle] = useState("");

    useEffect(() => {
        MovieService.getPopular(1).then((res) => {
            console.log(res.data.movieList[0].originalTitle);
            setMovieTitle(res.data.movieList[0].originalTitle);
            setPopularLoaded(true);
        });
    }, []);

    return (
        <div>
            <h1>this is the dashboard</h1>
            {popularLoaded ? <h1>{movieTitle} has been loaded</h1> : <h1>not yet loaded</h1>}
        </div>
    );
}
export default Dashboard;