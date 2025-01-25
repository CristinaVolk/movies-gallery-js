import {ALL_MOVIES, FAVOURITE_MOVIES} from "../../shared/constants/movies.js";
import {getAllMovies, getFavouriteMovies, setAllMovies} from "../../shared/localStorage/setGetLocalStorage.js";
import {createMovieCard} from "../movieCard/actions.js";

export function createMovieContainer(listID) {
    let movies;

    switch (listID) {
        case ALL_MOVIES: {
            movies = getAllMovies()
            break
        }
        case FAVOURITE_MOVIES: {
            movies = getFavouriteMovies()
            break
        }
        default: {
            return
        }
    }

    const movieContainer = document.createElement('div');
    movieContainer.id = listID;
    movieContainer.className = 'movies-container-cards';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie)
        movieContainer.insertAdjacentHTML('afterbegin', movieCard);
    })

    movieContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, listID)
    })

    return movieContainer;
}

export function attachContainerToDOM(container, position, targetElement) {
    const oldContainers = document.getElementsByClassName(container.className);
    Array.from(oldContainers).forEach(oldContainer => oldContainer.remove());

    targetElement.insertAdjacentElement(position, container);
}

function handleSaveToFavourites(event, listID) {
    const clickedMovieBtnIcon = event.target.parentElement;
    if (!clickedMovieBtnIcon || clickedMovieBtnIcon.className !== 'movie-card-btn-icon') {
        return;
    }

    const clickedMovieCard = clickedMovieBtnIcon.parentElement;
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies()
    if (!allMovies.length) {
        return;
    }

    const updatedMovies = allMovies.map(movie => {
        return (movie.id === Number(clickedMovieCardID))
            ? { ...movie, isFavourite: !movie.isFavourite }
            : {...movie}
    })

    setAllMovies(updatedMovies);

    switch (listID) {
        case ALL_MOVIES: {
            const clickedMovieObj = updatedMovies.find(movie=> movie.id === Number(clickedMovieCardID));
            const heartIcon = clickedMovieObj.isFavourite ? 'favourite.svg' : 'not-favourite.svg'

            clickedMovieBtnIcon.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="heart Icon"/>`
            )
            event.target.remove();
            // clickedMovieBtnIcon.children[0].remove()
            break
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove()
            break
        }
        default: {
            return
        }
    }
}