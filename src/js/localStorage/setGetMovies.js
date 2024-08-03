import {movies} from "../../data/movies.js";
import {ALL_MOVIES} from "../consts/movies.js";

export function setAllMovies(moviesArr = movies) {
    localStorage.setItem(ALL_MOVIES, JSON.stringify(moviesArr || []))
}

export function getAllMovies() {
    return JSON.parse(localStorage.getItem(ALL_MOVIES) || '[]')
}

export function getFavouriteMovies() {
    const allMovies = getAllMovies()
    return allMovies.length
        ? allMovies.filter(movie => movie.isFavourite)
        : []
}