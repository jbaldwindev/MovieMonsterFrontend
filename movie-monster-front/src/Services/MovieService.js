import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
class MovieService {

    getPopular(page) {
        return axios.get(BASE_URL + "dash/popular/" + page, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getTop(page) {
        return axios.get(BASE_URL + "dash/top/" + page, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getPlaying(page) {
        return axios.get(BASE_URL + "dash/playing/" + page, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getMovieById(id) {
        return axios.get(BASE_URL + "movie/" + id, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getSearch(title) {
        return axios.get(BASE_URL + "movie/search/" + title, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getList(username, order) {
        return axios.get(BASE_URL + "movie/list/" + username + "&sort=" + order, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    getRating(username, movieId) {
        return axios.get(BASE_URL + "movie/check-rating/" + username + "/" + movieId, {
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            }
        });
    }

    rateMovie(user, movieTitle, filmId, score) {
        return axios({
            method: 'post',
            url: BASE_URL + "movie/rate",
            headers: {
                Authorization: sessionStorage.getItem("authToken")
            },
            data: {
                username: user,
                movieTitle: movieTitle,
                movieId: filmId,
                movieRating: score
            }
        });
    }
}

export default new MovieService();