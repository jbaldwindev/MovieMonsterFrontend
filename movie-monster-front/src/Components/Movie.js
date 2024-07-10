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
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Movie = (props) => {
    let { movieId } = useParams();
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [posterPath, setPosterPath]= useState("");
    const [backdropPath, setBackdropPath] = useState("");
    const [castList, setCastList] = useState([]);
    const [fillS1, setfillS1] = useState(false);
    const [fillS2, setfillS2] = useState(false);
    const [fillS3, setfillS3] = useState(false);
    const [fillS4, setfillS4] = useState(false);
    const [fillS5, setfillS5] = useState(false);

    useEffect(() => {
        MovieService.getMovieById(movieId).then(res => {
            let jsonData = res.data;
            setMovieTitle(jsonData.title);
            setMovieOverview(jsonData.overview);
            setPosterPath("https://image.tmdb.org/t/p/w500" + jsonData.posterPath);
            setBackdropPath("https://image.tmdb.org/t/p/w1280" + jsonData.backdropPath);
            let retrievedCastMembers = [];
            for (const member of res.data.cast) {
                if (member.profilePath != null) {
                    retrievedCastMembers = [...retrievedCastMembers, member];
                }
            }
            setCastList(retrievedCastMembers);
        });
        
        MovieService.getRating(sessionStorage.getItem("username"), movieId).then(res => {
            if (res.data != null) {
                setRating(res.data.movieRating);
            }
        }).catch(error => {
            console.log("Not yet Reviewed");
        });
    }, []);

    const setRating = (rating) => {
        switch(rating) {
            case 5:
                fillStars(true, true, true, true, true);
                break;
            case 4:
                fillStars(true, true, true, true, false);
                break;
            case 3:
                fillStars(true, true, true, false, false);
                break;
            case 2:
                fillStars(true, true, false, false, false);
                break;
            case 1:
                fillStars(true, false, false, false, false);
                break;
        }
    }

    const starClicked = (e, rating) => {
        setRating(rating);
        MovieService.rateMovie(sessionStorage.getItem("username"), movieTitle, movieId, rating);
    }

    const fillStars = (one, two, three, four, five) => {
        setfillS1(one);
        setfillS2(two);
        setfillS3(three);
        setfillS4(four);
        setfillS5(five);
    }
    
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
                                <h6>Your rating</h6>
                                <div className="star-container">
                                    {fillS1 ? 
                                    <FontAwesomeIcon id="s1" className="star" onClick={e => starClicked(e, 1)} icon="fa-star" />
                                    :
                                    <FontAwesomeIcon id="s1" className="star" onClick={e => starClicked(e, 1)} icon="fa-regular fa-star" />
                                    }
                                    {fillS2 ? 
                                    <FontAwesomeIcon id="s2" className="star" onClick={e => starClicked(e, 2)} icon="fa-star" />
                                    :
                                    <FontAwesomeIcon id="s2" className="star" onClick={e => starClicked(e, 2)} icon="fa-regular fa-star" />
                                    }
                                    {fillS3 ? 
                                    <FontAwesomeIcon id="s3" className="star" onClick={e => starClicked(e, 3)} icon="fa-star" />
                                    :
                                    <FontAwesomeIcon id="s3" className="star" onClick={e => starClicked(e, 3)} icon="fa-regular fa-star" />
                                    }
                                    {fillS4 ? 
                                    <FontAwesomeIcon id="s4" className="star" onClick={e => starClicked(e, 4)} icon="fa-star" />
                                    :
                                    <FontAwesomeIcon id="s4" className="star" onClick={e => starClicked(e, 4)} icon="fa-regular fa-star" />
                                    }
                                    {fillS5 ? 
                                    <FontAwesomeIcon id="s5" className="star" onClick={e => starClicked(e, 5)} icon="fa-star" />
                                    :
                                    <FontAwesomeIcon id="s5" className="star" onClick={e => starClicked(e, 5)} icon="fa-regular fa-star" />
                                    }
                                </div>
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
                    <Col md="auto" lg="auto">
                        
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default Movie;