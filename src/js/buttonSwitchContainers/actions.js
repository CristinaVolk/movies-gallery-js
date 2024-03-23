import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function renderListID (event) {
    const currentListID = event.target.nextElementSibling.id
    let newListID;

    switch (currentListID) {
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES
            break;
        }
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES
            break;
        }
        default: {
            return
        }
    }
    return newListID;
}

export function changeUI(event, newListID) {
    const moviesListTitleElement = event.target.previousElementSibling;

    switch (newListID) {
        case ALL_MOVIES: {
            moviesListTitleElement.innerHTML = 'All movies'
            event.target.textContent = `Click me to see Favourite movies`
            break;
        }
        case FAVOURITE_MOVIES: {
            moviesListTitleElement.innerHTML = 'Favourite movies'
            event.target.textContent = `Click me to see All movies`
            break;
        }
        default: {
            return
        }
    }
}
