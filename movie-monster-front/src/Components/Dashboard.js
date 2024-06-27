import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from'react-bootstrap/Spinner';
import '../Styles/Dashboard.css'


const Dashboard = (props) => {
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [movieTitle, setMovieTitle] = useState("");
    const [movieList, setMovieList] = useState([]);

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

    const onTabSelect = (selectedTab, lastTab) => {
        if (selectedTab == "1") {
            MovieService.getPopular(1).then((res) => {
                let retrievedMoviesList = [];
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
            });
        } else if (selectedTab == "2") {
            MovieService.getTop(1).then((res) => {
                let retrievedMoviesList = [];
                for (const movie of res.data.movieList) { 
                    retrievedMoviesList = [...retrievedMoviesList, movie];
                }
                setMovieList(retrievedMoviesList);
            });
        } else if (selectedTab == "3") {
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
            <h1>this is the dashboard</h1>
            <Container fluid="md">
                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3" onSelect={(firstTab, lastTab) => onTabSelect(firstTab, lastTab)}>
                    <Tab eventKey="1" title="Popular">    
                        <Row xs={1} md={4} className="g-4">
                            {popularLoaded ?  movieList.map((movie) => (
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={movie.posterPath} />
                                        <Card.Body>
                                            <Card.Title>{movie.originalTitle}</Card.Title>
                                            <Card.Text>{movie.overview}</Card.Text>
                                        </Card.Body>
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
                        <Row xs={1} md={4} className="g-4">
                            {popularLoaded ?  movieList.map((movie) => (
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={movie.posterPath} />
                                        <Card.Body>
                                            <Card.Title>{movie.originalTitle}</Card.Title>
                                            <Card.Text>{movie.overview}</Card.Text>
                                        </Card.Body>
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
                        <Row xs={1} md={4} className="g-4">
                            {popularLoaded ?  movieList.map((movie) => (
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={movie.posterPath} />
                                        <Card.Body>
                                            <Card.Title>{movie.originalTitle}</Card.Title>
                                            <Card.Text>{movie.overview}</Card.Text>
                                        </Card.Body>
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
        </div>
    );
}
export default Dashboard;