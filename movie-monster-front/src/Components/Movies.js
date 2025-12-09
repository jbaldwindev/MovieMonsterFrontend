import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import CustomNav from './CustomNav';
import MoviePagination from './MoviePagination';
import '../Styles/Movies.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Movies = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [currentPopularPage, setCurrentPopularPage] = useState(1);
    const [currentTopPage, setCurrentTopPage] = useState(1);
    const [currentPlayingPage, setCurrentPlayingPage] = useState(1);
    const [currentTab, setCurrentTab] = useState("popular");
    const [currentTabPage, setCurrentTabPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    //TODO delete the following states, used for testing purposes only
    const [pagCurrentPage, setPagCurrentPage] = useState(1);
    const [pagMaxPage, setPagMaxPage] = useState(100);

    useEffect(() => {
        loadMovies(1);
    }, []);

    useEffect(() => {
        if (currentTab == "popular") {
            loadMovies(currentPopularPage);
        } else if (currentTab == "top") {
            loadMovies(currentTopPage);
        } else if (currentTab == "playing") {
            loadMovies(currentPlayingPage);
        }
    }, [currentTab]);

    const onCardClick = (movieId) => {
        let newPath = "/movie/" + movieId;
        navigate(newPath);
    }

    const pageChangeDebug = (page) => {
        setCurrentTabPage(page);
        loadMovies(page);
        console.log("page was changed!");
    }

    const loadMovies = (page) => {
        setCurrentTabPage(page);
        if (currentTab == "popular") {
            setCurrentPopularPage(page);
            MovieService.getPopular(page).then((res) => {
                let retrievedMoviesList = [];
                if (res.data.totalPages < 500) {
                    setTotalPages(res.data.totalPages); 
                } else {
                    setTotalPages(500);
                }
                for (const movie of res.data.movieList) {
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
                setPopularLoaded(true);
            });
        } else if (currentTab == "top") {
            setCurrentTopPage(page);
            MovieService.getTop(page).then((res) => {
                let retrievedMoviesList = [];
                if (res.data.totalPages < 500) {
                    setTotalPages(res.data.totalPages); 
                } else {
                    setTotalPages(500);
                } 
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
                setPopularLoaded(true);
            });
        } else if (currentTab == "playing") {
            setCurrentPlayingPage(page);
            MovieService.getPlaying(page).then((res) => {
                let retrievedMoviesList = [];
                if (res.data.totalPages < 500) {
                    setTotalPages(res.data.totalPages); 
                } else {
                    setTotalPages(500);
                }
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
                setPopularLoaded(true);
            });
        }
    }

    const onTabSelect = (selectedTab, lastTab) => {
        if (selectedTab == "1") {
            setCurrentTabPage(currentPopularPage);
            setCurrentTab("popular");
            
        } else if (selectedTab == "2") {
            setCurrentTabPage(currentTopPage);
            setCurrentTab("top");
            
        } else if (selectedTab == "3") {
            setCurrentTabPage(currentPlayingPage);
            setCurrentTab("playing");
            
        }
    }

    return (
        <div>
            <CustomNav></CustomNav>
            <Row className="justify-content-md-center">
                <Col sm="auto d-flex 
                        align-items-center 
                        justify-content-center">
                </Col>
                <Col sm="auto">
                    <Container fluid="md">
                        <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3" onSelect={(firstTab, lastTab) => onTabSelect(firstTab, lastTab)}>
                            <Tab eventKey="1" title="Popular">
                                
                                <Row xs={2} md={5} className="g-4">
                                    {popularLoaded ?  movieList.map((movie) => (
                                        <Col>
                                            <Card className="hover-color hide-overflow" onClick={() => {onCardClick(movie.id)}}>
                                                <Card.Img variant="top" src={movie.posterPath} className="movie-card-img "/>
                                            </Card>
                                        </Col>
                                    )) 
                                    :
                                    <div className="centered">
                                        <Spinner animation="border" role="status" variant="info" className="centered">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                    }
                                </Row>
                            </Tab>
                            <Tab eventKey="2" title="Top Rated">
                                <Row xs={2} md={5} className="g-4">
                                    {popularLoaded ?  movieList.map((movie) => (
                                        <Col>
                                            <Card className="hover-color hide-overflow" onClick={() => {onCardClick(movie.id)}}>
                                                <Card.Img variant="top" src={movie.posterPath} className="movie-card-img "/>
                                            </Card>
                                        </Col>
                                    )) 
                                    :
                                    <div className="centered">
                                        <Spinner animation="border" role="status" variant="info" className="centered">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                    }
                                </Row>
                            </Tab>
                            <Tab eventKey="3" title="Now Playing">
                                <Row xs={2} md={5} className="g-4">
                                    {popularLoaded ?  movieList.map((movie) => (
                                        <Col>
                                            <Card className="hover-color hide-overflow" onClick={() => {onCardClick(movie.id)}}>
                                                <Card.Img variant="top" src={movie.posterPath} className="movie-card-img "/>
                                            </Card>
                                        </Col>
                                    )) 
                                    :
                                    <div className="centered">
                                        <Spinner animation="border" role="status" variant="info" className="centered">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                    }
                                </Row>
                            </Tab>
                        </Tabs>
                    </Container>
                </Col>
            </Row>
            <div className="movies-pag-container">
                <MoviePagination currentPage={currentTabPage} maxPage={totalPages} onPageChange={pageChangeDebug}/>
            </div>
        </div>
    )
}

export default Movies;