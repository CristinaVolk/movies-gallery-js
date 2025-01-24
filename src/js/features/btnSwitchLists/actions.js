import { ALL_MOVIES, FAVOURITE_MOVIES } from "../../shared/constants/movies";

export function createNewListID(event) {
    const currentListID = event.currentTarget.nextElementSibling;
    let newListID;

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

export function changeUI(event, newListID) {
    const title = event.currentTarget.previousElementSibling;


    switch (currentListID) {
        case ALL_MOVIES: {
            title.innerHTML = ''
            event.currentTarget.textContent = 'Click me to see Fav movies'

            break;
        }
        case FAVOURITE_MOVIES: {
             title.innerHTML = ''
            event.currentTarget.textContent = 'Click me to see All movies'

            break;
        }
        default: {
            return;
        }
    }

}