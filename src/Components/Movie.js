import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import MovieService from '../Services/MovieService';
import Image from 'react-bootstrap/Image';
import "../Styles/Movie.css";
import CustomNav from './CustomNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../Services/UserService';
import StarRating from './StarRating';
import { useAuth } from '../Context/AuthContext';
import { buildAssetUrl } from "../config/api";
import LoadingState from './LoadingState';

const Movie = (props) => {
    let { movieId } = useParams();
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [posterPath, setPosterPath]= useState("");
    const [backdropPath, setBackdropPath] = useState("");
    const [tagline, setTagline] = useState("");
    const [castList, setCastList] = useState([]);
    const [writtenComment, setWrittenComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [releaseDate, setReleaseDate] = useState();
    const [runtime, setRuntime] = useState(0);
    const [productionCompanies, setProductionCompanies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        let isCurrent = true;
        setIsPageLoading(true);
        setPageError("");

        const movieRequest = MovieService.getMovieById(movieId).then(res => {
            let jsonData = res.data;
            let retrievedCastMembers = [];
            for (const member of res.data.cast) {
                if (member.profilePath != null) {
                    retrievedCastMembers = [...retrievedCastMembers, member];
                }
            }

            return {
                title: jsonData.title,
                overview: jsonData.overview,
                posterPath: jsonData.posterPath ? "https://image.tmdb.org/t/p/w500" + jsonData.posterPath : "",
                backdropPath: jsonData.backdropPath ? "https://image.tmdb.org/t/p/w1280" + jsonData.backdropPath : "",
                tagline: jsonData.tagline,
                releaseDate: jsonData.releaseDate,
                runtime: jsonData.runtime,
                productionCompanies: jsonData.productionCompanies || [],
                genres: jsonData.genres || [],
                castList: retrievedCastMembers
            };
        });

        const commentsRequest = MovieService.getCommentList(movieId, user).then(res => {
            let movieComments = [];
            for (const comment of res.data.commentList) {
                movieComments = [...movieComments, {
                    ...comment,
                    userIconPath: buildAssetUrl(comment.userIconPath)
                }];
            }
            movieComments.sort((a, b) => b.likeCount - a.likeCount);
            return movieComments;
        }).catch(error => {
            console.log("No comments retrieved");
            return [];
        });

        Promise.all([movieRequest, commentsRequest]).then(([movieData, movieComments]) => {
            if (!isCurrent) return;
            setMovieTitle(movieData.title);
            setMovieOverview(movieData.overview);
            setPosterPath(movieData.posterPath);
            setBackdropPath(movieData.backdropPath);
            setTagline(movieData.tagline);
            setReleaseDate(movieData.releaseDate);
            setRuntime(movieData.runtime);
            setProductionCompanies(movieData.productionCompanies);
            setGenres(movieData.genres);
            setCastList(movieData.castList);
            setCommentList(movieComments);
        }).catch(error => {
            if (!isCurrent) return;
            console.log("Failed to load movie", error);
            setPageError("Unable to load this movie.");
        }).finally(() => {
            if (isCurrent) {
                setIsPageLoading(false);
            }
        });

        return () => {
            isCurrent = false;
        };
    }, [movieId, user]);

    const submitComment = (e) => {
        e.preventDefault();
        MovieService.submitComment(
            movieId, 
            user,
            writtenComment
        );
        let iconUrl;
        UserService.getIcon(user).then((res) => {
            iconUrl = buildAssetUrl(res.data);
            let newComment = {
                username: user,
                comment: writtenComment,
                movieId: 1,
                userIconPath: iconUrl,
                likeCount: 0
            }
            setCommentList([...commentList, newComment]);
        }).catch(error => {
          console.error("Error fetching image:", error);
        });
        setWrittenComment("");
    }

    const loadCommentList = () => {
        MovieService.getCommentList(movieId, user).then(res => {
            let movieComments = [];
            for (const comment of res.data.commentList) {
                movieComments = [...movieComments, {
                    ...comment,
                    userIconPath: buildAssetUrl(comment.userIconPath)
                }];
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

    const likeComment = (comment) => {
        MovieService.likeComment(user, comment.commentId).then(res => {
            loadCommentList();
        }).catch(error => {
            console.log("Failed to like comment");
        })
    }

     const unlikeComment = (comment) => {
        MovieService.unlikeComment(user, comment.commentId).then(res => {
            loadCommentList();
        }).catch(error => {
            console.log("Failed to remove like");
        })
     }
    
    return (
        <div>
            <CustomNav/>
            {isPageLoading ? (
                <LoadingState label="Loading movie..." />
            ) : pageError ? (
                <p className="movie-load-error">{pageError}</p>
            ) : (
            <div className="movie-content-container">
                <div className="backdrop-wrapper">
                    {backdropPath && <img className="backdrop" src={backdropPath} alt=""></img>}
                    <div className="grid">
                        <div className="poster-child centered-cell">
                            {posterPath && <img className="movie-poster" src={posterPath} alt={movieTitle}></img>}
                        </div>
                        <div className="title-child centered-cell">
                            <p className="movie-title">{movieTitle}</p>
                            <p className="movie-tagline">{tagline}</p>
                            <p>{movieOverview}</p>
                        </div>
                        <div className="centered-cell info-child">
                            <StarRating movieTitle={movieTitle} movieId={movieId} />
                            <div className="info-box info-child">
                                <div className="info-header"><p className="bold">Information</p></div>
                                <div className="info-item"><span className="bold">Release Date:</span> {releaseDate}</div>
                                <div className="info-item">
                                    <span className="bold">Genres: </span>
                                    <span>
                                        {genres.map((genre, index) => (
                                            <span key={genre}>{genre}{index !== genres.length - 1 ? <>,</> : <></>}</span>
                                        ))}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="bold">Production Companies: </span>
                                    {productionCompanies.map((company, index) => (
                                        <span key={company}>{company}{index !== productionCompanies.length - 1 ? <>,</> : <></>} </span>
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
                                    <div className="cast-card" key={`${castMember.name}-${castMember.character}`}>
                                        <img className="cast-img" src={"https://image.tmdb.org/t/p/w500" + castMember.profilePath} alt={castMember.name}/>
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
                                        <div className="comment" key={movieComment.commentId || `${movieComment.username}-${movieComment.comment}`}>
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
                            <div className="comment-form-container">
                                <form className="comment-form" onSubmit={submitComment}>
                                    <label>Submit a comment!</label>
                                    <textarea className="write-comment-box" value={writtenComment} onChange={updateComment}></textarea>
                                    <div className="form-button-container">
                                        <input type="submit" value="Submit" className="btn btn-success"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>  
    );
}

export default Movie;
