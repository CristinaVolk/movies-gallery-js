export function createMovieCard(movie) {
    const heartIcon = movie.isFavourite ? 'favourite.svg' : 'not-favourite.svg';

    return `
        <div data-movie-id="${movie.id}" class="movie-card">
            <img src="${movie.imageUrl}" alt="${movie.movieName}" />
            <h3>${movie.movieName}</h3>
            <strong>${movie.releaseYear}</strong>
            <p>${movie.description}</p>
            <button class="movie-card-btn-icon">
                <img src="assets/icons/${heartIcon}" alt="saveToFavouritesIcon"/>
            </button>  
        </div>
        `;
}
