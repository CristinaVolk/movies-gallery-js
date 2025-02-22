import { ALL_MOVIES, FAVOURITE_MOVIES } from "../shared/constants/movies.js";
import { getAllMovies, getFavouriteMovies, setAllMovies } from "../shared/localStorage/setGetMovies.js";
import { createMovieCard } from "./movieCard.js";

export function createMovieContainer(listID = ALL_MOVIES) {
    let movies;

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
        // show user a message of no movies
        return;
    }

    movies.forEach(movie => {
        // create movieCard
        const movieCard = createMovieCard(movie);
        movieContainer.insertAdjacentHTML('afterbegin', movieCard);
    });

    movieContainer.addEventListener('click', (event) => {
        // handle Save to Favourites
        handleSaveToFavourites(event, listID);
    })

    return movieContainer;
}

export function attachContainerToTargetElement(container, targetElement, position) {
    const oldContainers = document.getElementsByClassName(container.className)
    Array.from(oldContainers).forEach(container => container.remove());
    targetElement.insertAdjacentElement(position, container);
}

function getUpdateMovies(movieCardID) {
    const allMovies = getAllMovies();
    if (allMovies.length) {
        return allMovies.map(movie => (
             movie.id === Number(movieCardID)
                ? {...movie, isFavourite: !movie.isFavourite}
                : {...movie}
        ))
    } else {
        return [];
    }
}

function handleSaveToFavourites(event, listID) {
    const btnHeartIcon = event.target.closest('.movie-card-btn-icon')
    if (btnHeartIcon === null) {
        return;
    }

    const clickedMovieCard = btnHeartIcon.parentElement;
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;
    const updatedMovies = getUpdateMovies(clickedMovieCardID);

    if (updatedMovies.length) {
        setAllMovies(updatedMovies);
    }

    switch (listID) {
        case ALL_MOVIES: {
            const clickedMovieObject = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID));
            if (!clickedMovieObject) {
                return;
            }
            btnHeartIcon.insertAdjacentHTML(
                'beforeend',
                createHeartIcon(clickedMovieObject.isFavourite)
            )
            btnHeartIcon.children[0].remove();

            break;
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove()

            break;
        }
        default: {
            return;
        }
    }
}