import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {createMovieCard, handleSaveToFavourites} from "./movieCard/actions.js";
import {changeUI, getNewListID} from "./btnSwitchLists/actions.js";

const btnSwitchLists = document.querySelector('.movies-container-switch-list');
btnSwitchLists.addEventListener('click', (event) => {
    // get new list id
    const newLIstID = getNewListID(event)
    // change UI
    changeUI(newLIstID, event)
    // create container
    const movieContainer = createMovieContainer(newLIstID);
    // attach container to target element
    attachContainerToTargetElement(movieContainer, event.currentTarget, 'afterend')
})

setAllMovies()
// create container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
// attach container to target element
attachContainerToTargetElement(movieContainer, btnSwitchLists, 'afterend');


function createMovieContainer(listID) {
    let movies = [];
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
            return
        }
    }

    const movieContainerElement = document.createElement('div');
    movieContainerElement.id = listID;
    movieContainerElement.className = 'movies-container-cards';
    if (!movies.length) {
        return movieContainerElement;
    }
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)
        movieContainerElement.insertAdjacentHTML('afterbegin', movieCard);
    })
    movieContainerElement.addEventListener('click', (event)=> {
        handleSaveToFavourites(event, listID);
    })

    return movieContainerElement;
}

function attachContainerToTargetElement(container, targetElement, position) {
    const oldContainers = document.getElementsByClassName(container.className);
    Array.from(oldContainers).forEach(oldContainer => oldContainer.remove());
    targetElement.insertAdjacentElement(position, container);
}
