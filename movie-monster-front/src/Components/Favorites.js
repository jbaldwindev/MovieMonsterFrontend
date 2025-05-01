import { useState, useEffect } from 'react';
import CustomNav from './CustomNav';
import Form from 'react-bootstrap/Form';
import UserService from "../Services/UserService";
import MovieService from "../Services/MovieService";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/Favorites.css";

const Favorites = (props) => {
    const [searchText, setSearchText] = useState("");
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const rankDirection = {
        UP: "UP",
        DOWN: "DOWN"
    }

    const searchChange = (e) => {
        setSearchText(e.target.value);
    }

    const rank = (movieId, direction) => {
        UserService.rankFavorite(movieId, direction).then((res) => {
            reloadFavorites();
        });
    }

    const reloadFavorites = () => {
        UserService.getFavorites(sessionStorage.getItem('username')).then((res) => {
            setFavoriteIds(res.data);
        });
    }

    useEffect(() => {
        reloadFavorites();
    }, []);

    useEffect(() => {
        const fetchMovies = async() => {
            const moviePromises = favoriteIds.map((movieId) => {
                return MovieService.getMovieById(movieId);
            });
            const movies = await Promise.all(moviePromises);
            setFavoriteMovies(movies);
        }

        if (favoriteIds && favoriteIds.length > 0) {
            fetchMovies();
        } else {
            setFavoriteMovies([]);
        }
    }, [favoriteIds])

    return (
        <div>
            <CustomNav/>
            <h1>Edit favorites page</h1>
            <Form onChange={searchChange}>
                <Form.Control type="text" placeholder="Search movies to add..." />
            </Form>
            <div>Current Search: {searchText}</div>
            <h1>Current Favorites</h1>
            { favoriteMovies.length > 0 ? 
                <Table className="inverse-shadow" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Change Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favoriteMovies.map((movie, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <a className="movie-link" href={"/Movie/" + movie.data.id}>{movie.data.title}</a>
                                    </td>
                                    <td>
                                        <span className="monster-green" onClick={() => rank(movie.data.id, rankDirection.DOWN)}>
                                            <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                        </span>
                                        <span className = "monster-green" onClick={() => rank(movie.data.id, rankDirection.UP)}>
                                            <FontAwesomeIcon icon="fa-solid fa-angle-up" />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                : 
                <p>Nothing to show yet</p>
            }
        </div>
    )
}
export default Favorites;