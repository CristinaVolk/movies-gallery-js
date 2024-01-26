import {ALL_MOVIES, FAVOURITE_MOVIES} from "../localStorage/consts.js";

export function renderNewListId(event) {
    const currentListId = event.target.nextElementSibling.id;

    let newListId;
    switch (currentListId) {
        case ALL_MOVIES: {
            newListId = FAVOURITE_MOVIES
            break;
        }
        case FAVOURITE_MOVIES: {
            newListId = ALL_MOVIES
            break;
        }
        default: {
            return;
        }
    }

    return newListId;
}

export function changeUI(listId, event) {
    const movieListTitle = event.target.previousElementSibling;

    switch (listId) {
        case FAVOURITE_MOVIES: {
            movieListTitle.innerHTML = 'Favourite Movies';
            event.target.textContent = 'Click me to see All Movies';
            break;
        }
        case ALL_MOVIES: {
            movieListTitle.innerHTML = 'All Movies';
            event.target.textContent = 'Click me to see Favourite Movies';

            break;
        }
        default: {
            return;
        }
    }
}
