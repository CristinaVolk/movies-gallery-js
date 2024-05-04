import {getALLMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetLocalStorage.js";
import {movies} from "../data/movies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/moviesListID.js";
import {createMovieCard} from "./movieCard/createMovieCard.js";
import {changeUI, getNewListId} from "./movieListActions/btnSwitchLists.js";
import {handleSaveToFavourites} from "./movieListActions/handleSaveToFavourites.js";

const btnSwitchLists = document.getElementsByClassName('movies-container-switch-list')[0]
btnSwitchLists.addEventListener('click', (event) => {
    // getNewListId
    const newListID = getNewListId(event)
    // change UI: btn text, title
    changeUI(event, newListID)
    // buld new container
    const newMovieContainer = createMoviesContainer(newListID)
    // attach container
    attachContainer(newMovieContainer, event.target)
})

// set local storage
setAllMovies(movies)

// create movie container
const moviesContainer = createMoviesContainer(FAVOURITE_MOVIES)
// attach container to DOM
attachContainer(moviesContainer, btnSwitchLists)

function createMoviesContainer(listID) {
    let moviesList;

    switch (listID) {
        case ALL_MOVIES: {
            moviesList = getALLMovies()
            break;
        }
        case FAVOURITE_MOVIES: {
            moviesList = getFavouriteMovies()
            break;
        }
        default: {
            return;
        }
    }

    const movieContainer = document.createElement('div');
    movieContainer.className = 'movies-container-cards'
    movieContainer.id = listID

    moviesList.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieContainer.insertAdjacentHTML('afterbegin', movieCard)
    })

    movieContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID)
    })

    return movieContainer;
}

function attachContainer(container, targetElement) {
    const oldMoviesContainers = document.getElementsByClassName('movies-container-cards')
    if (oldMoviesContainers.length) {
        Array.from(oldMoviesContainers).forEach(container => container.remove())
    }

    targetElement.insertAdjacentElement('afterend', container)
}