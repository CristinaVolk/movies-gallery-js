import {ALL_MOVIES, FAVOURITE_MOVIES} from "../localStorage/consts.js";

export function changeUI(newListID, event) {
    const moviesListTitle = event.target.previousElementSibling;

    switch (newListID) {
        case FAVOURITE_MOVIES: {
            moviesListTitle.innerHTML = 'Favourite movies';
            event.target.textContent = 'Click me to see All movies';
            break;
        }
        case ALL_MOVIES: {
            moviesListTitle.innerHTML = 'All movies';
            event.target.textContent = 'Click me to see Favourite movies';
            break;
        }
        default: {
            return;
        }
    }
}
