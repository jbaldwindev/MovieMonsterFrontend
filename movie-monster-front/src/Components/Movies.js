import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import CustomNav from './CustomNav';
import '../Styles/Movies.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Movies = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [currentPopularPage, setCurrentPopularPage] = useState(1);
    const [currentTopPage, setCurrentTopPage] = useState(1);
    const [currentPlayingPage, setCurrentPlayingPage] = useState(1);
    const [currentTab, setCurrentTab] = useState("popular");
    const navigate = useNavigate();

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

    const loadMovies = (page) => {
        console.log(currentTab);
        if (currentTab == "popular") {
            setCurrentPopularPage(page);
            MovieService.getPopular(page).then((res) => {
                let retrievedMoviesList = [];
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
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
                setPopularLoaded(true);
            });
        }
    }

    const changePage = (e, direction) => {
        switch(direction) {
            case "next":
                if (currentTab == "popular") {
                    loadMovies(currentPopularPage + 1);
                } else if (currentTab == "top") {
                    loadMovies(currentTopPage + 1);
                } else if (currentTab == "playing") {
                    loadMovies(currentPlayingPage + 1);
                }
                break;
            case "previous":
                if (currentTab == "popular") {
                    loadMovies(currentPopularPage - 1);
                } else if (currentTab == "top") {
                    loadMovies(currentTopPage - 1);
                } else if (currentTab == "playing") {
                    loadMovies(currentPlayingPage - 1);
                }
                break;
        }
    }

    const onTabSelect = (selectedTab, lastTab) => {
        if (selectedTab == "1") {
            //popular
            setCurrentTab("popular");
            
        } else if (selectedTab == "2") {
            //Top
            setCurrentTab("top");
            
        } else if (selectedTab == "3") {
            //Playing
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
                    <Button className="side-button"><FontAwesomeIcon icon="fa-angle-left" size="2x"/></Button>  
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
                                
                                {currentPopularPage > 1 ? 
                                <Button onClick={(e) => {changePage(e, "previous")}}>Previous</Button>
                                : 
                                <div></div>}
                                
                                <Button onClick={(e) => {changePage(e, "next")}}>Next</Button>
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
                                {currentTopPage > 1 ? 
                                <Button onClick={(e) => {changePage(e, "previous")}}>Previous</Button> 
                                : 
                                <div></div>}
                                <Button onClick={(e) => {changePage(e, "next")}}>Next</Button>
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
                                {currentPlayingPage  > 1 ? 
                                <Button onClick={(e) => {changePage(e, "previous")}}>Previous</Button> 
                                : 
                                <div></div>}
                                <Button onClick={(e) => {changePage(e, "next")}}>Next</Button>
                            </Tab>
                        </Tabs>
                    </Container>
                </Col>
                <Col sm="auto d-flex 
                        align-items-center 
                        justify-content-center">
                    <Button className="side-button"><FontAwesomeIcon icon="fa-angle-right" size="2x"/></Button> 
                    
                </Col>
            </Row>
        </div>
    )
}

export default Movies;