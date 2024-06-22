import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function saveToFavourites(event, listID) {
    const clickedMovieCardBtnIcon = event.target.closest('.movie-card-btn-icon')

    if (clickedMovieCardBtnIcon == null) {
        return
    }

    const clickedMovieCardId = clickedMovieCardBtnIcon.parentElement.dataset.movieId
    const clickedMovieCard = clickedMovieCardBtnIcon.parentElement;

    const allMovies = getAllMovies();

    const updatedMovies = allMovies
        .map(movie =>
         (movie.id === Number(clickedMovieCardId))
             ? {...movie, isFavourite: !movie.isFavourite}
             : {...movie}
        )

    setAllMovies(updatedMovies)

    switch (listID) {
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove()

            break;
        }
        case ALL_MOVIES: {
            const movieObj = updatedMovies.find(movie => movie.id === Number(clickedMovieCardId))
            const heartIcon = movieObj.isFavourite ? 'favourite.svg' : 'not-favourite.svg'
            clickedMovieCardBtnIcon.innerHTML = `<img src="assets/icons/${heartIcon}" alt="saveToFavourites"/>`

            break;
        }
    }
}