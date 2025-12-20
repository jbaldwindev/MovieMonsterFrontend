import api from "../Services/AxiosSetup";

const BASE_URL = process.env.REACT_APP_API_URL + "api/auth/";
class AuthService {
    login(user, pass) {
        return api.post(BASE_URL + "login", {
            username: user,
            password: pass
        });
    }

    register(user, pass) {
        return api.post(BASE_URL + "register",{
            username: user,
            password: pass
        });
    }

    logout() {
        return api.post(BASE_URL + "logout");
    }
    getMe() {
        return api.get(BASE_URL + "me")
    }
}
const authService = new AuthService();
export default authService;