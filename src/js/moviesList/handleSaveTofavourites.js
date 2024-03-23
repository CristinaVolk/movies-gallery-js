import {getAllMovies, setAllMovies} from "../localStorage/setGetAllMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function handleSaveTofavourites(event, listID){

    const buttonHeartIcon = event.target.closest('.movie-card-btn-icon');

    if (buttonHeartIcon === null) {
        return
    }

    const clickedMovieCard = buttonHeartIcon.closest('.movie-card');
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies();
    if (allMovies.length === 0) {
        return;
    }

    let movieObject;
    const updatedMovies = allMovies.map(movie => {
        if (movie.id === Number(clickedMovieCardID)) {
            movieObject = movie
            return { ...movie, isFavourite: !movie.isFavourite }
        } else {
            return {...movie}
        }
    })

    setAllMovies(updatedMovies);

    switch (listID) {
        case ALL_MOVIES: {
            const { isFavourite } = movieObject
            const heartIcon = !isFavourite ? 'favourite.svg' : 'not-favourite.svg';

            buttonHeartIcon.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="heartIcon">`
                )
            buttonHeartIcon.children[0].remove()

            break;
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove()

            break;
        }
        default: {
            return
        }
    }
}
