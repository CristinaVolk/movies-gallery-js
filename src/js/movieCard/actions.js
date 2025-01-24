import {getAllMovies, setAllMovies} from "../localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";

export function createMovieCard(movie) {
    const heartIcon = movie.isFavourite ? 'favourite.svg' : 'not-favourite.svg'

    return `
        <div data-movie-id="${movie.id}" class="movie-card">
            <img src="${movie.imageUrl}" alt="${movie.movieName}"/>
            <h3>${movie.movieName}</h3>
            <strong>${movie.releaseYear}</strong>
            <p>${movie.description}</p>
            
            <button class="movie-card-btn-icon">
                <img src="assets/icons/${heartIcon}" alt="save to favourites"/>
            </button>
        </div>
    `
}

export function saveToFavourites(event, listID) {
    const clickedMovieCardBtn = event.target.parentElement;

    if (clickedMovieCardBtn.className !== 'movie-card-btn-icon') {
        return;
    }

    const clickedMovieCard = clickedMovieCardBtn.closest('.movie-card');
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies();
    if (!allMovies.length) {
        return;
    }

    const updatedMovies = allMovies
        .map(movie =>
                movie.id === Number(clickedMovieCardID)
                ? {...movie, isFavourite: !movie.isFavourite}
                : {...movie}
            );
    setAllMovies(updatedMovies);

    switch (listID) {
        case ALL_MOVIES : {
            const clickedMovieObject = updatedMovies.find(movie => movie.id === Number(clickedMovieCardID))
            const heartIcon = clickedMovieObject.isFavourite ? 'favourite.svg' : 'not-favourite.svg'

            clickedMovieCardBtn.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="save to favourites"/>`
            );
            clickedMovieCardBtn.children[0].remove()

            break
        }
        case FAVOURITE_MOVIES : {
            clickedMovieCard.remove()

            break
        }
        default: {
            return
        }
    }



}