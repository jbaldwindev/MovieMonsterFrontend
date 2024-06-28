import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import MovieService from '../Services/MovieService';
import Image from 'react-bootstrap/Image';
import "../Styles/Movie.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Movie = (props) => {
    let { movieId } = useParams();
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [posterPath, setPosterPath]= useState("");
    const [backdropPath, setBackdropPath] = useState("");
    const [imageStyle, setImageStyle] = useState();

    useEffect(() => {
        MovieService.getMovieById(movieId).then(res => {
            let jsonData = res.data;
            setMovieTitle(jsonData.title);
            setMovieOverview(jsonData.overview);
            setPosterPath("https://image.tmdb.org/t/p/w500" + jsonData.posterPath);
            setBackdropPath("https://image.tmdb.org/t/p/w1280" + jsonData.backdropPath);
        });
    }, []);
    
    return (
        <Container>
            <Row>
                <Col Col md="auto">1 of 3</Col>
                <Col>
                <div>
                    <div className="image-preview-container">
                        <div style={{position: "relative", width: "100%", height: "650px", backgroundColor: "blue", backgroundImage: "url("+ backdropPath + ")"}}>
                            <h1 style={{position: "absolute", bottom: "20px"}}>{movieTitle}</h1>
                        </div>
                    </div>
                    <h1>{movieTitle}</h1>
                    <p>{movieOverview}</p>
                    <Image src={posterPath}></Image>
                </div>
                </Col>
                <Col md="auto">3 of 3</Col>
            </Row>
        </Container>
        
    );
}

export default Movie;