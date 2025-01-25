import {ALL_MOVIES, FAVOURITE_MOVIES} from "../../shared/constants/movies.js";

export function getNewListID(event) {
    const currentListID = event.currentTarget.nextElementSibling.id
    let newListId;

    switch (currentListID) {
        case ALL_MOVIES: {
            newListId = FAVOURITE_MOVIES
            break
        }
        case FAVOURITE_MOVIES: {
            newListId = ALL_MOVIES
            break
        }
        default: {
            return;
        }
    }

    return newListId;
}

export function changeMovieTitles(listID, event) {
    const movieTitle = document.getElementsByClassName('movies-container-title-md')[0];

    switch (listID) {
        case ALL_MOVIES: {
            movieTitle.innerHTML = 'All Movies'
            event.currentTarget.textContent = 'Click me to see Favourite Movies'
            break
        }
        case FAVOURITE_MOVIES: {
            movieTitle.innerHTML = 'Favourite Movies'
            event.currentTarget.textContent = 'Click me to see All Movies'
            break
        }
        default: {
            return
        }
    }
}