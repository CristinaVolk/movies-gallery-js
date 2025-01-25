import {
    getAllMovies,
    getFavouriteMovies,
    setAllMovies,
    setFavouriteMovies
} from "../../shared/localStorage/setGetMovies.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "../../shared/localStorage/consts.js";

export function createMovieCard(movie) {
    const {id, imageUrl, movieName, releaseYear, isFavourite, description } = movie;
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
    return `
                <div data-movie-id="${id}" class="movie-card">
                    <img class="movie-card-img" src="${imageUrl}" alt="moviePicture"/>
                    <h3>${movieName}</h3>
                    <strong>${releaseYear}</strong>
                    <p>${description}</p>
                    <button class="movie-card-btn-icon">
                        <img src="assets/icons/${heartIcon}" alt="saveToFavouriteIcon" />
                    </button>
                </div>
            `;
}

export function handleSaveToFavourites(event, listId) {
    // closest returns null
    const clickedMovieBtnIcon = event.target.closest('.movie-card-btn-icon');
    if (!clickedMovieBtnIcon) {
        return;
    }

    const clickedMovieCard = clickedMovieBtnIcon.parentElement;
    const clickedMovieCardId = clickedMovieCard.dataset.movieId;


    const updatedMovies = getAllMovies()
        .map(movieItem => {
            if (movieItem.id === Number(clickedMovieCardId)) {
                return {
                    ...movieItem,
                    isFavourite: !movieItem.isFavourite
                }
            } else {
                return {...movieItem}
            }
        })

    setAllMovies(updatedMovies);
    setFavouriteMovies();

    switch (listId) {
        case ALL_MOVIES: {
            const clickedMovieObj = updatedMovies.find(movie => movie.id === Number(clickedMovieCardId));
            if (!clickedMovieObj) {
                return;
            }
            const {isFavourite} = clickedMovieObj;
            const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
            const saveToFavouritesIcon = document.createElement('img');
            saveToFavouritesIcon.src = `assets/icons/${heartIcon}`;
            event.target.replaceWith(saveToFavouritesIcon);

            break;
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove();
            if (!getFavouriteMovies().length) {
                const movieContainer = document.getElementById(listId);
                movieContainer.insertAdjacentHTML('afterbegin',
                    `<h1>Sorry, your list is empty</h1>`)
            }

            break;
        }
        default: {
            return;
        }
    }
}
