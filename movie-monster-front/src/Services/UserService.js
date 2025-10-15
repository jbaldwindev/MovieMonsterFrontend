import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/user";
class UserService { 
    searchUsers(searchTerm, username) {
        return axios.get(BASE_URL + "/" + username +  "/search-users/" + searchTerm, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    sendRequest(sender, receiver) {
        return axios({
            method: 'post',
            url: BASE_URL + "/send-request",
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            },
            data: {
                senderUsername: sender,
                receiverUsername: receiver
            }
        });
    }

    respondRequest(requestId, isAccepted) {
        return axios({
            method: 'post',
            url: BASE_URL + "/request-response",
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            },
            data: {
                requestId: requestId,
                isAccepted: isAccepted
            }
        });
    }

    getFriendList(username) {
        return axios({
            method: 'get',
            url: BASE_URL + "/get-friends/" + username,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getReceivedRequests(username) {
        return axios({
            method: 'get',
            url: BASE_URL + "/received-requests/" + username,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    cancelRequest(sender, receiver) {
        return axios({
            method: 'delete',
            url: BASE_URL + "/" + sender + "/requests/" + receiver,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    unfriend(targetUsername) {
        return axios({
            method: 'delete',
            url: BASE_URL + "/" + sessionStorage.getItem('username') + "/friends/" + targetUsername,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getSentRequests(username) {
        return axios({
            method: 'get',
            url: BASE_URL + "/sent-requests/" + username,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        })
    }

    getProfileInfo(username) {
        return axios({
            method: 'get',
            url: BASE_URL + "/profile/" + username,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        })
    }

    getIcon(username) {
        return axios({
            method: 'get',
            url: BASE_URL + "/icon/" + username,
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            },
            responseType: "blob"
        })
    }

    uploadImage(imageFormData, username) {
        return axios({
            method: 'post',
            url: BASE_URL + "/upload-icon/" + username,
            headers: {
                Authorization: sessionStorage.getItem("authToken"),
                "Content-Type": "multipart/form-data"
            },
            data: imageFormData
        })
    }

    getFavorites(username) {
        return axios({
            method: 'get',
            url: BASE_URL + '/' + username + '/favorites/all',
            headers: {
                Authorization: sessionStorage.getItem('authToken')
            }
        })
    }

    rankFavorite(movieId, direction) {
        return axios({
            method: 'post',
            url: BASE_URL + "/favorites/rank",
            headers: {
                Authorization: sessionStorage.getItem('authToken')
            },
            data: {
                username: sessionStorage.getItem('username'),
                movieId: movieId,
                rankingDirection: direction
            }
        })
    }

    removeFavorite(movieId) {
        return axios({
            method: "delete",
            url: BASE_URL 
                + "/" 
                + sessionStorage.getItem('username') 
                + "/favorites/remove?movieId=" + movieId,
            headers: {
                Authorization: sessionStorage.getItem('authToken')
            }
        })
    }

    addFavorite(movieId) {
        return axios({
            method: 'post',
            url: BASE_URL 
                + "/" 
                + sessionStorage.getItem('username') 
                + "/favorites/add?movieId=" 
                + movieId,
            headers: {
                Authorization: sessionStorage.getItem('authToken')
            }
        })
    }

    getBio(username) {
        return axios({
            method: 'get',
            url: BASE_URL + "/" + username + "/bio",
            headers: {
                Authorization: sessionStorage.getItem('authToken')
            }
        })
    }

    setBio(username, bio) {
        return axios({
                method: 'post',
                url: BASE_URL + '/bio',
                headers: {
                    Authorization: sessionStorage.getItem('authToken')
                },
                data: {
                    username: username,
                    bio: bio
                }
            }
        );
    }

    isUsernameTaken(username) {
        return axios({
                method: 'get',
                url: BASE_URL + '/auth/user-exists/' + username,
                headers: {
                    Authorization: sessionStorage.getItem('authToken')
                }
            }
        );
    }
}

export default new UserService();