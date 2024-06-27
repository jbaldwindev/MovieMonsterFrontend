import axios from "axios";

const BASE_URL = "http://localhost:8080/api/dash/";
class MovieService {

    getPopular(page) {
        return axios.get(BASE_URL + "popular/" + page, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getTop(page) {
        return axios.get(BASE_URL + "top/" + page, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getPlaying(page) {
        return axios.get(BASE_URL + "playing/" + page, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }
}

export default new MovieService();