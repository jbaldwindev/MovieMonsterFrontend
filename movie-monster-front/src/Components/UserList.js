import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from 'react';
import MovieService from '../Services/MovieService';
import CustomNav from './CustomNav';
import '../Styles/UserList.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../Context/AuthContext';
import Button from 'react-bootstrap/Button';

const UserList = (props) => {
    let { accountName } = useParams();
    const [ratingList, setRatingList] = useState([]);
    const [order, setOrder] = useState("desc");
    const { user } = useAuth();

    useEffect(() => {
        getRatings();
    }, [order])

    const getRatings = () => {
        let username = "";
        console.log(order);
        if (accountName) {
            username = accountName;
        } else {
            username = user;
        }
        MovieService.getList(username, order).then((res) => {
            setRatingList(res.data);
        });
    }

    const deleteEntry = (ratingId) => {
        MovieService.removeRating(user, ratingId).then((res) => {
            getRatings();
        });
    }

    const sortChange = () => {
        if (order == "desc") {
            setOrder("asc");
        } else if (order == "asc") {
            setOrder("desc");
        }
    }

    return (
        <div>
            <CustomNav/>
            <div className="list-container">
                <div className="list">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                {order == "desc" ? 
                                <th><div className="click-text" onClick={sortChange}>Rating <FontAwesomeIcon icon="fa-angle-down"/></div></th> 
                                : 
                                <th><div className="click-text" onClick={sortChange}>Rating <FontAwesomeIcon icon="fa-angle-up"/></div></th>
                                }
                                
                                <th></th>
                                
                            </tr>
                        </thead>
                            <tbody>
                            {ratingList.map((rating, index) => (
                                <tr key={rating}>
                                    <td>{index+1}</td>
                                    <td><a href={"/Movie/" + rating.movieId}>{rating.movieTitle}</a></td>
                                    <td>{rating.movieRating}</td>
                                    
                                    <td className="text-centered control-col"><div className="delete-button" onClick={() => deleteEntry(rating.ratingId)}><FontAwesomeIcon className="resized-button" icon="fa-solid fa-trash-can"/></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default UserList;