import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth/";
class AuthService {
    login(user, pass) {
        return axios.post(BASE_URL + "login", {
            username: user,
            password: pass
        });
    }

    register(user, pass) {
        return axios.post(BASE_URL + "register",{
            username: user,
            password: pass
        });
    }
}

export default new AuthService();