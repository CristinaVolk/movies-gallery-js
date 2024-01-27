import {movies} from "../../data/movies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./consts.js";

export function setAllMovies(moviesArray = movies) {
    localStorage.setItem(ALL_MOVIES, JSON.stringify(moviesArray || []));
}

export function getAllMovies() {
    return JSON.parse(localStorage.getItem(ALL_MOVIES) ||'[]');
}

export function setFavouriteMovies() {
    const allMovies = getAllMovies();
    if (allMovies.length) {
        const filteredMovies = allMovies.filter(movie => movie.isFavourite);
        localStorage.setItem(FAVOURITE_MOVIES, JSON.stringify(filteredMovies || []))
    }
}

export function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem(FAVOURITE_MOVIES) ||'[]');
}



