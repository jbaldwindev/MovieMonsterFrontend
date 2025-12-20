import api from "../Services/AxiosSetup";

class UserService { 
    searchUsers(searchTerm, username) {
        return api.get("/user/" + username +  "/search-users/" + searchTerm);
    }

    sendRequest(sender, receiver) {
        return api.post("/user/send-request", {
            senderUsername: sender,
            receiverUsername: receiver
        });
    }

    respondRequest(requestId, isAccepted) {
        return api.post("/user/request-response", {
            requestId: requestId,
            isAccepted: isAccepted
        });
    }

    getFriendList(username) {
        return api.get("/user/get-friends/" + username);
    }

    getReceivedRequests(username) {
        return api.get("/user/received-requests/" + username);
    }

    cancelRequest(sender, receiver) {
        return api.delete("/user/" + sender + "/requests/" + receiver);
    }

    unfriend(username, targetUsername) {
        return api.delete("/user/" + username + "/friends/" + targetUsername);
    }

    getSentRequests(username) {
        return api.get("/user/sent-requests/" + username);
    }

    getProfileInfo(username) {
        return api.get("/user/profile/" + username);
    }

    getIcon(username) {
        return api.get("/user/icon/" + username);
    }

    uploadImage(imageFormData, username) {
        return api.post("/user/upload-icon/" + username, imageFormData);
    }

    getFavorites(username) {
        return api.get("/user/" + username + "/favorites/all")
    }

    rankFavorite(username, movieId, direction) {
        return api.post("/user/favorites/rank", {
            username: username,
            movieId: movieId,
            rankingDirection: direction
        });
    }

    removeFavorite(username, movieId) {
        return api.delete("/user/" + username + "/favorites/remove?movieId=" + movieId)
    }

    addFavorite(username, movieId) {
        return api.post("/user/" + username + "/favorites/add?movieId=" + movieId)
    }

    getBio(username) {
        return api.get("/user/" + username + "/bio");
    }

    setBio(username, bio) {
        return api.post("/user/bio", {
            username: username,
            bio: bio
        });
    }

    isUsernameTaken(username) {
        return api.get("/user/auth/user-exists/" + username);
    }
}
const userService = new UserService();
export default userService;