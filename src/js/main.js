import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./consts/movies.js";
import {createMovieCard, handleSaveToFavourites} from "./movieCard/actions.js";
import {changeUI, getNewListID} from "./btnSwitchLists/actions.js"

setAllMovies()

const btnSwitchLists = document.getElementsByClassName('movies-container-switch-list')[0]
btnSwitchLists.addEventListener('click', (event) => {
    // create new list ID
    const newListID = getNewListID(event)
    // change UI
    changeUI(event, newListID)
    // create container
    const moviesContainer = createMoviesContainer(newListID)
    // attach container
    attachContainerToDOM(moviesContainer, event.target)
})

// create container
const moviesContainer = createMoviesContainer(FAVOURITE_MOVIES)
// attach container to DOM
attachContainerToDOM(moviesContainer, btnSwitchLists)


function createMoviesContainer(listID) {
    let movies;

    switch (listID) {
        case ALL_MOVIES : {
            movies = getAllMovies()
            break;
        }
        case FAVOURITE_MOVIES : {
            movies = getFavouriteMovies()
            break;
        }

        default : {
            return
        }
    }

    const container = document.createElement('div')
    container.id = listID
    container.className = "movies-container-cards"

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)
        container.insertAdjacentHTML('afterbegin', movieCard)
    })

    container.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID)
    })

    return container
}

function attachContainerToDOM(container, targetElement){
    const oldContainers = document.getElementsByClassName("movies-container-cards")
    Array.from(oldContainers)
        .forEach(oldContainer => oldContainer.remove())

    targetElement.insertAdjacentElement("afterend", container)
}