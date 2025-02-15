import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomNav from './CustomNav';
import UserService from '../Services/UserService';

const Friends = (props) => {
    const [userSearchList, setUserSearchList] = useState([]);
    const searchRef = useRef(null);

    const searchChange = (e) => {
        if (e.target.value) {
            UserService.searchUsers(e.target.value, sessionStorage.getItem('username')).then( res => {
                setUserSearchList(res.data.userConnections);
            });
        } else {
            setUserSearchList([]);
        }
    }

    //TODO finish
    const refreshSearch = () => {
        if (searchRef.current) {
            console.log(searchRef.current.value);
            if (searchRef.current.value) {
                UserService.searchUsers(searchRef.current.value, sessionStorage.getItem('username')).then( res => {
                    setUserSearchList(res.data.userConnections);
                })
            } else {
                setUserSearchList([]);
            }
        }
    }

    //todo cancel friend request
    
    const sendFriendRequest = (targetUsername) => {
        UserService.sendRequest(sessionStorage.getItem('username'), targetUsername).then(res => {
            refreshSearch();
        });
    }

    //TODO there's probably a bug here where when someone is the receiver of a request
    //and searches the name of the sender, the displayed button will show "cancel friend request"
    //instead of "accept friend request"
    const renderFriendButton = (isFriend, hasPendingRequest, targetUsername) => {
        if (isFriend) {
          return <Button>Unfriend</Button>;
        } 
      
        if (hasPendingRequest) {
          return <Button>Cancel Friend Request</Button>;
        }
      
        return <Button onClick={() => sendFriendRequest(targetUsername)}>Add Friend</Button>;
      };

    return (
        <div>
            <CustomNav/>
            <Form.Label htmlFor="searchbar">Search for users</Form.Label>
            <Form.Control
                type="search"
                id="searchbar"
                ref={searchRef}
                onChange={searchChange}
            />
            { userSearchList[0] ? userSearchList.map((user) => (
            <div>{user.requestedUsername} {renderFriendButton(user.isFriend, user.requestPending, user.requestedUsername)}</div>
            )) 
            : 
            <div></div>
            }
        </div>
        
    );
}
export default Friends;
