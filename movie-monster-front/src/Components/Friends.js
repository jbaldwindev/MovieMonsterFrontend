import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import CustomNav from './CustomNav';
import UserService from '../Services/UserService';

const Friends = (props) => {
    const [userSearchList, setUserSearchList] = useState([]);

    const searchChange = (e) => {
        if (e.target.value) {
            UserService.searchUsers(e.target.value).then( res => {
                setUserSearchList(res.data.usernames);
            });
        } else {
            setUserSearchList([]);
        }
    }

    return (
        <div>
            <CustomNav/>
            <Form.Label htmlFor="searchbar">Search for users</Form.Label>
            <Form.Control
                type="search"
                id="searchbar"
                onChange={searchChange}
            />
            { userSearchList[0] ? userSearchList.map((username) => (
            <div>{username}</div>
            )) 
            : 
            <div></div>
            }
        </div>
        
    );
}
export default Friends;
