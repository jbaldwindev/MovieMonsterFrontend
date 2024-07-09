import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from 'react';
import MovieService from '../Services/MovieService';
import CustomNav from './CustomNav';
import { useParams } from 'react-router-dom';

const UserList = (props) => {
    let { accountName } = useParams();
    const [ratingList, setRatingList] = useState([]);
    
    useEffect(() => {
        getRatings();
    }, []);

    const getRatings = () => {
        let user = "";
        console.log(accountName);
        if (accountName) {
            user = accountName;
        } else {
            user = sessionStorage.getItem("username");
        }
        MovieService.getList(user).then((res) => {
            setRatingList(res.data);
        });
    }

    return (
        <div>
            <CustomNav/>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Status</th>
                    </tr>
                </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    {ratingList.map((rating) => (
                        <tr>
                            <td>1</td>
                            <td><a href={"/Movie/" + rating.movieId}>{rating.movieTitle}</a></td>
                            <td>{rating.movieRating}</td>
                            <td>Watched</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserList;