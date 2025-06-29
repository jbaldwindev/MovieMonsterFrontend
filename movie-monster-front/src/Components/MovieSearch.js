import CustomNav from "./CustomNav";
import MovieService from "../Services/MovieService";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";

const MovieSearch = () => {
    let { title } = useParams();
    const [searchPage, setSearchPage ] = useState(1);
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        MovieService.getAdvancedSearch(title, searchPage).then((res) => {
            if (searchPage == 1) {
                setMovieList(res.data.movieSearchList);
            } else {
                setMovieList(movieList => [...movieList, ...res.data.movieSearchList]);
            }
            console.log("Search page is: " + searchPage);
        }).catch((exception) => {
            console.log(exception);
        });
    }, [searchPage]);

    const showMore = () => {
        setSearchPage(searchPage => searchPage + 1);
    }

    return (
        <div>
            <CustomNav/>
            <h1>Searched for: {title}</h1>
            <div>
                {movieList.map((movie) => (
                    <div>{movie.title}</div>
                ))}
            </div>
            <Button onClick={showMore}>Show More</Button>
        </div>
    )
}

export default MovieSearch;