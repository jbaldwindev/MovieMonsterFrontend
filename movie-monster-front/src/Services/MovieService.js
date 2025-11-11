import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "api/";
class MovieService {

    getPopular(page) {
        console.log(sessionStorage.getItem("authToken"));
        return axios.get(BASE_URL + "dash/popular/" + page, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getTop(page) {
        return axios.get(BASE_URL + "dash/top/" + page, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getPlaying(page) {
        return axios.get(BASE_URL + "dash/playing/" + page, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getMovieById(id) {
        return axios.get(BASE_URL + "movie/" + id, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getSearch(title) {
        return axios.get(BASE_URL + "movie/search/" + title, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getAdvancedSearch(title, page) {
        return axios.get(BASE_URL + "movie/search/" + title + "/" + page, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getList(username, order) {
        return axios.get(BASE_URL + "movie/list/" + username + "&sort=" + order, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getRating(username, movieId) {
        return axios.get(BASE_URL + "movie/check-rating/" + username + "/" + movieId, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    likeComment(username, commentId) {
        return axios({
            method: 'post',
            url: BASE_URL + "movie/like-comment",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            },
            data: {
                username: username,
                commentId: commentId
            }
        });
    }

    unlikeComment(username, commentId) {
        return axios({
            method: "post",
            url: BASE_URL + "movie/unlike-comment",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            },
            data: {
                username: username,
                commentId: commentId
            }
        })
    }

    rateMovie(user, movieTitle, filmId, score) {
        return axios({
            method: 'post',
            url: BASE_URL + "movie/rate",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            },
            data: {
                username: user,
                movieTitle: movieTitle,
                movieId: filmId,
                movieRating: score
            }
        });
    }

    removeRating(username, ratingId) {
        return axios({
            method: 'delete',
            url: BASE_URL + "movie/delete-rating/" + username + "/" + ratingId,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    getCommentList(filmId, user) {
        return axios.get(BASE_URL + "movie/get-comments/" + user + "&filmId=" + filmId, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
    }

    submitComment(filmId, user, comment) {
        return axios({
            method: 'post',
            url: BASE_URL + "movie/post-comment",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            },
            data: {
                movieId: filmId,
                username: user,
                comment: comment
            }
        });
    }
}
const movieService = new MovieService();
export default movieService;