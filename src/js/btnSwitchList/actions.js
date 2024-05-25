import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants.js";

export function getNewListID(event) {
    const currentListId = event.target.nextElementSibling.id
    let newListId

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
            return
        }
    }

    return newListId;
}

export function changeUI(event, newListID) {
    const listTitle = event.target.previousElementSibling

    switch (newListID) {
        case ALL_MOVIES: {
            listTitle.innerHTML = "All Movies"
            event.target.textContent = 'Click me to see Favourite movies'
            break;
        }
        case FAVOURITE_MOVIES: {
            listTitle.innerHTML = "Favourite Movies"
            event.target.textContent = 'Click me to see All movies'
            break;
        }
        default: {
            return
        }
    }

}