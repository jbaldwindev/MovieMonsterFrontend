import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomNav from "./CustomNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/col";
import Image from "react-bootstrap/Image";
import UserService from '../Services/UserService';
import MovieService from '../Services/MovieService';
import Table from "react-bootstrap/Table";
import '../Styles/Profile.css';

const Profile = (props) => {
    let { username } = useParams();
    const [iconUrl, setIconUrl] = useState();
    const [dateJoined, setDateJoined] = useState();
    const [friendCount, setFriendCount] = useState(0);
    const [favoriteIds, setFavoriteIds] = useState();
    const [favoriteMovies, setFavoriteMovies] = useState([]);

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

    return (
        <div>
            <CustomNav></CustomNav>
            <Container>
                <Row>
                    <Col className="text-center">
                        <Image className="icon-image" src={iconUrl} roundedCircle></Image>
                        <h3>{username}</h3>
                        <h6>Joined {dateJoined}</h6>
                        <h6 className="link">Friends: {friendCount}</h6>
                    </Col>
                    <Col xs={6} className="">
                        <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus auctor neque id molestie. Integer convallis urna bibendum turpis malesuada facilisis. Maecenas sit amet risus blandit, condimentum augue vitae, efficitur quam. Nunc vulputate ipsum a arcu tincidunt, in efficitur elit pharetra. Nulla facilisi. Maecenas blandit libero a ex maximus auctor. Fusce elementum dui eu volutpat elementum. Praesent egestas, justo quis ullamcorper malesuada, tortor dolor condimentum ipsum, vitae semper ante orci at lacus. Sed sed dolor non diam porttitor aliquet vitae sit amet ante. Nulla faucibus suscipit diam, gravida rutrum lorem dignissim in. Vivamus et nibh at odio porta tristique. Ut elit elit, pharetra vitae lorem tristique, pharetra feugiat lorem. Proin mollis libero a enim accumsan dictum. Pellentesque pellentesque massa nisl, non efficitur est sagittis ut. Integer id volutpat tortor. Aliquam imperdiet eu lectus ut condimentum.

Nunc condimentum gravida mi at interdum. Donec placerat suscipit leo, at cursus nisi elementum sit amet. Mauris ac libero et ipsum facilisis lacinia. Proin consectetur posuere elit. Phasellus neque velit, ultricies dapibus neque quis, semper pharetra lorem. Phasellus nec arcu consequat, posuere orci in, tempor turpis. Aenean at nisi ac erat luctus ullamcorper. Nunc sed felis elementum, vulputate libero eget, elementum metus. Nullam placerat euismod ligula molestie consequat. Praesent sit amet mi in ex facilisis auctor. Mauris non urna feugiat, facilisis purus sed, mollis justo. Vestibulum quis ex ac erat lobortis porta sed at eros. In hac habitasse platea dictumst.
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
                                            <tr>
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