import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";
import {getAllMovies, setAllMovies} from "../localStorage/setGetStorage.js";

export function saveToFavourites(event, listID) {
    const movieCardBtnIconClicked = event.target.closest('.movie-card-btn-icon');
    if (!movieCardBtnIconClicked) {
        return;
    }
    const movieCard = event.target.closest('.movie-card');
    const clickedMovieCardID = movieCard.dataset.movieId;

    const allMovies = getAllMovies();
    if (!allMovies.length) {
        return;
    }

    const updatedMovies = allMovies
        .map(
            m => m.id === Number(clickedMovieCardID)
            ? {...m, isFavourite: !m.isFavourite}
            : {...m}
        )
    setAllMovies(updatedMovies);

    switch (listID) {
        case ALL_MOVIES: {
            const movieObj = updatedMovies.find(m => m.id === Number(clickedMovieCardID));
            const heartIcon = movieObj.isFavourite ? 'favourite.svg' : 'not-favourite.svg';
            // movieCardBtnIconClicked.insertAdjacentHTML('beforeend',
            //     `<img src="assets/icons/${heartIcon}" alt="saveToFavourites" />`)
            // movieCardBtnIconClicked.children[0].remove()

            movieCardBtnIconClicked.innerHTML = `<img src="assets/icons/${heartIcon}" alt="saveToFavourites" />`

            break;
        }
        case FAVOURITE_MOVIES: {
            movieCard.remove();
            break;
        }
        default: {
            return
        }
    }
}