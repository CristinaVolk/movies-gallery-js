import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants.js";
import {changeUI, getNewListID} from "./btnSwitchList/actions.js";
import {handleSaveToFavourites} from "./moviesContainer/actions.js";
import {createMovieCard} from "./movieCard/actions.js";

const btnSwitchLists = document.getElementsByClassName('movies-container-switch-list')[0]
btnSwitchLists.addEventListener('click', (event) => {
    // get new listID
    const newListID = getNewListID(event)
    // changeUI
    changeUI(event, newListID)
    // create new container
    const newContainer = createMovieContainer(newListID)
    // attach container
    attachContainer(newContainer, event.target)
})
// set local storage
setAllMovies()

// create movies container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES)
// attach container
attachContainer(movieContainer, btnSwitchLists)


function createMovieContainer(listID) {
    let movies;

    switch (listID) {
        case ALL_MOVIES: {
            movies = getAllMovies()
            break;
        }
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies()
            break;
        }
        default: {
            return
        }
    }

    const moviesContainer = document.createElement('div')
    moviesContainer.id = listID
    moviesContainer.className = 'movies-container-cards'

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)

        moviesContainer.insertAdjacentHTML('afterbegin', movieCard)
    })

    moviesContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID)
    })

    return moviesContainer;
}

function attachContainer(container, targetElement) {
    const oldMovieContainers = document.getElementsByClassName('movies-container-cards')
    Array.from(oldMovieContainers).forEach(oldMovie => oldMovie.remove())

    targetElement.insertAdjacentElement('afterend', container)
}