import {ALL_MOVIES, FAVOURITE_MOVIES} from "../consts/movies.js";

export function getNewListID(event) {
    const currentListID = event.target.nextElementSibling.id
    let newListID = ''

    switch (currentListID) {
        case ALL_MOVIES : {
            newListID = FAVOURITE_MOVIES
            break;
        }
        case FAVOURITE_MOVIES : {
            newListID = ALL_MOVIES
            break;
        }

        default : {
            return
        }
    }

    return newListID
}

export function changeUI(event, newListID) {
    const moviesTitle = document.querySelector('.movies-container-title-md')

    switch (newListID) {
        case ALL_MOVIES : {
            moviesTitle.innerHTML = 'All Movies'
            event.target.textContent = "Click me to see Favourite movies"
            break;
        }
        case FAVOURITE_MOVIES : {
            moviesTitle.innerHTML = 'Favourite Movies'
            event.target.textContent = "Click me to see All movies"
            break;
        }

        default : {
            return
        }
    }

}