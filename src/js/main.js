import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {createMovieCard, saveToFavourites} from "./movieCard/action.js";
import {changeUI, generateNewListID} from "./btnSwitchLists/actions.js";


// set movies in local storage
setAllMovies()

const switchListsButton = document.getElementsByClassName('movies-container-switch-list')[0]
switchListsButton.addEventListener('click', (event) => {
    // generate new list ID
    const newListID = generateNewListID(event)
    // change ui
    changeUI(newListID, event)
    // create movies container
    const movieContainer = createMovieContainer(newListID)
    // attach container to DOM
    attachContainer(movieContainer, event.target)
})


// create movies container
const movieContainer = createMovieContainer()
// attach container to DOM
attachContainer(movieContainer, switchListsButton)


function createMovieContainer(listID = FAVOURITE_MOVIES) {
    let movies = []

    switch (listID) {
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies()
            break
        }
        case ALL_MOVIES: {
            movies = getAllMovies()
            break
        }
        default: {
            return
        }
    }

    const movieContainer = document.createElement('div')
    movieContainer.id = listID
    movieContainer.className = 'movies-container-cards'

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)
        movieContainer.insertAdjacentHTML(
            'beforeend',
            movieCard
        )
    })

    movieContainer.addEventListener('click', (event) => {
        saveToFavourites(event, listID)
    })

    return movieContainer
}

function attachContainer(container, targetElement) {
    const oldContainers = document.getElementsByClassName('movies-container-cards')

    for (let i = 0; i < oldContainers.length; i++) {
        oldContainers[i].remove()
    }

    targetElement.insertAdjacentElement('afterend', container)
}