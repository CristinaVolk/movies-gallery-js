import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {createMovieCard, saveToFavourites} from "./movieCard/actions.js";
import {changeUI, getNewListID} from "./btnSwitchLists/actions.js";

// set local storage
setAllMovies()

const btnSwitchLists = document.getElementsByClassName('movies-container-switch-list')[0];
btnSwitchLists.addEventListener('click', (event) => {
    // get new list ID
    const newListID = getNewListID(event)
    // change UI
    changeUI(event, newListID)
    // create movies container
    const movieContainer = createMovieContainer(newListID);
    // attach container to DOM
    attachContainerToDOM(movieContainer, btnSwitchLists)
})

// create movies container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
// attach container to DOM
attachContainerToDOM(movieContainer, btnSwitchLists)


function createMovieContainer(listID) {
    let moviesArray = [];

    switch (listID) {
        case ALL_MOVIES : {
            moviesArray = getAllMovies()
            break
        }
        case FAVOURITE_MOVIES : {
            moviesArray = getFavouriteMovies()
            break
        }
        default: {
            return
        }
    }

    const movieContainer = document.createElement('div');
    movieContainer.id = listID;
    movieContainer.className = 'movies-container-cards';

    if (!moviesArray.length) {
        return;
    }

    moviesArray.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieContainer.insertAdjacentHTML('afterbegin', movieCard)
    })

    movieContainer.addEventListener('click', (event) => {
        saveToFavourites(event, listID)
    })

    return movieContainer;
}

function attachContainerToDOM(movieContainer, targetElement) {
    const oldContainers = document.getElementsByClassName('movies-container-cards');
    // for (let i = 0; i < oldContainers.length; i++) {
    //     oldContainers[i].remove();
    // }
    Array.from(oldContainers).forEach(oldContainer => oldContainer.remove())

    targetElement.insertAdjacentElement('afterend', movieContainer)
}


