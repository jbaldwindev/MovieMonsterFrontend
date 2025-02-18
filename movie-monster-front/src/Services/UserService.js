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