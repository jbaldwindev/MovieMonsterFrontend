import CustomNav from "./CustomNav";
import MovieService from "../Services/MovieService";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import MovieCard from "./MovieCard";
import "../Styles/MovieSearch.css";

const MovieSearch = () => {
    let { title } = useParams();
    const [searchPage, setSearchPage ] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setSearchPage(1);
        setMovieList([]);
    }, [title]);

    useEffect(() => {
        MovieService.getAdvancedSearch(title, searchPage).then((res) => {
            setTotalPages(res.data.totalPages);
            if (searchPage == 1) {
                setMovieList(res.data.movieSearchList);
            } else {
                setMovieList(movieList => [...movieList, ...res.data.movieSearchList]);
            }
        }).catch((exception) => {
            console.log(exception);
        });
    }, [searchPage, title]);

    const showMore = () => {
        setSearchPage(searchPage => searchPage + 1);
    }

    return (
        <div>
            <CustomNav/>
            <div className="section-header mw-90 m-top-10">
                <span><p className="bold inline">Showing results for:</p> {title}</span>
            </div>
            <div className="card-container">
                {movieList.map((movie) => (
                    movie.posterPath && <MovieCard key={movie.id} title={movie.title} movieId={movie.id} posterPath={movie.posterPath}/>
                ))}
            </div>
            <div className="mw-90 mb-10 centered">
                {!(searchPage >= totalPages) && <Button onClick={showMore}>Show More</Button>}
            </div>
        </div>
    )
}

export default MovieSearch;