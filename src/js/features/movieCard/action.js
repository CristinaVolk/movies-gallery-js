import { ALL_MOVIES, FAVOURITE_MOVIES } from "../../shared/constants/movies";
import { getAllMovies, setAllMovies } from "../../shared/localStorage/setGetMovies";

export function createMovieCard(movie) {
    const {id, releaseYear, description, isFavourite, movieName, imageUrl} = movie;
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';

    return `
    <div class="movie-card" data-movie-id="${id}">
        <img src="${imageUrl}" />
        <p>${description}</p>

        <button class="movie-card-btn-icon">
            <img src="assets/icons/${heartIcon}" />
        </button>
    </div>
    `
}

export function handleSaveToFavourites(event, listID) {
    const clickedMovieCardImgBtn = event.target.closest('.movie-card-btn-icon');
    if (!clickedMovieCardImgBtn) {
        return;
    }

    const clickedMovieCard = clickedMovieCardImgBtn.parentElemnt;
    const clickedMovieCardID = clickedMovieCard.dataset.movieId;

    const allMovies = getAllMovies();
    if (!allMovies.length) {
       return;
    }

    const updatedMovies =  allMovies.map(m => (m.id === Number(clickedMovieCardID))
                            ? {...m, isFavourite: !m.isFavourite}
                            : {...m});

    setAllMovies(updatedMovies);

    switch (listID) {
        case ALL_MOVIES: {
            const movieObject = updatedMovies.find(m => m.id === Number(clickedMovieCardID));
            if (movieObject) {
                const {isFavourite, movieName} = movie;
                const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
                clickedMovieCardImgBtn.insertAdjacentHTML('beforeend',
                    `<img src="assets/icons/${heartIcon}" />`
                )
                clickedMovieCardImgBtn.children[0].remove();
            }
            break;
        }
        case FAVOURITE_MOVIES: {
            clickedMovieCard.remove();
        }
    }
}