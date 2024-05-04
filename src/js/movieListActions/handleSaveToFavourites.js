import {getALLMovies, setAllMovies} from "../localStorage/setGetLocalStorage.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/moviesListID.js";

export function handleSaveToFavourites(event, listID) {
    const clickedMovieCardBtn = event.target.closest('.movie-card-btn-icon');
    if (clickedMovieCardBtn === null) {
        return;
    }

    const clickedMovieCard = clickedMovieCardBtn.closest('.movie-card')
    const clickedMovieCardID = clickedMovieCard.dataset.movieId

    const allMovies = getALLMovies()
    if (!allMovies.length) {
        return;
    } else {
        const updatedMovies = allMovies.map( movie => {
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
                const movieObject = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID))
                if (movieObject) {
                    const { isFavourite } = movieObject
                    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'
                    clickedMovieCardBtn.insertAdjacentHTML(
                        'beforeend',
                        `<img src="assets/icons/${heartIcon}" alt="save to favourites icon"/>`
                    )
                    clickedMovieCardBtn.children[0].remove()
                }

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

}