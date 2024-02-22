import {ALL_MOVIES, FAVOURITE_MOVIES} from "../consts/movies.js";

export function getNewListId(event) {
    const currentListID = event.target.nextElementSibling.id;
    if (!currentListID) {
        return;
    }
    let newListID;

    switch (currentListID) {
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES;
            break;
        }
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES;
            break;
        }
        default: {
            return;
        }
    }

    return newListID;
}

export function changeUI(event, newListId) {
    const moviesListTitleElement = event.target.previousElementSibling;

    switch (newListId) {
        case FAVOURITE_MOVIES: {
            moviesListTitleElement.innerHTML = 'Favourite Movies'
            event.target.textContent = 'Click me to see All movies'

            break;
        }
        case ALL_MOVIES: {
            moviesListTitleElement.innerHTML = 'All Movies'
            event.target.textContent = 'Click me to see Favourite movies'

            break;
        }
        default: {
            return;
        }
    }
}

