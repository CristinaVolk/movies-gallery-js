import {ALL_MOVIES} from "../constants/moviesListID.js";

export function setAllMovies(moviesArray) {
    localStorage.setItem(ALL_MOVIES, JSON.stringify(moviesArray || []))
}

export function getALLMovies() {
    return JSON.parse(localStorage.getItem(ALL_MOVIES) || '[]')
}

export function getFavouriteMovies() {
    const allMovies = getALLMovies();
    if (allMovies.length) {
        return allMovies.filter(movie => movie.isFavourite)
    } else {
        return []
    }
}



