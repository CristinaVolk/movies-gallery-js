// set local storage
import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movie.js";
import {createMovieCard, handleSaveToFavourites} from "./movieCard/actions.js";
import {changeUI, getNewListID} from './btnSwitchLists/actions.js'

setAllMovies()

const switchMoviesBtn = document.querySelector('.movies-container-switch-list')
switchMoviesBtn.addEventListener('click', (event) => {
    // get new listID
    const newListID = getNewListID(event)
    // changeUI
    changeUI(event, newListID)
    // create new container
    const movieContainer = createMovieContainer(newListID)
    // attach container to DOM
    attachContainer(movieContainer, 'afterend', event.target)
})

const movieContainer = createMovieContainer()
attachContainer(movieContainer, 'afterend', switchMoviesBtn)

// create movies container
function createMovieContainer(listID = FAVOURITE_MOVIES) {
    let movies

    switch (listID) {
        case FAVOURITE_MOVIES : {
            movies = getFavouriteMovies()
            break;
        }
        case ALL_MOVIES : {
            movies = getAllMovies()
            break;
        }
        default: {
            return
        }
    }

    const container = document.createElement('div')
    container.id = listID
    container.className = 'movies-container-cards'

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)
        container.insertAdjacentHTML('afterbegin', movieCard)
    })

    container.addEventListener('click', (event) => {
        handleSaveToFavourites(listID, event)
    })

    return container
}


// attach container to DOM
function attachContainer(container, position, targetElement) {
    const oldContainers = document.getElementsByClassName('movies-container-cards')
    // for (let i = 0; i < oldContainers.length; i++) {
    //     oldContainers[i].remove()
    // }

    Array.from(oldContainers).forEach(c => {
        c.remove()
    })

    targetElement.insertAdjacentElement(position, container)
}