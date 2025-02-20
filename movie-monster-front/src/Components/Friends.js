import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomNav from './CustomNav';
import UserService from '../Services/UserService';

const Friends = (props) => {
    const [userSearchList, setUserSearchList] = useState([]);
    const [pendingRequestList, setPendingRequestList] = useState([]);
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

    const getPendingRequests = () => {
        UserService.getReceivedRequests(sessionStorage.getItem('username')).then( res => {
            setPendingRequestList(res.data.friendRequestList);
        });
    }

    useEffect(() => {
        getPendingRequests();
    }, []);

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

    //TODO add links to users' profiles
    //TODO list received friend requests
    //TODO list send friend requests
    //TODO remove friend option for if already friends
    //TODO list of friends
    //TODO keeping track of which functions have to refresh which lists after completion
    //might become a hassle, so create one function which calls refreshSearch, getPendingRequests, etc.
    const cancelFriendRequest = (targetUsername) => {
        UserService.cancelRequest(sessionStorage.getItem('username'), targetUsername)
        .then( res => {
            refreshSearch();
        });
    }

    const sendFriendRequest = (targetUsername) => {
        UserService.sendRequest(sessionStorage.getItem('username'), targetUsername)
        .then(res => {
            refreshSearch();
        });
    }

    const respondRequest = (requestId, isAccepted) => {
        UserService.respondRequest(requestId, isAccepted).then( res => {
            getPendingRequests();
            refreshSearch();
        });
    }

    const renderFriendButton = (isFriend, hasPendingRequest, targetUsername, senderUsername, requestId = -1) => {
        if (isFriend) {
          return <Button>Unfriend</Button>;
        } 
      
        if (hasPendingRequest) {
            if (senderUsername != null) {
                if (senderUsername == sessionStorage.getItem('username')) {
                    return <Button onClick={() => cancelFriendRequest(targetUsername)}>Cancel Friend Request</Button>;
                } else {
                    return (<>
                                <Button onClick={() => respondRequest(requestId, true)}>Accept Request</Button> 
                                <Button onClick={() => respondRequest(requestId, false)}>Deny Request</Button>
                            </>);
                }
            }
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
            <div>{user.requestedUsername} {renderFriendButton(user.isFriend, user.requestPending, user.requestedUsername, user.senderUsername)}</div>
            )) 
            : 
            <div></div>
            }
            <h1>Pending requests TODO finish filling this out</h1>
            { pendingRequestList[0] ? pendingRequestList.map((request) => (
                <div>{request.sender} {renderFriendButton(false, true, request.sender, request.sender, request.id)}</div>
            ))
            :
            <div>No requests currently pending</div>
            }
        </div>
        
    );
}
export default Friends;
