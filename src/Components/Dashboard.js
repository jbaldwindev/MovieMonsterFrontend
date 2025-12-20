import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from'react-bootstrap/Spinner';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import CustomNav from './CustomNav';
import MovieCarousel from './MovieCarousel';


const Dashboard = () => {
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        MovieService.getPopular(1).then((res) => {
            let retrievedMoviesList = [];
            for (const movie of res.data.movieList) { 
                retrievedMoviesList = [...retrievedMoviesList, movie];
            }
            setMovieList(retrievedMoviesList);
            setPopularLoaded(true);
        });
    }, []);

    const onCardClick = (movieId) => {
        let newPath = "/movie/" + movieId;
        navigate(newPath);
    }

    const onTabSelect = (selectedTab) => {
        if (selectedTab === "1") {
            MovieService.getPopular(1).then((res) => {
                let retrievedMoviesList = [];
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
            });
        } else if (selectedTab === "2") {
            MovieService.getTop(1).then((res) => {
                let retrievedMoviesList = [];
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
            });
        } else if (selectedTab === "3") {
            MovieService.getPlaying(1).then((res) => {
                let retrievedMoviesList = [];
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
            });
        }
    }

    return (
        <div>
            <CustomNav></CustomNav>
            <Container fluid="md">
                <div className="carousel-container">
                    <MovieCarousel/>
                </div>
                <div className="flex-center">
                    <div className="tabs-container">
                        <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3" onSelect={(firstTab, lastTab) => onTabSelect(firstTab, lastTab)}>
                            <Tab eventKey="1" title="Popular">    
                                <Row xs={3} md={5} className="g-4">
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
                                <Row xs={3} md={5} className="g-4">
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
                                <Row xs={3} md={5} className="g-4">
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
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default Dashboard;