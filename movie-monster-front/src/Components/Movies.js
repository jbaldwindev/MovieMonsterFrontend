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

const Movies = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [popularLoaded, setPopularLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        loadPopular(1);
    }, []);

    const onCardClick = (movieId) => {
        let newPath = "/movie/" + movieId;
        navigate(newPath);
    }

    const loadPopular = (page) => {
        setCurrentPage(page);
        MovieService.getPopular(page).then((res) => {
            let retrievedMoviesList = [];
            for (const movie of res.data.movieList) { 
                retrievedMoviesList = [...retrievedMoviesList, movie];
            }
            setMovieList(retrievedMoviesList);
            setPopularLoaded(true);
        });
    }

    const changePage = (e, direction) => {
        switch(direction) {
            case "next":
                loadPopular(currentPage + 1);
                break;
            case "previous":
                loadPopular(currentPage - 1);
        }
    }

    return (
        <div>
            <CustomNav></CustomNav>
            <Container fluid="md">
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
                <Button onClick={(e) => {changePage(e, "previous")}}>Previous</Button>
                <Button onClick={(e) => {changePage(e, "next")}}>Next</Button>
            </Container>
        </div>
    )
}

export default Movies;