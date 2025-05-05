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
        }).catch((error) => {
            console.log("Failed to add favorite: " + error.response.data);
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
            <Form onChange={searchChange}>
                <Form.Control className="search-bar center" type="text" placeholder="Search movies to add..." />
            </Form>
            { movieList[0] ?
                <Table className="inverse-shadow favorites-list center" striped bordered hover>
                    <tbody>
                        {
                            movieList.map((movieEntry) => (
                                <tr>
                                    <td>
                                    <a className="movie-link" href={"/Movie/" + movieEntry.id}>{movieEntry.title}</a>
                                    </td>
                                    <td className="text-centered control-col">
                                        
                                            {favoriteIds.length < 10 ?
                                                <span className="monster-green" onClick={() => addFavorite(movieEntry.id)}>
                                                    <FontAwesomeIcon className="add-button" icon="fa-solid fa-plus"/>
                                                </span>
                                                : 
                                                <FontAwesomeIcon className="disabled add-button-disabled" icon="fa-solid fa-plus"/>
                                            }
                                            
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            : 
                <div></div>
            }
            <div className="flex-center favorites-section-header">
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
                                    <td className="text-centered control-col">
                                        <div className="inline-buttons">
                                            
                                            {index == 9 ? 
                                                <></>
                                                :
                                                <span className="monster-green" onClick={() => rank(movie.data.id, rankDirection.DOWN)}>
                                                    <FontAwesomeIcon className="rank-button" icon="fa-solid fa-angle-down"/>
                                                </span>
                                            }

                                            {index == 0 ? 
                                                <></>
                                                :
                                                <span className="monster-green" onClick={() => rank(movie.data.id, rankDirection.DOWN)}>
                                                    <FontAwesomeIcon className="rank-button" icon="fa-solid fa-angle-up"/>
                                                </span>
                                            }
                                        </div>
                                    </td>
                                    <td className="text-centered control-col">
                                        <span className="delete-button" onClick={() => removeFavorite(movie.data.id)}><FontAwesomeIcon icon="fa-solid fa-trash-can" className="delete-button"/></span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                : 
                <p className="centered">Nothing to show yet</p>
            }
        </div>
    )
}
export default Favorites;