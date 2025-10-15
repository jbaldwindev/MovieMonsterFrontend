import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomNav from "./CustomNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import MovieService from '../Services/MovieService';
import Table from "react-bootstrap/Table";
import '../Styles/Profile.css';

const Profile = () => {
    let { username } = useParams();
    const [iconUrl, setIconUrl] = useState();
    const [dateJoined, setDateJoined] = useState();
    const [friendCount, setFriendCount] = useState(0);
    const [favoriteIds, setFavoriteIds] = useState();
    const [bio, setBio] = useState();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getIcon(username).then((res) => {
            setIconUrl(URL.createObjectURL(res.data));
        }).catch(error => {
          console.error("Error fetching image:", error);
        });

        UserService.getProfileInfo(username).then((res) => {
            const newDate = new Date(res.data.joinDate);
            const month = String(newDate.getMonth() + 1).padStart(2, '0');
            const day = String(newDate.getDate()).padStart(2, '0');
            const year = String(newDate.getFullYear());
            const dateFormatted = `${month}/${day}/${year}`;
            setDateJoined(dateFormatted);
            setFriendCount(res.data.friendCount);
            setFavoriteIds(res.data.favoriteIds);
            setBio(res.data.bio);
        });
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviePromises = favoriteIds.map((movieId) => {
                return MovieService.getMovieById(movieId);
            });
            const movies = await Promise.all(moviePromises);
            setFavoriteMovies(movies);
        }

        if (favoriteIds && favoriteIds.length > 0) {
            fetchMovies();
        } else {
            setFavoriteMovies([]);
        }
    }, [favoriteIds]);

    useEffect(() => {
        console.log(favoriteMovies);
    }, [favoriteMovies]);

    const openList = () => {
        navigate("/List/" + username);
    }

    const openFriends = () => {
        if (username == sessionStorage.getItem("username")) {
            navigate("/friends");
        } else {
            navigate("/display-friends/" + username);
        }
    }

    return (
        <div>
            <CustomNav></CustomNav>
            <Container>
                <Row>
                    <Col className="text-center">
                        <Image className="icon-image" src={iconUrl} roundedCircle></Image>
                        <h3>{username}</h3>
                        <h6>Joined {dateJoined}</h6>
                        <h6 className="link" onClick={openFriends}>Friends: {friendCount}</h6>
                        <h6 className="link" onClick={openList}>{username}'s List</h6>
                    </Col>
                    <Col xs={6} className="">
                        <div>
                            <div className="header-underline text-centered">
                                <h6 className="inline">Bio</h6>
                                {
                                username == sessionStorage.getItem('username') ? 
                                    <a href="/Bio" className="right-align settings-link">{"edit->"}</a> 
                                    : 
                                    <></>
                                }
                            </div>
                            {bio ? bio : <></>}
                        </div>
                        
                    </Col>
                    <Col className="">
                        <div>
                            <div className="section-header">
                                <span>Favorite Movies</span>
                                {
                                username == sessionStorage.getItem('username') ? 
                                    <a href="/Favorites" className="settings-link">{"edit->"}</a> 
                                    : 
                                    <></>
                                }
                                
                            </div>
                            { favoriteMovies.length > 0 ? 
                                <Table className="inverse-shadow" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        favoriteMovies.map((movie, index) => (
                                            <tr key={movie.data.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <a className="movie-link" href={"/Movie/" + movie.data.id}>{movie.data.title}</a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                </Table>
                                : 
                                <p>Nothing to show yet</p>
                            }
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;