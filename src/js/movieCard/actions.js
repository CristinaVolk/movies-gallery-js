import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movie.js";

export function createMovieCard(movie) {
    const {id, imageUrl, movieName, releaseYear, isFavourite, description} = movie
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

    return `
            <div data-movie-id="${id}" class="movie-card">
                <img src="${imageUrl}" alt="${movieName} picture"/>
                <h3>${movieName}</h3>
                <strong>${releaseYear}</strong>
                <p>${description}</p>
                
                <button class="movie-card-btn-icon">
                    <img src="assets/icons/${heartIcon}" alt="save to favourites icon"/>
                </button>
            </div>
        `
}

export function handleSaveToFavourites(listID, event) {
    const btnHeartIcon = event.target.closest('.movie-card-btn-icon')

    if (btnHeartIcon === null) {
        return
    }

    const clickedMovieCard = btnHeartIcon.closest('.movie-card')
    const clickedMovieCardID = clickedMovieCard.dataset.movieId

    const allMovies = getAllMovies()
    const updatedMovies = allMovies.map((movie =>
        (movie.id === Number(clickedMovieCardID))
            ?  {...movie, isFavourite: !movie.isFavourite}
            :  {...movie}
    ))
    setAllMovies(updatedMovies)

    switch (listID) {
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove()
            // TODO: add check if list is empty
            break
        }
        case ALL_MOVIES: {
            const clickedMovie = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID))
            const heartIcon = clickedMovie.isFavourite ? 'favourite.svg' : 'not-favourite.svg'

            btnHeartIcon.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="save to favourites icon"/>`
            )
            btnHeartIcon.children[0].remove()

            break
        }

    }


}