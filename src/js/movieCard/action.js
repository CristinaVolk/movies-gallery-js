import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function createMovieCard(movie) {
    const {id, imageUrl, movieName, releaseYear, isFavourite, description } = movie
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

    return `
        <div class="movie-card" data-movie-id="${id}">
            <img src="${imageUrl}" alt="${movieName}" />
            <h3>${movieName}</h3>
            <strong>${releaseYear}</strong>
            <p>${description}</p>
            <button class="movie-card-btn-icon">
                <img src="assets/icons/${heartIcon}" alt="save to favourites" />
            </button>
        </div>
    `
}

export function saveToFavourites(event, listID) {
    const clickedMovieCardButton = event.target.closest('.movie-card-btn-icon')
    if (clickedMovieCardButton === null) {
        return
    }

    const clickedMovieCard = clickedMovieCardButton.parentElement
    const clickedMovieCardID = clickedMovieCard.dataset.movieId

    const updatedMovies = getAllMovies()
        .map(movieItem => {
            if (movieItem.id === Number(clickedMovieCardID)) {
                return {
                    ...movieItem,
                    isFavourite: !movieItem.isFavourite
                }
            } else {
                return {...movieItem}
            }
        })

    setAllMovies(updatedMovies);

    switch (listID) {
        case ALL_MOVIES: {
            const clickedMovieObj = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID))
            const {isFavourite } = clickedMovieObj
            const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

            clickedMovieCardButton.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="save to favourites"/>`
            )
            clickedMovieCardButton.children[0].remove()

            break
        }
        case FAVOURITE_MOVIES : {
            clickedMovieCard.remove()

            break
        }
        default: {
            return;
        }
    }
}