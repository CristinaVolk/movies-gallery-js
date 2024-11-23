import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function getNewListID(event) {
    const currentListID = event.currentTarget.nextElementSibling.id;
    let newListID = '';

    switch (currentListID) {
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES
            break
        }
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES
            break
        }
        default: {
            return;
        }
    }
    return newListID;
}

export function changeUI(newListID, event) {
    const movieListTitle = event.currentTarget.previousElementSibling;

    switch (newListID) {
        case ALL_MOVIES: {
            movieListTitle.innerHTML = 'All Movies';
            event.currentTarget.textContent = 'Click me to see Favourite movies'
            break
        }
        case FAVOURITE_MOVIES: {
            movieListTitle.innerHTML = 'Favourite Movies';
            event.currentTarget.textContent = 'Click me to see All movies'
            break
        }
        default: {
            return;
        }
    }
}