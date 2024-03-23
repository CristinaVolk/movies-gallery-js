import {ALL_MOVIES} from "../constants/movies.js";

export function setAllMovies(moviesArr) {
    localStorage.setItem(ALL_MOVIES, JSON.stringify(moviesArr || []))
}

export function getAllMovies() {
    return JSON.parse(localStorage.getItem(ALL_MOVIES) || '[]')
}

export function getFavouriteMovies() {
    const allMovies = getAllMovies()
    if (!allMovies.length) {
        return
    }
    return allMovies.filter(movie => movie.isFavourite)
}
