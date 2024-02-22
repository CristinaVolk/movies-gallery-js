import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./consts/movies.js";
import {changeUI, getNewListId} from "./btnSwitchLists/actions.js";
import {createMovieCard} from "./movieCard/createMovieCard.js";
import {handleSaveToFavourites} from "./movieCard/handleSaveToFavourites.js";

const btnSwitchLists = document.querySelector('.movies-container-switch-list');
btnSwitchLists.addEventListener('click', (event) => {
    const newListId = getNewListId(event);
    changeUI(event, newListId);
    const movieContainer = createMovieContainer(newListId);
    attachContainer(movieContainer, event.target, 'afterend')
})

setAllMovies();

// create container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
// attach container to DOM
attachContainer(movieContainer, btnSwitchLists, 'afterend')


function createMovieContainer(listID) {
    let movies;
    switch (listID) {
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies();
            break;
        }
        case ALL_MOVIES: {
            movies = getAllMovies();
            break;
        }
        default: {
            return;
        }
    }

    const moviesListContainer = document.createElement('div');
    moviesListContainer.id = listID;
    moviesListContainer.className = 'movies-container-cards';

    movies.forEach((movie => {
        const movieCard = createMovieCard(movie)
        moviesListContainer.insertAdjacentHTML('afterbegin', movieCard);
    }));

    moviesListContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID);
    })

    return moviesListContainer;
}


function attachContainer(container, targetElement, position) {
    const oldContainer = document.querySelector('.movies-container-cards');
    if (oldContainer) {
        oldContainer.remove();
    }

    targetElement.insertAdjacentElement(position, container);
}
