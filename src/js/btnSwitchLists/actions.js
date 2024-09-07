import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movie.js";

export function getNewListID(event) {
    const currentListID = event.target.nextElementSibling.id
    let newListID

    if (!currentListID) {
        return
    }

    switch (currentListID) {
        case FAVOURITE_MOVIES : {
            newListID = ALL_MOVIES
            break;
        }
        case ALL_MOVIES : {
            newListID = FAVOURITE_MOVIES
            break;
        }
        default: {
            return;
        }
    }

    return newListID;
}

export function changeUI(event, newListID) {
    const moviesListTitle = event.target.previousElementSibling

    switch (newListID) {
        case FAVOURITE_MOVIES : {
            moviesListTitle.textContent = 'Favourite Movies'
            event.target.textContent = 'Click me to see All movies'

            break;
        }
        case ALL_MOVIES : {
            moviesListTitle.textContent = 'All Movies'
            event.target.textContent = 'Click me to see Favourite movies'

            break;
        }
        default: {
            return;
        }
    }
}