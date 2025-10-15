import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/auth/";
class AuthService {
    login(user, pass) {
        return axios.post(BASE_URL + "login", {
            username: user,
            password: pass
        });
    }

    register(user, pass) {
        console.log(BASE_URL);
        return axios.post(BASE_URL + "register",{
            username: user,
            password: pass
        });
    }
}

export default new AuthService();