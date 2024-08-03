import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../consts/movies.js";

export function createMovieCard(movie) {
    const {id, imageUrl, movieName, releaseYear, isFavourite, description } = movie
    const heartIcon = isFavourite ? "favourite.svg" : "not-favourite.svg"

    return `
        <div class="movie-card" data-movie-id="${id}">
            <img src="${imageUrl}" alt="movie" />
            <h3>${movieName}</h3>
            <strong>${releaseYear}</strong>
            <p>${description}</p>
            
            <button class="movie-card-btn-icon">
                <img src="assets/icons/${heartIcon}" alt="saveToFavourites"/>
            </button>
        </div>`
}

export function handleSaveToFavourites(event, listId) {
    const clickedMovieCardBtn = event.target.closest('.movie-card-btn-icon')

    if (clickedMovieCardBtn === null) {
        return;
    }

    const clickedMovieCard = clickedMovieCardBtn.parentElement
    const clickedMovieCardID = clickedMovieCard.dataset.movieId

    const allMovies = getAllMovies();

    if (allMovies.length === 0) {
        return;
    }

    const updatedMovies = allMovies.map(
        movie => {
            return (
                movie.id === Number(clickedMovieCardID)
                    ? {...movie, isFavourite: !movie.isFavourite}
                    : {...movie}
            )
        }
    )
    setAllMovies(updatedMovies)

    switch (listId) {
        case ALL_MOVIES : {
            const clickedMovie = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID))
            if (!clickedMovie) {
                return;
            }
            const {isFavourite} = clickedMovie
            const heartIcon = isFavourite ? "favourite.svg" : "not-favourite.svg"

            clickedMovieCardBtn.insertAdjacentHTML(
                'beforeend',
                ` <img src="assets/icons/${heartIcon}" alt="saveToFavourites"/>`
                )

            clickedMovieCardBtn.children[0].remove()

            break;
        }
        case FAVOURITE_MOVIES : {
            clickedMovieCard.remove()
            break;
        }

        default : {
            return
        }
    }


}