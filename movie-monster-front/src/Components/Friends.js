import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomNav from './CustomNav';
import UserService from '../Services/UserService';

const Friends = (props) => {
    const [userSearchList, setUserSearchList] = useState([]);
    const [pendingRequestList, setPendingRequestList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [sentRequestsList, setSentRequestsList] = useState([]);
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

    const getSentRequests = () => {
        UserService.getSentRequests(sessionStorage.getItem('username')).then( res => {
            setSentRequestsList(res.data.friendRequestList);
        });
    }

    const getFriendList = () => {
        UserService.getFriendList(sessionStorage.getItem('username')).then(res => {
            setFriendList(res.data.friends);
        });
    }

    useEffect(() => {
        refreshLists();
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

    const cancelFriendRequest = (targetUsername) => {
        UserService.cancelRequest(sessionStorage.getItem('username'), targetUsername)
        .then( res => {
            refreshLists();
        });
    }

    const sendFriendRequest = (targetUsername) => {
        UserService.sendRequest(sessionStorage.getItem('username'), targetUsername)
        .then(res => {
            refreshLists();
        });
    }

    const respondRequest = (requestId, isAccepted) => {
        UserService.respondRequest(requestId, isAccepted).then( res => {
            refreshLists();
        });
    }

    const refreshLists = () => {
        getPendingRequests();
        refreshSearch();
        getFriendList();
        getSentRequests();
    }

    const unfriend = (targetUsername) => {
        UserService.unfriend(targetUsername).then(res => {
            refreshLists();
        });
    }

    const renderFriendButton = (isFriend, hasPendingRequest, targetUsername, senderUsername = "none", requestId = -1) => {
        if (isFriend) {
          return <Button onClick={() => unfriend(targetUsername)}>Unfriend</Button>;
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
            <h1>Pending requests</h1>
            { pendingRequestList[0] ? pendingRequestList.map((request) => (
                <div><a href={"/Profile/" + request.sender}>{request.sender}</a> {renderFriendButton(false, true, request.sender, request.sender, request.id)}</div>
            ))
            :
            <div>No requests currently pending</div>
            }
            <h1>Friends</h1>
            { friendList[0] ? friendList.map((friend) => (
                <div><a href={"/Profile/" + friend}>{friend}</a> {renderFriendButton(true, false, friend)}</div>
            )) 
            : 
            <div>You have no friends. It's okay, you're great, you'll find some soon!</div>
            }
            <h1>Sent friend requests</h1>
            { sentRequestsList[0] ? 
                sentRequestsList.map((request) => (
                    <div><a href={"/Profile/" + request.receiver}>{request.receiver}</a> {renderFriendButton(false, true, request.receiver, sessionStorage.getItem('username'))}</div>
                ))
                : 
                <div>No friend requests have been sent</div>
            }
        </div>
        
    );
}
export default Friends;
