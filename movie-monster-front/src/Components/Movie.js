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
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Movie = (props) => {
    let { movieId } = useParams();
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [posterPath, setPosterPath]= useState("");
    const [backdropPath, setBackdropPath] = useState("");
    const [tagline, setTagline] = useState("");
    const [castList, setCastList] = useState([]);
    const [fillS1, setfillS1] = useState(false);
    const [fillS2, setfillS2] = useState(false);
    const [fillS3, setfillS3] = useState(false);
    const [fillS4, setfillS4] = useState(false);
    const [fillS5, setfillS5] = useState(false);
    const [writtenComment, setWrittenComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [releaseDate, setReleaseDate] = useState();
    const [runtime, setRuntime] = useState(0);
    const [productionCompanies, setProductionCompanies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        MovieService.getMovieById(movieId).then(res => {
            let jsonData = res.data;
            setMovieTitle(jsonData.title);
            setMovieOverview(jsonData.overview);
            setPosterPath("https://image.tmdb.org/t/p/w500" + jsonData.posterPath);
            setBackdropPath("https://image.tmdb.org/t/p/w1280" + jsonData.backdropPath);
            setTagline(jsonData.tagline);
            setReleaseDate(jsonData.releaseDate);
            setRuntime(jsonData.runtime);
            setProductionCompanies(jsonData.productionCompanies);
            setGenres(jsonData.genres);
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

        loadCommentList();
        }, []);

    const submitComment = (e) => {
        e.preventDefault();
        MovieService.submitComment(
            movieId, 
            sessionStorage.getItem("username"),
            writtenComment
        );
        let user = sessionStorage.getItem("username");
        let newComment = {
            username: user,
            comment: writtenComment,
            movieId: 1
        }
        setWrittenComment("");
        
        setCommentList([...commentList, newComment]);
    }

    const loadCommentList = () => {
        MovieService.getCommentList(movieId, sessionStorage.getItem("username")).then(res => {
            let movieComments = [];
            for (const comment of res.data.commentList) {
                movieComments = [...movieComments, comment];
            }
            movieComments.sort((a, b) => b.likeCount - a.likeCount);
            setCommentList(movieComments);
        }).catch(error => {
            console.log("No comments retrieved");
        })
    }

    const updateComment = (e) => {
        setWrittenComment(e.target.value);
    }

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

    const likeComment = (comment) => {
        MovieService.likeComment(sessionStorage.getItem("username"), comment.commentId).then(res => {
            loadCommentList();
        }).catch(error => {
            console.log("Failed to like comment");
        })
    }

     const unlikeComment = (comment) => {
        MovieService.unlikeComment(sessionStorage.getItem("username"), comment.commentId).then(res => {
            loadCommentList();
        }).catch(error => {
            console.log("Failed to remove like");
        })
     }
    
    return (
        <div>
            <CustomNav/>
            <div className="movie-content-container">
                <div className="backdrop-wrapper">
                    <img className="backdrop" src={backdropPath}></img>
                    <div className="grid">
                        <div className="poster-child centered-cell">
                            <img className="movie-poster" src={posterPath}></img>
                        </div>
                        <div className="title-child centered-cell">
                            <p className="movie-title">{movieTitle}</p>
                            <p className="movie-tagline">{tagline}</p>
                            <p>{movieOverview}</p>
                        </div>
                        <div className="centered-cell info-child">
                            <div className="info-box info-child">
                                <div className="info-header"><p className="bold">Information</p></div>
                                <div className="info-item"><span className="bold">Release Date:</span> {releaseDate}</div>
                                <div className="info-item">
                                    <span className="bold">Genres: </span>
                                    <span>
                                        {genres.map((genre, index) => (
                                            <span>{genre}{index != genres.length - 1 ? <>,</> : <></>}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="bold">Production Companies: </span>
                                    {productionCompanies.map((company, index) => (
                                        <span>{company}{index != productionCompanies.length - 1 ? <>,</> : <></>} </span>
                                    ))}
                                </div>
                                <div className="info-item"><span className="bold">Runtime:</span> <span>{runtime} mins</span></div>
                            </div>
                        </div>
                        <div className="cast-child">
                            <div className="section-header">
                                <span>Cast</span>
                            </div>
                            <div className="cast-container">
                                {castList.map((castMember) => (
                                    <div className="cast-card">
                                        <img className="cast-img" src={"https://image.tmdb.org/t/p/w500" + castMember.profilePath}/>
                                        <div className="cast-card-body">
                                            <h5 className="card-title">{castMember.name}</h5>
                                            <p className="card-text">{castMember.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="comments-child">
                            <div id="centered-header" className="section-header">
                                <span>Comments</span>
                            </div>
                            <div className="comments-container">
                                {commentList.length > 0 ? 
                                    commentList.map((movieComment) => (
                                        <div className="comment">
                                            <div className="comment-user">
                                                <Image
                                                    className="comment-user-icon"
                                                    src={movieComment.userIconPath}
                                                    roundedCircle
                                                />
                                                <p className="comment-username">{movieComment.username}</p>
                                            </div>

                                            <div className="comment-text">
                                                <p>{movieComment.comment}</p>
                                            </div>
                                            <div className="like-container">
                                                {
                                                    movieComment.currentUserLiked ? 
                                                    <button className="like-button" onClick={() => unlikeComment(movieComment)}>
                                                        <FontAwesomeIcon className="liked-icon" icon="fa-solid fa-thumbs-up"/>
                                                    </button>
                                                    : 
                                                    <button className="like-button" onClick={() => likeComment(movieComment)}>
                                                        <FontAwesomeIcon className="like-icon" icon="fa-regular fa-thumbs-up"/>
                                                    </button>
                                                }
                                                <span>{movieComment.likeCount}</span>
                                            </div>
                                        </div>
                                    ))
                                : 
                                    <p>No one has commented yet. Be the first!</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <Container>
                <Row>
                    <Col Col md="auto"></Col>
                    <Col>
                    <div>
                        {/* <h1>{movieTitle}</h1> */}
                        <p></p>
                        <Row>
                            <Col>
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
                        
                    </Col>
                    <Col md="auto" lg="auto">
                        
                    </Col>
                </Row>
                <Row>
                    <Col md="auto"></Col>
                    <Col>
                        {commentList.map((movieComment) => (
                            <div>
                                <p><b>{movieComment.username}</b></p>
                                <p>{movieComment.comment}</p>
                                <p>Likes: {movieComment.likeCount}</p>
                                {movieComment.currentUserLiked ? 
                                <Button className="liked-button" onClick={() => unlikeComment(movieComment)}>Already Liked</Button>
                                :
                                <Button onClick={() => likeComment(movieComment)}>Like</Button>
                                }
                            </div>
                        ))}
                        <Form onSubmit={submitComment}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add a comment!</Form.Label>
                            <Form.Control as="textarea" rows={3} value={writtenComment} onChange={updateComment}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Post
                            </Button>
                        </Form>
                    </Col>
                    <Col md="auto"></Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default Movie;