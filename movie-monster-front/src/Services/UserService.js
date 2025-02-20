import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user";
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
}
export default new UserService();