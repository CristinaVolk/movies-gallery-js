import {getAllMovies, getFavouriteMovies, setAllMovies, setFavouriteMovies} from "./localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./localStorage/consts.js";
import {createMovieCard} from "./movieCard/createMovieCard.js";
import {changeUI, renderNewListId} from "./btnSwitchLists/actions.js";
import {ModalMovieCard} from "./modal/ModalMovieCard/ModalMovieCard.js";

const btnSwitchLists = document.querySelector('.movies-container-switch-list');
btnSwitchLists.addEventListener('click', (event) => {
    // render new listId
    const newListId = renderNewListId(event);
    changeUI(newListId, event);
    //create new container
    const newMovieContainer = createMovieContainer(newListId);
    attachContainer(newMovieContainer, event.target)
});

// set localStorage
setAllMovies();
setFavouriteMovies();

// create movieContainer
const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
// attach container to btn
attachContainer(movieContainer, btnSwitchLists);

function createMovieContainer(listID) {
    let movies = [];
    switch (listID) {
        case ALL_MOVIES: {
            movies = getAllMovies();
            break;
        }
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies();
            break;
        }
        default: {
            return;
        }
    }

    const movieContainer = document.createElement('div');
    movieContainer.id = listID;
    movieContainer.className = 'movies-container-cards';

    if (!movies.length) {
        movieContainer.insertAdjacentHTML('afterbegin',
            `<h1>Sorry, your list is empty</h1>`)
    } else {
        movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieContainer.insertAdjacentHTML('afterbegin', movieCard);
            }
        );
    }

    movieContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID);
    })

    return movieContainer;
}

function attachContainer(container, targetElement, position='afterend') {
    const oldMovieContainer = document.querySelector('.movies-container-cards');
    if (oldMovieContainer) {
        oldMovieContainer.remove()
    }

    targetElement.insertAdjacentElement(
        position,
        container
    )
}

function handleSaveToFavourites(event, listId) {
    // closest returns null
    const clickedMovieBtnIcon = event.target.closest('.movie-card-btn-icon');
    if (!clickedMovieBtnIcon) {
        return;
    }

    const clickedMovieCard = clickedMovieBtnIcon.parentElement;
    const clickedMovieCardId = clickedMovieCard.dataset.movieId;


    const updatedMovies = getAllMovies()
        .map(movieItem => {
            if (movieItem.id === Number(clickedMovieCardId)) {
                return {
                    ...movieItem,
                    isFavourite: !movieItem.isFavourite
                }
            } else {
                return {...movieItem}
            }
        })

    setAllMovies(updatedMovies);
    setFavouriteMovies();

    switch (listId) {
        case ALL_MOVIES: {
            const clickedMovieObj = updatedMovies.find(movie => movie.id === Number(clickedMovieCardId));
            if (!clickedMovieObj) {
                return;
            }
            const {isFavourite} = clickedMovieObj;
            const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
            const saveToFavouritesIcon = document.createElement('img');
            saveToFavouritesIcon.src = `assets/icons/${heartIcon}`;
            event.target.replaceWith(saveToFavouritesIcon);

            break;
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove();
            if (!getFavouriteMovies().length) {
                const movieContainer = document.getElementById(listId);
                movieContainer.insertAdjacentHTML('afterbegin',
                    `<h1>Sorry, your list is empty</h1>`)
            }

            break;
        }
        default: {
            return;
        }
    }
}

window.customElements.define('my-modal', ModalMovieCard)

