export function createMovieCard(movie) {
    const {id, imageUrl, movieName,releaseYear, isFavourite, description  } = movie
    const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg'

    return `
        <div class="movie-card" data-movie-id="${id}">
            <img src="${imageUrl}" alt="${movieName}" />
            <h3>${movieName}</h3>
            <strong>${releaseYear}</strong>
            <p>${description}</p>
            <button class="movie-card-btn-icon">
                <img src="assets/icons/${heartIcon}" alt="save to favourites icon"/>
            </button>
        </div>
        `;
}