import {ALL_MOVIES, FAVOURITE_MOVIES} from "../../shared/localStorage/consts.js";
import {getAllMovies, getFavouriteMovies} from "../../shared/localStorage/setGetMovies.js";
import {createMovieCard, handleSaveToFavourites} from "../movieCard/actions.js";
import {handleOpenModal} from "../modal/modal.js";

export function createMovieContainer(listID) {
    let movies = [];
    switch (listID) {
        case ALL_MOVIES: {
            movies = getAllMovies();
            break;
        }
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies();
            break;
        }
        default: {
            return;
        }
    }

    const movieContainer = document.createElement('div');
    movieContainer.id = listID;
    movieContainer.className = 'movies-container-cards';

    if (!movies.length) {
        movieContainer.insertAdjacentHTML('afterbegin',
            `<h1>Sorry, your list is empty</h1>`)
    } else {
        movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieContainer.insertAdjacentHTML('afterbegin', movieCard);
            }
        );
    }

    movieContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID);
    })

    movieContainer.addEventListener('click', (event) => {
        handleOpenModal(event);
    })

    return movieContainer;
}

export function attachContainer(container, targetElement, position='afterend') {
    const oldMovieContainer = document.querySelector('.movies-container-cards');
    if (oldMovieContainer) {
        oldMovieContainer.remove()
    }

    targetElement.insertAdjacentElement(
        position,
        container
    )
}
