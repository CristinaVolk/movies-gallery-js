import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {createMovieCard} from "./movieCard/createMovieCard.js";
import {changeUI, getNewListId} from "./btnSwitchLists/actions.js";
import {saveToFavourites} from "./movieList/actions.js";

const btnSwitchMoviesLists = document.querySelector('.movies-container-switch-list')
btnSwitchMoviesLists.addEventListener('click', (event) => {
    // get new listId
    const newListID = getNewListId(event)
    // change UI
    changeUI(event, newListID)
    // create container
    const movieContainer = createMovieContainer(newListID)
    // attach container
    attachContainerToTargetElement(movieContainer, event.target)
})

setAllMovies()

// create movie container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES)
// attach to DOM
attachContainerToTargetElement(movieContainer, btnSwitchMoviesLists)

function createMovieContainer(listID) {
    let movies = [];

    switch (listID) {
        case ALL_MOVIES: {
            movies = getAllMovies();
            break;
        }
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies()
            break;
        }
        default: {
            return;
        }
    }

    const movieContainer = document.createElement('div');
    movieContainer.className = 'movies-container-cards'
    movieContainer.id = listID

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)
        movieContainer.insertAdjacentHTML('afterbegin', movieCard)
    })

    movieContainer.addEventListener('click', (event) => {
        saveToFavourites(event, listID)
    })

    return movieContainer;
}

function attachContainerToTargetElement(container, targetElement) {
    const oldMovieContainers = document.getElementsByClassName('movies-container-cards')
    Array.from(oldMovieContainers).forEach(oldContainer => oldContainer.remove())
    targetElement.insertAdjacentElement('afterend', container)
}