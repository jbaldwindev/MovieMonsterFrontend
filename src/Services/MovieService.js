import api from "../Services/AxiosSetup";

class MovieService {

    getPopular(page) {
        return api.get(`/dash/popular/${page}`);
    }

    getTop(page) {
        return api.get(`/dash/top/${page}`);
    }

    getPlaying(page) {
        return api.get(`/dash/playing/${page}`);
    }

    getMovieById(id) {
        return api.get(`/movie/${id}`);
    }

    getSearch(title) {
        return api.get(`/movie/search/${title}`);
    }

    getAdvancedSearch(title, page) {
        return api.get(`/movie/search/${title}/${page}`);
    }

    getList(username, order) {
        return api.get(`/movie/list/${username}&sort=${order}`);
    }

    getRating(username, movieId) {
        return api.get(`/movie/check-rating/${username}/${movieId}`);
    }

    likeComment(username, commentId) {
        return api.post(`/movie/like-comment`, {
            username,
            commentId
        });
    }

    unlikeComment(username, commentId) {
        return api.post(`/movie/unlike-comment`, {
            username,
            commentId
        });
    }

    rateMovie(user, movieTitle, filmId, score) {
        return api.post(`/movie/rate`, {
            username: user,
            movieTitle,
            movieId: filmId,
            movieRating: score
        });
    }

    removeRating(username, ratingId) {
        return api.delete(`/movie/delete-rating/${username}/${ratingId}`);
    }

    getCommentList(filmId, user) {
        return api.get(`/movie/get-comments/${user}&filmId=${filmId}`);
    }

    submitComment(filmId, user, comment) {
        return api.post(`/movie/post-comment`, {
            movieId: filmId,
            username: user,
            comment
        });
    }
}

const movieService = new MovieService();
export default movieService;