export function createMovieCard(movie) {
    const {id, imageUrl, movieName, releaseYear, isFavourite, description} = movie
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

    return `
        <div data-movie-id="${id}" class="movie-card">
            <img alt="${movieName}" src="${imageUrl}"/>
            <h3>${movieName}</h3>
            <strong>${releaseYear}</strong>
            <p>${description}</p>
            <button class="movie-card-btn-icon">
                <img alt="save to favourites" src="assets/icons/${heartIcon}"/>
            </button>
        </div>
        `;
}