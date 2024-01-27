import {ALL_MOVIES, FAVOURITE_MOVIES} from "../localStorage/consts.js";

export function renderNewListID(event) {
    const currentListID = event.target.nextElementSibling.id;
    let newListID;

    switch (currentListID) {
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES;
            break;
        }
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES;
            break;
        }
        default: {
            return;
        }
    }

    return newListID;
}
