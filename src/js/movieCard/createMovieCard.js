export function createMovieCard(movieItem) {
    const {id, imageUrl, movieName, releaseYear, description, isFavourite} = movieItem;
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';

    return `
            <div data-movie-id="${id}" class="movie-card">
                <img src="${imageUrl}" alt="${movieName}"/>
                <h3>${movieName}</h3>
                <strong>${releaseYear}</strong>
                <p>${description}</p>
                <button class="movie-card-btn-icon">
                    <img src="assets/icons/${heartIcon}" alt="saveToFavourites"/>
                </button>
            </div>
        `;
}
