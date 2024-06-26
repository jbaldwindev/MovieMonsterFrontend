import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import MovieService from '../Services/MovieService';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


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
            <Container fluid="md">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
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
                        )) : <h1>not yet loaded</h1>}
                    </Row>
                </Tabs>
            </Container>
        </div>
    );
}
export default Dashboard;