import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants.js";

export function handleSaveToFavourites(event, listID) {

    const clickedMovieCardBtn = event.target.closest('.movie-card-btn-icon')
    if (clickedMovieCardBtn == null) {
        return;
    }

    const clickedMovieCard = clickedMovieCardBtn.parentElement;
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies()
    if (!allMovies.length) {
        return;
    }

    const updatedMovies = allMovies.map(movie => {
        if (movie.id === Number(clickedMovieCardID)) {
            return {
                ...movie,
                isFavourite: !movie.isFavourite
            }
        } else {
            return {...movie}
        }
    })

    setAllMovies(updatedMovies)

    switch (listID) {
        case ALL_MOVIES: {
            const movieObj = updatedMovies.find(movie => (movie.id === Number(clickedMovieCardID)))
            const {isFavourite} = movieObj
            const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

            clickedMovieCardBtn.insertAdjacentHTML(
                'beforeend',
                `<img alt="save to favourites" src="assets/icons/${heartIcon}"/>
            `)
            clickedMovieCardBtn.children[0].remove()
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