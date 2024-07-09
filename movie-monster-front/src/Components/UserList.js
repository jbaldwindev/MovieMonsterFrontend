import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from 'react';
import MovieService from '../Services/MovieService';
import CustomNav from './CustomNav';

const UserList = (props) => {
    const [ratingList, setRatingList] = useState([]);
    
    useEffect(() => {
        getRatings();
    }, []);

    const getRatings = () => {
        MovieService.getList(sessionStorage.getItem("username")).then((res) => {
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
                            <td>{rating.movieTitle}</td>
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