import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function generateNewListID(event) {
    const currentID = event.target.nextElementSibling.id
    let newListID

    switch (currentID) {
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES
            break
        }
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES
            break
        }
        default: {
            return
        }
    }

    return newListID
}

export function changeUI(listID, event) {
    const listTitleElement = event.target.previousElementSibling

    switch (listID) {
        case FAVOURITE_MOVIES: {
            listTitleElement.textContent = 'Favourite movies'
            event.target.textContent = 'Click me to see All movies'

            break
        }
        case ALL_MOVIES: {
            listTitleElement.textContent = 'All movies'
            event.target.textContent = 'Click me to see Favourite movies'

            break
        }
        default: {
            return
        }
    }
}