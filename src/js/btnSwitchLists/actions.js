import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function getNewListId(event) {
    const currentListId = event.target.nextElementSibling.id
    let newListID;

    switch (currentListId) {
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES;
            break;
        }
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES;
            break
        }
        default : {
            return
        }
    }

    return newListID;
}

export function changeUI(event, newListID) {
    const movieListsTitle = event.target.previousElementSibling

    switch (newListID) {
        case ALL_MOVIES: {
            movieListsTitle.innerHTML = 'All Movies'
            event.target.textContent = 'Click me to see Favourite Movies'
            break;
        }
        case FAVOURITE_MOVIES: {
            movieListsTitle.innerHTML = 'Favourite Movies'
            event.target.textContent = 'Click me to see All Movies'
            break
        }
        default: {
            return
        }
    }
}