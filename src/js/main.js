import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetStorage.js";
import {changeUI, getNewID} from "./btnSwitchContainer/actions.js";
import {saveToFavourites} from "./heartIconButton/actions.js";

setAllMovies()

const btnSwitchContainers = document.querySelector('.movies-container-switch-list');
btnSwitchContainers.addEventListener('click', (event) => {
    const newListID = getNewID(event);
    changeUI(event, newListID);
    const newMovieContainer = createMovieContainer(newListID);
    attachContainerToDOMElement(newMovieContainer, event.target);
})

const movieContainer = createMovieContainer()
attachContainerToDOMElement(movieContainer, btnSwitchContainers)

function createMovieContainer(listID = FAVOURITE_MOVIES) {
    let movies = [];
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

    const movieContainerEl = document.createElement('div');
    movieContainerEl.className = 'movies-container-cards'
    movieContainerEl.id = listID

    movies.forEach(m => {
        const {id, releaseName, description, imageUrl, movieName, isFavourite } = m
        const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

        const movieCard =  `
            <div data-movie-id="${id}" class="movie-card">
                <img src="${imageUrl}" alt="${movieName}" />
                <strong>${releaseName}</strong>
                <p>${description}</p>
                <button class="movie-card-btn-icon">
                    <img src="assets/icons/${heartIcon}" alt="saveToFavouriteIcon" />
                </button>
            </div>
        `;

        movieContainerEl.insertAdjacentHTML('afterbegin', movieCard)

        movieContainerEl.addEventListener('click', (event) => {
            saveToFavourites(event, listID)
        })
    })

    return movieContainerEl;
}

function attachContainerToDOMElement(container, targetElement){
    const oldContainers = document.querySelectorAll('.movies-container-cards')
    Array.from(oldContainers).forEach(oldContainer => oldContainer.remove())
    targetElement.insertAdjacentElement('afterend', container)
}