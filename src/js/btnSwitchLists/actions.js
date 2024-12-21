import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function getNewListID(event) {
    let newListID;
    const currentListID = event.target.nextElementSibling.id;
    if (!currentListID) {
        return;
    }

    switch (currentListID) {
        case ALL_MOVIES : {
            newListID = FAVOURITE_MOVIES
            break
        }
        case FAVOURITE_MOVIES : {
            newListID = ALL_MOVIES
            break
        }
        default: {
            return
        }
    }

    return newListID;
}

export function changeUI(event, newListID) {
    const movieListTitle = event.target.previousElementSibling;

    switch (newListID) {
        case ALL_MOVIES : {
            movieListTitle.innerHTML = 'All Movies'
            event.target.textContent = 'Click me to see Favourite movies'
            break
        }
        case FAVOURITE_MOVIES : {
            movieListTitle.innerHTML = 'Favourite Movies'
            event.target.textContent = 'Click me to see All movies'
            break
        }
        default: {
            return
        }
    }
}