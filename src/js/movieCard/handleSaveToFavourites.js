import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../consts/movies.js";

export function handleSaveToFavourites(event, listID) {
    const clickedBtnIcon = event.target.closest('.movie-card-btn-icon');

    if (clickedBtnIcon === null) {
        return;
    }

    const clickedMovieCard = clickedBtnIcon.parentElement;
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies();
    if (!allMovies.length) {
        return;
    }

    let clickedMovieObject;
    const updatedMovies = allMovies.map(movie => {
        if (movie.id === Number(clickedMovieCardID)) {
            clickedMovieObject = movie;
            return {
                ...movie,
                isFavourite: !movie.isFavourite
            }
        } else {
            return { ...movie };
        }
    });

    setAllMovies(updatedMovies);

    switch (listID) {
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove()
            break;
        }
        case ALL_MOVIES: {
            const heartIcon = !clickedMovieObject.isFavourite ? 'favourite.svg' : 'not-favourite.svg';
            clickedBtnIcon.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="saveToFavouritesIcon"/>`
                )
            clickedBtnIcon.children[0].remove();

            break;
        }
        default: { return }
    }
}
