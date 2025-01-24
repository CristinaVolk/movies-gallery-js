import {ALL_MOVIES} from '../constants/movies.js';
import {movies} from '../../../data/movies.js';


export function setAllMovies(moviesArray = movies) {
    localStorage.setAllMovies(ALL_MOVIES, JSON.stringify(moviesArray || []));
}

export function getAllMovies() {
    return JSON.parse(localStorage.getAllMovies(ALL_MOVIES));
}

export function getFavouriteMovies() {
    const allMovies = getAllMovies();
    return allMovies.length ? allMovies.filter(m => m.isFavourite) : null;
}