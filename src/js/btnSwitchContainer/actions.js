import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function getNewID(event) {
    let newId;
    const currentListId = event.target.nextElementSibling.id;

    switch (currentListId) {
        case ALL_MOVIES: {
            newId = FAVOURITE_MOVIES
            break
        }
        case FAVOURITE_MOVIES: {
            newId = ALL_MOVIES
            break
        }
        default: {
            return
        }
    }
    return newId;
}

export function changeUI(event, newListId) {
    const moviesListTitle = event.target.previousElementSibling;

    switch (newListId) {
        case ALL_MOVIES: {
            moviesListTitle.innerHTML = 'All movies'
            event.target.textContent = 'Click me to see favourite movies'
            break
        }
        case FAVOURITE_MOVIES: {
            moviesListTitle.innerHTML = 'Favourite movies'
            event.target.textContent = 'Click me to see all movies'
            break
        }
        default: {
            return
        }

    }
}

