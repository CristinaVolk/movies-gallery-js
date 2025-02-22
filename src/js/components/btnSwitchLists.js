import { ALL_MOVIES, FAVOURITE_MOVIES } from "../shared/constants/movies.js";

export function generateNewListId(event) {
    const currentListID = event.target.nextElementSibling.id;
    // const currentListID = document.getElementsByClassName('movies-container-cards')[0]?.id;

    if (!currentListID) {
        return;
    }

    let newListID = '';

    switch (currentListID) {
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES;

            break;
        }
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES;

            break;
        }
        default: {
            return;
        }
    }

    return newListID;
}

export function changeUI(event, listID) {
    const movieListTitle = event.target.previousElementSibling;

    switch (listID) {
        case ALL_MOVIES: {
            movieListTitle.innerHTML = 'All movies'
            event.target.textContent = 'Click me to see Favourite movies'

            break;
        }
        case FAVOURITE_MOVIES: {
            movieListTitle.innerHTML = 'Favourite movies'
            event.target.textContent = 'Click me to see All movies'

            break;
        }
        default: {
            return;
        }
    }
}