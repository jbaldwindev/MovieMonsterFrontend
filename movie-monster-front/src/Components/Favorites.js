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
    const [movieList, setMovieList] = useState([]);
    const rankDirection = {
        UP: "UP",
        DOWN: "DOWN"
    }

    const searchChange = (event) => {
        if (event.target.value) {
            MovieService.getSearch(event.target.value).then(res => {
                setMovieList(res.data.movieSearchList);
            });
        } else {
            setMovieList([]);
        }
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

    const removeFavorite = (movieId) => {
        UserService.removeFavorite(movieId).then((res) => {
            reloadFavorites();
        });
    }

    const addFavorite = (movieId) => {
        UserService.addFavorite(movieId).then((res) => {
            reloadFavorites();
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
            { movieList[0] ?
                <Table className="inverse-shadow favorites-list center" striped bordered hover>
                    <tbody>
                        {
                            movieList.map((movieEntry) => (
                                <tr>
                                    <td>
                                        {movieEntry.title}
                                    </td>
                                    <td className="text-centered">
                                        <span className="monster-green" onClick={() => addFavorite(movieEntry.id)}>
                                            <FontAwesomeIcon className="add-button" icon="fa-solid fa-plus"/>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            : 
                <div></div>
            }
            <div className="flex-center">
                <h2>Current Favorites</h2>
            </div>
            { favoriteMovies.length > 0 ? 
                <Table className="inverse-shadow favorites-list center" striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-centered">#</th>
                            <th className="text-centered">Title</th>
                            <th className="text-centered"></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favoriteMovies.map((movie, index) => (
                                <tr>
                                    <td className="text-centered">{index + 1}</td>
                                    <td>
                                        <a className="movie-link" href={"/Movie/" + movie.data.id}>{movie.data.title}</a>
                                    </td>
                                    <td className="text-centered">
                                        <div className="inline-buttons">
                                            <span className="monster-green" onClick={() => rank(movie.data.id, rankDirection.DOWN)}>
                                                <FontAwesomeIcon className="rank-button" icon="fa-solid fa-angle-down"/>
                                            </span>
                                            <span className = "monster-green" onClick={() => rank(movie.data.id, rankDirection.UP)}>
                                                <FontAwesomeIcon className="rank-button" icon="fa-solid fa-angle-up"/>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-centered">
                                        <span className="delete-button" onClick={() => removeFavorite(movie.data.id)}><FontAwesomeIcon icon="fa-solid fa-trash-can" className="delete-button"/></span>
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