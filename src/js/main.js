// set localStorage
import {movies} from "../data/movies.js";
import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetAllMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {createMoviesCard} from "./moviesList/createMoviesCard.js";
import {changeUI, renderListID} from "./buttonSwitchContainers/actions.js";
import {handleSaveTofavourites} from "./moviesList/handleSaveTofavourites.js";

const buttonSwitchContainers = document.querySelector('.movies-container-switch-list');
buttonSwitchContainers.addEventListener('click', (event) => {
    // render new list id
    const newListID = renderListID(event)
    // change ui
    changeUI(event, newListID)
    // create new container
    const movieContainer = createMovieContainer(newListID)
    // attach new container
    attachContainer(movieContainer, event.target, 'afterend')
})

setAllMovies(movies)

// create movies container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES)
// attach container to target element
attachContainer(movieContainer, buttonSwitchContainers, 'afterend')

function createMovieContainer(listID) {
    let moviesArray;
    switch (listID) {
        case ALL_MOVIES: {
            moviesArray = getAllMovies()
            break;
        }
        case FAVOURITE_MOVIES: {
            moviesArray = getFavouriteMovies()
            break;
        }
        default: {
            return
        }
    }

    const moviesContainer = document.createElement('div')
    moviesContainer.className = 'movies-container-cards';
    moviesContainer.id = listID

    moviesArray.forEach(movie => {
        const movieCard = createMoviesCard(movie);
        moviesContainer.insertAdjacentHTML('afterbegin', movieCard)
    })

    moviesContainer.addEventListener('click', (event) => {
        handleSaveTofavourites(event, listID)
    })

    return moviesContainer;
}

function attachContainer(container, targetElement, position) {
    const oldContainer = document.getElementsByClassName('movies-container-cards')[0]
    if (oldContainer) {
        oldContainer.remove()
    }
    targetElement.insertAdjacentElement(position, container)
}
