import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user";
class UserService { 
    searchUsers(searchTerm) {
        return axios.get(BASE_URL + "/search-users/" + searchTerm, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }
}
export default new UserService();