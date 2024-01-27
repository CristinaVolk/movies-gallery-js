import {getAllMovies, getFavoriteMovies, setAllMovies, setFavouriteMovies} from "./localStorage/setGetLocalStorage.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./localStorage/consts.js";
import {createMovieCard} from "./movieCard/createMovieCard.js";
import {renderNewListID} from "./btnSwitchLists/renderNewListID.js";
import {changeUI} from "./btnSwitchLists/changeUI.js";

const btnSwitchLists = document.querySelector('.movies-container-switch-list');

setAllMovies();
setFavouriteMovies();

btnSwitchLists.addEventListener('click', (event) => {
   // render new listID
   const newListID = renderNewListID(event);
    // change UI
    changeUI(newListID, event);
    // create container
    const movieContainer = createMovieContainer(newListID);
    // attach container
    attachContainer(movieContainer, event.target);
})


// create movie container
const movieContainer = createMovieContainer(FAVOURITE_MOVIES);
// attach container to button
attachContainer(movieContainer, btnSwitchLists);


function createMovieContainer(listID) {
    let moviesList = [];
    switch (listID) {
        case FAVOURITE_MOVIES: {
            moviesList = getFavoriteMovies();
            break;
        }
        case ALL_MOVIES: {
            moviesList = getAllMovies();
            break;
        }
        default: {
            return;
        }
    }

    const moviesContainer = document.createElement('div');
    moviesContainer.id = listID;
    moviesContainer.className = 'movies-container-cards';

    if (!moviesList.length) {
        moviesContainer.insertAdjacentHTML(
            'afterbegin',
            `<h1>Sorry your list is empty</h1>`
        )
    }

    moviesList.forEach((movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.insertAdjacentHTML('afterbegin', movieCard);
    }));

    moviesContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID);
    })

    return moviesContainer;
}

function attachContainer(container, targetElement, position = 'afterend') {
    const oldMovieContainer = document.querySelector('.movies-container-cards');
    if (oldMovieContainer) {
        oldMovieContainer.remove();
    }

    targetElement.insertAdjacentElement(position, container);
}

function handleSaveToFavourites(event, listID) {

    const clickedBtnHeartIcon = event.target.closest('.movie-card-btn-icon');
    if (!clickedBtnHeartIcon) {
        return;
    }

    const clickedMovieCard = clickedBtnHeartIcon.parentElement;
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies();

    if (allMovies.length) {
        const updatedMovies = allMovies.map((movie => {
            if (movie.id === Number(clickedMovieCardID)) {
                return { ...movie, isFavourite: !movie.isFavourite }
            } else {
                return {...movie}
            }
        }))

        setAllMovies(updatedMovies);
        setFavouriteMovies();


        switch (listID) {
            case FAVOURITE_MOVIES: {
                clickedMovieCard.remove();

                if (!getFavoriteMovies().length) {
                    const movieContainer = document.querySelector('.movies-container-cards');
                    movieContainer.insertAdjacentHTML(
                        'afterbegin',
                        `<h1>Sorry your list is empty</h1>`
                        )
                }
                break;
            }
            case ALL_MOVIES: {
                const clickedMovieObj = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID));
                if (!clickedMovieObj) {
                    return;
                }

                const {isFavourite} = clickedMovieObj;

                const newHeartIcon = document.createElement('img');
                const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
                newHeartIcon.src = `assets/icons/${heartIcon}`;
                newHeartIcon.alt = 'saveToFavourites';

                clickedBtnHeartIcon.children[0].replaceWith(newHeartIcon);

                break;
            }
            default: {
                return;
            }
        }

    }
}
