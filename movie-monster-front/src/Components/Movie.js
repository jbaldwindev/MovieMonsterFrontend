import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import MovieService from '../Services/MovieService';
import Image from 'react-bootstrap/Image';
import "../Styles/Movie.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';
import CustomNav from './CustomNav';

const Movie = (props) => {
    let { movieId } = useParams();
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [posterPath, setPosterPath]= useState("");
    const [backdropPath, setBackdropPath] = useState("");
    const [castList, setCastList] = useState([]);

    useEffect(() => {
        MovieService.getMovieById(movieId).then(res => {
            let jsonData = res.data;
            setMovieTitle(jsonData.title);
            setMovieOverview(jsonData.overview);
            setPosterPath("https://image.tmdb.org/t/p/w500" + jsonData.posterPath);
            setBackdropPath("https://image.tmdb.org/t/p/w1280" + jsonData.backdropPath);
            let retrievedCastMembers = [];
            for (const member of res.data.cast) {
                console.log(member);
                if (member.profilePath != null) {
                    retrievedCastMembers = [...retrievedCastMembers, member];
                }
            }
            setCastList(retrievedCastMembers);
        });

    }, []);
    
    return (
        <div>
            <CustomNav></CustomNav>
            <Container>
                <Row>
                    <Col Col md="auto"></Col>
                    <Col>
                    <div>
                        <div className="image-preview-container">
                            <div style={{position: "relative", width: "100%", height: "650px", backgroundColor: "blue", backgroundImage: "url("+ backdropPath + ")"}}>
                            </div>
                        </div>
                        {/* <h1>{movieTitle}</h1> */}
                        <p></p>
                        <Row>
                            <Col>
                                <Card style={{ width: '22rem' }}>
                                    <Card.Img variant="top" src={posterPath} />
                                    <Card.Body>
                                        <Card.Title className='text-center'><h2>{movieTitle}</h2></Card.Title>
                                    </Card.Body>
                                </Card>
                                
                            </Col>
                            <Col>
                                <Accordion defaultActiveKey={['0']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Details</Accordion.Header>
                                        <Accordion.Body>
                                            {movieOverview}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Production</Accordion.Header>
                                        <Accordion.Body>
                                            more details
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>
                        
                    </div>
                    </Col>
                    <Col md="auto"></Col>
                </Row>
                <Row>
                    <Col md="auto" lg="auto"></Col>
                    <Col md="auto" lg="10">
                        <div className='card-group card-group-scroll'>
                            {castList.map((castMember) => (
                                <div className="card">
                                    <img className="card-img-top" src={"https://image.tmdb.org/t/p/w500" + castMember.profilePath} />
                                    <div className="card-body">
                                        <h5 className="card-title">{castMember.name}</h5>
                                        <p className="card-text">{castMember.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md="auto" lg="auto"></Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default Movie;