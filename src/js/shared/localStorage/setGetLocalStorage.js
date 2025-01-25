import { movies } from '../../../data/movies.js'
import {ALL_MOVIES} from "../constants/movies.js";

export function setAllMovies(moviesArray = movies) {
    localStorage.setItem(ALL_MOVIES, JSON.stringify(moviesArray));
}

export function getAllMovies() {
    return JSON.parse(localStorage.getItem(ALL_MOVIES) ?? '[]');
}

export function getFavouriteMovies() {
    const allMovies = getAllMovies();

    return allMovies.length ? allMovies.filter(movie => movie.isFavourite) : [];
}