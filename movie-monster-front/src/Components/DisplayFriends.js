import CustomNav from "./CustomNav";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import "../Styles/DisplayFriends.css";
import UserService from '../Services/UserService';

const DisplayFriends = () => {
    let { username } = useParams();
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        getFriends();
    }, []);

    const getFriends = () => {
        UserService.getFriendList(username).then(res => {
            setFriendList(res.data.friends);
        });
    }

    return (
        <div>
            <CustomNav/>
            <div className="centered-container">
                <div className="header-underline text-centered padded-header friend-content-size">
                    <Image src={"http://localhost:8080/api/user/icon/" + username} className="profile-pic friend-pic" roundedCircle></Image>
                    <h6 className="display-inline">{username}'s friends ({friendList.length})</h6>
                </div>
                { friendList[0] ? friendList.map((friend, index) => (
                    <div className={index !== friendList.length - 1 ? "display-friend-element friend-padding friend-disp-w" : "display-friend-element friend-padding friend-disp-w"}>
                        <div>
                            <Image src={friend.iconPath} className="profile-pic friend-pic" roundedCircle />
                            <a href={"/Profile/" + friend.username} className="friend-username">{friend.username}</a> 
                        </div>
                    </div>
                )) 
                : 
                    <div>{username} doesn't have any friends yet. Maybe you can be the first!</div>
                }
            </div>
        </div>
    )
}

export default DisplayFriends;