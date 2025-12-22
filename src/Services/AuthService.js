import api from "../Services/AxiosSetup";

class AuthService {
  login(user, pass) {
    return api.post("/auth/login", {
      username: user,
      password: pass,
    });
  }

  register(user, pass) {
    return api.post("/auth/register", {
      username: user,
      password: pass,
    });
  }

  logout() {
    return api.post("/auth/logout");
  }

  getMe() {
    return api.get("/auth/me");
  }
}

export default new AuthService();
