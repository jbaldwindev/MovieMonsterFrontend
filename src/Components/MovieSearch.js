import CustomNav from "./CustomNav";
import MovieService from "../Services/MovieService";
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from "./MovieCard";
import LoadingState from "./LoadingState";
import "../Styles/MovieSearch.css";

const MovieSearch = () => {
    let { title } = useParams();
    const [searchPage, setSearchPage ] = useState(1);
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchError, setSearchError] = useState("");
    const currentTitle = useRef(title);

    useEffect(() => {
        let isCurrent = true;
        currentTitle.current = title;
        setSearchPage(1);
        setMovieList([]);
        setTotalPages(0);
        setSearchError("");
        setIsInitialLoading(true);

        MovieService.getAdvancedSearch(title, 1).then((res) => {
            if (!isCurrent) return;
            setTotalPages(res.data.totalPages || 0);
            setMovieList(res.data.movieSearchList || []);
        }).catch((exception) => {
            if (!isCurrent) return;
            console.log(exception);
            setSearchError("Unable to load search results.");
        }).finally(() => {
            if (isCurrent) {
                setIsInitialLoading(false);
            }
        });

        return () => {
            isCurrent = false;
        };
    }, [title]);

    useEffect(() => {
        if (searchPage === 1) {
            return;
        }

        let isCurrent = true;
        setIsLoadingMore(true);
        setSearchError("");

        MovieService.getAdvancedSearch(currentTitle.current, searchPage).then((res) => {
            if (!isCurrent) return;
            setTotalPages(res.data.totalPages || 0);
            if (searchPage === 1) {
                setMovieList(res.data.movieSearchList);
            } else {
                setMovieList(movieList => [...movieList, ...(res.data.movieSearchList || [])]);
            }
        }).catch((exception) => {
            if (!isCurrent) return;
            console.log(exception);
            setSearchError("Unable to load more results.");
        }).finally(() => {
            if (isCurrent) {
                setIsLoadingMore(false);
            }
        });

        return () => {
            isCurrent = false;
        };
    }, [searchPage]);

    const showMore = () => {
        setSearchPage(searchPage => searchPage + 1);
    }

    return (
        <div>
            <CustomNav/>
            {isInitialLoading ? (
                <LoadingState label={`Searching for ${title}...`} />
            ) : (
                <>
                    <div className="section-header mw-90 m-top-10">
                        <span><p className="bold inline">Showing results for:</p> {title}</span>
                    </div>
                    {searchError && <p className="search-status-message">{searchError}</p>}
                    {movieList.length > 0 ? (
                        <div className="card-container">
                            {movieList.map((movie) => (
                                movie.posterPath && <MovieCard key={movie.id} title={movie.title} movieId={movie.id} posterPath={movie.posterPath}/>
                            ))}
                        </div>
                    ) : (
                        <p className="search-status-message">No results found.</p>
                    )}
                    <div className="mw-90 mb-10 centered">
                        {!(searchPage >= totalPages) && (
                            <Button onClick={showMore} disabled={isLoadingMore}>
                                {isLoadingMore ? (
                                    <>
                                        <Spinner animation="border" role="status" size="sm" className="show-more-spinner">
                                            <span className="visually-hidden">Loading more results...</span>
                                        </Spinner>
                                        Loading
                                    </>
                                ) : "Show More"}
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieSearch;
