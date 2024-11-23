import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function createMovieCard(movie) {
    const {
        id,
        imageUrl,
        movieName,
        releaseYear,
        isFavourite,
        description
    } = movie;
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';

    return `
    <div class="movie-card" data-movie-id="${id}">
        <img src="${imageUrl}" alt="${movieName}"/>
        <h3>${movieName}</h3>
        <strong>${releaseYear}</strong>
        <p>${description}</p>
        
        <button class="movie-card-btn-icon">
            <img src="assets/icons/${heartIcon}" alt="save to favourites icon">
        </button>
    </div>
    `
}

export function handleSaveToFavourites(event, listID) {
    const clickedButtonMovieIcon = event.target.parentElement;
    if (event.target.parentElement?.className !== 'movie-card-btn-icon') {
        return;
    }
    const clickedMovieCard = clickedButtonMovieIcon.closest('.movie-card');
    if (!clickedMovieCard) {
        return;
    }
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;
    const allMovies = getAllMovies();
    if (!allMovies.length) {
        return;
    }
    const updatedMovies = allMovies.map( movie => {
        return (movie.id === Number(clickedMovieCardID))
            ?  {...movie, isFavourite: !movie.isFavourite}
            :  {...movie}
    })
    setAllMovies(updatedMovies);
    updateUI(clickedMovieCardID, clickedMovieCard, listID, clickedButtonMovieIcon)
}

function updateUI(clickedMovieCardID, clickedMovieCard, listID, clickedButtonMovieIcon) {
    const updatedMovies = getAllMovies();
    const clickedMovieObj = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID))
    if (!clickedMovieObj) {
        return;
    }
    const {isFavourite} = clickedMovieObj;
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
    switch (listID) {
        case ALL_MOVIES: {
            clickedButtonMovieIcon.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="save to favourites icon">`
                )
            clickedButtonMovieIcon.children[0].remove();
            break
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove();
            break;
        }
        default: {
            return;
        }
    }
}